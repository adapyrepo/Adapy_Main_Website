import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const source = readFileSync("client/public/meta-consent.js", "utf8");
const key = "adapy-advertising-consent-v1";
function setup(options: {
  url?: string; referrer?: string; consent?: boolean; status?: number;
  fetch?: () => Promise<{ status: number }>;
  gpc?: boolean;
} = {}) {
  const url = new URL(options.url ?? "https://adapy.com/");
  const stored = new Map<string, string>();
  if (options.consent !== undefined) stored.set(key, JSON.stringify({ version: 1, advertising: options.consent }));
  const listeners = new Map<string, Function[]>();
  const scripts: any[] = [];
  const cookies: string[] = [];
  const location = {
    href: url.href, hostname: url.hostname, pathname: url.pathname, origin: url.origin, protocol: url.protocol,
    assign: vi.fn(), replace: vi.fn(), reload: vi.fn(),
  };
  const document = {
    referrer: options.referrer ?? "",
    createElement: vi.fn(() => ({})),
    head: { appendChild: (script: any) => scripts.push(script) },
    set cookie(value: string) { cookies.push(value); },
  };
  const window: any = {
    addEventListener(name: string, fn: Function) {
      listeners.set(name, [...(listeners.get(name) ?? []), fn]);
    },
    dispatchEvent(event: any) {
      for (const fn of listeners.get(event.type) ?? []) fn(event);
    },
  };
  const history = { pushState: vi.fn(), replaceState: vi.fn() };
  const originalPush = history.pushState;
  const fetch = vi.fn(options.fetch ?? (async () => ({ status: options.status ?? 401 })));
  const session = new Map<string, string>();
  runInNewContext(source, {
    window, document, location, history, fetch, URL, Event,
    navigator: { globalPrivacyControl: options.gpc === true },
    localStorage: { getItem: (name: string) => stored.get(name) ?? null, setItem: (name: string, value: string) => stored.set(name, value), removeItem: (name: string) => stored.delete(name) },
    sessionStorage: { getItem: (name: string) => session.get(name) ?? null, setItem: (name: string, value: string) => session.set(name, value), removeItem: (name: string) => session.delete(name) },
  });
  const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
  return { window, location, history, originalPush, stored, cookies, scripts, fetch, flush };
}

