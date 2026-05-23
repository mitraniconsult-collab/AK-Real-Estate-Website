# AK Real Estate — Design System

A premium luxury identity system for **AK Real Estate**, a high-end private real estate and concierge brand. The system is built around an editorial, cinematic, magazine-grade aesthetic — drawing from architectural lifestyle publications, private members clubs, and premium concierge brands.

> **Sources.** This system was generated from a written creative brief only. No production codebase, Figma, or brand book was provided. The mounted `AK Real Estate/` folder was empty when imported. Every visual decision below is an interpretation of the brief — please flag anything you'd like adjusted to match existing brand work.

---

## What this system is for

- Marketing site, listing pages, property detail, brand storytelling, press, app promo, contact.
- Editorial newsletters / magazine features.
- Pitch decks and listing-presentation slides (same type + color foundations).
- Digital ads, social cuts, concierge collateral.

## Tone in one line

> *Quiet authority. Cinematic restraint. Editorial confidence. The space between things matters as much as the things themselves.*

---

## Content fundamentals

**Voice.** Third-person, declarative, and understated. Sentences are short, often fragmentary, with the cadence of a magazine caption. Never breathless, never salesy. Confidence lives in restraint — the brand never explains why it is luxury, it simply behaves that way.

**Casing.**
- **UPPERCASE** for all display headlines, eyebrows, nav, button labels, vertical rotated section titles, property metadata badges.
- **Sentence case** for body paragraphs, captions, longform editorial copy.
- **Title Case** is avoided — too commercial.

**Person.** Mostly third-person ("The residence sits…", "A private concierge…"). Occasional second-person *"you"* in concierge / service sections to feel personal. Never first-person plural ("we") in marketing copy except in the founder letter.

**Numerals & units.** Spelled out under ten in body copy ("seven residences"), figures elsewhere ("$14.8M", "2,840 sq ft"). Currency precedes value, no spaces. Use the em-dash ( — ) for pause; the hyphen for compound modifiers; the en-dash for ranges (5–7).

**Emoji.** Never. Not even sparingly.

**Punctuation as ornament.** A single em-dash, an isolated period, or a tiny red square (▪) is used as visual punctuation in display layouts. Avoid exclamation marks entirely.

**Sample copy — what GOOD sounds like:**

> *Eyebrow:* `▪ A PRIVATE RESIDENCE`
> *Display:* `THE QUIETER THE STREET, THE LOUDER THE` *house.*
> *Body:* Tucked behind a stone wall on a one-block lane, this 1924 Mediterranean has been restored by Studio Argent over four years. Seven bedrooms. A motor court. A garden that survived the drought.
> *CTA:* `REQUEST PRIVATE VIEWING`

**Sample copy — what to AVOID:**

> ~~"Welcome to AK Real Estate, your trusted partner in finding the perfect luxury home for you and your family! 🏡✨"~~

---

## Visual foundations

### Palette
A near-monochrome system: true black through warm bone, with a single **crimson** accent. No secondary brand colors. No gradients (except a near-invisible cinematic overlay on imagery).

| Token | Hex | Role |
|---|---|---|
| `--ak-black` | `#000000` | Hero, contact section, full-bleed image bgs |
| `--ak-ink` | `#0a0a0a` | Default dark page bg |
| `--ak-charcoal` | `#141414` | Dark surface |
| `--ak-graphite` | `#1c1c1c` | Card on dark |
| `--ak-bone` | `#f5f1ea` | Light editorial bg (warm) |
| `--ak-paper` | `#ece7dd` | Secondary cream |
| `--ak-crimson` | `#b0181c` | The accent. CTAs, marks, hairlines |
| `--ak-crimson-deep` | `#7a0f12` | Hover / pressed |
| `--ak-white` | `#ffffff` | Display type on dark |
| `--ak-mute` | `#9a9590` | Caption text on dark |

### Type
- **Display — `Antonio`** (weights 200, 300, 400). Tall, narrow, condensed sans. Always uppercase, generous tracking (0.08–0.14em). Thin weights are preferred — the editorial feel comes from *air around the letterforms*, not weight.
- **Body — `Inter`** (300, 400, 500). Modern neutral sans. Light weight at small sizes for body, regular for UI controls.
- **Both fonts are Google Fonts substitutions.** If AK Real Estate has bespoke or licensed display faces (e.g. a custom Saol, Canela, or a tailored grotesque), please supply `.woff2` files and we'll swap them in.

