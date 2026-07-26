"use client";

import { projects } from "@/data/projects";

interface Props {
  onSelect?: (projectId: string) => void;
}

export function ProjectSelector({
  onSelect,
}: Props) {
  return (
    <div className="mb-4 space-y-3">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          onClick={() => onSelect?.(project.id)}
          className="w-full rounded-xl bg-[var(--wa-bubble-other)] p-4 text-left shadow-sm transition hover:bg-[var(--wa-hover-bg)]"
        >
          <div className="flex items-center gap-3">
            {/* Emoji */}
            <div className="text-3xl">
              {project.emoji}
            </div>

            {/* Project Info */}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[var(--wa-text-primary)]">
                {project.title}
              </h3>

              <p className="mt-0.5 text-sm text-[var(--wa-text-secondary)]">
                {project.tagline}
              </p>
            </div>

            {/* Arrow */}
            <span className="shrink-0 text-xl text-[var(--wa-text-secondary)]">
              ›
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}