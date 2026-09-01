# Digital Ghana — Portfolio Architecture and Execution Ledger

**Project key:** `DG`
**Version:** 0.1 (decision draft)
**Last updated:** 2026-09-01
**Status:** Architecture approved by the owner on 2026-09-01. Portfolio implementation is in progress; no product repository has been moved and live hostname status remains evidence-gated.
**Portfolio source:** `Ghana_Digital_Public_Infrastructure_Project_Portfolio.docx`
**Existing product source:** `../geoghana/agent_plan.md`, `../geoghana/AGENTS.md`, and the current GeoGhana repository/deployment configuration

> This is the portfolio-level source of truth. Product repositories keep their own detailed execution plans. This file governs boundaries, naming, shared standards, dependency order, DNS, deployment ownership, and cross-product integration.

---

## 1. Executive decision

Use a **federated polyrepo portfolio**, not one giant application and not one shared subdomain.

1. Keep `geoghana` as its own Git repository and deployment unit. Do not copy it into this directory and do not nest its `.git` directory inside another repository.
2. Make this `digitalghana` directory the portfolio/control-plane repository for the umbrella website, shared governance, architecture decisions, templates, portfolio documentation, DNS inventory, and cross-product release ledger.
3. Give every public product a stable first-level subdomain of `digitalghana.dev` and deploy it independently.
4. Start each new domain product as its own repository. Reuse standards and published packages/contracts, not source folders copied between repositories.
5. Build a unified `api.digitalghana.dev` gateway and shared developer account only after three or four products are stable. Until then, avoid coupling product availability and release cadence to a central gateway.

### Why this is the recommended shape

- GeoGhana is already a mature monorepo containing four Next.js applications, Go API and worker services, contracts, SDKs, data tooling, infrastructure, and its own lane-based `agent_plan.md`.
- Moving that repository into another Git repository introduces nested-repository/submodule ambiguity, breaks existing paths and automation, and creates a large migration with no user benefit.
- Putting unrelated products on one subdomain makes deploys, cookies, routing, outages, observability, rollbacks, and ownership unnecessarily coupled.
- The portfolio document says each product should ship independently and places the unified GhanaData platform last, after several domains are stable.
- A common domain and design language can be achieved through DNS conventions, shared packages, templates, and governance without forcing one codebase.

---

## 2. Product and repository map

| Product | Repository | Public site | Initial API | Status / order |
|---|---|---|---|---|
| Digital Ghana umbrella | `digitalghana` | `digitalghana.dev` | None initially | Portfolio control plane; build first |
| GhanaGeo | `geoghana` | `geo.digitalghana.dev` | `api-geo.digitalghana.dev` | Existing product; complete launch gates before expansion |
| GhanaCalendar | `ghanacalendar` | `calendar.digitalghana.dev` | `api-calendar.digitalghana.dev` | First new product |
| GhanaCodes | `ghanacodes` | `codes.digitalghana.dev` | `api-codes.digitalghana.dev` | Second new product |
| GhanaGov Registry | `ghanagov` | `gov.digitalghana.dev` | `api-gov.digitalghana.dev` | Third new product |
| GhanaValidate | `ghanavalidate` | `validate.digitalghana.dev` | Package first; API later | Fourth new product |
| GhanaSchools | `ghanaschools` | `schools.digitalghana.dev` | `api-schools.digitalghana.dev` | Fifth new product |
| GhanaDataset Registry | `ghanadatasets` | `datasets.digitalghana.dev` | `api-datasets.digitalghana.dev` | Sixth new product |
| GhanaEssential | `ghanaessential` | `essential.digitalghana.dev` | `api-essential.digitalghana.dev` | Seventh; requires mature verification operations |
| GhanaData gateway | `ghanadata` (later) | `developers.digitalghana.dev` | `api.digitalghana.dev` | Last; only after 3–4 stable products |

### DNS naming rule

Use first-level hostnames such as `api-geo.digitalghana.dev`, not `api.geo.digitalghana.dev`, unless the DNS/CDN certificate plan explicitly supports multi-level wildcard certificates. A normal `*.digitalghana.dev` wildcard does not cover `api.geo.digitalghana.dev`.

