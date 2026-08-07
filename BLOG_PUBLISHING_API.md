# Adapy Blog Publishing API

Secure, server-only endpoint that lets the Adapy Back Office publish one completed
blog article per day directly onto the Adapy website.

## Endpoint

```
POST https://adapy.com/api/internal/blog/publish
```

## Authentication

```
Authorization: Bearer <ADAPY_BLOG_API_KEY>
Content-Type: application/json
```

- The key lives only in Replit Secrets (`ADAPY_BLOG_API_KEY`). It is never in
  source code or client-side JavaScript.
- Missing/invalid key → `401`. Key not configured on the server → `503`.
- Rate limit: **10 requests per hour** → `429` when exceeded.
- HTTPS is required in production.

### Setting the key in Replit

Workspace → Tools → Secrets → add `ADAPY_BLOG_API_KEY` with a long random value
(e.g. `openssl rand -hex 32`). Use the same value in the Back Office. After
changing it, republish the site so production picks it up.

## Request schema

| Field | Required | Notes |
|---|---|---|
| `externalId` | ✅ | Unique per article. **Idempotency key** — retries with the same id and identical payload return the existing article. |
| `title` | ✅ | Max 300 chars. |
| `slug` | optional | Lowercase letters/numbers/hyphens. Generated from title when omitted. |
| `excerpt` | ✅ | Max 1000 chars. Used on blog cards + meta description fallback. |
| `content` | ✅ | Article HTML (sanitized server-side). Max 400 KB. |
| `contentFormat` | optional | Only `"html"` supported. |
| `author.name` | ✅ (defaults to "Adapy") | `author.displayName` optional. |
| `featuredImage.url` | required for `published`/`scheduled` | HTTPS only. `featuredImage.alt` is **required** whenever an image is given. `caption` optional. |
| `inlineImages[]` | optional | `{ sourceUrl, alt, caption }`. Their URLs inside `content` are rewritten to permanent Adapy-hosted URLs. |
| `categories`, `tags` | optional | Arrays of strings. First category is shown on the blog card. |
| `seo` | optional | `{ metaTitle, metaDescription, keywords[] }`. |
| `status` | optional | `published` (default) or `scheduled`. Submissions are treated as pre-approved: `"draft"` is accepted for compatibility but is published immediately. |
| `publishAt` | required for `scheduled` | ISO 8601. A `published` article with a future `publishAt` is treated as scheduled. |

### Image rules

- HTTPS URLs only; localhost/private/internal/cloud-metadata addresses are rejected.
- JPEG, PNG, WebP only; max **10 MB** per image; content is verified by file signature.
- Images are downloaded and stored permanently in the site's PostgreSQL database and
  served from `https://adapy.com/api/blog/images/<id>` with long-lived caching.
  Temporary Back Office URLs are replaced in the stored article.
- If any image cannot be downloaded/stored, **nothing is published** and an error
  is returned (no partial articles).

## Example request

See `scripts/sample-blog-publish.sh` — note: every submission (including
`status: "draft"`) is published immediately, so test with disposable content:

```bash
BASE_URL=https://adapy.com ADAPY_BLOG_API_KEY=... ./scripts/sample-blog-publish.sh
```

## Responses

New article — `201`:

```json
{
  "success": true,
  "articleId": "12",
  "externalId": "adapy-backoffice-article-unique-id",
  "status": "published",
  "slug": "article-title",
  "url": "https://adapy.com/blog/article-title",
  "adminUrl": "https://adapy.com/admin/blog/12/preview?token=…",
  "publicUrl": "https://adapy.com/blog/article-title",
  "publishedAt": "2026-08-07T14:00:00.000Z",
  "duplicate": false
}
```

- `publicUrl` — the article's public location (live only once published/visible).
- `adminUrl` — a tokenized admin preview link that works for **any** status,
  including drafts. Use this for "View on Adapy.com" while `status` is `draft`.
- `url` — equals `adminUrl` for drafts, `publicUrl` otherwise (backward compatible).
- Treat `adminUrl` as sensitive: anyone with the link can view (and publish) the
  draft. The token is only ever issued through this authenticated API.

