import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import projects from "./play-store-projects.json" with { type: "json" };

const rootDir = process.cwd();
const projectFolders = [
  "icon",
  "screenshots",
  "feature-graphics",
  "trailers",
  "thumbnails",
  "metadata"
];

function cleanText(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\\u003d/g, "=")
    .replace(/\\u0026/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function extractBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  if (startIndex === -1) return "";
  const valueStart = startIndex + start.length;
  const endIndex = text.indexOf(end, valueStart);
  return endIndex === -1 ? "" : text.slice(valueStart, endIndex).trim();
}

function parseDimensions(url) {
  const match = url.match(/[=,-]w(\d+)-h(\d+)/);
  if (!match) {
    return null;
  }

  return {
    width: Number(match[1]),
    height: Number(match[2])
  };
}

function normalizeImageUrl(url, width = 1600) {
  const base = url.split("=")[0];
  return `${base}=w${width}`;
}

function extractImageCandidates(html) {
  const urls = new Map();
  const regex = /https:\/\/play-lh\.googleusercontent\.com\/[^"'\\\]\s<>,]+/g;

  for (const match of html.matchAll(regex)) {
    const raw = cleanText(match[0]).replace(/,$/, "");
    const normalized = raw.split("=")[0];
    const dimensions = parseDimensions(raw);
    if (!urls.has(normalized)) {
      urls.set(normalized, {
        remoteUrl: raw,
        cacheUrl: dimensions
          ? normalizeImageUrl(raw, Math.min(Math.max(dimensions.width, 512), 1920))
          : raw,
        dimensions
      });
    }
  }

  return [...urls.values()];
}

function classifyAssets(candidates) {
  const square = candidates.filter((candidate) => {
    const dimensions = candidate.dimensions;
    return dimensions && Math.abs(dimensions.width - dimensions.height) <= 12;
  });
  const landscape = candidates.filter((candidate) => {
    const dimensions = candidate.dimensions;
    return dimensions && dimensions.width > dimensions.height * 1.35;
  });
  const portrait = candidates.filter((candidate) => {
    const dimensions = candidate.dimensions;
    return dimensions && dimensions.height >= dimensions.width * 1.15;
  });

  const icon = square[0] ?? candidates[0] ?? null;
  const featureGraphic = landscape.find((asset) => (asset.dimensions?.width ?? 0) >= 900) ?? null;
  const screenshots = [...portrait, ...landscape]
    .filter(
      (asset) =>
        asset.remoteUrl !== icon?.remoteUrl && asset.remoteUrl !== featureGraphic?.remoteUrl
    )
    .slice(0, 12);

  return {
    icon,
    featureGraphic,
    screenshots
  };
}

function getExtension(contentType) {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

async function downloadAsset(asset, destinationWithoutExtension) {
  if (!asset?.cacheUrl) {
    return null;
  }

  const response = await fetch(asset.cacheUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; PortfolioAssetIngestion/2.0)"
    }
  });

  if (!response.ok) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const extension = getExtension(contentType);
  const outputPath = `${destinationWithoutExtension}.${extension}`;
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);

  return {
    localPath: outputPath.replace(rootDir, "").replaceAll("\\", "/"),
    publicPath: outputPath.replace(path.join(rootDir, "public"), "").replaceAll("\\", "/"),
    contentType,
    width: asset.dimensions?.width,
    height: asset.dimensions?.height,
    remoteUrl: asset.remoteUrl
  };
}

function extractMetadata(html, url, candidates, classified) {
  const title = cleanText(extractBetween(html, "<h1", "</h1>").replace(/^.*?>/, ""));
  const descriptionSection = html.includes("About this game")
    ? html.slice(html.indexOf("About this game"))
    : html;
  const description = cleanText(descriptionSection.split("Updated on")[0] ?? "");

  return {
    sourceUrl: url,
    title,
    description,
    remoteAssetRegistry: {
      icon: classified.icon?.remoteUrl ?? null,
      featureGraphic: classified.featureGraphic?.remoteUrl ?? null,
      screenshots: classified.screenshots.map((asset) => asset.remoteUrl),
      allCandidates: candidates.map((asset) => ({
        remoteUrl: asset.remoteUrl,
        dimensions: asset.dimensions
      }))
    },
    extractedAt: new Date().toISOString()
  };
}

async function ensureProjectFolders(projectDir) {
  for (const folder of projectFolders) {
    await mkdir(path.join(projectDir, folder), { recursive: true });
  }
}

async function ingestProject(project) {
  const response = await fetch(project.url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; PortfolioAssetIngestion/2.0)"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${project.url}: ${response.status}`);
  }

  const html = await response.text();
  const candidates = extractImageCandidates(html);
  const classified = classifyAssets(candidates);
  const metadata = extractMetadata(html, project.url, candidates, classified);
  const projectDir = path.join(rootDir, "public", "projects", project.slug);

  await ensureProjectFolders(projectDir);

  const cachedAssets = {
    icon: await downloadAsset(classified.icon, path.join(projectDir, "icon", "icon")),
    featureGraphic: await downloadAsset(
      classified.featureGraphic,
      path.join(projectDir, "feature-graphics", "feature-graphic")
    ),
    screenshots: []
  };

  for (const [index, screenshot] of classified.screenshots.entries()) {
    const cached = await downloadAsset(
      screenshot,
      path.join(projectDir, "screenshots", `screenshot-${String(index + 1).padStart(2, "0")}`)
    );
    if (cached) {
      cachedAssets.screenshots.push(cached);
    }
  }

  const manifest = {
    ...metadata,
    cachedAssets,
    folders: Object.fromEntries(
      projectFolders.map((folder) => [folder, `/projects/${project.slug}/${folder}`])
    )
  };

  await writeFile(
    path.join(projectDir, "metadata", "store.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );

  return { slug: project.slug, ...manifest };
}

async function main() {
  const results = [];

  for (const project of projects) {
    console.log(`Ingesting ${project.slug}...`);
    results.push(await ingestProject(project));
  }

  await writeFile(
    path.join(rootDir, "src", "data", "playStoreIngestion.generated.json"),
    `${JSON.stringify(results, null, 2)}\n`
  );

  console.log(`Ingested ${results.length} Play Store projects with cached media assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
