# Animation System

Animation is separated from page implementation so motion remains consistent and maintainable.

## Files

- `src/systems/animation/constants.ts`: shared durations and easing values.
- `src/systems/animation/framer.ts`: Framer Motion variants and transitions.
- `src/systems/animation/gsap.ts`: centralized GSAP defaults.
- `src/systems/animation/scroll.ts`: ScrollTrigger preparation point.
- `src/components/animations/MotionReveal.tsx`: reusable reveal wrapper.

## Principles

- Animation values should not be hardcoded in route files.
- Framer Motion should handle React UI transitions.
- GSAP should be reserved for timeline-heavy or scroll-bound sequences.
- ScrollTrigger should be dynamically prepared only when a feature needs it.
- Reduced-motion users are respected globally through `globals.css`.

## Future Expansion

Section transitions, page transitions, and WebGL camera sequences should consume the same timing constants. Heavy animation modules should be dynamically imported so the baseline portfolio remains fast.
