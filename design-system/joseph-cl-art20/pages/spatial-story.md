# Page override — Spatial Story

## Intent
Push Drawing Room into a spatial, scroll-narrative direction without changing the Home's content or conversion logic.

## UI/UX Pro Max dials
- Variance: 10/10
- Motion: 10/10
- Density: 3/10
- Accessibility remains priority 1
- Performance and responsive remain priority 3/5

## Visual concept
A digital architectural review table. Photography is treated as physical boards floating at different depths rather than flat hero artwork. The first viewport behaves like an exploded architectural model that resolves as the visitor scrolls.

## Typography
- Display: Bricolage Grotesque, variable width/optical size
- Body/UI: Afacad Flux
- Sans only
- H1 must resolve in roughly three readable lines on desktop, never six narrow lines
- Body measure 60–75 characters desktop

## 3D grammar
- Native CSS perspective + transform-style: preserve-3d
- Motion animates z, rotateX, rotateY, x, y and scale independently
- No WebGL dependency and no Three.js payload for the Home experiment
- Main hero image begins slightly recessed and tilted
- Two photographic crop planes and one paper information plane begin separated in depth
- Scrolling assembles all planes toward a resolved composition
- Pointer movement changes camera/perspective-origin only; it never moves copy

## Storytelling grammar
1. Hero: idea is spatially unresolved; scroll physically resolves the scene.
2. Intent section: visitor chooses their problem; the architectural plate crossfades in depth.
3. Process: sticky 300vh chapter; one step comes forward in z at a time.
4. Criteria: copy remains stationary while supporting photography shifts on separate planes.
5. Projects: project boards travel through shallow perspective as the visitor reviews them.
6. Contact: motion quiets down; conversion surface becomes stable and calm.

## Motion rules
- Use Motion scroll() for scroll-linked 3D, not manual window scroll math.
- Use inView() for triggered editorial reveals.
- Opening stagger <= 55ms between text elements.
- Active process board transitions <= 400ms.
- No scroll hijacking.
- No critical interaction depends on hover.
- All motion disabled/recomposed under prefers-reduced-motion.

## Legibility
- No body copy is placed over unpredictable photography.
- Decorative 3D planes are aria-hidden.
- The primary hero text remains on opaque paper.
- Mobile removes 3D floating planes and restores sequential flow.

## Performance
- Reuse the already-loaded hero image for decorative planes via DOM clones.
- 3D animation uses transform/opacity; no layout-linked properties.
- No added WebGL/canvas engine.
- Below-fold images remain lazy-loaded from existing markup.
