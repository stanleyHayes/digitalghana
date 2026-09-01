# Public DNS and TLS inventory — 2026-09-01

**Scope:** Read-only public inspection. No registrar, DNS, Vercel or application configuration was changed.

## Result

- `digitalghana.dev` delegates to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- The apex, planned first-level product names and current nested GeoGhana names all return Vercel anycast A records.
- A deliberately nonexistent probe, `portfolio-dns-probe-20260901.digitalghana.dev`, also returned Vercel A records. This proves wildcard DNS behavior; it does **not** prove that any named product is attached to a Vercel project.
- HTTPS handshakes for `digitalghana.dev`, `geo.digitalghana.dev` and `sandbox.geo.digitalghana.dev` terminated before presenting a certificate.
- HTTP probes for the apex and all inspected GeoGhana hostnames returned no application response (`000`) because TLS negotiation failed.

## Classification

All inspected surfaces remain `planned`, not `live`. Public DNS resolution alone is insufficient deployment evidence. The authoritative DNS provider can be recorded as Vercel DNS, while the application provider/project attachment remains unknown until authenticated inventory is available.

## Commands

```sh
dig +short NS digitalghana.dev
dig +short SOA digitalghana.dev
dig +noall +answer digitalghana.dev A
dig +noall +answer geo.digitalghana.dev A
dig +noall +answer portfolio-dns-probe-20260901.digitalghana.dev A
curl -sSIL --connect-timeout 5 --max-time 12 https://digitalghana.dev
curl -sSIL --connect-timeout 5 --max-time 12 https://geo.digitalghana.dev
openssl s_client -connect digitalghana.dev:443 -servername digitalghana.dev -brief </dev/null
openssl s_client -connect geo.digitalghana.dev:443 -servername geo.digitalghana.dev -brief </dev/null
```

## Evidence summary

```text
NS: ns1.vercel-dns.com, ns2.vercel-dns.com
SOA: ns1.vercel-dns.com / hostmaster.nsone.net
Wildcard probe: resolved to Vercel anycast addresses with TTL 1800
TLS: unexpected EOF before certificate for each representative hostname
HTTP: no response because TLS negotiation failed
```

## Next verification

Use authenticated Vercel project/domain inventory to determine which wildcard/domain attachment owns the zone, then attach one hostname at a time and repeat DNS, TLS, canonical URL, application release and rollback checks before changing its state to `live`.
