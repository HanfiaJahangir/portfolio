"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectMediaAsset } from "@/types/portfolio";
import { imageSizes } from "@/systems/performance/images";

type MediaGalleryProps = {
  assets: ProjectMediaAsset[];
  title: string;
};

export function MediaGallery({ assets, title }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeAsset = assets[activeIndex];

  if (!activeAsset) {
    return (
      <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-white/[0.035] text-sm text-muted">
        Media assets pending
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-panel/70 p-3 shadow-command">
      <button
        className="group relative aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-void text-left"
        onClick={() => setIsFullscreen(true)}
      >
        {activeAsset.type === "video" ? (
          <video
            src={activeAsset.src}
            className="h-full w-full object-cover"
            controls
            preload="metadata"
          />
        ) : (
          <Image
            src={activeAsset.src}
            alt={activeAsset.alt}
            fill
            sizes={imageSizes.full}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded bg-void/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-signal backdrop-blur">
          Open preview
        </span>
      </button>

      <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-6">
        {assets.map((asset, index) => (
          <button
            key={`${asset.src}-${index}`}
            className={`relative aspect-video overflow-hidden rounded border transition ${
              index === activeIndex ? "border-signal" : "border-white/10 hover:border-white/25"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Preview ${title} media ${index + 1}`}
          >
            <Image src={asset.src} alt={asset.alt} fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>

      {isFullscreen ? (
        <div className="fixed inset-0 z-modal grid place-items-center bg-void/92 p-4 backdrop-blur-xl">
          <button
            className="absolute right-4 top-4 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-ink"
            onClick={() => setIsFullscreen(false)}
          >
            Close
          </button>
          <div className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-panel">
            {activeAsset.type === "video" ? (
              <video
                src={activeAsset.src}
                className="h-full w-full object-contain"
                controls
                autoPlay
              />
            ) : (
              <Image
                src={activeAsset.src}
                alt={activeAsset.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