### GeoGhana surface map

GeoGhana remains one product but has independently deployed surfaces:

| Surface | Recommended hostname |
|---|---|
| Marketing/docs | `geo.digitalghana.dev` |
| Public sandbox | `sandbox-geo.digitalghana.dev` |
| Developer console | `console-geo.digitalghana.dev` |
| Admin | `admin-geo.digitalghana.dev` |
| API | `api-geo.digitalghana.dev` |

The currently configured nested names (`sandbox.geo`, `console.geo`, and `admin.geo`) may remain temporarily if already provisioned. Migration must use dual-domain support and redirects; it must not be a flag-day rename.

---

## 3. What belongs in this repository

```text
digitalghana/
├── README.md                         # portfolio landing and contributor entry point
├── agent_plan.md                     # this cross-product execution ledger
├── AGENTS.md                         # portfolio-level ownership and coordination
├── docs/
│   ├── adr/                          # cross-product architecture decisions
│   ├── governance/                   # licences, provenance and release policy
│   ├── standards/                    # API, identifiers, security, accessibility
│   └── portfolio/                    # source portfolio and derived summaries
├── apps/
│   └── web/                          # digitalghana.dev umbrella/catalogue only
├── packages/                         # add only after proven reuse by 2+ products
│   ├── brand/                        # tokens/assets, not full product UI ownership
│   ├── config/                       # lint/TypeScript/test presets
│   └── contracts/                    # cross-product identifiers/envelopes only
├── infra/
│   ├── dns/                          # declarative hostname inventory/config
│   └── monitoring/                   # portfolio status links, not product internals
└── templates/
    └── product/                      # versioned starter for new repositories
```

Do **not** place the following here:

- a copied `geoghana/` working tree;
- every product's backend and database migrations;
- one shared database for all domains;
- unversioned internal imports across repositories;
- a gateway that must be deployed before an individual product works.

---

## 4. Repository and dependency rules

### Product autonomy

Each product owns its application code, data model, migrations, contracts, source/licence register, releases, infrastructure, secrets, monitoring, and product-level `agent_plan.md`.

### Cross-product identifiers

- GhanaGeo owns canonical geography IDs.
- GhanaCodes owns namespace crosswalks and legacy/external identifier mappings.
- Domain products store stable references such as `ghanageo_place_id`; they do not read GeoGhana's database.
- Cross-product use happens through a versioned API, published SDK/package, or pinned dataset artifact.
- A product must remain usable when another product is temporarily unavailable; cache or pin reference datasets where correctness permits.

### Shared code admission rule

A component becomes a shared package only when:

1. at least two products have implemented the same stable need;
2. the public API and ownership are clear;
3. independent versioning and migration notes exist; and
4. consuming products can upgrade deliberately rather than tracking source `main`.

This avoids designing a premature platform from one product's assumptions.

### Data isolation

Use one database/cluster boundary per product in production. Infrastructure providers may be shared for cost reasons, but credentials, database names, backup policies, and least-privilege roles remain product-specific. No cross-product database joins.

---

## 5. Hosting model

### Recommended providers

- **Cloudflare:** authoritative DNS, TLS edge, WAF/CDN, redirects, and rate-limiting policy.
- **Vercel:** public Next.js sites, docs, sandbox, console, and admin surfaces where appropriate.
- **Render:** Go APIs, workers, scheduled jobs, and product-specific Redis/Key Value services.
- **Managed database:** product-specific managed database chosen from the actual domain needs. Preserve GeoGhana's current MongoDB architecture; do not rewrite it merely to match the portfolio's generic PostgreSQL suggestion.

Provider choice is an implementation detail behind a stable hostname. DNS must not expose provider-generated URLs as canonical public interfaces.

### Independent deployment rule

Every product must have:

- its own CI checks and deployment pipeline;
- preview/staging and production environments;
- isolated secrets and least-privilege service accounts;
- a health/readiness endpoint and release identifier;
- independent rollback;
- an availability status link;
- explicit DNS ownership recorded in this repository.

