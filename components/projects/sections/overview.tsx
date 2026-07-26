"use client";

interface Props {
  title: string;
  description: string;
}

export function OverviewSection({
  title,
  description,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        📌 {title}
      </h3>

      {/* Description */}
      <p className="leading-7 text-[var(--wa-text-secondary)]">
        {description}
      </p>
    </div>
  );
}