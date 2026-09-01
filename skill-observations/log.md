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

### Observation 3: Prove rollback by restoring the intended release

**Status:** OPEN
**Date:** 2026-09-01
**Session context:** Releasing independent web and API products across two deployment providers.
**Skill:** do
**Type:** open-source
**Phase/Area:** Production verification

**Issue:** A rollback command succeeding proves only that an older artifact can be promoted. It does not prove the canonical service is left on the intended release or that both directions remain healthy.

**Suggested improvement:** Make rollback drills three-step evidence: promote a known-good prior artifact, smoke the canonical hostname, then restore the intended artifact and smoke again. Record provider-generated deployment IDs for both transitions.

**Principle:** A release rollback drill is complete only after the intended release has been restored and reverified on the canonical surface.

### Observation 4: Separate source verification from operational availability

**Status:** OPEN
**Date:** 2026-09-01
**Session context:** Releasing a safety-sensitive public contact directory from official institutional sources.
**Skill:** do
**Type:** open-source
**Phase/Area:** Safety and acceptance language

**Issue:** A current official source can prove that an organization published a contact, but it cannot prove that a telephone line will connect, be answered, or meet a response time. A generic verified badge can accidentally overclaim the stronger guarantee.

**Suggested improvement:** For safety-sensitive directories, define verification predicates by field and render the predicate in user-facing language such as source checked. Pair it with a freshness window, fail-closed downgrade rule, and explicit availability disclaimer.

**Principle:** Verification labels must name the fact actually proven and must not imply live operational availability without corresponding evidence.
