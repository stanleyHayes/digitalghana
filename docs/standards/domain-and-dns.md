# Domain and DNS standard

## Public naming

- Umbrella: `digitalghana.dev`
- Product: `{product}.digitalghana.dev`
- Product API before gateway: `api-{product}.digitalghana.dev`
- Additional product surface: `{surface}-{product}.digitalghana.dev`
- Unified gateway after its entry gate: `api.digitalghana.dev/{domain}/v1`

First-level hostnames keep ordinary `*.digitalghana.dev` wildcard coverage possible. Nested names such as `api.geo.digitalghana.dev` require explicit multi-level certificate handling and are not the default.

## Lifecycle states

- `planned`: reserved architecture only; DNS may not exist.
- `provisioning`: provider attachment or DNS work is in progress.
- `live`: DNS, TLS and required smoke checks have passed.
- `redirect`: retained compatibility hostname with tested target.
- `retired`: no longer served; retirement evidence and policy required.

## Required inventory fields

Every hostname record has a hostname, purpose, environment, state, canonical flag, provider and evidence. Unknown provider state is recorded as `null`, never guessed.

## Production verification

Before setting a hostname to `live`, verify:

1. authoritative DNS resolution;
2. valid TLS chain and hostname coverage;
3. canonical URL and redirect behavior;
4. HTTP status and application release identifier;
5. security headers and CDN/WAF behavior where required;
6. browser CORS and passkey origins where applicable;
7. health/readiness and rollback route;
8. inventory evidence with timestamp.

DNS changes require a rollback value and must not remove an existing working hostname before the replacement passes verification.
