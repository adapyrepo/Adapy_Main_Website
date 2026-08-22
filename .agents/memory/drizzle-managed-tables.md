---
name: Drizzle managed tables
description: Avoid interactive and potentially unsafe rename prompts during managed schema application.
---

Any database table created automatically by a runtime dependency must also be represented in the Drizzle schema when the project uses schema diffing.

**Why:** Drizzle can see an unmodeled existing table and a newly added schema table as a potential rename. That forces an interactive choice, which breaks the closed-stdin post-merge setup and creates an avoidable risk of selecting the wrong operation.

**How to apply:** When adding a new table causes an unexpected rename prompt, first identify existing tables created by dependencies (such as session stores) and add their accurate definitions to the schema source of truth. Then verify the managed post-merge database update runs non-interactively; let the platform publish flow apply the corresponding production schema diff.