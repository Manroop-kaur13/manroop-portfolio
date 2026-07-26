"use client";

interface Props {
  title: string;
  hardware: string[];
}

export function HardwareSection({
  title,
  hardware,
}: Props) {
  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        💻 {title}
      </h3>

      {/* Hardware List */}
      <ul className="space-y-2 text-[var(--wa-text-secondary)]">
        {hardware.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2"
          >
            <span className="text-[var(--wa-green)]">
              •
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}