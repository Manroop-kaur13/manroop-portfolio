"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  title: string;
  image?: string;
}

export function ArchitectureSection({
  title,
  image,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  if (!image || image.trim() === "") {
    return (
      <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
        {/* Title */}
        <h3 className="mb-3 text-lg font-semibold">
          🏗 {title}
        </h3>

        {/* Empty State */}
        <div className="rounded-xl border border-[var(--wa-border)] bg-[var(--wa-hover-bg)] p-8 text-center text-[var(--wa-text-secondary)]">
          Architecture image not available.
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Architecture Card */}
      <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
        {/* Title */}
        <h3 className="mb-3 text-lg font-semibold">
          🏗 {title}
        </h3>

        {/* Architecture Image */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block w-full overflow-hidden rounded-xl border border-[var(--wa-border)] bg-[var(--wa-hover-bg)]"
          aria-label={`View ${title}`}
        >
          <Image
            src={image}
            alt={title}
            width={1400}
            height={900}
            className="h-auto w-full object-contain transition-transform duration-300 hover:scale-[1.01]"
          />
        </button>
      </div>

      {/* Fullscreen Viewer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={() => setIsOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:right-6 sm:top-6"
            aria-label="Close architecture image"
          >
            <X size={28} />
          </button>

          {/* Full Image */}
          <div
            className="flex max-h-[90vh] max-w-[92vw] items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <Image
              src={image}
              alt={title}
              width={1800}
              height={1200}
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}