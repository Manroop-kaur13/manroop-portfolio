"use client";

interface Props {
  title: string;
  features: string[];
}

export function FeaturesSection({
  title,
  features,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        ✨ {title}
      </h3>

      {/* Features */}
      <div className="space-y-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-lg bg-[var(--wa-hover-bg)] px-3 py-2 text-[var(--wa-text-secondary)]"
          >
            ✅ {feature}
          </div>
        ))}
      </div>
    </div>
  );
}