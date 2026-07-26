"use client";

interface Props {
  title: string;
  steps: string[];
}

export function PipelineSection({
  title,
  steps,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        ⚙️ {title}
      </h3>

      {/* Pipeline Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-start gap-3 rounded-lg bg-[var(--wa-hover-bg)] p-3"
          >
            {/* Step Number */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--wa-green)] font-semibold text-white">
              {index + 1}
            </div>

            {/* Step */}
            <p className="text-[var(--wa-text-secondary)]">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}