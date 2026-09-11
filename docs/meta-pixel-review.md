# Meta Pixel implementation — review before activation

Pixel ID: **1437670454873558**.

## Current state

The implementation is **release-locked**. `META_SETTINGS_VERIFIED` in
`client/public/meta-consent.js` is `false`. No Meta SDK is downloaded and no
Meta event is sent, even after consent, until the owner verifies the Meta
account settings and approves removing this lock. No deployment configuration
has been changed and nothing has been published.

Before activation, verify in Meta Events Manager for this exact Pixel:

- Automatic Advanced Matching is OFF.
- Automatic events / tracking events without code is OFF.
- No Event Setup Tool rules add events or extract data.

The code uses Meta's documented manual-only `autoConfig: false` setting before
initialization and provides no advanced-matching fields. Account-side settings
are outside this repository's control; they must not be assumed disabled.

## Complete route inventory

The approved implementation allowlist is deliberately conservative. Any new
route is excluded automatically until explicitly reviewed.

| Route | Decision | Reason |
| --- | --- | --- |
| `/` | Allow | General marketing landing page |
| `/platform` | Allow | Same general landing page |
| `/about` | Allow | Company information |
| `/privacy` | Allow | General policy, not request fulfillment |
| `/terms` | Allow | General legal terms |
| `/basic-overview` | Exclude | Detailed adaptive-mobility content |
| `/pricing` | Exclude | Quote/inquiry form |
| `/hardware/smart-hub` | Exclude | Equipment-specific content |
| `/hardware/harness-integration` | Exclude | Equipment-specific content |
| `/hardware/wireless-controllers` | Exclude | Equipment-specific content |
| `/hardware/safety-modules` | Exclude | Equipment/safety-specific content |
| `/dealer-portal` | Exclude | Dealer portal/inquiry |
| `/user-funnel` | Exclude | Individual inquiry and sensitive information |
| `/software/dealer` | Exclude | Dashboard-related page |
| `/software/cdrs` | Exclude | Clinical/customer-related content |
| `/solutions/individual` | Exclude | Disability-related individual solutions |
| `/solutions/nemt` | Exclude | Medical transportation/inquiry |
| `/products` | Exclude | Equipment-specific content |
| `/blog` | Exclude | Unreviewed, changing subject matter |
| `/blog/:slug` | Exclude | May contain health, equipment, funding, or customer stories |
| `/admin` | Exclude | Authentication/admin |
| `/admin/privacy-requests` | Exclude | Private privacy-request workflow |
| `/admin/blog/:id/preview` | Exclude | Authenticated unpublished preview |
| `/contact` | Exclude | Contact/inquiry form, including inline success |
| `/videos` | Exclude | Unreviewed, changing subject matter |
| `/smart_mobility` | Exclude | Adaptive-mobility video |
| `/technology-overview` | Exclude | Equipment-related video |
| `/safety-benefits` | Exclude | Safety/health-related video |
| `/see-it` | Exclude | Customer/equipment demonstration |
| `/request-info` | Exclude | Redirect to contact form |
| `/privacy-request` | Exclude | Sensitive privacy request |
| Unknown paths / 404 | Exclude | Default deny |

There are no separately routed form confirmation pages in this inventory.
Any future confirmation, account, dashboard, portal, maintenance, service, or
customer-information route is excluded by default.

Only exact HTTPS hosts `adapy.com` and `www.adapy.com`, on the default port,
are permitted. `my.adapy.com`, `admin.adapy.com`, `dev.adapy.com`, localhost,
Replit preview domains, and all other hosts are excluded.

## Data and URL safeguards

- Only `fbq("track", "PageView")` is issued, without a custom payload.
- No form values, identifiers, role selections, button labels, or errors are
  passed to Meta. No noscript Pixel is installed, because it would bypass consent.
- Any query string or URL fragment blocks initialization completely. The same
  rule applies to the referrer. Referrers must be empty or a clean allowlisted URL.
  Nothing rewrites or strips the application's actual URL; existing forms and
  analytics keep their original URLs. Custom logic sends no URL parameter.
- This intentionally also excludes UTM/fbclid landing URLs and external
  referrers. Measurement will undercount visits. Relaxing it requires a new
  privacy review, not simply adding campaign parameters.
- `/api/admin/me` must return exactly 401 before the SDK is loaded. Logged-in
  admins, failures, and unknown responses all block the Pixel. Customer
  authentication lives on a separately excluded host.
- Meta still receives basic browser/network information and the page context
  after activation and consent. This is not anonymous or zero-personal-data
  tracking. Even general marketing visits can imply mobility interests.

## Consent behavior

- Advertising is not preselected.
- Ignore/dismiss: no permission is granted.
- Accept all: grants the single optional category managed here, Meta advertising.
- Reject non-essential cookies: denies Meta advertising.
- Manage preferences: explicit unchecked checkbox until previously accepted;
  only Save preferences applies a change. Closing does not grant consent.
- The footer Cookie Preferences button reopens this dialog.
- Consent is versioned in localStorage; sessionStorage holds a withdrawal
  fallback when persistent writes fail.
- Withdrawal revokes consent, deletes accessible `_fbp` and `_fbc` cookies on
  host/parent-domain paths, and reloads an active Pixel document.
