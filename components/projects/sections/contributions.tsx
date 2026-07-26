"use client";

interface Props {
  title: string;
  contributions: string[];
}

export function ContributionsSection({
  title,
  contributions,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        👨‍💻 {title}
      </h3>

      {/* Contributions */}
      <div className="space-y-2">
        {contributions.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-[var(--wa-border)] bg-[var(--wa-hover-bg)] p-3"
          >
            <p className="text-[var(--wa-text-secondary)]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}