### One subdomain versus many

Do not host all products at `geo.digitalghana.dev`. `geo` names a geography product, not the whole portfolio. The umbrella belongs at `digitalghana.dev`; sibling products receive sibling subdomains.

---

## 6. Shared product contract

All products adopt these conventions while retaining domain autonomy:

- stable, opaque identifiers and explicit redirects/tombstones for merged records;
- provenance and licence attached to canonical data releases;
- separate dataset and API semantic versions;
- REST and GraphQL where the product specification requires both; gRPC only where real service-to-service value exists;
- OpenAPI/GraphQL/protobuf contract tests in CI;
- TypeScript SDK and React hooks with consistent loading/error/data semantics;
- API keys stored hashed, scoped access, quotas, redacted logs, request IDs, admin MFA, RBAC, and immutable privileged audit events;
- accessibility, mobile responsiveness, reduced-motion handling, Ghanaian orthography, and source transparency;
- no canonical publication from an unattended scrape; automation creates reviewable drafts;
- no restricted data copied merely to increase coverage.

The portfolio's generic stack is a default for new products, not a mandate to rewrite a working product. Deviations require a short ADR explaining the operational benefit.

---

## 7. GeoGhana reconciliation

The existing GeoGhana plan is detailed and remains authoritative inside that repository. Portfolio work must not replace or duplicate its lane board.

### Verified current facts

- `../geoghana` is a clean `main` branch tracking `origin/main`.
- It is an independent Git repository with remote `stanleyHayes/geoghana`.
- It already contains marketing, sandbox, developer portal, admin, API, worker, SDKs, contracts, infrastructure and a shared UI package.
- Its Render blueprint provisions API, worker and managed Redis and already references `digitalghana.dev` hostnames.
- Local implementation is broadly complete, but public launch still has external gates including provider credentials/ownership, production alerting, Atlas backup/PITR tier, registry publication and connected donation rails.
- The opening summary in `../geoghana/agent_plan.md` is stale where it says contracts are the next critical path; the later live board and evidence show those implementations are complete. A dedicated reconciliation edit is needed inside GeoGhana.

### Required GeoGhana actions before calling it launched

1. Reconcile the top-level status and task board against current evidence.
2. Decide whether to retain nested surface hostnames or adopt the first-level portfolio convention.
3. Verify actual DNS/provider attachments for every production hostname.
4. Run the real production preflight with provider values, not blueprint-only validation.
5. Close or explicitly waive every external launch gate with owner/date/evidence.
6. Run public smoke, CORS/passkey, backup/restore, alert delivery and rollback checks.
7. Record the deployed release and links in this portfolio ledger.

---

## 8. Delivery roadmap

### Phase 0 — Decision and inventory

**Outcome:** Owner approves the repository/domain/deployment architecture before any move or DNS change.

- [x] Read the portfolio document and enumerate products/dependencies.
- [x] Inspect GeoGhana repository structure, remote, plan and deployment blueprint.
- [x] Recommend federated polyrepo architecture and sibling subdomains.
- [x] Owner approved the decision and full subdomain implementation on 2026-09-01.
- [x] Record proposed ADR-0001: portfolio repository and deployment boundaries.
- [x] Inventory public DNS/TLS state and record evidence; Vercel DNS is authoritative and wildcard resolution exists, but inspected HTTPS surfaces do not complete TLS.
- [x] Inventory authenticated Vercel team/domain, Render workspace and GitHub account/organization candidates.
- [ ] Choose GitHub repository owner and package scope; directly reconcile Vercel domain-to-project attachment.

**Anti-pattern guards:** no repository move; no DNS mutation; no secret copying; no provider assumptions before inventory.

**Verification:** ADR approved; hostname table has owner/provider/environment/status for every record.

### Phase 1 — Portfolio foundation

**Outcome:** `digitalghana` becomes a documented, version-controlled control plane.

