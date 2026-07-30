"use client";

import Image from "next/image";

import {
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

interface ResumeCardProps {
  preview: string;
  file: string;
}

export default function ResumeCard({
  preview,
  file,
}: ResumeCardProps) {
  return (
    <div className="w-[280px] max-w-full overflow-hidden rounded-xl rounded-tr-md bg-[var(--wa-bubble-me)] p-1.5 text-[var(--wa-text-primary)] shadow-lg sm:w-full sm:max-w-[400px] sm:rounded-2xl sm:rounded-tr-md sm:p-2">
      {/* Resume Preview */}
      <a
  href={file}
  className="relative block h-[155px] overflow-hidden rounded-lg bg-white sm:h-[270px] sm:rounded-xl"
  aria-label="Open Manroop Kaur's resume"
>
        <Image
          src={preview}
          alt="Preview of Manroop Kaur's resume"
          fill
          className="object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
          sizes="(max-width: 640px) 280px, 400px"
        />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent sm:h-12" />
      </a>

      {/* Document Info */}
      <div className="px-2 pb-2 pt-2.5 sm:pt-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* PDF Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 sm:h-11 sm:w-11">
            <FileText
              size={19}
              className="text-[var(--wa-text-primary)] sm:h-[23px] sm:w-[23px]"
            />
          </div>

          {/* File Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[var(--wa-text-primary)] sm:text-sm">
              Manroop_Kaur_Resume.pdf
            </p>

            <p className="mt-0.5 text-[10px] text-[var(--wa-text-secondary)] sm:text-xs">
              PDF • 1 page
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-3 sm:gap-2">
         <a
  href={file}
  className="flex items-center justify-center gap-1.5 rounded-lg bg-black/5 px-2 py-2 text-[11px] font-medium text-[var(--wa-text-primary)] transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm"
>
            <ExternalLink
              size={14}
              className="sm:h-4 sm:w-4"
            />
            Open
          </a>

          <a
            href={file}
            download="Manroop_Kaur_Resume.pdf"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-black/5 px-2 py-2 text-[11px] font-medium text-[var(--wa-text-primary)] transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm"
          >
            <Download
              size={14}
              className="sm:h-4 sm:w-4"
            />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}