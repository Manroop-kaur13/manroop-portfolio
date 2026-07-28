"use client";

import {
  CircleUserRound,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "next-themes";

export type FeatureType = "profile";

interface FeatureNavProps {
  onSelect: (feature: FeatureType) => void;
}

export function FeatureNav({
  onSelect,
}: FeatureNavProps) {
  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  const isDark = resolvedTheme !== "light";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-1">
      {/* Direct Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
        }
        title={
          isDark
            ? "Light Mode"
            : "Dark Mode"
        }
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-secondary)] transition hover:bg-[var(--wa-hover-bg)] hover:text-[var(--wa-text-primary)]"
      >
        {isDark ? (
          <Sun size={19} />
        ) : (
          <Moon size={19} />
        )}
      </button>

      {/* Profile */}
      <button
        type="button"
        onClick={() =>
          onSelect("profile")
        }
        aria-label="Profile"
        title="Profile"
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--wa-text-secondary)] transition hover:bg-[var(--wa-hover-bg)] hover:text-[var(--wa-text-primary)]"
      >
        <CircleUserRound size={20} />
      </button>
    </div>
  );
}