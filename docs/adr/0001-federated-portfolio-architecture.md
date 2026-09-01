# ADR-0001: Federated portfolio with independent product repositories

- **Status:** Accepted
- **Date:** 2026-09-01
- **Decision owner:** Digital Ghana project owner
- **Scope:** Repository, deployment, data and hostname boundaries

## Context

The portfolio specification proposes multiple independently valuable Ghanaian digital building blocks and a shared monorepo blueprint. GhanaGeo, however, already exists as a mature independent monorepo with its own Git history, four frontend applications, Go API and worker services, contracts, SDKs, data pipelines, infrastructure and execution governance.

The architecture must preserve that investment while allowing future products to ship independently. It must also avoid making a not-yet-built central gateway a prerequisite for early products.

## Decision

Adopt a federated polyrepo portfolio:

1. `digitalghana` is the portfolio/control-plane repository.
2. Every domain product remains an independently versioned repository and deployment boundary.
3. `geoghana` remains in its current repository; it is not copied, nested or history-rewritten.
4. `digitalghana.dev` hosts the umbrella; products use sibling first-level subdomains.
5. Operational surfaces use first-level labels such as `api-geo.digitalghana.dev` unless a separately approved certificate strategy supports nested labels.
6. Product databases, credentials, migrations, release pipelines and operational ownership remain isolated.
7. Cross-product integration uses versioned APIs, SDKs or pinned dataset artifacts.
8. Shared packages are admitted only after two products prove the same stable need.
9. The unified GhanaData gateway is deferred until at least three stable products and real cross-product demand exist.

## Consequences

### Positive

- GeoGhana history and deployment behavior remain intact.
- Products can release, roll back and fail independently.
- Security and data access remain bounded by domain.
- The portfolio can evolve standards from evidence instead of premature abstraction.
- Provider changes remain hidden behind stable public hostnames.

### Costs

- CI, dependency updates and some configuration repeat across repositories.
- Shared packages require deliberate publishing and compatibility management.
- Cross-product local development needs contract fixtures rather than direct source imports.
- Portfolio inventory and product ledgers must be reconciled consistently.

## Alternatives rejected

### Move GeoGhana into a single portfolio monorepo

Rejected because it creates a high-risk history/path/deployment migration without solving a current product need. It would also make unrelated product releases share one repository control surface.

### Put all products behind `geo.digitalghana.dev`

Rejected because `geo` is a domain product name, not the portfolio identity. It would create routing, cookie, outage and ownership coupling.

### Build the unified gateway first

Rejected because it centralizes authentication and availability before stable domain contracts or measured cross-product demand exist. The portfolio specification itself places GhanaData last.

## Approval gate

The owner approved this plan on 2026-09-01 and authorized end-to-end implementation, including all product subdomains. Live DNS/provider mutations and product-repository changes remain individually evidence-gated: a hostname is not marked `live` until its application and production checks pass.

## Verification

- GeoGhana remains a clean independent repository with its original remote/history.
- Portfolio inventory validates with unique product, repository and hostname ownership.
- No product source tree or nested `.git` directory exists in this repository.
- The GhanaData gateway remains deferred until its entry criteria are met.