describe("Meta advertising consent", () => {
  it("loads immediately without an authentication request", async () => {
    const app = setup();
    await app.flush();
    expect(app.fetch).not.toHaveBeenCalled();
    expect(app.scripts).toHaveLength(1);
  });
  it("loads by default when no preference has been saved", async () => {
    const app = setup();
    await app.flush();
    expect(app.scripts).toHaveLength(1);
  });
  it("keeps a previously declined visitor opted out", async () => {
    const app = setup({ consent: false });
    await app.flush();
    expect(app.fetch).not.toHaveBeenCalled();
    expect(app.scripts).toHaveLength(0);
  });
  it("honors Global Privacy Control", async () => {
    const app = setup({ gpc: true });
    await app.flush();
    expect(app.fetch).not.toHaveBeenCalled();
    expect(app.scripts).toHaveLength(0);
  });
  it.each(["/", "/platform", "/about", "/privacy", "/terms"])("initializes once on page %s", async path => {
    const app = setup({ url: `https://adapy.com${path}`, consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
    expect(app.scripts[0].src).toBe("https://connect.facebook.net/en_US/fbevents.js");
    expect(app.scripts[0].referrerPolicy).toBe("no-referrer");
    expect(app.window.fbq.queue.map((args: IArguments) => Array.from(args))).toEqual([
      ["consent", "grant"],
      ["set", "autoConfig", false, "1437670454873558"],
      ["init", "1437670454873558"],
      ["track", "PageView"],
    ]);
    app.window.adapyAdvertising.save(true);
    await app.flush();
    expect(app.scripts).toHaveLength(1);
  });
  it.each([
    "/basic-overview", "/pricing", "/hardware/smart-hub", "/hardware/harness-integration",
    "/hardware/wireless-controllers", "/hardware/safety-modules", "/dealer-portal",
    "/user-funnel", "/software/dealer", "/software/cdrs", "/solutions/individual",
    "/solutions/nemt", "/products", "/blog", "/blog/test", "/admin",
    "/admin/privacy-requests", "/admin/blog/1/preview", "/contact", "/videos",
    "/smart_mobility", "/technology-overview", "/safety-benefits", "/see-it",
    "/request-info", "/privacy-request", "/account", "/dashboard", "/unknown",
    "/?email=test", "/#private", "/about?fbclid=test", "/about/",
  ])("does not block initialization based on URL %s", async path => {
    const app = setup({ url: `https://adapy.com${path}`, consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
    expect(app.fetch).not.toHaveBeenCalled();
  });
  it.each(["www.adapy.com", "localhost"])("does not add hostname-based consent restrictions for %s", async host => {
    const app = setup({ url: `https://${host}/`, consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
  });
  it.each(["https://adapy.com/contact", "https://adapy.com/?email=test", "https://adapy.com/#private", "https://example.com/private"])("does not block on referrer %s", async referrer => {
    const app = setup({ consent: true, referrer });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
  });
  it.each([200, 403, 500])("does not depend on admin endpoint status %s", async status => {
    const app = setup({ consent: true, status });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
    expect(app.fetch).not.toHaveBeenCalled();
  });
  it("accepts www hostname", async () => {
    const app = setup({ url: "https://www.adapy.com/about", referrer: "https://adapy.com/", consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
  });
  it("accepts explicitly and withdraws on decline", async () => {
    const app = setup({ consent: true });
    app.window.adapyAdvertising.save(true);
    await app.flush();
    expect(app.scripts).toHaveLength(1);
    app.window.adapyAdvertising.save(false);
    expect(app.window.adapyAdvertising.read()).toBe(false);
    expect(Array.from(app.window.fbq.queue.at(-1))).toEqual(["consent", "revoke"]);
    expect(app.cookies.some(cookie => cookie.startsWith("_fbp=;"))).toBe(true);
    expect(app.cookies.some(cookie => cookie.startsWith("_fbc=;"))).toBe(true);
    expect(app.location.reload).toHaveBeenCalledOnce();
  });
  it("uses full navigation before changing an active Pixel document to an excluded route", async () => {
    const app = setup({ consent: true });
    await app.flush();
    (app.history.pushState as Function)({}, "", "/contact?private=value");
    expect(app.location.assign).toHaveBeenCalledWith("https://adapy.com/contact?private=value");
    expect(app.originalPush).not.toHaveBeenCalled();
  });
  it("Continue enables a previously opted-out visitor", async () => {
    const app = setup({ consent: false });
    expect(app.scripts).toHaveLength(0);
    app.window.adapyAdvertising.save(true);
    await app.flush();
    expect(app.scripts).toHaveLength(1);
    expect(app.window.adapyAdvertising.read()).toBe(true);
  });
  it("does not depend on an admin network request succeeding", async () => {
    const app = setup({ consent: true, fetch: async () => { throw new Error("offline"); } });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
    expect(app.fetch).not.toHaveBeenCalled();
  });
  it("Continue cannot override GPC, including a stored grant", () => {
    const app = setup({ consent: true, gpc: true });
    app.window.adapyAdvertising.save(true);
    expect(app.scripts).toHaveLength(0);
    expect(app.window.fbq).toBeUndefined();
  });
  it("Continue re-grants consent after withdrawal without duplicate initialization", () => {
    const app = setup();
    app.window.adapyAdvertising.save(false);
    app.window.adapyAdvertising.save(true);
    expect(Array.from(app.window.fbq.queue.at(-1))).toEqual(["consent", "grant"]);
    expect(app.scripts).toHaveLength(1);
    expect(app.window.fbq.queue.filter((args: IArguments) => args[0] === "init")).toHaveLength(1);
  });
  it("withdraws when another tab saves an opt-out", async () => {
    const app = setup({ consent: true });
    await app.flush();
    app.stored.set(key, JSON.stringify({ version: 1, advertising: false }));
    app.window.dispatchEvent({ type: "storage", key });
    expect(app.location.reload).toHaveBeenCalledOnce();
    expect(app.cookies.length).toBeGreaterThan(0);
  });
});