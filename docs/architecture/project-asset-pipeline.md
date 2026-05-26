# Project Asset Pipeline

The project showcase uses a manifest-based asset structure.

## Folder Convention

```txt
public/projects/{project-slug}/
  icon/
  screenshots/
  feature-graphics/
  trailers/
  thumbnails/
  metadata/
```

## Data Flow

1. Add or refresh Play Store source links in `scripts/play-store-projects.json`.
2. Run `npm run ingest:play-store`.
3. The script downloads remote Play Store media, writes cached assets under `public/projects/{slug}`, writes `metadata/store.json`, and creates a generated JSON snapshot under `src/data`.
4. Curated portfolio data remains in `src/data/playStoreProjects.ts`.
5. UI reads only typed project data and media paths, never Play Store scraping code.

## Future Asset Upgrade

The current pipeline includes local SVG placeholders so the site renders immediately. To upgrade assets, replace:

- `icon/icon.*`
- `feature-graphics/feature-graphic.*`
- `screenshots/screenshot-01.*`

or add new images and reference them in the project's `media` array.

## Design Rule

Store metadata is treated as source material. Portfolio copy should remain curated and engineering-focused.
