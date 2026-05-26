# Demo Infrastructure

The portfolio supports lightweight interactive demos without turning project pages into full games.

## Supported Demo Types

- `dom`: lightweight UI-based interaction modules.
- `r3f`: React Three Fiber mechanic visualizers.
- `unity-webgl`: isolated Unity WebGL embed shell.

## Rules

- Demos are lazy-mounted through `DemoMount`.
- Heavy Unity WebGL builds must live on isolated `/demos/[slug]` routes.
- Project detail pages link to demo shells instead of embedding heavy builds inline.
- Demo modules must clean up on unmount.
- Mobile should prefer simplified DOM/R3F paths or fallback states.

## Unity WebGL Strategy

The `UnityWebGLShell` is an architecture placeholder. Future Unity builds should:

- load asynchronously only when the user opens the demo route
- show loading and fallback states
- avoid mounting on the homepage or project grid
- release memory on unmount
- expose a static fallback when device memory or viewport constraints are poor

## Adding a Demo

1. Add a record to `src/data/demoModules.ts`.
2. Assign `renderer` as `dom`, `r3f`, or `unity-webgl`.
3. Link a project through `projectSlug` when relevant.
4. Add a route-safe implementation behind `DemoMount`.
