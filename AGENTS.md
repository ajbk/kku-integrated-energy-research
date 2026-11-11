# Research scope and preservation rules

- This is a new, independent research direction, not a replacement for the existing Proposal v3 or PV/BESS PoC.
- Work only in the assigned worktree. Do not edit the original research folder, existing tracker, deployment, or iCloud copies.
- Use Thai for the proposal and provide an English title and concise abstract.
- Distinguish verified source context, proposed methods, assumptions, missing data, and results. No KKU results exist in this draft.
- The 19 buildings are the proposed case-study scope, not verified metering topology. Never assume energy can be shared or bills netted across meters.
- PV, BESS, EV charging, flexible load and export are optional choices. Preserve no-investment and no-BESS alternatives.
- Export eligibility and compensation are separate. Default to zero export without verified permission. Do not assume any Thai tariff or interconnection rule.
- Net Zero requires explicit scope, accounting and energy-attribute rights. Never subtract exports automatically from Scope 2 or count a kWh twice.
- The 11 November 2026 release request authorizes committing and pushing this project and deploying its presentation to Vercel. Keep the repository private and publish only public/. This does not authorize outreach, equipment procurement, device operation or changes to the original research project. Future publication requires the applicable user request.
- Before completion verify UTF-8 text, relative links, scope coverage, Git worktree isolation, source-file hashes and absence of unsubstantiated results.

## Presentation release

- The canonical presentation is public/index.html. It is a self-contained 31-slide HTML deck, not a simulation application.
- Do not regenerate it with older cloud Python builders: the delivered HTML includes later verified edits. Edit the canonical HTML and update presentation-source/release-source.json with the resulting SHA-256 after review.
- Run npm test and browser checks before publication. Browser tests require Playwright 1.64.1 and an installed Chromium or Chrome browser.
- Vercel serves only public/. Research Markdown, local paths, source hashes and handoff records must not be placed in public/.
- noindex is a search-engine request, not access control. Do not describe the live deck as private unless actual protection is verified.
