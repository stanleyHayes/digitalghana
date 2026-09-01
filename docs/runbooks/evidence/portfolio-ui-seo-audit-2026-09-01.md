# Portfolio UI, favicon and social metadata audit — 2026-09-01

## Remediation releases

- Digital Ghana umbrella commit `1ccfabd`; Vercel deployment `dpl_7G3E5y1hp9pGC5YQCGVDE3PQnw6S`.
- GhanaCalendar commit `6048e3c46b02a7df420afd199af30a7b72719ff4`; CI `33527989452`; Vercel deployment `dpl_8Tn4JRk1FQtKBcfQhm5PHtzN5V83`.
- GhanaCodes commit `7ef19244935b4c6c3ab10b6213822dd5172746c1`; CI `33527986949`; Vercel deployment `dpl_CLH7w8FDL1aLGVuhJUzxSjvRWh2d`.

## Production evidence

- `digitalghana.dev`, `calendar.digitalghana.dev` and `codes.digitalghana.dev` load Outfit for interface/body text, Geist Mono for labels/data and Newsreader for display titles.
- Browser inspection found zero native select, dialog, checkbox, radio, date, time or datetime-local controls and zero horizontal overflow across all three desktop surfaces.
- GhanaCalendar's native date input is replaced by a bounded, keyboard-focusable day stepper; production interaction advanced 2026-12-25 to 2026-12-26.
- GhanaCodes' native select is replaced by an accessible Radix combobox/listbox; production exposes three namespace options.
- All three return a product-specific SVG favicon and PNG Open Graph image with HTTP 200; every OG image is exactly 1200x630.
- All three expose canonical URLs, manifests, Open Graph image metadata and Twitter large-image cards on the canonical production host.

GhanaGov, GhanaValidate, GhanaSchools, GhanaDataset and GhanaEssential already carried the same recorded standard in their product release evidence. GeoGhana remains governed by its own mature UI system and launch ledger; this audit did not rewrite its history or functionality.
