# Product lifecycle and evidence standard

## States

| State | Meaning | Minimum evidence |
|---|---|---|
| Proposed | Portfolio intent, not an implementation claim | Approved problem statement and owner |
| Planning | Requirements/source/licence work active | Product ledger and decision log |
| Building | Claimed implementation work exists | Repository and CI evidence |
| Beta | Publicly usable with documented limitations | Production smoke, security baseline and rollback |
| Stable | Global definition of done satisfied | Release evidence, operations, restore and support ownership |
| Externally blocked | Code may exist but a named external gate prevents release | Blocker, owner and next verification action |
| Retired | No longer supported | Migration/redirect/archival evidence |

Status is never inferred from a repository existing or a build passing. `Stable` requires the evidence defined in `agent_plan.md` and the product's own ledger.

## Status transitions

A transition updates, in the same reviewed change:

- `portfolio/products.json`;
- the portfolio `agent_plan.md` milestone;
- the product ledger when a product repository exists;
- evidence URLs/paths and known limitations.

External credentials and provider configuration are not replaced with placeholders to claim readiness. A deterministic local implementation can be done while production remains `externally_blocked`.