- [x] Initialize a local Git repository on `main` without touching GeoGhana.
- [x] Create public `stanleyHayes/digitalghana`, attach `origin`, push `main`, and verify `0 behind / 0 ahead`.
- [x] Add `README.md`, `AGENTS.md`, governance, contribution, security and code-of-conduct files.
- [x] Preserve the source DOCX files in place and record checksums/roles under `docs/portfolio/`.
- [x] Add ADR, governance and standards directories. Product template remains a later phase.
- [x] Add a machine-readable product/hostname catalogue and schemas.
- [x] Add dependency-free validation for inventory invariants, source integrity, internal Markdown links, nested repositories and high-confidence secret patterns.
- [x] Add CI and negative tests proving critical policy violations fail.

**Verification:** clean clone passes CI; catalogue schema validates; ownership and contribution paths are documented.

### Phase 2 — GeoGhana adoption and launch completion

**Outcome:** existing product is reachable through approved `digitalghana.dev` hostnames with verified production operations.

- [ ] Reconcile `../geoghana/agent_plan.md` status against actual code/evidence.
- [ ] Attach and validate public/application/API hostnames.
- [ ] Update CORS, passkey origins, canonical URLs, redirects, CSP and environment configuration together.
- [ ] Complete external provider gates or record explicit owner-approved deferrals.
- [ ] Run production preflight and end-to-end smoke evidence.
- [ ] Add GeoGhana to the umbrella product catalogue and status surface.

**Verification:** DNS resolution, TLS, HTTP status, canonical/redirect behavior, CORS preflight, passkey RP/origins, API readiness, worker health, alert delivery, restore evidence and rollback evidence all pass.

### Phase 3 — Umbrella website

**Outcome:** `digitalghana.dev` explains the initiative and routes users to independently deployed products.

- [x] Build product catalogue, mission, roadmap, governance, contribution, source/licence policy, status and sponsor/donation information.
- [x] Display honest lifecycle badges: proposed, building, beta, stable, externally blocked.
- [x] Link each live product surface and portfolio policy source without creating false availability links.
- [x] Avoid presenting planned products as already operational.

**Verification:** accessibility, responsive UI, metadata, sitemap, link checks and product-state accuracy pass.

### Phase 4 — Reusable product starter

**Outcome:** new products begin consistently without copying GeoGhana wholesale.

- [x] Distill proven repository conventions from GeoGhana into a small template.
- [x] Include CI, contract admission/testing guidance, provenance/licence register, security baseline, deployment skeleton, observability/operations gate, ADRs, agent ledger and release evidence structure.
- [x] Keep domain schema/business logic out of the template.
- [x] Test by generating a temporary repository and running its checks.

**Verification:** generated repository builds/tests from a clean checkout and contains no GeoGhana-specific names, secrets, ports or data.

### Phase 5 — GhanaCalendar beta

**Outcome:** first new product validates the portfolio model.

- [x] Create independent `ghanacalendar` repository from the approved starter.
- [x] Complete source/licence review and rules specification before ingestion.
- [x] Implement fixed/calculated holidays, announced overrides, Africa/Accra working-day engine and 2024–2026 evidence-backed seed.
- [ ] Implement REST/GraphQL, SDK/hooks, admin review/publish flow, docs and sandbox. REST, constrained GraphQL, source TypeScript client, docs and sandbox are done; hooks, admin workflow and package publication remain stable gates.
- [x] Deploy beta at `calendar.digitalghana.dev` and `api-calendar.digitalghana.dev`.

**Verification:** official fixtures, substitution/history determinism, cross-protocol parity, source evidence, security/load checks, release rollback and production smoke pass.

### Phase 6 — Interoperability products

**Outcome:** build GhanaCodes, then GhanaGov, GhanaValidate and GhanaSchools using stable Geo/Calendar conventions.

