# Memory index

- [Server bundle constraints](server-bundle-constraints.md) — prod server is esbuild CJS: no `import.meta` in server code; use `process.cwd()` paths (dist/public vs client/public).
- [Lead form authentication](lead-form-authentication.md) — Supabase checks each active `lead_forms` row’s API key; each form uses its own server-side key.
- [Mobile navigation overlays](mobile-navigation-layering.md) — keep full-screen dialogs outside stacking-context ancestors; verify scroll lock, focus, and keyboard escape.
- [Drizzle managed tables](drizzle-managed-tables.md) — model tables auto-created by dependencies, or schema push can mistake a new table for a rename.
- [MHMDA manual fulfillment](mhmda-manual-fulfillment.md) — privacy requests use a controlled operator workflow; do not add automatic lead-store deletion without a new user decision.
- [Analytics privacy scope](analytics-privacy-scope.md) — keep custom measurement focused on marketing actions, not health-related inquiry behavior.
