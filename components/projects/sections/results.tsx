"use client";

interface Props {
  title: string;
  results: string[];
}

export function ResultsSection({
  title,
  results,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        📊 {title}
      </h3>

      {/* Results */}
      <div className="space-y-2">
        {results.map((result) => (
          <div
            key={result}
            className="rounded-lg bg-[var(--wa-hover-bg)] p-3 text-[var(--wa-text-secondary)]"
          >
            ✅ {result}
          </div>
        ))}
      </div>
    </div>
  );
}