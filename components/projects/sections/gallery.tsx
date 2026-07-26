"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  title: string;
  images: string[];
}

export function GallerySection({
  title,
  images,
}: Props) {
  const [selected, setSelected] =
    useState<number | null>(null);

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
      <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
        <h3 className="mb-3 text-lg font-semibold">
          🖼 {title}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() =>
                setSelected(index)
              }
              className="overflow-hidden rounded-xl border border-[var(--wa-border)] bg-[var(--wa-hover-bg)]"
              aria-label={`View ${title} image ${
                index + 1
              }`}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                width={600}
                height={400}
                className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={() => setSelected(null)}
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
            <X size={28} />
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
              <ChevronLeft size={30} />
            </button>
          )}

          {/* Image */}
          <div
            className="flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <Image
              src={images[selected]}
              alt={`${title} ${selected + 1}`}
              width={1400}
              height={900}
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
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
              <ChevronRight size={30} />
            </button>
          )}
        </div>
      )}
    </>
  );
}