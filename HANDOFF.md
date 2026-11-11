# Handoff for the KKU integrated energy research project

Updated 11 November 2026

## What this project contains

This is the independent research direction requested for 19 KKU Engineering buildings. It is separate from the original Proposal v3, PV paper, thesis tracker and portfolio website.

- `docs/01_proposal_TH.md`: full Thai proposal with English title and abstract.
- `docs/02_scope_comparison.md`: differences from the previous research direction.
- `docs/03_experiments_and_metrics.md`: comparison design, uncertainty and evaluation metrics.
- `docs/04_data_and_claim_gates.md`: required data and limits on claims.
- `docs/05_sources_and_open_questions.md`: provenance and unresolved questions.
- `public/index.html`: the canonical self-contained 31-slide presentation, including 5 reference slides. This is the later presentation revision, with more literature and policy context than the earlier Markdown proposal.
- `presentation-source/release-source.json`: exact source hash and transfer provenance for the delivered HTML.
- `presentation-source/theme-provenance.json`: original brand-asset provenance.

There is no simulation engine, backend, user database, live equipment control, measured KKU result or approved Net Zero claim. The presentation remains a proposed research framework.

## Repository and branch

Private repository: https://github.com/ajbk/kku-integrated-energy-research

Release branch: `research/integrated-energy-19-buildings`

Mac worktree: `/Users/ajbk/Documents/ChatGPT/PhD/kku-integrated-energy-research/.worktrees/integrated-energy-net-zero`

The repository was created separately because the original research folder was not a Git repository. Keep work on this branch/worktree; do not overwrite the original proposal, website or tracker. Initial proposal commit: `3cd729ca88dc924eb18c1d20dd0a8870e7d90cb6`.

## Presentation source and editing

Edit `public/index.html` directly. It contains the HTML, CSS, JavaScript, fonts and logo assets needed for offline use. Original logos and the embedded Kanit OFL license must be preserved. The older cloud Python generators were not adopted as a build pipeline because the final delivered HTML contains later changes. Running an older generator would overwrite those changes.

After an intentional presentation edit, update the `sha256` in `presentation-source/release-source.json`, documenting the new revision rather than pretending it is unchanged. Run the checks below and inspect the affected slides visually before committing.

The main research document and presentation are distinct revisions. Before revising scientific claims, reconcile both deliberately. Do not assume every later literature detail has already been merged into the Markdown proposal.

## Run locally

Open `public/index.html` directly, or serve only the publication directory:

```
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Then open `http://127.0.0.1:4173/`.

Navigation: arrow/Page keys, Home/End, overview, notes, help and deep links such as `#slide-9`. Portrait mobile uses a scrollable slide layout. Browser fullscreen and actual printer/PDF output depend on the local browser and remain separate manual checks.

## Checks

Node.js 24 or newer is required for repository tests. The website itself needs no Node runtime and has no package dependencies.

```
npm ci
npm test
npm run test:browser
```

Playwright is pinned at 1.64.1. Browser checks can use an installed Google Chrome browser; otherwise install the matching Chromium with `npx playwright install chromium` first. The browser checker accepts `BASE_URL` for an already-running local or remote site and `PLAYWRIGHT_MODULE` for an existing installation. Consult the script for its current browser selection and default server behavior.

Static checks cover the 31 slides, essential controls, script/JSON syntax, executable network dependencies, private local references, font license, source-byte hash and publication allowlist. Browser checks cover navigation, dialogs, notes, deep links and desktop/mobile geometry. Neither test validates research results or third-party references.

## Vercel deployment

Team: AJBK's projects (`team_xEQBoNPkiwRVDw8SmXRL89kI`)

Project: `kku-integrated-energy-research` (`prj_PxYssL3tXLgXdmflo7OwUesAQBdK`)

Framework: Other/static. Output directory: `public`. Build and install commands: empty. Node setting: 24.x. No environment variables or secrets are required. Only the deck and robots.txt are published; research documents, source hashes, local paths and this handoff are not site routes.

The project was created with Vercel Authentication enabled for `all_except_custom_domains`. Preserve that protection unless the owner explicitly changes the intended audience. A private GitHub repository does not itself protect a website. `noindex`/robots.txt request search-engine exclusion, not access control.

For a future release, run checks, commit, push this branch, then deploy the exact reviewed commit to this existing Vercel project. Verify the resulting deployment status and URL. Do not assume pushing a non-default branch promotes production automatically. Check the Git connection and production branch settings first; an explicit Git-based deployment is acceptable.

Do not create a replacement Site or overwrite the old thesis/portfolio deployments. No custom domain, paid service, analytics or additional persistent credential is needed for this release.

## Initial published release

Production URL: https://kku-integrated-energy-research.vercel.app/

Initial published commit: `3ee136a68e62a64e0f4c9b3fe5b4ebb08468d013`

Initial Vercel deployment: `dpl_2K6Jb1HUpibE2WL75Uwc9ihbCdsb`, READY, Git source, production.

The first push on `research/integrated-energy-19-buildings` became the repository default branch and triggered a successful production Git deployment. GitHub reported the Vercel status as success for that exact commit. Keep checking the current production-branch setting before future publication; the earlier generic caution about non-default branches still applies.

An authenticated HTTP fetch returned 200 with all 31 slides. The served HTML SHA-256 matched the canonical file exactly. `X-Robots-Tag: noindex, nofollow`, `X-Content-Type-Options: nosniff` and the referrer-policy header were present. Access remains protected by Vercel Authentication. Use the regular production URL while signed in to the authorized Vercel account; no public bearer link is provided.

Local browser QA is complete. Full remote-browser interaction and authenticated negative-route checks were not completed; the verified deployed-byte match and authenticated main-page response should not be described as those tests.

## Verification limits and next work

- No numerical model, optimization or field validation was run for this release.
- Study permissions, metering topology, EV demand, export compensation and scientific novelty still require evidence and advisor review.
- The three original documents recorded in `source_manifest.json` must retain their hashes.
- The initial `VERIFICATION.md` describes the proposal-only checkpoint. Later publication checks are separate; do not read its historical no-remote/no-deploy state as current release configuration.
- Before sharing outside the intended audience, confirm the access policy and that research claims remain proposal-level.
