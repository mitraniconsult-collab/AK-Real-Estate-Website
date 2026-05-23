---
name: ak-real-estate-design
description: Use this skill to generate well-branded interfaces and assets for AK Real Estate, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a dark, cinematic, editorial luxury real-estate aesthetic.
user-invocable: true
---

# AK Real Estate — Design Skill

Read **`README.md`** first — it has the full content, voice, visual foundations, iconography, and an index of files in this system.

Then explore:

- **`colors_and_type.css`** — design tokens. Import this in any HTML artifact you build (`<link rel="stylesheet" href="...colors_and_type.css">`). All color, type, spacing, radius, shadow, motion vars live here.
- **`assets/`** — `logo.svg`, `logo-monogram.svg`, `mark-square.svg`, `ring.svg`, `grain.svg`. Copy or reference these.
- **`ui_kits/website/`** — high-fidelity React components for the marketing site. `atoms.jsx` (Logo, Btn, Eyebrow, VLabel, RedSquare, SectionNumeral, CineImage), then per-section files (Nav, Hero, Listings, Founder, Concierge, Editorial, Press, AppPromo, Journal, Contact, Footer). Load `index.html` to see the full demo.
- **`preview/`** — token + component reference cards (one HTML file each) showing how each piece looks in isolation.

## When you're invoked

If the user invokes this skill without other guidance, ask them what they want to build (a slide, a hero section, a campaign, a property listing, a deck) and ask 3–5 clarifying questions. Then act as an expert designer.

## Visual rules — non-negotiables

- **Color:** near-monochrome — black, charcoal, bone, white. **One** accent: crimson (`#b0181c`). No other chromatic colors.
- **Type:** Antonio (condensed display, thin/light, uppercase, wide tracking) + Inter (body, light). Always UPPERCASE for headlines; sentence case for body. One italic red word per headline, max.
- **Layout:** asymmetric — content rarely centers. Generous outside margin, alternating dark/light sections.
- **Edges:** vertical rotated labels (`writing-mode: vertical-rl; transform: rotate(180deg);`) at section edges with `.42em` tracking — the magazine flourish.
- **Buttons:** small crimson rectangle (0 radius) or hairline outline. Never pill/rounded/gradient.
- **Cards:** 4px radius. Subtle dark scrim over imagery. Hover = 1.05 image zoom over 900ms.
- **Ornaments:** the crimson square (▪), thin red hairline (1px), 1px circular outline rings, faint diagonal grain texture.
- **No emoji. No bluish-purple gradients. No glassmorphism (except top nav blur on scroll). No drop caps. No decorative icons.**

## When producing artifacts

- Copy `colors_and_type.css` and any needed `assets/` into the output folder; reference them via relative URLs.
- For slides / pitch decks, follow the same dark-cinematic + light-editorial alternation; use the deck_stage starter component.
- For prototypes / mocks, lift section patterns from `ui_kits/website/` rather than inventing new layouts.
- Cite the brand mark `▪` (filled crimson square) as a recurring punctuation device.

## Voice cheat sheet

> Third person. Short sentences. Confidence in restraint. No exclamation marks. Never "we" in marketing copy (except the founder letter). Numerals: under-10 spelled out in body; figures for prices, square footage, dates. Em-dash for pause. Mid-dot (·) for inline metadata: `Bel Air · 7 BR · $24.8M`.

If you need to produce sample copy and don't have a brief, default to the cadence of an architectural magazine caption — declarative, photographic, slightly understated.
