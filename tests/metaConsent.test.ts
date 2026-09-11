import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const source = readFileSync("client/public/meta-consent.js", "utf8");
const key = "adapy-advertising-consent-v1";
function setup(options: {
  url?: string; referrer?: string; consent?: boolean; status?: number;
  fetch?: () => Promise<{ status: number }>;
  releaseLocked?: boolean;
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
  runInNewContext(options.releaseLocked ? source : source.replace(
    "const META_SETTINGS_VERIFIED = false;", "const META_SETTINGS_VERIFIED = true;",
  ), {
    window, document, location, history, fetch, URL, Event,
    localStorage: { getItem: (name: string) => stored.get(name) ?? null, setItem: (name: string, value: string) => stored.set(name, value), removeItem: (name: string) => stored.delete(name) },
    sessionStorage: { getItem: (name: string) => session.get(name) ?? null, setItem: (name: string, value: string) => session.set(name, value), removeItem: (name: string) => session.delete(name) },
  });
  const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
  return { window, location, history, originalPush, stored, cookies, scripts, fetch, flush };
}

describe("Meta advertising consent", () => {
  it("ships release-locked pending the owner's verification of Meta account settings", async () => {
    const app = setup({ consent: true, releaseLocked: true });
    await app.flush();
    expect(app.fetch).not.toHaveBeenCalled();
    expect(app.scripts).toHaveLength(0);
  });
  it.each([undefined, false])("never downloads or initializes before affirmative consent (%s)", async consent => {
    const app = setup({ consent });
    await app.flush();
    expect(app.fetch).not.toHaveBeenCalled();
    expect(app.scripts).toHaveLength(0);
    expect(app.window.fbq).toBeUndefined();
  });
  it.each(["/", "/platform", "/about", "/privacy", "/terms"])("allows only approved page %s", async path => {
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
  ])("never loads on excluded URL %s", async path => {
    const app = setup({ url: `https://adapy.com${path}`, consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(0);
    expect(app.fetch).not.toHaveBeenCalled();
  });
  it.each(["my.adapy.com", "admin.adapy.com", "dev.adapy.com", "localhost", "adapy.com.evil.test"])("blocks host %s", async host => {
    const app = setup({ url: `https://${host}/`, consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(0);
  });
  it.each(["https://adapy.com/contact", "https://adapy.com/?email=test", "https://adapy.com/#private", "https://example.com/private"])("blocks unsafe referrer %s", async referrer => {
    const app = setup({ consent: true, referrer });
    await app.flush();
    expect(app.scripts).toHaveLength(0);
  });
  it.each([200, 403, 500])("blocks authenticated or unknown status %s", async status => {
    const app = setup({ consent: true, status });
    await app.flush();
    expect(app.scripts).toHaveLength(0);
  });
  it("requires clean referrer and accepts www hostname", async () => {
    const app = setup({ url: "https://www.adapy.com/about", referrer: "https://adapy.com/", consent: true });
    await app.flush();
    expect(app.scripts).toHaveLength(1);
  });
  it("initializes after explicit accept and withdraws on reject", async () => {
    const app = setup();
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
  it("does not initialize if consent is withdrawn during the auth check", async () => {
    let resolve!: (value: { status: number }) => void;
    const app = setup({ consent: true, fetch: () => new Promise(r => { resolve = r; }) });
    app.window.adapyAdvertising.save(false);
    resolve({ status: 401 });
    await app.flush();
    expect(app.scripts).toHaveLength(0);
  });
  it("fails closed on network errors", async () => {
    const app = setup({ consent: true, fetch: async () => { throw new Error("offline"); } });
    await app.flush();
    expect(app.scripts).toHaveLength(0);
  });
  it("withdraws across tabs and clears stored consent", async () => {
    const app = setup({ consent: true });
    await app.flush();
    app.stored.clear();
    app.window.dispatchEvent({ type: "storage", key: null });
    expect(app.location.reload).toHaveBeenCalledOnce();
    expect(app.cookies.length).toBeGreaterThan(0);
  });
});