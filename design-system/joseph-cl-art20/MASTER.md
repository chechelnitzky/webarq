# Joseph.cl Art20 — Drawing Room

## Design intent
A bespoke architecture homepage that feels hand-composed rather than component-generated. The page behaves like an architectural monograph, contact sheet and drawing set at once: warm paper, precise datum lines, cropped photography, off-grid captions and restrained dusty-rose registration marks.

## UI/UX Pro Max tuning
- Product: premium architecture / professional service / portfolio / conversion landing hybrid
- Audience: homeowners, investors and commercial clients evaluating consequential projects
- Stack: static HTML/CSS/JavaScript
- Variance: 10/10
- Motion: 9/10
- Density: 3/10

## Non-negotiables
1. Accessibility first: body copy 4.5:1 minimum contrast, semantic controls, keyboard navigation, visible focus, descriptive alt text.
2. Touch: interactive targets at least 44px, no hover-only critical behavior.
3. Performance: hero image reserved; below-fold images lazy; animations use opacity/transform/clip-path; no layout-thrashing choreography.
4. Responsive: desktop can break the grid; mobile returns to sequential reading order with no theatrical text-on-image overlays.
5. Typography: sans-only. Darker Grotesque for display, Afacad Flux for text/UI. Body remains 16px+ and 1.5–1.65 line-height.
6. Motion: cause-and-effect only. Motion may reveal, crossfade, indicate scroll progress or create spatial continuity; it must never obscure content or block input.
7. Reduced motion: all choreography disabled under prefers-reduced-motion.
8. Form: visible labels, semantic input types, clear focus state and no placeholder-only fields.

## Visual system
- Paper: #F5F0E8
- Paper highlight: #FFFDF8
- Ink: #11110F
- Architectural blue: #132B3A
- Dusty rose registration: #B97878
- Dusty rose light: #D9B2AD
- Primary line: rgba(17,17,15,.17)

## Composition grammar
- One protagonist per viewport.
- No generic card grids, pills, glassmorphism, gradient UI or decorative tech grids.
- Image/text overlaps are allowed only when copy owns an opaque reading surface.
- Asymmetry should feel locally composed, not random.
- Each major section gets a distinct composition while sharing the same typography, line weight and registration-mark language.
- Photography remains architectural and dominant; effects never overpower image quality.

## Motion grammar
Using Motion for JavaScript:
- Opening stagger: 55ms between hero elements.
- Standard reveal: ~520ms, 16px vertical travel max.
- Intent image replacement: fast exit (~160ms), slower entrance (~420ms).
- Scroll-linked parallax is image-only, approx ±1.8% vertical travel.
- Scroll rail communicates document progress.
- Process rows resolve with small horizontal movement and a registration line.
- No scroll hijacking, no horizontal-scroll dependency, no blocking animations.

## Breakpoints
- Small mobile: <= 820px — sequential, no sticky image dependencies.
- Mid desktop/tablet: <= 1180px — reduced gutters and simpler split ratios.
- Large desktop: > 1180px — full bespoke composition.

## Pre-delivery visual checklist
- No text clipped by art-direction offsets.
- No body copy over photography without dedicated solid background.
- Long-form copy kept to roughly 60–75 characters per line on desktop.
- Form controls >=44px practical hit area.
- No horizontal overflow at 375px.
- All project filters, FAQ buttons, menu and links remain keyboard operable.
- prefers-reduced-motion produces a complete static page with no hidden reveal elements.