- [x] GhanaCodes: GSS 2021 region/MMDA namespace and ambiguity-safe resolution public beta; broader historical/external namespaces remain stable gates.
- [x] GhanaGov: verified-subset public beta with source-linked institution hierarchy/service catalogue, independent web/API deployments, custom-control/browser QA, SEO evidence and rollback drills.
- [ ] GhanaValidate: package-first primitives, never false claims of authoritative identity verification.
- [ ] GhanaSchools: source/licence-approved registry linked through GhanaGeo IDs and GhanaCodes namespaces.
- [ ] Audit shipped product interfaces against `docs/standards/interface-design.md`; GhanaGov and the umbrella are aligned, while Calendar/Codes require recorded migration checks.

**Verification:** each product independently meets the global definition of done and failure of one does not make another unavailable.

### Phase 7 — Catalogue and safety-critical products

**Outcome:** build GhanaDataset Registry, then GhanaEssential after verification operations are proven.

- [ ] Dataset Registry indexes metadata/access paths without copying restricted datasets.
- [ ] Essential publishes only verified contact/location records, exposes freshness and supports resilient offline export.

**Verification:** licence uncertainty is explicit; dead links/schema changes alert; stale/unverified essential contacts cannot appear verified.

### Phase 8 — GhanaData unification

**Entry gate:** at least three stable products, two real shared-auth consumers, measured cross-product traffic, and approved operating budget.

**Outcome:** unified developer portal, account/key model, SDK and gateway without erasing domain ownership.

- [ ] Define gateway ADR and failure-isolation model.
- [ ] Add `api.digitalghana.dev/{domain}/v1` routes as stable proxies/composition.
- [ ] Preserve direct product APIs during migration and publish deprecation windows if they ever change.
- [ ] Centralize identity/entitlements only after threat model, migration and rollback plans are approved.

**Verification:** domain outage isolation, scoped keys, protocol parity, usage accounting, backward compatibility and rollback pass.

### Phase 9 — Neurodyne NOSI evaluation (future, approval-gated)

**Outcome:** evaluate NOSI as a separate open-standards and conformance programme without conflating it with Digital Ghana products, GhanaData, government authority or regulated production connectivity.

- [x] Retain and checksum the two August 2026 NOSI strategy/roadmap documents.
- [x] Record the architecture boundary, overlap decisions, staged gates and immediate backlog in `docs/portfolio/neurodyne-nosi-integration-plan.md`.
- [ ] Reverify every time-sensitive BoG, NITA, eGIF and national-strategy source immediately before execution.
- [ ] Decide programme governance, GitHub/package owner, branding and whether any Digital Ghana subdomain is appropriate.
- [ ] Obtain legal/privacy/security review before creating identity, consent, account, transaction, payment or provider-connectivity artifacts.
- [ ] Approve Gate N0 before creating `nosi-specs` or advertising NOSI publicly.

**Boundary:** NOSI is not yet a live registry product. GhanaData remains the deferred public-data gateway; an optional NOSI gateway would be separately governed and must never become the only way to use the open specifications.

**Verification:** source status and rights decisions are current; owner has approved governance and positioning; no implied government/regulator endorsement; no DNS/repository/product claim exists before approval.

---

## 9. Live task board

