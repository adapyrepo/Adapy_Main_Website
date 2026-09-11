const eventNames = [
  "get_started_opened",
  "overview_video_requested",
  "contact_request_sent",
  "newsletter_subscribed",
  "directions_opened",
] as const;

type AnalyticsEvent = (typeof eventNames)[number];

declare global {
  interface Window {
    umami?: {
      track(name: string): void | Promise<unknown>;
    };
  }
}

// Intentionally accepts no payload: never pass form values, roles, or errors.
export function trackEvent(name: AnalyticsEvent): void {
  if (typeof window === "undefined" || !eventNames.includes(name)) return;
  // Only public marketing pages are instrumented. Do not emit custom events
  // from inquiry funnels, privacy workflows, or authenticated pages.
  if (!["/", "/contact"].includes(window.location.pathname)) return;

  try {
    const result = window.umami?.track(name);
    if (result && typeof result.catch === "function") {
      void result.catch(() => {});
    }
  } catch {
    // Analytics must never interrupt navigation or a successful submission.
  }
}