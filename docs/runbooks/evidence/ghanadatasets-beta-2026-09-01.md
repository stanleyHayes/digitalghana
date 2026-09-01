# GhanaDataset Registry public beta evidence — 2026-09-01

## Release identity

- Repository: `https://github.com/stanleyHayes/ghanadatasets`
- Application commit: `dfc3e6d43932a51a94aa2af1e3cd20ef7908c94c`; evidence ledger commit: `83cfcc7`
- Dataset: `2026.09.01-beta.1`, reviewed 2026-09-01
- GitHub Actions Quality run: `33525713204`, success

## Provider inventory

- Web: Vercel project `hayfordstanleys-projects/ghanadatasets`; restored deployment `dpl_7DNotCeQfjj422UESt9TL5ecUVHi`
- Canonical web: `https://datasets.digitalghana.dev`
- API: Render service `srv-dabetjcs728c739m9ti0`; restore deploy `dep-dabeveu10ojc73a4cjj0`
- Render custom domain `cdm-dabetl710e5c73ad1sag`, verified; Vercel DNS record `rec_f32e22172d0ecb73726cd341`
- Canonical API: `https://api-datasets.digitalghana.dev`

## Verification

- Ten unique metadata-only records expose publisher, topic, provenance, licence/access conditions, checked date and official HTTPS distributions.
- Nine GSS access paths passed source preflight; the timed-out Ghana Open Data agriculture path remains visibly marked `REVIEW` rather than being hidden or claimed healthy.
- REST search, constrained GraphQL, canonical-origin CORS and denied untrusted-origin CORS passed against production.
- Production Chrome proved `trade` search, the custom Radix topic picker and a three-record Population result.
- Outfit, Geist Mono and Newsreader match the portfolio standard; no prohibited native control or horizontal overflow was observed.
- Canonical, Open Graph, Twitter and JSON-LD metadata are present; favicon/manifest/robots/sitemap return 200; the Open Graph PNG is 1200×630.

## Rollback evidence

- Vercel rolled back from `dpl_7DNotCeQfjj422UESt9TL5ecUVHi` to `dpl_GxF4GojVWoBo7RXb4kSqLvCWGN7k`, canonical smoke passed, then restored `dpl_7DNotCeQfjj422UESt9TL5ecUVHi`.
- Render rolled back to `dep-dabetk4s728c739m9vdg`, producing `dep-dabev75cqm1c73dcofpg`; canonical health passed. It restored the intended line as `dep-dabeveu10ojc73a4cjj0`; canonical health passed.

## Known limits

- The beta is a discovery catalogue, not a data warehouse, availability guarantee or blanket licence grant.
- The registry does not copy tables or microdata and does not bypass source-specific access conditions.
- Broader publisher coverage, automated source-health alerts, admin review, hooks and package publication remain stable gates.
