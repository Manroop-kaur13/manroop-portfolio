"use client";

import { useState } from "react";

import {
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  url?: string;
  copy?: boolean;
  buttonText: string;
}

export function ContactCard({
  icon,
  title,
  value,
  url,
  copy = false,
  buttonText,
}: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (copy) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        alert("Failed to copy.");
      }
    } else if (url) {
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="w-[280px] max-w-full rounded-xl bg-[var(--wa-bubble-me)] p-3.5 text-[var(--wa-text-primary)] shadow-lg transition-all duration-300 hover:scale-[1.01] sm:w-[330px] sm:rounded-2xl sm:p-4">
      {/* Contact Info */}
      <div className="flex items-start gap-2.5 sm:gap-3">
        {/* Icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 text-[var(--wa-green)] dark:bg-white/10 dark:text-emerald-300 sm:h-12 sm:w-12">
          <div className="scale-[0.85] sm:scale-100">
            {icon}
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-semibold leading-5 text-[var(--wa-text-primary)] sm:text-base">
            {title}
          </h3>

          <p className="mt-0.5 break-all text-[11px] leading-4 text-[var(--wa-text-primary)]/75 sm:mt-1 sm:text-sm sm:leading-normal">
            {value}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleClick}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-black/10 bg-black/5 py-2 text-[12px] font-medium text-[var(--wa-text-primary)] transition hover:bg-black/10 active:scale-95 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 sm:mt-5 sm:gap-2 sm:rounded-xl sm:py-2.5 sm:text-base"
      >
        {copy ? (
          copied ? (
            <>
              <Check
                size={15}
                className="sm:h-[18px] sm:w-[18px]"
              />
              Copied
            </>
          ) : (
            <>
              <Copy
                size={15}
                className="sm:h-[18px] sm:w-[18px]"
              />
              {buttonText}
            </>
          )
        ) : (
          <>
            <ExternalLink
              size={15}
              className="sm:h-[18px] sm:w-[18px]"
            />
            {buttonText}
          </>
        )}
      </button>
    </div>
  );
}