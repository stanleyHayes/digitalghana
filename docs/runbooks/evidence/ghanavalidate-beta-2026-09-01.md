# GhanaValidate public beta evidence — 2026-09-01

## Release identity

- Repository: `https://github.com/stanleyHayes/ghanavalidate`
- Application commit: `faeceec`; evidence ledger commit: `5535d5b`
- Package/rule version: `0.1.0-beta.1` / `1.0.0`
- GitHub Actions Quality run: `33522410941`, success
- Lifecycle: package-first public beta; npm publication and network API remain gated

## Provider inventory

- Web: Vercel project `hayfordstanleys-projects/ghanavalidate` (`prj_mECroTMLS8lUu52NuwtRF3zAP9rk`)
- Final deployment: `dpl_CJ3BZZWwhWq2CSDqZs9DsFrmmAWA`
- Canonical web: `https://validate.digitalghana.dev`
- Deployment protection: disabled for the public project

## Verification

- Governance validation, strict typecheck, five contract tests, package build and Next.js production build passed.
- Canonical web, robots, sitemap, SVG favicon, web manifest and Open Graph image returned 200 with valid TLS and expected content types.
- Canonical, Open Graph, Twitter and JSON-LD metadata are present; the Open Graph PNG is 1200×630.
- Production Chrome normalized a GhanaPostGPS-shaped input and displayed the syntax-only/non-ownership warning.
- Outfit, Geist Mono and Newsreader match the portfolio standard; no prohibited native control renders and no horizontal overflow was observed.

## Rollback evidence

- Rolled back from `dpl_CJ3BZZWwhWq2CSDqZs9DsFrmmAWA` to `dpl_APKJ613XQzzFYUSQyzTt5BhT4HC6`; canonical smoke passed.
- Restored the canonical alias to `dpl_CJ3BZZWwhWq2CSDqZs9DsFrmmAWA`; canonical smoke passed.

## Known limits

- Validation never proves identity, ownership, reachability, allocation, authenticity or existence.
- Phone rules intentionally avoid changing network-prefix allocation tables.
- GhanaPostGPS handling is syntax-only and does not resolve addresses.
- Reference adapters require caller-supplied, versioned datasets; no Geo/Codes/Gov or restricted dataset is bundled.
- npm publication, React hooks, batch API and administrative rule tooling remain stable gates.
