/* First-party Meta preference controller. */
(function () {
  "use strict";
  if (window.adapyAdvertising) return;
  const KEY = "adapy-advertising-consent-v1";
  const PIXEL = "1437670454873558";
  const META_SETTINGS_VERIFIED = true;
  const HOSTS = ["adapy.com", "www.adapy.com"];
  const PATHS = ["/", "/platform", "/about", "/privacy", "/terms"];
  let loaded = false;
  let checking = false;
  let memoryPreference = null;

  function read() {
    if (memoryPreference !== null) return memoryPreference;
    try {
      if (sessionStorage.getItem(KEY + "-denied") === "true") return false;
    } catch { /* Main consent storage remains the fallback. */ }
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === null) return memoryPreference;
      const value = JSON.parse(stored);
      return value && value.version === 1 && typeof value.advertising === "boolean"
        ? value.advertising : null;
    } catch {
      return memoryPreference;
    }
  }

  function cleanAllowedUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && HOSTS.includes(url.hostname) &&
        url.port === "" && PATHS.includes(url.pathname) &&
        !url.search && !url.hash && !url.username && !url.password;
    } catch {
      return false;
    }
  }

  function eligible() {
    return cleanAllowedUrl(location.href) &&
      (!document.referrer || cleanAllowedUrl(document.referrer));
  }

  function gpcEnabled() {
    return navigator.globalPrivacyControl === true;
  }

  function clearCookies() {
    // Only first-party cookies accessible to this origin can be removed.
    const names = ["_fbp", "_fbc"];
    const domains = ["", location.hostname, "." + location.hostname];
    if (HOSTS.includes(location.hostname)) domains.push("adapy.com", ".adapy.com");
    const paths = ["/"];
    const parts = location.pathname.split("/").filter(Boolean);
    for (let i = 1; i <= parts.length; i++) paths.push("/" + parts.slice(0, i).join("/"));
    for (const name of names) for (const domain of domains) for (const path of paths) {
      document.cookie = name + "=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=" +
        path + (domain ? "; Domain=" + domain : "") + "; SameSite=Lax; Secure";
    }
  }

  function revoke() {
    if (loaded && window.fbq) {
      try { window.fbq("consent", "revoke"); } catch { /* Keep withdrawal functional. */ }
    }
  }

  async function initialize() {
    if (!META_SETTINGS_VERIFIED || loaded || checking || read() === false || gpcEnabled() || !eligible()) return;
    checking = true;
    const initialUrl = location.href;
    try {
      // Fail closed: an admin session, server failure, or unknown response blocks Meta.
      const response = await fetch("/api/admin/me", { credentials: "same-origin", cache: "no-store" });
       if (response.status !== 401 || read() === false || gpcEnabled() || !eligible() ||
          initialUrl !== location.href || loaded || window.fbq) return;
      loaded = true;
      // Official Meta base loader, blocked by an opt-out preference or GPC.
      !function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;t.referrerPolicy="no-referrer";
        // Keep the vendor script in the global head, once per document.
        b.head.appendChild(t);
      }(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("consent", "grant");
      window.fbq("set", "autoConfig", false, PIXEL);
      window.fbq("init", PIXEL);
      window.fbq("track", "PageView");
    } catch {
      // No retries or fallback that could bypass the authentication/consent checks.
    } finally {
      checking = false;
    }
  }

  function save(advertising) {
    memoryPreference = advertising === true;
    try {
      if (memoryPreference) sessionStorage.removeItem(KEY + "-denied");
      else sessionStorage.setItem(KEY + "-denied", "true");
    } catch { /* Try persistent storage below as well. */ }
    let stored = false;
    try {
      localStorage.setItem(KEY, JSON.stringify({ version: 1, advertising: memoryPreference }));
      stored = JSON.parse(localStorage.getItem(KEY)).advertising === memoryPreference;
    } catch {
      try { localStorage.removeItem(KEY); } catch { /* Browser storage is unavailable. */ }
    }
    window.dispatchEvent(new Event("adapy-advertising-change"));
    if (!memoryPreference) {
      revoke();
      clearCookies();
      let sessionDenied = false;
      try { sessionDenied = sessionStorage.getItem(KEY + "-denied") === "true"; } catch {}
      if (loaded && (stored || sessionDenied)) location.reload();
      // If the browser blocks every write, keep the SDK revoked in this document
      // rather than reload into a potentially stale stored grant.
      if (!stored && !sessionDenied) {
        window.dispatchEvent(new Event("adapy-advertising-storage-error"));
      }
    } else {
      void initialize();
    }
  }

  window.adapyAdvertising = {
    read,
    save,
    open: function () { window.dispatchEvent(new Event("adapy-advertising-open")); },
    isPublicHost: function () {
      return location.protocol === "https:" && HOSTS.includes(location.hostname);
    },
    isGpcEnabled: gpcEnabled,
  };

  // A downloaded third-party SDK cannot reliably be unloaded by removing its tag.
  // Cross-document navigation prevents it observing a later restricted SPA page.
  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (state, unused, target) {
      if (loaded && target != null) {
        const next = new URL(String(target), location.href);
        if (next.origin === location.origin && next.href !== location.href) {
          revoke();
          if (method === "replaceState") location.replace(next.href);
          else location.assign(next.href);
          return;
        }
      }
      const result = original.apply(this, arguments);
      void initialize();
      return result;
    };
  }
  function historyChanged(event) {
    if (loaded) {
      revoke();
      event.stopImmediatePropagation();
      location.reload();
    } else {
      void initialize();
    }
  }
  window.addEventListener("popstate", historyChanged, true);
  window.addEventListener("hashchange", historyChanged, true);
  window.addEventListener("pagehide", revoke);
  window.addEventListener("pageshow", function (event) {
    if (event.persisted && loaded) location.reload();
  });
  window.addEventListener("storage", function (event) {
    if (event.key !== KEY && event.key !== null) return;
    memoryPreference = null;
    window.dispatchEvent(new Event("adapy-advertising-change"));
    if (read() === false || gpcEnabled()) {
      revoke();
      clearCookies();
      if (loaded) location.reload();
    } else void initialize();
  });
  if (read() === false || gpcEnabled()) clearCookies();
  void initialize();
})();