# Skill Observation Log

Observations captured during task-oriented work.

**Status key:** OPEN = not yet actioned | ACTIONED (YYYY-MM-DD) = skill updated/created | DECLINED (YYYY-MM-DD) = user decided not to pursue — resolved statuses always carry their resolution date

---

## 2026-09-01

### Observation 1: Reconcile greenfield portfolio blueprints with existing product maturity

**Status:** OPEN
**Date:** 2026-09-01
**Session context:** Planning repository, domain and deployment architecture for a multi-product open-source portfolio with one mature product already built.
**Skill:** make-plan
**Type:** open-source
**Phase/Area:** Documentation discovery and architecture synthesis

**Issue:** A portfolio document prescribed a shared monorepo, but the existing product was already a mature independent monorepo with its own Git history, deployment infrastructure and execution ledger. Applying the greenfield blueprint literally would have created nested-repository and migration risk.

**Suggested improvement:** Add an explicit brownfield reconciliation gate to documentation discovery: compare proposed topology with actual repositories, histories, deployments and ownership boundaries before selecting the target architecture.

**Principle:** Architecture plans must treat aspirational documents as inputs and reconcile them with proven operational boundaries before recommending structural migration.

### Observation 2: Make portfolio architecture enforceable as data

**Status:** OPEN
**Date:** 2026-09-01
**Session context:** Implementing a multi-product portfolio foundation from a narrative architecture plan.
**Skill:** do
**Type:** open-source
**Phase/Area:** Implementation verification

**Issue:** A prose-only domain and lifecycle plan could drift as products and hostnames are added, especially when planned surfaces are easy to mistake for live deployments.

**Suggested improvement:** When executing portfolio architecture, add a machine-readable ownership inventory plus negative tests for duplicate names, unsupported readiness claims, integrity drift and premature shared-platform activation.

**Principle:** Important architecture invariants should be executable and tested, not left solely as narrative conventions.