| ID | Work item | Status | Owner | Depends on | Evidence / blocker |
|---|---|---|---|---|---|
| DG-0.1 | Portfolio/document audit | Done | Codex | — | Eight proposed products plus later GhanaData platform identified from portfolio source |
| DG-0.2 | GeoGhana architecture/plan audit | Done | Codex | — | Independent clean repo, mature monorepo and deployment blueprint verified locally |
| DG-0.3 | Portfolio architecture recommendation | Done | Owner | DG-0.1, DG-0.2 | ADR-0001 accepted on 2026-09-01; full implementation authorized |
| DG-0.4 | Provider/DNS/GitHub inventory | In progress | Codex / Owner | DG-0.3 | Public and authenticated evidence recorded; GitHub owner/package scope and Vercel project attachment remain |
| DG-1.1 | ADR-0001 and repository foundation | Done | Codex | DG-0.3 | Public repo `stanleyHayes/digitalghana`; commits `9ff1bb0`, `0ee2777`, `3f40605`; clean-clone validation passes |
| DG-2.1 | GeoGhana plan reconciliation | Done | Codex | DG-0.3 | Merged through `stanleyHayes/geoghana#1`; merge `324916e` |
| DG-2.2 | GeoGhana domain migration/attachment | Done | Codex | DG-0.4, DG-2.1 | Four canonical frontend hosts attached to Vercel with valid TLS and HTTP 200 |
| DG-2.3 | GeoGhana production launch verification | In progress — API blocked | Codex | DG-2.2 | Frontend boundary verified; API/worker fail closed on 14 missing provider values |
| DG-3.1 | Umbrella website | Done | Codex | DG-1.1 | Registry-driven site live at `digitalghana.dev`; deployment `dpl_EJeL8KMjuaY4wRMazDagu5PDRaHW`; HTTP 200 and TLS verified |
| DG-4.1 | Product repository starter | Done | Codex | DG-1.1, DG-2.1 | `scripts/test_generate_product.rb` proves clean generation, required controls, token replacement, no Geo-specific leakage and no embedded secret signatures |
| DG-5.1 | GhanaCalendar beta | Done — stable gates remain | Codex | DG-4.1 | Public repo and product ledger; web/API live; source, fixture, CI, TLS and smoke evidence recorded |
| DG-6.1 | GhanaGov verified-subset beta | Done — stable gates remain | Codex | DG-5.1 | Web/API live; CI `33520923452`; Vercel `dpl_57L7Rrvn9naggsxmkSr47rAxNQ6W`; Render `dep-dabe7j67bikc73824n20`; canonical contract, browser, SEO and rollback evidence recorded |
| DG-9.1 | Neurodyne NOSI source review and future integration plan | Done — execution not approved | Codex | DG-0.1 | Two source DOCX files checksummed; boundary/gates/backlog recorded in `docs/portfolio/neurodyne-nosi-integration-plan.md`; visual DOCX render unavailable because LibreOffice is not installed |
| DG-6.UI | Portfolio typography and custom-control standard | In progress | Codex | DG-3.1 | GeoGhana reference adopted; umbrella and GhanaGov aligned; Calendar/Codes audit and migration remain |

### Status rules

- `Done` requires linked evidence, not an implementation claim.
- `Blocked` names the missing decision, credential, provider state or dependency.
- Only one owner claims a task/path at a time.
- Product-level implementation is tracked in that product's own `agent_plan.md`; this board records milestones and integration evidence.

---

## 10. Decisions requiring owner approval

1. Approve federated polyrepo architecture and keeping GeoGhana in its current repository.
2. Approve the sibling hostname convention, including first-level operational names such as `api-geo` rather than nested `api.geo`.
3. Confirm the GitHub ownership model: a `digitalghana` organization is recommended if available; otherwise use the current owner temporarily with a documented transfer plan.
4. Confirm Cloudflare is or will become authoritative DNS for `digitalghana.dev`.
5. Confirm whether existing GeoGhana nested hostnames are already live; if so, retain them during a staged migration.
6. Confirm whether the portfolio is free-forever across all products or whether GeoGhana's free-forever decision is product-specific. No billing architecture should be built until this is explicit.

---

## 11. Global portfolio definition of done

A product is not `Stable` until:

- requirements, ADRs, threat model and source/licence register are committed;
- repeatable migrations/imports, provenance, checksums, versioning, changelog and rollback exist;
- specified contracts and generated clients pass semantic parity tests;
- public site, documentation, sandbox, developer workflow and admin publication workflow are complete where required;
- unit, integration, contract, security, accessibility and proportional load tests pass;
- telemetry, alerts, backups, restore drill, incident runbook and rollback evidence exist;
- production DNS/TLS/canonical URLs/CORS/security headers are verified;
- no restricted or unverified source has been promoted to canonical;
- portfolio catalogue/status accurately reflects the deployed release and known limitations.

---

## 12. Immediate next action after approval

Perform a read-only authenticated inventory of Cloudflare/DNS, Vercel, Render and GitHub; finalize ADR-0001 and the hostname catalogue; then reconcile GeoGhana's stale top-level plan status before changing any domain or repository structure.
