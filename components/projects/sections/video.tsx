"use client";

interface Props {
  title: string;
  video: string;
}

export function VideoSection({
  title,
  video,
}: Props) {
  return (
    <div className="mb-4 w-full max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-3 text-[var(--wa-text-primary)] shadow sm:p-4">
      {/* Title */}
      <h3 className="mb-3 text-base font-semibold sm:text-lg">
        🎥 {title}
      </h3>

      {/* Video */}
      <div className="overflow-hidden rounded-xl border border-[var(--wa-border)] bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          className="max-h-[220px] w-full bg-black object-contain sm:max-h-[350px]"
        >
          <source
            src={video}
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}