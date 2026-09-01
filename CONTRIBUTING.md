# Contributing to Digital Ghana

Digital Ghana welcomes contributions to public-interest infrastructure, documentation, data provenance and product standards.

## Before starting

1. Identify whether the work belongs to this portfolio repository or a product repository.
2. Read the relevant execution ledger and architecture decisions.
3. For data work, identify the source authority, licence, retrieval date and permitted use before importing anything.
4. For a new product, begin with a product-level plan and source/licence review—not generated application code.

## Change expectations

- Keep portfolio state honest: proposed, building, beta, stable, externally blocked or retired.
- Add evidence for status transitions.
- Preserve stable identifiers and publish migrations for breaking contract changes.
- Include tests proportional to risk and update public documentation.
- Never commit credentials, private exports, personal data or provider environment files.
- Do not imply government endorsement or official status without written authorization.

## Pull requests

A pull request should state the scope, affected product/hostname, source or ADR references, verification performed, migration/rollback impact and known external gates. Product implementation changes should be submitted to that product's repository.

## Data corrections

Corrections need evidence. Provide the affected stable identifier, current value, proposed value, authoritative source, source publication date and whether the correction changes historical records. Automation may draft a correction but a human reviewer approves canonical publication.

## Licensing

Unless explicitly stated otherwise, contributions intentionally submitted for inclusion are provided under Apache License 2.0 under the licence's inbound=outbound terms. Contributions must not include third-party data or documents without recorded permission.
