# Interface design standard

This standard adopts the proven GeoGhana interface decisions across Digital Ghana products.

## Typography

- Use **Outfit** for interface, body and general display typography.
- Use **Geist Mono** for labels, identifiers, metadata, code, status, dates and tabular/data-oriented text.
- Product teams may select one intentional title/accent face when it strengthens the product voice. It must remain legible, licensed and subordinate to the shared Outfit/Geist Mono system.
- Load web fonts through the framework's optimized font pipeline where available; provide stable fallbacks and avoid layout-shifting runtime imports.

## Controls

Do not render operating-system-native product UI for:

- select menus;
- dialogs;
- checkboxes;
- radio groups;
- date pickers;
- time or date-time pickers.

Use accessible, branded primitives such as Radix-backed controls or an equivalent audited component. Custom appearance does not permit weaker semantics: keyboard navigation, focus visibility, screen-reader names, selected/checked state, escape/dismiss behavior, form serialization and touch targets must be preserved.

Native text, search, email, URL and numeric inputs remain acceptable when intentionally styled; the prohibited list concerns controls whose popovers or chrome otherwise escape the product design system.

## Verification gate

Before a product UI release:

1. Source-scan rendered application JSX for raw `select`, `dialog`, checkbox/radio, date, time and `datetime-local` controls.
2. Open each custom popup/control in a real browser and verify visual material, keyboard operation, focus and selected state.
3. Inspect computed fonts for Outfit, Geist Mono and the selected title face.
4. Check desktop and narrow viewports for overflow and popup clipping.
5. Record exceptions with rationale, owner and removal date; do not silently use native controls.

GeoGhana's shared forms and dialog primitives are the current implementation reference. Other product repositories should copy the decision and behavior contract, not import GeoGhana source directly across repository boundaries.
