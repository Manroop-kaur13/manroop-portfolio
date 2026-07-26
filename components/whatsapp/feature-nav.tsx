"use client";

import {
  CircleUserRound,
  MoonStar,
} from "lucide-react";

export type FeatureType =
  | "theme"
  | "profile";

interface FeatureNavProps {
  onSelect: (feature: FeatureType) => void;
}

export function FeatureNav({
  onSelect,
}: FeatureNavProps) {
  return (
    <div className="flex items-center gap-1">
      {/* Theme */}
      <button
        type="button"
        onClick={() => onSelect("theme")}
        aria-label="Theme"
        title="Theme"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-secondary)] transition hover:bg-[var(--wa-hover-bg)] hover:text-[var(--wa-text-primary)]"
      >
        <MoonStar size={19} />
      </button>

      {/* Profile */}
      <button
        type="button"
        onClick={() => onSelect("profile")}
        aria-label="Profile"
        title="Profile"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-secondary)] transition hover:bg-[var(--wa-hover-bg)] hover:text-[var(--wa-text-primary)]"
      >
        <CircleUserRound size={20} />
      </button>
    </div>
  );
}