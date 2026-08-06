import type { Express } from "express";
import fs from "fs";
import path from "path";
import { db } from "./db";
import { blogArticles } from "@shared/schema";
import { desc } from "drizzle-orm";
import { isArticleVisible, effectivePublishedAt, articleUrl } from "./blogPublishing";

function readStatic(file: string): string | null {
  // process.cwd()-based so this works in both dev (tsx) and the bundled CJS
  // production build, where import.meta is unavailable.
  const candidates = [
    path.resolve(process.cwd(), "dist", "public", file),
    path.resolve(process.cwd(), "client", "public", file),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return fs.readFileSync(p, "utf-8");
  }
  return null;
}

async function visibleApiArticles() {
  const rows = await db.select().from(blogArticles).orderBy(desc(blogArticles.createdAt));
  return rows.filter((a) => isArticleVisible(a));
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Injects API-published blog articles into the static sitemap.xml and sitemap.rss
export function registerDynamicSitemaps(app: Express) {
  const handler = (file: string, inject: (xml: string, articles: Awaited<ReturnType<typeof visibleApiArticles>>) => string) =>
    async (_req: any, res: any, next: any) => {
      try {
        const base = readStatic(file);
        if (!base) return next();
        let articles: Awaited<ReturnType<typeof visibleApiArticles>> = [];
        try {
          articles = await visibleApiArticles();
        } catch (err) {
          console.error(`[sitemap] failed to load blog articles:`, err instanceof Error ? err.message : err);
        }
        res.setHeader("Content-Type", "application/xml; charset=utf-8");
        res.send(inject(base, articles));
      } catch (err) {
        next(err);
      }
    };

  app.get(
    "/sitemap.xml",
    handler("sitemap.xml", (xml, articles) => {
      const entries = articles
        .map((a) => {
          const lastmod = (effectivePublishedAt(a) ?? a.updatedAt).toISOString().slice(0, 10);
          return `  <url><loc>${escapeXml(articleUrl(a))}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
        })
        .join("");
      return xml.replace("</urlset>", `${entries}</urlset>`);
    }),
  );

  app.get(
    "/sitemap.rss",
    handler("sitemap.rss", (xml, articles) => {
      const items = articles
        .map((a) => {
          const pub = (effectivePublishedAt(a) ?? a.createdAt).toUTCString();
          return `    <item>\n      <title>${escapeXml(a.title)}</title>\n      <link>${escapeXml(articleUrl(a))}</link>\n      <guid>${escapeXml(articleUrl(a))}</guid>\n      <pubDate>${pub}</pubDate>\n      <description>${escapeXml(a.excerpt)}</description>\n    </item>\n`;
        })
        .join("");
      return xml.replace("</channel>", `${items}</channel>`);
    }),
  );
}
