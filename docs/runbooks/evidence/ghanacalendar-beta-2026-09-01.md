# GhanaCalendar public beta evidence

Verified: 2026-09-01

- Repository: <https://github.com/stanleyHayes/ghanacalendar>
- Product release evidence: <https://github.com/stanleyHayes/ghanacalendar/blob/main/docs/runbooks/release-evidence.md>
- Web: <https://calendar.digitalghana.dev> — Vercel deployment `dpl_Ca1QeBj5KXhJBiqbchTKfx1L6hjB`
- API: <https://api-calendar.digitalghana.dev> — Render service `srv-dabdeaf40ujc73aji6n0`, deploy `dep-dabdeb740ujc73aji93g`
- GitHub Quality run `33515268948`: passed

The production smoke suite covered the health/version response, a confirmed observed holiday, working-day addition and range counting, GraphQL parity, CSV and ICS exports, the web root, sitemap, robots, and canonical TLS.

The beta is not stable. It still needs a draft/review/publish admin workflow and audit trail, automated draft-only source monitoring, published TypeScript/React packages, and mature security/load/operations evidence. The three unannounced movable 2026 Islamic holidays remain pending with null dates rather than guessed dates.
