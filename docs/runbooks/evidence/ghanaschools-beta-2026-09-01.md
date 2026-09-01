# GhanaSchools public beta evidence — 2026-09-01

## Release identity

- Repository: `https://github.com/stanleyHayes/ghanaschools`
- Application commit: `dbddac97f1975753ab3e412a89bb71c5359d572c`; evidence ledger commit: `1ca23b4`
- Dataset: `2026.09.01-beta.1`, reviewed 2026-09-01
- GhanaGeo dataset: `2026.08.3-ulid`, pinned to commit `324916ee6e5221a183095348962ff6c7c2e29d98`
- GitHub Actions Quality run: `33523973473`, success

## Provider inventory

- Web: Vercel project `hayfordstanleys-projects/ghanaschools`; deployment `dpl_GqChhh8NFDVoC9d7LMBTGaXCnC7e`
- Canonical web: `https://schools.digitalghana.dev`
- API: Render service `srv-dabelrss728c73ag0o4g`; restore deploy `dep-dabep749v7es73cvajug`
- Render custom domain `cdm-dabem4n10e5c73aohb80`, verified
- Canonical API: `https://api-schools.digitalghana.dev`

## Verification

- Sixteen public-university records have unique stable IDs and field-level GTEC/GhanaGeo provenance.
- Invariants prove aliases, duplicate-name preservation, pinned Geo resolution and absence of sensitive/inferred fields.
- REST and constrained GraphQL returned the same KNUST record/version; Central filter returned UCC and UEW; UniMAC historical aliases resolve.
- Production Chrome proved alias search and the custom eleven-option region picker; Greater Accra returned five records.
- Outfit, Geist Mono and Newsreader match the portfolio standard; no prohibited native control or horizontal overflow was observed.
- Canonical, Open Graph, Twitter and JSON-LD metadata are present; favicon/manifest/robots/sitemap return 200; the Open Graph PNG is 1200×630.

## Rollback evidence

- Vercel rolled back to `dpl_5eJsBrcS6AvvTSSzgrp3Lv5Nk3bL`, canonical smoke passed, then restored `dpl_GqChhh8NFDVoC9d7LMBTGaXCnC7e`, canonical smoke passed.
- Render rolled back to `dep-dabelsks728c73ag0q4g`, producing `dep-dabeoth42hec73aos9hg`; canonical health passed.
- Render restored the intended line, producing `dep-dabep749v7es73cvajug`; canonical health passed.

## Known limits

- This is not a comprehensive Ghana school directory or permanent accreditation guarantee.
- GCTU/GIMPA use the broader Accra place reference with visible notes; exact locality references remain review items.
- No programmes, coordinates, contacts, fees, rankings, admissions or student data is published.
- Broader source classes, nearby search, gRPC, hooks and privileged correction workflows remain stable gates.
