---
name: Server bundle constraints
description: Production server is bundled to CJS with esbuild — rules for server code paths and deps
---

The production build (`script/build.ts`) bundles the Express server to `dist/index.cjs` (CJS, minified) with most deps external via an allowlist.

**Rules:**
- Never use `import.meta.dirname` / `import.meta.url` in server files (except `server/vite.ts`, dev-only). Use `process.cwd()`-relative paths; static assets live at `dist/public` in prod and `client/public` in dev.
- New server deps that must be bundled for cold-start need adding to the allowlist in `script/build.ts`; externals just need to be in `dependencies`.

**Why:** esbuild CJS leaves `import.meta` empty — code compiles but breaks only in production (found via code review of dynamic sitemap routes).

**How to apply:** any time a server file needs a filesystem path or a new dependency.
