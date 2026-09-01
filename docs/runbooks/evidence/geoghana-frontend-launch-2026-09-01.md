# GeoGhana frontend launch evidence

Verified: 2026-09-01  
Owner: Digital Ghana portfolio

## Release

- GeoGhana PR: <https://github.com/stanleyHayes/geoghana/pull/1>
- Merge commit: `324916ee6e5221a183095348962ff6c7c2e29d98`
- Detailed product evidence: <https://github.com/stanleyHayes/geoghana/blob/main/docs/runbooks/evidence/digitalghana-launch-reconciliation-2026-09-01.md>

## Live frontend boundary

| Surface | Canonical hostname | Provider | Verification |
|---|---|---|---|
| Marketing and documentation | `geo.digitalghana.dev` | Vercel | Valid wildcard TLS; `/` and `/docs` returned HTTP 200 |
| API sandbox | `sandbox-geo.digitalghana.dev` | Vercel | Valid wildcard TLS; `/` returned HTTP 200 |
| Developer console | `console-geo.digitalghana.dev` | Vercel | Valid wildcard TLS; `/` returned HTTP 200 |
| Administration | `admin-geo.digitalghana.dev` | Vercel | Valid wildcard TLS; `/login` returned HTTP 200 |

The certificates were issued for `*.digitalghana.dev` by Let's Encrypt and were valid at verification time.

## Explicit boundary

`api-geo.digitalghana.dev` is not marked live. The fail-closed production preflight still requires 14 API and worker provider values for search, email, trusted proxies, telemetry, security alerting, and error reporting. Consequently, sandbox live requests, console authentication/data, and administrative operations are not claimed as operational.

The GeoGhana repository's pre-existing full CI matrix remains red on `main`; this launch evidence is based on the independently verified workspace typechecks, tests, builds, link audit, deployment records, TLS, and HTTP checks documented in the product repository.
