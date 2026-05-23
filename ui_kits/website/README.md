# AK Real Estate — Website UI Kit

A hi-fi recreation of the AK Real Estate marketing website. Built as small modular React components against the project's shared `colors_and_type.css` foundations.

> **Imagery** uses Unsplash architectural photography as placeholder — replace with licensed AK Real Estate photography before any external use.
>
> **No production codebase or Figma was provided** for AK Real Estate. This kit is an interpretation of the written brief — please flag anything you'd like adjusted.

## What's in here

```
index.html         ← full-page interactive recreation; load this first
Nav.jsx            ← top navigation with blur-on-scroll
Hero.jsx           ← cinematic full-bleed hero with asymmetric headline
Listings.jsx       ← featured property masonry grid
Founder.jsx        ← portrait + editorial text (founder letter)
Concierge.jsx      ← white-glove service section
Press.jsx          ← media / press feature strip
Editorial.jsx      ← magazine feature with red highlight word
AppPromo.jsx       ← digital service / app promotion
Contact.jsx        ← contact form on cinematic background
Footer.jsx         ← footer with secondary nav, social, address
```

## Component conventions

- All components are pure presentation; click states are local React state (no backend).
- Components consume CSS vars from `../../colors_and_type.css` — no inline brand colors.
- Section vertical spacing is `clamp(80px, 10vw, 160px)`.
- Sections alternate `--ak-ink` / `--ak-bone` backgrounds.
- Imagery placeholders pull from Unsplash IDs hardcoded in each component.