### Typographic rules
- Letter-spacing **widens with importance.** Eyebrows and nav: `0.28em`. Buttons: `0.14em`. Body: `0`.
- **Vertical rotated labels** (writing-mode: vertical-rl, rotate 180deg) appear at section edges, in micro size, with `0.42em` tracking — the magazine flourish.
- One word in a long headline may be set **in red and italic** to act as a typographic accent. Never two.
- No drop caps. No serifs. No outline type.

### Layout
- **12-column** grid, but used asymmetrically — content rarely centers. Hero headline pushed to right two-thirds; founder portrait left, copy column right; image-over-image offset compositions.
- **Generous outside margin**: 4–6vw, never edge-to-edge for text. Imagery is full-bleed; text is inset.
- Section vertical rhythm: `clamp(80px, 10vw, 160px)` top + bottom. Calm and slow.
- **Alternating tonalities** — dark cinematic (image + text on black) → light editorial (text on bone) → dark again. The reader breathes in and out.

### Backgrounds & overlay
- Hero / cinematic sections use a **single photographic image**, full-bleed, with a vertical gradient overlay: `rgba(0,0,0,0.55)` top → `rgba(0,0,0,0.35)` middle → `rgba(0,0,0,0.85)` bottom.
- Cards over imagery use a bottom-anchored overlay (`0` top → `0.75` bottom) so labels sit on a darkened plinth.
- A faint **diagonal texture** at ~3% opacity is used on flat black hero backgrounds for filmic grain. (See `assets/grain.svg`.)
- **No bluish-purple gradients. No glass blur on cards.**

### Imagery
- **Mood:** late golden hour, low-key interior light, architectural shadow, restored stone, warm woods, deep upholstery. The world is *expensive but lived-in*.
- **Tone:** warm — never cool/blue. Slight de-saturation. Mild filmic grain acceptable.
- **Crop:** prefers wide / cinematic 16:9 or 21:9 for full-bleed; portrait 3:4 for editorial offsets; square 1:1 for masonry cards.
- **Subject:** architecture & interior over people. People appear at distance (silhouette by window, hands placing a glass) — never face-forward.

### Buttons & CTAs
- Primary CTA: **sharp red rectangle**, no radius, white uppercase text, 0.14em tracking, ~14px font, padding 14×22px.
- Secondary CTA: hairline outline (`1px solid currentColor`), transparent fill, same type treatment.
- Tertiary: text + 1px underline animating from 0 → 100% on hover.
- **Never:** rounded pill CTAs, gradient buttons, drop-shadowed buttons, icon-only buttons larger than 32px.

### Cards (property masonry)
- 4px radius (just barely softened — "slight" per brief).
- Photographic image fills card; small uppercase eyebrow + property name + meta below the image (or anchored bottom-left over a dark scrim).
- Hover: image zoom 1.04 over 900ms, plus a thin crimson hairline appears at bottom-left.
- Shadow only used on the light-bg masonry; no shadows on dark-bg cards (the image itself provides separation).

### Hairlines, marks & ornaments
- `1px` lines, often `--ak-smoke` on dark or `rgba(0,0,0,0.10)` on light.
- A **small filled crimson square** (`8×8px`, sometimes `4×4px`) is a recurring brand mark — used as bullet, eyebrow ornament, end-of-section punctuation, and on the favicon. Available as `▪` text mark or `assets/mark-square.svg`.
- **Circular outline graphics** (1px stroke, large diameter, low contrast) appear behind section numerals — see `assets/ring.svg`.
- **Thin red lines** (1px or 2px) appear under headlines, at section transitions, and as vertical column rules.

### Motion & state
- **Ease:** `cubic-bezier(0.2, 0.6, 0.2, 1)` — settled and confident.
- **Durations:** UI = 160–280ms; image reveals = 520–900ms (cinematic).
- **Hover (dark bg):** text brightens to pure white, hairlines deepen to crimson, images zoom 1.03–1.05.
- **Hover (light bg):** text shifts to crimson; underlines wipe in left-to-right.
- **Press:** subtle inset shadow + 1px down-translate; no scale-shrink, no haptic-style bounce.
- **Page enter:** images fade and rise 12px over 900ms; type fades after 200ms delay. Stagger by 80ms across stacked elements.
- **No spring animations. No parallax beyond 0.92× on hero.**

### Borders & shadow
- Borders are **hairlines only** — `1px`. Never thicker.
- Shadows are restrained: dark cards use no shadow; light-bg cards use `0 24px 60px -20px rgba(0,0,0,0.55)` — a long, soft, low drop.
- Press state shadow inverts to an inner suggestion.

