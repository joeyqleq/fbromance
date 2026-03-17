# poi5on.m3 Frontend Design

## Goal

Turn the existing `luro-ai` Next.js shell into `poi5on.m3`: a public evidence dossier and analyst workbench for the `r/ForbiddenBromance` investigation. The site should feel like an illustrated covert instrument panel, not a SaaS dashboard or generic longform report.

## Approved Direction

- Information architecture: hybrid
- Hero framing: balanced tension
- Hero copy: split
- Homepage handoff: mixed overview
- Workbench model: evidence atlas
- Workbench chrome: covert terminal hardware
- Identity system: wordmark dominant
- Hero mark treatment: dot-matrix instrument
- Motion profile: low-burn ambient

## Product Structure

### Public Surface

The public side is a dossier-style homepage with strong art direction and immediate evidence posture.

Sections:

1. Hero
2. Timeline ribbon
3. Narrative modules
4. User anomaly preview
5. Evidence / methodology preview
6. CTA into the deep workbench

### Deep Workbench

The deeper `/app` experience becomes a persistent-left-rail analyst console with shared filters and cross-reference controls.

Primary lenses:

- Timeline
- Narratives
- Users
- Events
- Rhetoric
- Evidence

## Visual System

### Visual Language

The interface should read as dark hardware under power:

- black and charcoal chassis
- acid-lime, magenta, cyan, cobalt, and spectral gradients as energy sources
- dot-matrix text, scanlines, dither, and pixel-noise as accents
- rounded dark panels with subtle glass, inner glow, and lit perimeter edges
- occasional circuit traces and routing lines in layout seams

This is not neo-brutalist and not newspaper-editorial. It is closer to a hostile forensic console.

### Identity

The main identity object is the illustrated `poi5on.m3` wordmark. It should feel drawn and machine-readable rather than typographic-only.

The eye motif is secondary and reused as:

- evidence stamp
- loading glyph
- cursor ornament
- chart badge / legend emblem

### Motion

Motion stays ambient and restrained:

- slow spectral drift behind hero and major panels
- low-opacity scanline pass
- hover-reactive glow fields on cards and menus
- subtle chart breathing and data-line reveal
- rare glitch accents reserved for state changes and evidence emphasis

Avoid aggressive constant flicker.

## UX Principles

### Evidence First

The site can be visually aggressive, but every strong visual claim should sit beside factual structure:

- metric
- source-backed caption
- interpretation
- uncertainty or limit when needed

### Science-Magazine Explanations

Every major chart or matrix needs an explainer caption block:

- what the viewer is seeing
- why it matters
- what the main signal is
- what it does not prove

The tone should feel more like a well-annotated scientific feature than marketing copy.

### High-Agency Charts

Charts should support:

- filtering
- hover inspection
- animated transitions
- image export
- CSV export
- resizing where it helps exploration

Interactive features should exist where they improve investigation, not as empty spectacle.

## Data Presentation

### Homepage

Homepage should present only the strongest signals:

- archive scale
- spike windows
- core narrative clusters
- selected user anomalies
- selected event couplings

Homepage is a controlled argument, not the whole database.

### Workbench

Workbench is where dense interaction lives:

- cross-filtering across month, topic, flair, user, event label
- side-by-side evidence and chart reading
- drill-down into exact users or threads
- export affordances on charts and tables

## SEO and Social

The site needs full metadata hygiene:

- real metadata title/description by route
- Open Graph / Twitter cards
- canonical URL configuration for `poi5on.me`
- favicon set and app icons
- social preview image aligned with the visual system
- robots and sitemap friendly defaults

Analytics to embed:

- Tianji script
- Matomo cross-domain setup for `poi5on.me`

These should be integrated in a Next.js-safe way through the root layout or dedicated analytics component, not pasted raw into HTML.

## Build Strategy

Do not carry `luro-ai` forward as a design reference.

Use the existing Next.js project only as a technical host for speed, while replacing the visible product surface with a new interface system:

1. a custom theme/token layer
2. a new homepage architecture
3. a new analyst shell and route chrome
4. richer chart and export components
5. metadata, icons, and analytics integration

Existing generic marketing and dashboard UI should be treated as disposable.

## Risks

### Risk: Style collage

The attached references and snippet files can easily produce an incoherent collage. The implementation must treat them as ingredients, not as copy-paste requirements.

### Risk: Interactive overload

Too many live effects will make the site feel noisy and reduce trust. Motion and shaders must stay subordinate to legibility.

### Risk: Generic dashboard fallback

If the workbench is built like ordinary admin software, the project loses the illustrated identity. Shared shell components need custom geometry, lighting, and framing from the first pass.

## Non-Goals For This Pass

- public chatbot integration
- full RAG or live ingestion backend
- final master-event normalization UI
- complete user-contradiction scoring engine in the browser

The first pass should be a polished, believable public shell that can present the current analysis outputs and accept richer datasets later.
