# Cadence

A CMS-driven marketing site for a fictional incident-response product, built to production standards.

[![CI](https://github.com/dev-rome/cadence/actions/workflows/ci.yml/badge.svg)](https://github.com/dev-rome/cadence/actions/workflows/ci.yml)

**[Live site](https://cadence-chi-seven.vercel.app)** · **[Storybook](https://main--6a63a6de324b772c672b812d.chromatic.com)**

<!-- TODO: hero screenshot or a short GIF of the incident simulation -->
![Cadence landing page](/docs/screenshot.png)

---

## What this is

Cadence is a landing page for an on-call and incident-management tool aimed at small engineering teams. The product is fictional; everything else is real.

Content is editable in a CMS by a non-technical user and appears on the live site within seconds. The design system is hand-built rather than pulled from a component library. Every interactive element is keyboard operable, and every animation respects `prefers-reduced-motion`.

---

## Stack

| Tool | Why |
|---|---|
| **Next.js 16 (App Router)** | Server components mean marketing copy ships zero client JavaScript. ISR gives static-file speed with editable content. |
| **TypeScript** | Domain types are generated from the live CMS schema, so a renamed field breaks the build rather than the page. |
| **Tailwind CSS v4** | Design tokens live in CSS and generate utilities. Theme switching re-resolves at runtime with no rebuild. |
| **Motion** | Declarative animation with first-class reduced-motion support and shared-layout transitions. |
| **Base UI** | Unstyled primitives that own keyboard semantics — roving tabindex, focus management, ARIA. All styling is mine. |
| **Sanity** | Headless CMS with an embedded Studio at `/studio`, so editors get a dashboard on the site's own domain. |
| **GraphQL + codegen** | One query fetches the whole page. Types are generated from the deployed schema, not hand-written. |
| **Vitest + Testing Library** | Queries are accessibility-based, so the test suite doubles as an accessibility audit. |
| **Storybook** | Every primitive built in isolation with each of its states enumerated before it reaches a page. |

**Deliberately excluded:** a component library (the design system is the thing being demonstrated), and any state manager the page didn't need.

---

## Architecture

```
src/
  app/                    # Routing and composition only
  components/
    ui/                   # Primitives. Know nothing about Cadence.
    layout/               # Header, footer, containers
    features/             # Domain components. Only make sense here.
  lib/
    content/              # Mappers + committed fallback content
    graphql/              # Client, queries, generated types
    pricing.ts            # Pure pricing logic, no React
  sanity/                 # Schemas and Studio config
```

**The `ui` / `features` split is the load-bearing decision.** A `Button` doesn't know what a pricing tier is. A `PricingCard` only exists in this product.

**Server by default, client where earned.** The header, hero simulation, tabs, pricing calculator, and theme toggle opt into the client. Everything else renders on the server and ships nothing.

**Business logic lives outside components.** `lib/pricing.ts` takes a tier, a seat count, and a billing cycle and returns a number. No React, no CMS, exhaustively tested — which is why moving pricing content into a CMS couldn't break the arithmetic.

---

## Technical decisions

### Content is CMS-backed with committed fallbacks

Every section fetches from Sanity through a single GraphQL query, and each collection also has a committed fallback in the repo.

The page falls back **per section**, not all-or-nothing. If the CMS is down, the whole page renders from committed content. If one collection returns empty, that section falls back while the others stay live.

### Types are generated, never hand-written

Codegen reads the deployed Sanity schema and produces TypeScript types. Every field arrives nullable, because the CMS validates in the Studio but the API makes no promises.

A mapping layer converts that into the non-nullable types components expect, dropping malformed documents rather than crashing. A feature with an unrecognised visual key is silently excluded; a pricing tier with an out-of-range discount is dropped rather than rendering a negative price.

### Behaviour is driven by fields, never by identifiers

The Enterprise tier originally showed "Custom" based on `tier.id === "enterprise"`. When content moved to the CMS, ids became generated UUIDs and the check silently failed — the tier rendered as "Free".

An id identifies a record; it should never describe behaviour. The fix was an explicit `customPricing` field. Test fixtures now use CMS-shaped UUIDs so the assumption can't come back.

### Every semantic colour has a separate text token

Accent text on an accent tint always fails contrast — a colour and a low-opacity tint of itself are close in luminance by definition. The token set carries `--accent` for fills and `--accent-text` for text, with the same split for each status colour.

### Declaring an ARIA role is a promise about behaviour

The billing toggle used `role="radiogroup"` on plain buttons with no roving tabindex and no arrow keys. A screen reader announced "radio group, 2 items" and arrow keys did nothing — worse than no ARIA at all. Rebuilt on Base UI's RadioGroup, which owns those semantics.

### The design system is hand-built; the theme toggle is not

Building seven primitives from scratch demonstrates design and accessibility judgement. Building a theme-persistence layer from scratch demonstrates that I didn't know `next-themes` existed.

---

## Accessibility

- **Fully keyboard operable**, including the mobile navigation, which traps focus, closes on Escape, and restores focus to its trigger.
- **Skip link** as the first focusable element.
- **All motion respects `prefers-reduced-motion`.** The looping hero simulation renders a single static frame, the logo marquee stops, count-up statistics show their final value.
- **`focus-visible` throughout**, so keyboard users get a visible ring and mouse users don't.
- **Contrast verified in both themes** — every text token clears 4.5:1 against every surface it appears on.
- **Landmarks are labelled**, including each of the four footer navigation groups.
- **Tested with a screen reader**, not just an automated checker.

Testing Library queries are accessibility-based, so a component with no accessible name fails its test before it reaches a page.

---

## Running it

```bash
git clone https://github.com/dev-rome/cadence.git
cd cadence
npm install
cp  .env.local
npm run codegen
npm run dev
```

The site runs without configuration — every section falls back to committed content. To connect a Sanity project, set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and NEXT_PUBLIC_SANITY_GRAPHQL_URL in .env.local, then run npm run codegen

Without Sanity credentials the site still runs — every section falls back to committed content.

| Command | |
|---|---|
| `npm run dev` | Dev server |
| `npm run storybook` | Component library |
| `npm run test:run` | Full test suite |
| `npm run typecheck` | Type check without emitting |
| `npm run codegen` | Regenerate GraphQL types from the deployed schema |
| `npm run build` | Production build |

The Studio is at `/studio`.

---

## Testing

| Layer | What it covers |
|---|---|
| **Unit** | Pricing arithmetic — seat maths, annual discounts, boundary cases. CMS mappers — malformed documents, missing fields, out-of-range values. |
| **Component** | Behaviour and accessibility, never class names. Keyboard interaction, ARIA state, focus management. |
| **Data layer** | MSW-backed. Successful fetch, total failure to fallback, per-section fallback, malformed documents dropped without crashing. |
| **CI** | Lint, typecheck, tests, and a production build on every push and pull request. |

The build step earns its place: lint and tests both pass on code that doesn't build, usually because of a server/client boundary violation the App Router only catches at build time.

---

## What I'd do differently

- **The bento grid's span arithmetic is manual.** Rows have to sum to six columns and nothing enforces it. A CMS validation rule would catch a bad configuration at edit time.
- **Fallback content will drift.** Nothing verifies the committed fallbacks still resemble what's in the CMS.

---

Built by [Jerome Haynes](https://jeromehaynes.com). Cadence is a fictional product; this is a portfolio project.
