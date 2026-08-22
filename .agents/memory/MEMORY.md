# Memory index

- [Server bundle constraints](server-bundle-constraints.md) — prod server is esbuild CJS: no `import.meta` in server code; use `process.cwd()` paths (dist/public vs client/public).
- [Lead form authentication](lead-form-authentication.md) — Supabase lead intake checks each active `lead_forms` row’s API key; dealer and user forms use separate keys.
