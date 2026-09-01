# Digital Ghana umbrella launch evidence

Verified: 2026-09-01  
Owner: Digital Ghana portfolio

## Deployment

- Provider: Vercel
- Project: `hayfordstanleys-projects/digitalghana`
- Deployment: `dpl_EJeL8KMjuaY4wRMazDagu5PDRaHW`
- Immutable deployment URL: `digitalghana-gjt28sez7-hayfordstanleys-projects.vercel.app`
- Canonical domain: <https://digitalghana.dev>
- Git repository: <https://github.com/stanleyHayes/digitalghana>

The GitHub repository is connected to the Vercel project. The canonical apex domain is registered in Vercel and attached as a project domain rather than only a deployment alias.

## Verification

- Production Vercel build completed successfully with Next.js 16.3.3.
- Local typecheck passed.
- Catalogue tests passed.
- Portfolio validator and its negative regression cases passed.
- Production Next.js build passed.
- `https://digitalghana.dev/` returned HTTP 200 without an authentication redirect after the project-domain attachment.
- TLS certificate subject: `CN=*.digitalghana.dev`.
- TLS issuer: Let's Encrypt `YR1`.
- Certificate validity at verification: 2026-09-01 through 2026-11-30.

## Product behavior

The site reads product state from `portfolio/products.json`. It links only live canonical surfaces and displays planned or deferred hostnames without presenting them as available services.
