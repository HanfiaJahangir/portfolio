# Design System

The design system is intentionally foundational. It defines tokens and primitives without locking the portfolio into final visuals.

## Token Sources

- `src/config/theme.ts`: TypeScript source of truth for colors, typography, spacing, radii, shadows, z-index, breakpoints, and motion values.
- `tailwind.config.ts`: maps theme tokens into Tailwind utilities.
- `src/styles/theme.css`: exposes CSS custom properties for global styling and future runtime theming.

## Typography

The scale includes:

- `eyebrow`: metadata and section labels.
- `body`: default reading text.
- `lead`: summary text.
- `h1`, `h2`, `h3`: page and section headings.

## Layout Primitives

- `PageContainer`: responsive content width and horizontal padding.
- `PageSection`: vertical rhythm and semantic section wrappers.
- `ResponsiveGrid`: reusable grid behavior.
- `PageHeader`: consistent route header structure.

## Theme Direction

The theme is a dark cinematic foundation with restrained signal colors. It supports a premium technical interface with a desktop-first visual hierarchy.

## Responsive Strategy

- Desktop: large cinematic composition, dense technical panels, immersive spacing, and richer section reveals.
- Tablet: medium visual density, reduced environment complexity, and stable content rhythm.
- Mobile: simplified rendering, stacked content, smaller panels, and direct navigation.

Responsive decisions should be adaptive, not merely shrinking the desktop layout. The goal is to preserve recruiter usability while allowing desktop to feel like a premium game launcher and technical command center.
