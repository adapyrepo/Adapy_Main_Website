# Memory index

- [Server bundle constraints](server-bundle-constraints.md) — prod server is esbuild CJS: no `import.meta` in server code; use `process.cwd()` paths (dist/public vs client/public).
- [Lead form authentication](lead-form-authentication.md) — Supabase checks each active `lead_forms` row’s API key; each form uses its own server-side key.
- [Mobile navigation layering](mobile-navigation-layering.md) — render global mobile drawers outside filtered headers so their fixed layers stay reliable.
