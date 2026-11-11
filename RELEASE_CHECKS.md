# Release checks for 11 November 2026

## Verified locally

- Static release checks: 7 passed, 0 failed.
- Automated browser checks: 30 passed, 0 failed.
- 31 slides checked at desktop 1600 by 1000 and mobile 390 by 844 and 360 by 800.
- Navigation, overview, notes, help, Escape/reopen, deep links/reload and boundary buttons checked.
- Embedded fonts and images loaded. No page errors, console errors, failed requests or executable external requests were reported in the checked profiles.
- Print CSS geometry checked for all 31 slides. This is not a verified printed PDF.
- Publication directory contains only index.html and robots.txt.
- Original research source hashes: 3 of 3 unchanged.
- Source secret-pattern scan found no matching credential strings. This is a targeted check, not a comprehensive security audit.

Canonical HTML SHA-256: `1be31e71593eb34385092d85fc01692a01b288d5abd8b3aadc8b66fc6c411ada`.

The exact transferred HTML bytes are preserved. The existing cloud deck repository and original Mac research documents were not modified by this release integration.

## Limits

No Safari/Firefox/physical-device test, fullscreen confirmation or physical-print/PDF-export test was performed. External literature links were not re-reviewed for this publication operation. No numerical research model or field result was validated.

Deployment readiness and HTTP checks must be verified against the release commit separately. The handoff identifies the repository and Vercel project; a successful local test is not a deployment success claim.
