# Security Policy

## Reporting a vulnerability

Do not open a public issue containing exploit details, credentials, personal data or an active vulnerability. The private reporting channel is not configured yet; until it is, contact the repository owner privately and avoid transmitting secrets in plaintext. This file must be updated with a dedicated security address or GitHub private vulnerability reporting link before the first public beta.

## Scope

Each product publishes its own supported versions and response process. This portfolio repository governs shared policy and inventory but does not replace product incident ownership.

## Baseline

- secrets are provider-managed and never committed;
- API credentials are hashed at rest and redacted from logs;
- public-data products minimize personal data and do not become citizen-profile databases;
- admin access requires MFA and least-privilege RBAC;
- privileged changes produce immutable audit events;
- dependency, secret, static-analysis and container checks run in product CI;
- GraphQL, REST and gRPC enforce bounded inputs, deadlines and scoped authorization;
- production products maintain alerting, backups, restore evidence and incident runbooks.

Security readiness is a release gate, not an inferred property of passing unit tests.
