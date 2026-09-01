# Neurodyne NOSI — future portfolio integration plan

**Status:** source-noted; planning only  
**Source date:** August 2026  
**Reviewed:** 2026-09-01  
**Inputs:** `Neurodyne_NOSI_Preparation_Early_Mover_Strategy.docx` and `Neurodyne_NOSI_Technical_Execution_Roadmap.docx`

## Decision

Treat the Neurodyne Open Standards Initiative (NOSI) as an adjacent open-standards programme, not as another Ghana directory application and not as a claim of government infrastructure.

Digital Ghana should continue to own independently deployable public-interest products such as GhanaGeo, GhanaCodes and GhanaGov. NOSI should own canonical cross-institution schemas, provenance, RFCs, SDK semantics, synthetic mocks and conformance tooling. Provider adapters or a hosted gateway may follow only when documentation, access, legal authority and operating responsibility are explicit.

No NOSI repository, hostname, adapter or production gateway is approved by this planning record. The source documents are retained and checksummed so a later approval can start from a traceable baseline.

## Why NOSI remains a separate programme

- Its subject matter includes identity, consent, accounts, transactions and payments: materially higher-trust domains than a public directory or reference dataset.
- It needs its own technical steering, RFC, security, privacy, regulatory and stakeholder-review processes.
- It is intended to remain country-neutral at the canonical core, with Ghana-specific packs and provider adapters at the edge.
- Neurodyne may eventually operate a commercial hosted layer; that must not become the only way to use the open standard or blur Digital Ghana's public-interest governance.

## Boundary with current Digital Ghana products

| Existing product | Relationship to NOSI | Boundary |
|---|---|---|
| GhanaGeo | Source-linked geography identifiers and datasets may be referenced by a Ghana country pack. | NOSI consumes published versions; it never reads the GeoGhana database or redefines canonical place IDs. |
| GhanaCodes | Namespace and crosswalk artefacts can support NOSI identifier profiles. | GhanaCodes remains owner of Ghana-specific code resolution; NOSI pins a released contract or dataset. |
| GhanaGov | Institution identifiers and official service links can inform public institutional metadata. | GhanaGov is not an authority for regulated provider capability, certification or access. |
| GhanaValidate | Narrow Ghana-specific syntax and normalization primitives can implement accepted NOSI profiles. | Validation must never be described as identity, account or regulatory verification. |
| GhanaData | Unified access to mature Digital Ghana public-data products. | It is not the NOSI gateway. GhanaData remains a public-data developer gateway; a future NOSI gateway handles consented/provider connectivity under separate security, legal and operational controls. |

## Proposed repository topology

Use a separate repository family and build only in dependency order:

1. `nosi-specs` — sources, provenance, RFCs, JSON Schema, OpenAPI, AsyncAPI, examples and compatibility tests.
2. `nosi-go` and `nosi-typescript` — alpha SDKs generated or implemented from accepted specifications and shared golden fixtures.
3. `nosi-cli`, `nosi-mock` and `nosi-docs` — local validation, synthetic development and developer documentation.
4. `nosi-conformance` — executable profiles and machine-readable reports, explicitly distinct from government approval or regulator certification.
5. `nosi-adapters` — only contract-backed/provider-authorised adapters, versioned independently.
6. Hosted NOSI gateway — optional and gated; never a prerequisite for using the open specifications.

Do not create `nosi-java`, `nosi-python`, adapters or a gateway until the Go/TypeScript/specification core has real implementation evidence.

## Domain and deployment plan

The public namespace requires a later ownership decision:

- If NOSI is governed as a Digital Ghana public-good programme, prefer `standards.digitalghana.dev` for documentation and `sandbox-standards.digitalghana.dev` for synthetic tooling.
- If NOSI remains a Neurodyne-led programme with a distinct commercial layer, use a Neurodyne-controlled domain and link it from Digital Ghana as an adjacent initiative.
- Do not place a regulated/provider gateway at `api.digitalghana.dev`; that hostname remains reserved for the deferred GhanaData public-data gateway.
- Any future NOSI API must have its own canonical hostname, credentials, threat model, provider isolation, audit boundary and incident ownership.

No DNS record should be reserved until governance, trademark/name ownership, GitHub ownership and public positioning are approved.

## Preparation plan

### Gate N0 — authority and positioning

- Verify every cited BoG, NITA, eGIF and national-strategy source directly and record draft/final status, publication date and rights decision.
- Obtain legal/privacy/security review for the intended scope and public language.
- Approve the independent/non-endorsed positioning and programme owner.
- Decide whether NOSI belongs under Digital Ghana governance or remains an adjacent Neurodyne programme.

