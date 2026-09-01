# Digital Ghana

Digital Ghana is an open-source portfolio of small, composable public-interest infrastructure for Ghana. Each product ships independently while sharing standards for identifiers, provenance, security, developer experience and responsible data publication.

## Portfolio

| Product | Purpose | Lifecycle | Public home |
|---|---|---|---|
| GhanaGeo | Canonical geography, search, boundaries and developer interfaces | Launch preparation | [geo.digitalghana.dev](https://geo.digitalghana.dev) |
| GhanaCalendar | Ghana business-calendar and working-day rules | Proposed | [calendar.digitalghana.dev](https://calendar.digitalghana.dev) |
| GhanaCodes | Identifier namespaces and interoperability crosswalks | Proposed | [codes.digitalghana.dev](https://codes.digitalghana.dev) |
| GhanaGov Registry | Public-institution and government-service directory | Proposed | [gov.digitalghana.dev](https://gov.digitalghana.dev) |
| GhanaValidate | Ghana-specific validation and normalization primitives | Proposed | [validate.digitalghana.dev](https://validate.digitalghana.dev) |
| GhanaSchools | Canonical education-institution registry | Proposed | [schools.digitalghana.dev](https://schools.digitalghana.dev) |
| GhanaDataset Registry | Public-dataset catalogue and access-path registry | Proposed | [datasets.digitalghana.dev](https://datasets.digitalghana.dev) |
| GhanaEssential | Verified emergency and essential-service discovery | Proposed | [essential.digitalghana.dev](https://essential.digitalghana.dev) |
| GhanaData | Unified gateway and developer experience | Deferred | [developers.digitalghana.dev](https://developers.digitalghana.dev) |

Lifecycle labels describe the repository record, not a promise that the hostname is already live. Machine-readable state is in [`portfolio/products.json`](portfolio/products.json).

## Architecture

Digital Ghana uses a federated portfolio:

- this repository owns portfolio governance, standards, the umbrella website and cross-product inventory;
- each product owns its repository, data, deployments, secrets, contracts, releases and product execution ledger;
- products integrate through versioned APIs, SDKs or pinned dataset artifacts—not shared databases;
- `digitalghana.dev` is the umbrella, while products use sibling subdomains;
- the unified GhanaData gateway is intentionally deferred until several products are stable.

The proposed decision and rationale are recorded in [`docs/adr/0001-federated-portfolio-architecture.md`](docs/adr/0001-federated-portfolio-architecture.md). The phased delivery ledger is [`agent_plan.md`](agent_plan.md).

## Source material

- `Ghana_Digital_Public_Infrastructure_Project_Portfolio.docx`
- `AI_Development_Workflow_Training_Manual.docx`
- `AI_Native_Software_Engineering_Operations_Manual.docx`

Checksums and document roles are recorded in [`docs/portfolio/source-manifest.json`](docs/portfolio/source-manifest.json).

## Working in this repository

Read [`AGENTS.md`](AGENTS.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md) before changing portfolio state. Run:

```sh
ruby scripts/validate_portfolio.rb
ruby scripts/test_validate_portfolio.rb
```

The validator checks the product registry, hostname uniqueness, lifecycle rules, source-document checksums and required governance files without requiring third-party packages.

## Licence

Original code and configuration are available under Apache License 2.0. Source documents and datasets retain their own rights and are not relicensed merely by being referenced or retained here. See [`docs/governance/licensing-policy.md`](docs/governance/licensing-policy.md).
