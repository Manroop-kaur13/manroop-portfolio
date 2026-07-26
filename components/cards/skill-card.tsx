"use client";

interface SkillCardProps {
  title: string;
  emoji: string;
  skills: string[];
}

export default function SkillCard({
  title,
  emoji,
  skills,
}: SkillCardProps) {
  return (
    <div className="w-[280px] max-w-full rounded-xl bg-[var(--wa-bubble-other)] p-3.5 shadow-md sm:w-auto sm:max-w-md sm:rounded-2xl sm:p-4">
      {/* Title */}
      <h3 className="mb-2.5 text-[14px] font-semibold leading-5 text-[var(--wa-text-primary)] sm:mb-4 sm:text-base">
        {emoji} {title}
      </h3>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-[var(--wa-selected-bg)] px-2 py-0.5 text-[11px] leading-4 text-[var(--wa-text-primary)] sm:px-3 sm:py-1 sm:text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}