**Exit:** source register, institutional map, responsibility model and written scope are approved; no implied endorsement remains.

### Gate N1 — governance foundation (weeks 1–2 after approval)

- Create only `nosi-specs` first, with Apache-compatible code licensing and source-material rights kept separate.
- Add `GOVERNANCE.md`, `SECURITY.md`, `CONTRIBUTING.md`, code of conduct, RFC template, CODEOWNERS, semantic-version/deprecation policy and branch/release protection.
- Establish `/sources`, `/rfcs`, `/schemas`, `/openapi`, `/asyncapi`, `/examples` and `/tests`.
- Add CI for schema validation, compatibility, security scanning, provenance completeness and release integrity.

**Exit:** clean clone passes CI; every normative item has authority, version, status, interpretation and reviewer fields.

### Gate N2 — specification alpha (weeks 2–6)

- Start with common primitives: provenance, identifier, timestamp, money/currency, address, contact point, status, pagination and errors.
- Draft Person/VerificationResult, Organisation, Consent, Account, Transaction and Payment through reviewed RFCs.
- Use synthetic Ghana-oriented valid and invalid fixtures only; prohibit real citizen/customer data and raw biometric templates.
- Publish `nosi-specs` v0.1 only when every object has schema, examples, validation, version metadata and review trail.

**Exit:** source-to-requirement-to-schema-to-test traceability is complete and compatibility checks pass.

### Gate N3 — SDK and local developer alpha (weeks 5–12)

- Build Go and TypeScript SDKs against the same fixtures; require semantic parity.
- Add runtime validation, structured errors, safe retry/idempotency behavior, webhook verification and observability hooks.
- Ship a synthetic mock, validator CLI and documentation quickstart; do not require live provider connectivity.

**Exit:** a developer can build and test locally with no government, bank or citizen data access.

### Gate N4 — conformance (months 3–4)

- Define narrow profiles such as Core Identity, Core Business and Open Finance Reference.
- Test semantics, errors, idempotency, pagination, timestamps, event signatures and replay controls.
- Publish machine-readable reports with language that distinguishes NOSI conformance from government approval or regulator certification.

**Exit:** independent implementations can be assessed consistently and false-certification language fails review/CI.

### Gate N5 — legitimate adapters and pilots (months 4–7)

- Accept an adapter only with a provider contract, permitted documentation or authorised sandbox.
- Declare provider/API version, capabilities, mappings, unsupported fields and conformance evidence.
- Keep provider workarounds at the edge and preserve raw provider reference codes for diagnosis.

**Exit:** at least one sandbox/contract-backed integration passes contract, security and conformance tests with named institutional feedback.

### Gate N6 — optional hosted gateway (months 5–8 or later)

Proceed only if SDK/adapters demonstrate demand and legal/operational review approves production connectivity. Require tenant isolation, consent receipts, least privilege, KMS/HSM where applicable, signed webhooks, tamper-evident audit, quotas, incident response, observability, data minimisation and proven rollback.

**Exit:** controlled pilot only; the open specification and local tooling remain independently usable.

## Immediate backlog after owner approval

1. Verify and checksum the authoritative source set cited by both documents.
2. Write the NOSI scope/terminology RFC and a source/provenance format RFC.
3. Decide programme governance, GitHub owner/package scope and domain ownership.
4. Create `nosi-specs` only after those decisions.
5. Build the source register and traceability matrix before canonical models.
6. Review privacy/security threat scenarios before publishing identity, consent or finance fixtures.
7. Draft core RFCs, schemas and negative tests.
8. Defer all provider adapters and production connectivity until legitimate access exists.

## Risks to keep visible

- The cited regulatory and policy signals are time-sensitive and must be reverified immediately before execution.
- Draft directives are not final requirements.
- Public specifications can still encode harmful or incorrect assumptions without domain and institutional review.
- Identity/finance examples can accidentally expose or normalize sensitive data; synthetic-only enforcement is mandatory.
- “Conformant,” “verified,” “certified,” “official” and “approved” require separate, precise meanings.
- A hosted gateway introduces regulated operations, security and commercial incentives that must not control the open standard.

## Planning status

This plan records future intent only. NOSI is not included in the live product registry, is not advertised on the public catalogue and has no reserved Digital Ghana subdomain. Promotion into the execution board requires owner approval of Gate N0 decisions and fresh verification of the authoritative sources.
