import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchMobilityTotal } from "../client/src/lib/mobilityMoments";

afterEach(() => vi.unstubAllGlobals());

describe("live mobility total", () => {
  it("uses total rather than base or sessions", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ total: 241647, base: 230000, sessions: 11647 }),
    });
    vi.stubGlobal("fetch", request);
    expect(await fetchMobilityTotal()).toBe(241647);
    expect(request).toHaveBeenCalledWith(
      "https://my.adapy.com/moment-of-mobility",
      expect.objectContaining({ credentials: "omit", cache: "no-store" }),
    );
  });

  it.each([null, {}, { total: "241647" }, { total: -1 }, { total: 1.2 }])(
    "rejects invalid responses: %j", async value => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => value }));
      await expect(fetchMobilityTotal()).rejects.toThrow("invalid total");
    },
  );

  it("accepts a real zero", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ total: 0 }) }));
    expect(await fetchMobilityTotal()).toBe(0);
  });

  it("reports endpoint failures instead of inventing a number", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(fetchMobilityTotal()).rejects.toThrow("could not be loaded");
  });
});