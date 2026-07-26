"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface AchievementGalleryProps {
  title: string;
  images: string[];
}

export default function AchievementGallery({
  title,
  images,
}: AchievementGalleryProps) {
  const [selected, setSelected] = useState<
    number | null
  >(null);

  const showPrevious = () => {
    setSelected((current) => {
      if (current === null) return current;

      return (
        (current - 1 + images.length) %
        images.length
      );
    });
  };

  const showNext = () => {
    setSelected((current) => {
      if (current === null) return current;

      return (current + 1) % images.length;
    });
  };

  useEffect(() => {
    if (selected === null) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSelected(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selected, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Gallery Card */}
      <div className="w-[280px] max-w-full rounded-xl rounded-tr-md bg-[var(--wa-bubble-other)] p-3 text-[var(--wa-text-primary)] shadow-md sm:w-[376px] sm:rounded-2xl sm:rounded-tr-md sm:p-4">
        <h3 className="mb-3 text-base font-semibold text-[var(--wa-text-primary)] sm:text-lg">
          🖼 {title}
        </h3>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() =>
                setSelected(index)
              }
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-[var(--wa-border)] bg-black/5 transition hover:opacity-95 dark:bg-black/20 sm:rounded-xl"
              aria-label={`View ${title} image ${
                index + 1
              }`}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 130px, 180px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={() =>
            setSelected(null)
          }
        >
          {/* Counter */}
          <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white sm:left-6 sm:top-6 sm:text-sm">
            {selected + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelected(null);
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:right-6 sm:top-6"
            aria-label="Close gallery"
          >
            <X size={26} />
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-2 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:left-6 sm:p-3"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Selected Image */}
          <div
            className="flex max-h-[88vh] max-w-[88vw] items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <Image
              src={images[selected]}
              alt={`${title} ${
                selected + 1
              }`}
              width={1400}
              height={1000}
              className="max-h-[88vh] max-w-[88vw] rounded-lg object-contain sm:rounded-xl"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-2 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:right-6 sm:p-3"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </>
  );
}