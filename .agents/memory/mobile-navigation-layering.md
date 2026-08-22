---
name: Mobile navigation overlays
description: Durable accessibility and layering rules for full-screen navigation dialogs.
---

Keep full-screen navigation dialogs outside ancestors that create stacking or containing contexts, such as transformed or filtered headers.

**Why:** Those ancestors can constrain fixed-position descendants, leaving the dialog invisible or incorrectly layered. A visually correct overlay can still be inaccessible if background scrolling and keyboard focus are not controlled.

**How to apply:** Render the dialog at a reliable top layer. While open, make background content inert, lock document scrolling, move focus into the dialog, contain keyboard focus, and support Escape and an explicit close control.