Identical retry — `200` with `"duplicate": true` (no second article or images are created).

Errors (consistent shape):

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The article could not be published.",
    "fields": { "featuredImage.alt": "Alt text is required." }
  }
}
```

| Status | Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR`, `IMAGE_FETCH_FAILED`, `UNSUPPORTED_IMAGE` | Bad payload or image |
| 401 | `UNAUTHORIZED` | Missing/invalid API key |
| 403 | `HTTPS_REQUIRED` | Non-HTTPS in production |
| 409 | `EXTERNAL_ID_CONFLICT`, `SLUG_CONFLICT` | Same externalId with different content, or requested slug taken |
| 413 | `IMAGE_TOO_LARGE` | Image over 10 MB |
| 429 | `RATE_LIMITED` | More than 10 requests/hour |
| 500 | `INTERNAL_ERROR` | Unexpected failure |
| 503 | `NOT_CONFIGURED` | `ADAPY_BLOG_API_KEY` missing on server |

## Idempotency (what the Back Office should do)

1. Generate a stable `externalId` per article and reuse it on retries.
2. If the request times out, **retry with the identical payload** — you will get
   `200` + `duplicate: true` with the same article, never a duplicate post.
3. Store the returned `articleId`, `slug`, and `url` next to the article record.
4. `409 EXTERNAL_ID_CONFLICT` means the payload changed between retries — this
   endpoint does not support updates; use a new `externalId` for a new article.

## Publishing behavior

- `published` → appears immediately at the top of `https://adapy.com/blog` and at
  `https://adapy.com/blog/<slug>` using the existing blog design.
- `scheduled` → stored and automatically visible once `publishAt` passes (checked
  at request time; no job system).
- `draft` → coerced to `published` immediately (articles are approved upstream
  in the Adapy management application before submission).
- Re-submitting an existing `externalId` **updates that article in place**
  (same `articleId` and slug/URL) and republishes it — the response has
  `"updated": true`. No duplicates are ever created.
- Published articles are automatically added to `/sitemap.xml` and `/sitemap.rss`,
  get SEO meta title/description, Open Graph article tags, and JSON-LD.

## Draft workflow (admin preview & publish)

- Opening `adminUrl` shows the full article with an amber "Admin preview" banner
  and a **Publish now** button. Publishing sets the status to `published`, stamps
  the published date, and immediately makes `/blog/{slug}` public and listed.
- Drafts are never shown on the public blog, `/blog/{slug}`, the sitemap, or RSS.
- Programmatic equivalents (for the Back Office):
  - `GET /api/blog/admin/drafts` (Bearer key) — list all drafts with their `adminUrl`s.
  - `GET /api/blog/admin/articles/{id}?token=…` — fetch any article regardless of status.
  - `POST /api/blog/admin/articles/{id}/publish?token=…` — publish a draft immediately.

## Deleting an article

`DELETE /api/internal/blog/{externalId}` — same `Authorization: Bearer` API key
as publishing. Idempotent:

- Article existed → `200` `{ "success": true, "deleted": true, "externalId": "…", "message": "Article deleted successfully." }`
  The article immediately disappears from the blog listing, its `/blog/{slug}`
  URL returns 404, and its stored images are removed.
- Already absent → `200` `{ "success": true, "deleted": false, "message": "Article was already absent." }`
- Missing/invalid key → `401`; genuine server error → `500`.

## Testing

- Automated: `npm test` (20 tests covering auth, validation, sanitization, SSRF
  blocking, idempotency, slug conflicts, visibility, and image-failure rollback).
- Manual safe test: run the sample script above with `"status": "draft"` — the
  article is stored but never shown publicly. Verify via the returned JSON.

## Configuration & deployment checklist

1. Add `ADAPY_BLOG_API_KEY` in Replit Secrets (development + it carries to production on publish).
2. `PUBLIC_SITE_URL` is set to `https://adapy.com` (used for returned URLs).
3. Database: the `blog_articles` and `blog_images` tables were added via
   `npm run db:push` in development; the production schema updates automatically
   when you **republish** the site.
4. Republish the site so the new endpoint goes live at
   `https://adapy.com/api/internal/blog/publish`.
