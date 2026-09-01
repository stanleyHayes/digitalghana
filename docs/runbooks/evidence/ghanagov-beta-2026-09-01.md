# GhanaGov public beta evidence — 2026-09-01

## Release identity

- Repository: `https://github.com/stanleyHayes/ghanagov`
- Final release commit: `1b19195b4a578c6d793fabcb80b5ca1db8128e67`
- Dataset: `2026.09.01-beta.1`, verified 2026-09-01
- GitHub Actions: Quality run `33520923452`, success
- Lifecycle: beta; deliberately limited verified subset

## Provider inventory

- Web: Vercel project `hayfordstanleys-projects/ghanagov`
- Final web deployment: `dpl_57L7Rrvn9naggsxmkSr47rAxNQ6W`
- Canonical web: `https://gov.digitalghana.dev`
- API: Render service `srv-dabdrk67bikc73buippg`
- Final API deploy: `dep-dabe7j67bikc73824n20`, live
- Canonical API: `https://api-gov.digitalghana.dev`
- Render custom domain: `cdm-dabdvbbtqb8s73fkca80`, verified

## Verification

- Canonical web `/`, `/robots.txt` and `/sitemap.xml` returned HTTP 200 with valid TLS.
- Canonical API `/health` returned `status=ok`, 10 institutions, 4 services, dataset version and `coverage=verified subset`.
- `MOFEP` resolved exactly to `ministry-finance`.
- `ministry-interior` returned five sourced children.
- `interior-ministry` returned HTTP 308 to the canonical record.
- Ghana Revenue Authority service filtering returned two records.
- Constrained GraphQL search returned the same NIA record as REST.
- API CORS allows only `https://gov.digitalghana.dev`.
- Repeated post-convergence and post-rollback checks returned consecutive canonical successes.

## Interface, accessibility and SEO evidence

- Chrome production QA verified working search and the four-option custom institution-type listbox.
- Computed fonts: Outfit for interface/body, Geist Mono for labels/data and Newsreader for the editorial title accent.
- Browser and source scans found zero rendered native select, dialog, checkbox, radio, date, time or date-time controls.
- No horizontal overflow was observed in desktop/narrow browser QA.
- Canonical, Open Graph and Twitter metadata are present; JSON-LD describes the website, dataset and Digital Ghana publisher.
- `/icon.svg` returns HTTP 200 as SVG; `/manifest.webmanifest` returns HTTP 200 as a web manifest.
- The generated Open Graph image returns PNG and measures 1200×630.

## Rollback evidence

- Vercel rolled back to `dpl_ECAnqCfV9zotnHLh8z6t6rtAQDBb`, canonical smoke passed, then restored to the current application line and canonical smoke passed.
- Render deployed prior commit `67106d741f8e1282b33ad6eeaa65dcc1718d3fd0` as `dep-dabe5fijobas73c7jcu0`, canonical health passed, then restored commit `c53a16c5cbbac7274a490c3889e35ae10eca12f4` as `dep-dabe5qss728c73aen6h0`; five health checks passed.
- The later docs/SEO release commit produced current provider artifacts `dpl_57L7Rrvn9naggsxmkSr47rAxNQ6W` and `dep-dabe7j67bikc73824n20`.

## Known limits

- Ten institutions and four service links are not comprehensive national coverage.
- The Ministry of the Interior hierarchy is versioned to the OHCS 2023 report.
- Thirteen of fourteen official URLs returned 200 during the release link check; `moe.gov.gh` timed out and remains a visible operator review item.
- Admin verification/publishing, scheduled link review, app-level rate limiting, request IDs, structured access logs and alert routing remain stable gates.
- Render free-plan cold starts may occur.
- GhanaGov is independent, open source and non-governmental; no operation, endorsement, certification or authority is claimed.
