import type { Express, Request, Response, NextFunction } from "express";

const REDIRECTS: Record<string, string> = {
  "/feed": "/sitemap.rss",
  "/dealer-pricing-2024": "/pricing",
  "/cdrs-ot": "/software/cdrs",
  "/locate": "/dealer-funnel",
  "/compatibility": "/platform",
  "/download": "/contact",
  "/transfer-more": "/products",
  "/bruno-asl-250-platform-lift": "/hardware/harness-integration",
  "/bruno-under-vehicle-lift": "/hardware/harness-integration",
  "/under-vehicle-lift-uvl": "/hardware/harness-integration",
  "/al435t-3-axis": "/hardware/harness-integration",
  "/millennium-series": "/products",
  "/lab-testing": "/about",
  "/category/news": "/blog",
  "/category/news/awards": "/blog",
  "/author/adapyadmin": "/blog",
  "/2022/08": "/blog",
  "/adapy-inc-secures-mi-casa-resource-center-grant-to-protect-intellectual-property-and-drive-innovation-in-adaptive-mobility":
    "/blog",
  "/adapy-showcases-cutting-edge-adaptive-technology-at-the-nmeda-conference-in-kansas-city-mo":
    "/blog",
  "/adapy-inc-selected-for-apex-accelerator-program-and-engages-with-logistics-specialties-inc-lsi-to-boost-government-contracting-efforts/feed":
    "/blog",
};

const PREFIX_REDIRECTS: Array<{ prefix: string; target: string }> = [
  { prefix: "/lesson/", target: "/products" },
  { prefix: "/course/", target: "/products" },
  { prefix: "/product-category/", target: "/products" },
];

const GONE_PREFIXES = [
  "/wp-admin/",
  "/wp-json/",
  "/wp-content/",
  "/wp-includes/",
  "/wp/",
  "/my-account/",
];

export function registerLegacyRedirects(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const path = req.path;

    const exact = REDIRECTS[path];
    if (exact) {
      return res.redirect(301, exact);
    }

    for (const { prefix, target } of PREFIX_REDIRECTS) {
      if (path === prefix.replace(/\/$/, "") || path.startsWith(prefix)) {
        return res.redirect(301, target);
      }
    }

    for (const prefix of GONE_PREFIXES) {
      if (path.startsWith(prefix)) {
        return res.status(410).type("text/plain").send("Gone");
      }
    }

    next();
  });
}
