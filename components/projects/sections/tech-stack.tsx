"use client";

interface Props {
  title: string;
  technologies: string[];
}

export function TechStackSection({
  title,
  technologies,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        🛠 {title}
      </h3>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-[var(--wa-green)]/15 px-3 py-1 text-sm font-medium text-[var(--wa-green)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}