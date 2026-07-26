"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AchievementImageCardProps {
  image: string;
  caption: string;

  // All achievement images for Previous / Next navigation
  images?: string[];
}

export default function AchievementImageCard({
  image,
  caption,
  images = [],
}: AchievementImageCardProps) {
  const galleryImages =
    images.length > 0 ? images : [image];

  const initialIndex = Math.max(
    galleryImages.indexOf(image),
    0
  );

  const [selected, setSelected] =
    useState<number | null>(null);

  const showPrevious = () => {
    if (selected === null) return;

    setSelected(
      (selected - 1 + galleryImages.length) %
        galleryImages.length
    );
  };

  const showNext = () => {
    if (selected === null) return;

    setSelected(
      (selected + 1) % galleryImages.length
    );
  };

  // Keyboard support
  useEffect(() => {
    if (selected === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }

      if (event.key === "ArrowLeft") {
        setSelected((current) => {
          if (current === null) return current;

          return (
            (current - 1 + galleryImages.length) %
            galleryImages.length
          );
        });
      }

      if (event.key === "ArrowRight") {
        setSelected((current) => {
          if (current === null) return current;

          return (current + 1) % galleryImages.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selected, galleryImages.length]);

  return (
    <>
      {/* Achievement Thumbnail */}
      <button
        type="button"
        onClick={() => setSelected(initialIndex)}
        className="block w-[280px] max-w-full overflow-hidden rounded-xl bg-[var(--wa-bubble-other)] text-left shadow-md transition hover:opacity-95 sm:w-auto sm:max-w-sm sm:rounded-2xl"
        aria-label={`View ${caption}`}
      >
        <Image
          src={image}
          alt={caption}
          width={500}
          height={500}
          className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.01]"
          sizes="(max-width: 640px) 280px, 384px"
        />
      </button>

      {/* Fullscreen Viewer */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={() => setSelected(null)}
        >
          {/* Image counter */}
          {galleryImages.length > 1 && (
            <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white sm:left-6 sm:top-6 sm:text-sm">
              {selected + 1} / {galleryImages.length}
            </div>
          )}

          {/* Close */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelected(null);
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:right-6 sm:top-6"
            aria-label="Close image"
          >
            <X size={26} />
          </button>

          {/* Previous */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-2 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:left-6 sm:p-3"
              aria-label="Previous image"
            >
              <ChevronLeft
                size={26}
                className="sm:h-[30px] sm:w-[30px]"
              />
            </button>
          )}

          {/* Full Image */}
          <div
            className="relative flex max-h-[88vh] max-w-[88vw] items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <Image
              src={galleryImages[selected]}
              alt={`Achievement ${selected + 1}`}
              width={1400}
              height={1000}
              className="max-h-[88vh] max-w-[88vw] rounded-lg object-contain sm:rounded-xl"
              priority
            />
          </div>

          {/* Next */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-2 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:right-6 sm:p-3"
              aria-label="Next image"
            >
              <ChevronRight
                size={26}
                className="sm:h-[30px] sm:w-[30px]"
              />
            </button>
          )}
        </div>
      )}
    </>
  );
}