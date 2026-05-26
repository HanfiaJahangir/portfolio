# Portfolio Architecture

This portfolio is structured as a recruiter-friendly interactive command center.

## Principles

- Keep navigation visible and conventional.
- Use 3D as atmosphere and proof of technical taste, not as a gate.
- Store portfolio content in typed data files.
- Keep animation, rendering, layout, and content separated.
- Lazy-load WebGL modules so the main document remains fast.

## Layers

- `src/app`: Next.js App Router routes and metadata.
- `src/components/layout`: persistent shell and page layout.
- `src/components/sections`: reusable page sections.
- `src/components/three`: WebGL-only presentation components.
- `src/data`: strongly typed portfolio content.
- `src/systems`: reusable animation, interaction, audio, transition, and performance utilities.

## Scalability Notes

Project pages can grow from data-driven summaries into individual case studies without changing the shell. Gameplay demos should remain small, lazy-loaded, and replaceable.
