# Authenticated provider inventory — 2026-09-01

**Scope:** Read-only CLI inspection using the credentials already present on this workstation. No repository, project, deployment, domain or service was created or changed.

## GitHub

- Authenticated account: `stanleyHayes`.
- Available organizations visible to the account: `Jay-Stan`, `Encode-Club-EVM-Bootcamp`.
- Public repository `stanleyHayes/digitalghana` was created after owner approval and now tracks the local `main` branch.
- Post-push Git parity was `0 behind / 0 ahead`.

**Future option:** transfer the repository to a dedicated Digital Ghana organization when one is created; no history rewrite is required.

## Vercel

- Authenticated user: `hayfordstanley`.
- Team: `hayfordstanleys-projects`.
- `digitalghana.dev` is registered through Vercel, created 2026-08-30, and expires 2027-08-30.
- Intended and current nameservers both match Vercel DNS.
- No Digital Ghana or GhanaGeo project appeared on the first current-project page. This is not proof that no older/paginated project exists; domain-to-project attachment still needs direct authenticated reconciliation.

## Render

- One accessible team workspace: `Stanley Asoku Hayford's Workspace` (`tea-cspvc3ggph6c739fskn0`).
- No service returned by the active-workspace list matched `ghana` or `geo`.
- GeoGhana's `render.yaml` is therefore infrastructure intent, not evidence that the Blueprint has been deployed in the inspected workspace.

## Package registries

Package-scope ownership and release credentials were not inspected because the portfolio licence and repository ownership decisions are still pending. No registry publication is claimed.

## Commands

```sh
gh auth status
gh api user/orgs --jq '.[].login'
gh repo view stanleyHayes/digitalghana --json nameWithOwner,url,visibility,defaultBranchRef
vercel whoami
vercel teams ls
vercel projects ls
vercel domains inspect digitalghana.dev
render whoami
render workspaces --output json
render workspace current --output json
render services --output json
```

Secrets and authentication tokens are intentionally omitted from this evidence.
