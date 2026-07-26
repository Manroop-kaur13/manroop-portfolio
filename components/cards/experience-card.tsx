"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  Building2,
} from "lucide-react";

interface ExperienceCardProps {
  role: string;
  organization: string;
  duration: string;
  description?: string;
  highlights: string[];
  tags?: string[];
}

export default function ExperienceCard({
  role,
  organization,
  duration,
  description,
  highlights,
  tags,
}: ExperienceCardProps) {
  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-2xl rounded-tr-md bg-[var(--wa-bubble-me)] text-[var(--wa-text-primary)] shadow-md">
      {/* Header */}
      <div className="border-b border-black/10 px-4 py-3.5 dark:border-white/10">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
            <BriefcaseBusiness
              size={19}
              className="text-[var(--wa-text-primary)]"
            />
          </div>

          <div className="min-w-0 flex-1">
            {/* Role */}
            <h3 className="text-[15px] font-bold leading-5 text-[var(--wa-text-primary)] sm:text-base">
              {role}
            </h3>

            {/* Organization */}
            <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[var(--wa-text-primary)]/75 sm:text-[13px]">
              <Building2
                size={13}
                className="shrink-0"
              />

              <span className="leading-5">
                {organization}
              </span>
            </div>

            {/* Duration */}
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[var(--wa-text-secondary)] sm:text-xs">
              <CalendarDays
                size={12}
                className="shrink-0"
              />

              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3.5">
        {/* Description */}
        {description && (
          <p className="mb-3 text-[12px] leading-5 text-[var(--wa-text-primary)]/80 sm:text-[13px]">
            {description}
          </p>
        )}

        {/* Highlights */}
        <div className="space-y-2">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-2"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--wa-green)] dark:bg-[#25D366]" />

              <p className="text-[12px] leading-5 text-[var(--wa-text-primary)]/85 sm:text-[13px]">
                {highlight}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-medium text-[var(--wa-text-primary)]/80 dark:bg-white/10 sm:text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}