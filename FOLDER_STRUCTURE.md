# Folder Structure

```txt
public/
  audio/
  demos/
  images/
  models/
  resume/
  textures/
  videos/

docs/
  architecture/
  codex-tasks/
  gameplay-demos/
  visual-direction/

src/
  app/
    about/
    contact/
    projects/
    systems/
  components/
    animations/
    cards/
    layout/
    navigation/
    overlays/
    sections/
    showcase/
    three/
    ui/
  config/
  data/
  hooks/
  shaders/
  styles/
  systems/
    animation/
    audio/
    interactions/
    performance/
    transitions/
  types/
  utils/
```

## Ownership

- `app` owns routing only.
- `components/layout` owns page structure primitives.
- `components/ui` owns low-level controls.
- `components/navigation` owns navigation rendering.
- `systems` owns reusable behavior and integration utilities.
- `config` owns constants consumed by several layers.
- `data` owns portfolio content and should remain strongly typed.

## Expansion Approach

Add new features by introducing a narrow module first. For example, a project case-study feature should start with data types, then card/detail components, then route composition. Avoid placing feature-specific logic directly in route files.
