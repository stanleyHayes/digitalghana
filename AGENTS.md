# AGENTS.md — Digital Ghana portfolio coordination

This repository is the portfolio control plane. Product implementation belongs in the corresponding product repository.

## Required reading order

1. `agent_plan.md`
2. `docs/adr/0001-federated-portfolio-architecture.md`
3. `portfolio/products.json`
4. the relevant file under `docs/governance/` or `docs/standards/`

For substantive tool-driven work, activate the installed `task-observer` skill at session start and follow its workspace logging rules.

## Ownership boundaries

| Lane | Owns |
|---|---|
| Portfolio governance | `docs/governance/`, `docs/adr/`, root policy files |
| Product registry | `portfolio/`, `docs/standards/domain-and-dns.md` |
| Portfolio web | `apps/web/` when created |
| Shared packages | `packages/` after the two-consumer admission gate |
| Infrastructure inventory | `infra/` and provider-neutral DNS/status records |
| Product implementation | The separate product repository, never this repository |

## Coordination rules

1. Claim a task in `agent_plan.md` before editing a shared path when multiple agents are active.
2. Do not copy or move an existing product repository into this repository.
3. Do not add a product source tree as an untracked nested `.git` directory.
4. Never edit live DNS, provider projects, secrets or product repositories from a portfolio task unless the task explicitly owns that change.
5. A hostname marked `planned` in `portfolio/products.json` must not be presented as deployed.
6. Cross-product dependencies use versioned contracts, SDKs or dataset releases. Never use another product's database directly.
7. Shared code requires two proven consumers and an explicit owner/versioning policy.
8. Source or licence uncertainty blocks canonical publication; it is not resolved by a successful scrape.
9. Product status changes require evidence and an update to both `portfolio/products.json` and `agent_plan.md`.
10. Preserve GeoGhana's Git history and obey `../geoghana/AGENTS.md` for work in that repository.

## Verification

Run `ruby scripts/validate_portfolio.rb` after changing inventory, governance, source documents or hostname conventions. Do not mark a portfolio milestone done unless its evidence is recorded in the live ledger.