- Cookies on Meta's own domain or inaccessible/HttpOnly cookies cannot be
  deleted by this website. Previous Meta data is not erased by withdrawal.
- Cross-tab denial and back/forward cached documents are handled.
- If all browser storage writes fail, keep the current SDK revoked and display
  an explicit warning rather than reload into a potentially stale grant.
- These controls do **not** change existing Google/Replit analytics or existing
  third-party embeds. The banner explicitly explains this scope; it is not a
  claim that all optional third-party technology on the site is consent-gated.

Once the SDK has loaded, a changed SPA URL triggers full document navigation
instead of leaving Meta running in a document that may render restricted content.
Before consent (or while release-locked), normal SPA navigation remains intact.
This deliberate navigation difference prevents a loaded SDK from lingering on
forms/admin pages; browser back/forward causes a clean reload as needed.

## Files changed for this feature

1. `client/index.html` — early first-party head controller only.
2. `client/public/meta-consent.js` — release lock, consent storage, URL/host/auth
   gates, deferred official Meta loader, manual-only PageView, lifecycle cleanup.
3. `client/src/components/AdvertisingConsent.tsx` — banner/preferences UI.
4. `client/src/App.tsx` — mounts the consent UI.
5. `client/src/components/Footer.tsx` — persistent preferences button.
6. `tests/metaConsent.test.ts` — offline privacy and lifecycle regression checks.
7. `docs/meta-pixel-review.md` — this review guide and suggested policy text.

8. `.agents/memory/analytics-privacy-scope.md` — agent-memory note recording the
   consent/activation boundary; not application code.

The uploaded request in `attached_assets/` is user-provided input, not an edited
application file.

## Verification before deployment

Run `npm test -- tests/metaConsent.test.ts` and `npm run check`.
The tests execute the actual controller in isolated simulated browser environments
with approved hostnames, stubbed auth responses, and intercepted script insertion.
They enable the release gate **only inside the isolated test context**, assert
the exact Pixel command queue, and never download Meta code or send real events.
An additional test verifies the actual shipped release lock blocks all requests.

The normal Replit preview must not load Meta even after consent; it is not an
approved hostname. The footer preferences UI can be reviewed there. The initial
banner appears only on approved public hosts. Do not add a production bypass to
make the Pixel fire on preview.

For a full predeployment browser/Meta check, use an isolated local HTTPS browser
test environment that serves this un-deployed build under `adapy.com` through a
local hosts/proxy override. Never change public DNS or the deployed site. This
requires a valid/trusted local HTTPS setup and explicit approval to send test
traffic to Meta. In that local-only build, remove the release lock only after
the Events Manager settings above are verified.

Browser checklist in that isolated environment:

1. Clear site storage. Network filter: `facebook` / `fbevents`.
2. Ignore the banner: no Meta requests or `_fbp`/`_fbc`.
3. Reject: still no Meta; refresh and confirm the denial remains.
4. Footer → Cookie Preferences: advertising unchecked. Closing grants nothing.
5. Accept: one `fbevents.js` load, one PageView for Pixel 1437670454873558.
   Confirm with Meta Pixel Helper and Events Manager → Test Events.
6. Inspect the request payload: standard PageView only, no `ud` matching fields,
   custom `cd` parameters, form values, or query/fragment in `dl` / `rl`.
   Type synthetic text into the newsletter field without submitting; no added
   events or matching data may appear. Never use real personal data in testing.
7. Open `/about`: one PageView for the new document. Then `/contact`,
   `/privacy-request`, and `/admin`: zero Meta requests in those documents.
8. Open `/?email=synthetic`, `/#synthetic`, and a page with an excluded referrer:
   zero Meta requests.
9. Withdraw via the footer: reload, zero future events, accessible cookies removed.
10. Repeat denial in another tab, browser back/forward, and mobile viewport.

Real Meta delivery has **not** been tested or claimed from the excluded Replit
preview. Offline tests validate the integration logic, not Meta's remote SDK or
account configuration.

## Proposed privacy-policy addition (review before publication)

> **Optional Meta advertising measurement.** If you accept advertising cookies,
> we use Meta Pixel on selected public marketing pages to measure page visits.
> Meta may receive your IP address, browser/device information, the visited page
> URL and permitted referrer, and advertising-cookie identifiers. This may help
> Meta measure advertising performance. We do not intentionally send contact-form
> answers, names, email addresses, telephone numbers, disability or health details,
> equipment ownership, service records, or account identifiers through this Pixel.
> We exclude inquiry forms, privacy requests, portals, dashboards, and private
> customer pages from this implementation.
>
> Advertising is optional and remains disabled until you accept it. You can reject
> it or change your choice at any time using **Cookie Preferences** in the footer.
> Withdrawal stops future Pixel activity and removes Meta cookies this website can
> access. It does not delete information Meta already received. See
> https://www.facebook.com/privacy/policy/ for Meta's handling of information.
> These advertising controls do not change the site's existing analytics or
> third-party embeds.

Have the site's privacy/legal owner review this wording, Meta's applicable terms,
retention, regional sharing/targeted-advertising opt-outs, and whether even the
general mobility marketing pages are appropriate for Meta measurement. No legal
compliance certification is implied. The published privacy page was not rewritten.