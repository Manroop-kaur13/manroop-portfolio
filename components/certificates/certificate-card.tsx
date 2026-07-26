"use client";

import Image from "next/image";
import {
  Award,
  ExternalLink,
} from "lucide-react";

import type { Certificate } from "@/data/certificates";

interface Props {
  certificate: Certificate;
}

export function CertificateCard({
  certificate,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-[var(--wa-bubble-me)] text-[var(--wa-text-primary)] shadow-lg sm:rounded-2xl">
      {/* Certificate Preview */}
      <a
        href={certificate.image}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-[145px] overflow-hidden bg-white sm:h-[210px] lg:h-[230px]"
      >
        <Image
          src={certificate.image}
          alt={`${certificate.title} certificate`}
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
          sizes="(max-width: 640px) 85vw, 370px"
        />
      </a>

      {/* Certificate Info */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-2.5 sm:gap-3">
          {/* Award Icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 sm:h-10 sm:w-10">
            <Award
              size={17}
              className="text-[var(--wa-text-primary)] sm:h-5 sm:w-5"
            />
          </div>

          {/* Title + Issuer */}
          <div className="min-w-0 flex-1">
            <h3 className="text-[13px] font-semibold leading-[18px] text-[var(--wa-text-primary)] sm:text-sm sm:leading-5">
              {certificate.title}
            </h3>

            <p className="mt-0.5 text-[11px] leading-4 text-[var(--wa-text-primary)]/70 sm:mt-1 sm:text-xs sm:leading-5">
              {certificate.issuer}
            </p>
          </div>
        </div>

        {/* View Certificate */}
        <a
          href={certificate.image}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium text-[var(--wa-text-primary)] transition hover:bg-black/10 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/15 sm:mt-4 sm:gap-2 sm:py-2.5 sm:text-sm"
        >
          <ExternalLink
            size={14}
            className="sm:h-[15px] sm:w-[15px]"
          />

          View Certificate
        </a>
      </div>
    </div>
  );
}