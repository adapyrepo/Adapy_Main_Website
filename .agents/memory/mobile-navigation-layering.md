---
name: Mobile navigation layering
description: Prevent mobile drawers from being constrained by a filtered fixed header.
---

Render full-screen mobile drawers and their backdrops through a portal attached to `document.body`, rather than as descendants of a fixed header that uses blur or filters.

**Why:** Filtered header elements can create a containing and stacking context that makes fixed-position descendants behave relative to the header instead of the viewport, leaving the menu invisible or incorrectly layered.

**How to apply:** Keep the drawer and backdrop outside the application root when that root is made inert. While open, lock document scrolling, focus the drawer's close control, and contain keyboard focus until the drawer closes.