### Radius
- Cards: `4px`. Buttons: `0`. Inputs: `0` with bottom-hairline only. Image masks: `0` for full-bleed, `4px` for masonry tiles. **No `border-radius: 50%` except for the brand ring ornament.**

### Transparency & blur
- Transparency is used in **overlays only** (hero, card scrims). UI surfaces are opaque.
- Backdrop blur is reserved for the **top nav** on scroll — `blur(18px)` plus `rgba(0,0,0,0.55)`.
- No glassmorphism on cards or modals.

---

## Iconography

This brand uses **almost no icons.** When iconography appears, it follows these rules:

- **Line icons only**, `1px` stroke, square caps, no fill, monochrome (white on dark, ink on light).
- Currently sourced from **Lucide** (CDN) — a 1px-stroke open-source set whose weight matches the editorial restraint of the type. This is a substitution; if AK Real Estate has a bespoke icon library, please attach it.
- Used **only for utility** — search, close, arrow, location pin, phone, calendar. **Never decorative.**
- **Emoji:** never.
- **Unicode marks used as ornaments:** `▪` (filled square — the brand mark), `—` (em-dash divider), `·` (mid-dot for inline metadata: `Bel Air · 7 BR · $24.8M`).
- **SVG assets** live in `assets/` — see `mark-square.svg`, `ring.svg`, `grain.svg`, `logo.svg`, `logo-monogram.svg`.

Arrow conventions: a thin **chevron `›`** (or unicode `→` for body copy) indicates forward action; in display contexts a **diagonal arrow `↗`** indicates outbound / external.

---

## Index — what's in this folder

```
README.md                   ← you are here
SKILL.md                    ← Agent Skill entrypoint (cross-compatible with Claude Code skills)
colors_and_type.css         ← all foundational tokens (color, type, spacing, motion, scale)

connected-preview.html      ← Admin + public site side-by-side, live-synced via shared store

shared/
  listings-store.js         ← Single source of truth for listings · used by admin + public site
                              Persists to localStorage + syncs across tabs via storage event

admin/                      ← Admin Panel (login / dashboard / listings / new + edit form)
  index.html                ← SPA entrypoint
  _p/                       ← per-page wrappers (used for Design System preview cards)
  *.jsx                     ← AdminShell, LoginPage, DashboardPage, ListingsPage, ListingFormPage

assets/                     ← logos, marks, textures
  logo.svg                  ← horizontal wordmark
  logo-monogram.svg         ← square monogram for favicon / app icon
  mark-square.svg           ← the crimson square ornament (▪)
  ring.svg                  ← decorative outline ring
  grain.svg                 ← subtle diagonal texture overlay

preview/                    ← 19 Design System tab cards across Type, Colors, Spacing, Components, Brand
  type-display.html, type-body.html, type-editorial-composition.html
  colors-dark.html, colors-light.html, colors-accent.html, colors-semantic.html
  spacing-scale.html, spacing-radius.html, spacing-shadow.html
  components-buttons.html, components-inputs.html, components-nav.html
  components-property-cards.html, components-marks-badges.html
  brand-wordmark.html, brand-monogram.html, brand-hero-composition.html, brand-iconography.html

ui_kits/
  website/                  ← marketing website kit
    index.html              ← full-page interactive recreation (load this first)
    README.md
    atoms.jsx               ← Logo, Btn, Eyebrow, VLabel, RedSquare, SectionNumeral, CineImage
    Nav.jsx                 ← top navigation w/ blur-on-scroll
    Hero.jsx                ← cinematic full-bleed hero
    Listings.jsx            ← masonry property grid
    Founder.jsx             ← editorial founder letter
    Concierge.jsx           ← four-service dark section
    Editorial.jsx           ← magazine feature with red-mark word
    Press.jsx               ← media quotes strip
    AppPromo.jsx            ← phone mockup + brand values
    Journal.jsx             ← news + social grid
    Contact.jsx             ← cinematic contact w/ form
    Footer.jsx              ← four-col sitemap + legal
```

## Caveats / known gaps

- **Fonts** are Google Fonts placeholders (Antonio + Inter). If a bespoke typeface exists, please supply `.woff2` files and I'll swap.
- **Iconography** uses Lucide via CDN as a stand-in.
- **Imagery** uses Unsplash photographic placeholders — please replace with licensed AK Real Estate photography before any external use.
- No copywriting from a real brand book was available — all sample copy is invented and editorial-styled.
- No logo was provided; the wordmark + monogram in `assets/logo*.svg` are **proposals** built from the brief.

