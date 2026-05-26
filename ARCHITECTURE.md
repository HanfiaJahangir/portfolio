# Architecture

This portfolio is structured as a production-grade Next.js App Router application for a senior gameplay engineering portfolio.

## Goals

- Keep recruiter navigation obvious and fast.
- Keep content, layout, animation, rendering, and data concerns separated.
- Use typed data models so project and systems content can scale into case studies.
- Treat desktop, laptop, and large-monitor experiences as the primary target.
- Keep tablet and mobile experiences adaptive, readable, and simplified.
- Keep WebGL lazy-loaded, tiered by device class, and performance-aware.

## Core Layers

- `src/app`: route entry points, metadata, global styles, and App Router layout.
- `src/components`: reusable UI, layout, navigation, animation, card, showcase, and Three components.
- `src/config`: routes, navigation, theme, and future application-level constants.
- `src/data`: typed portfolio content.
- `src/systems`: reusable foundations for animation, performance, interactions, audio, and transitions.
- `src/hooks`: reusable React hooks.
- `src/types`: shared TypeScript contracts.
- `public`: optimized runtime assets served directly by Next.js.

## Scalability

The app is designed so future pages compose existing primitives instead of inventing one-off layouts. Project case studies should be added through typed data and reusable showcase modules. Interactive demos should live behind dynamic imports and use the performance helpers before adding heavier rendering features.

## Platform Strategy

- Desktop and laptop: full cinematic presentation, larger compositions, richer ambient environments, advanced typography, and subtle camera-driven interactions.
- Tablet: reduced cinematic density, preserved layout quality, and simplified interaction surfaces.
- Mobile: simplified rendering path, reduced effects, preserved navigation, and prioritized readability.

The adaptive experience is configured in `src/config/experience.ts` and consumed by rendering systems. New visual features should define how they behave at each tier before implementation.

## Maintainability Rules

- Prefer small components with explicit props.
- Keep route files thin.
- Keep data separate from rendering.
- Keep animation values in the animation system.
- Keep visual tokens in `src/config/theme.ts`.
- Keep WebGL scenes isolated under `src/components/three`.
- Never require interaction to access recruiter-critical information.
