"use client";

interface EducationCardProps {
  title: string;
  institution: string;
  duration: string;
  percentage?: string;
  board?: string;
  subjects?: string[];
  cgpa?: string;
  coursework?: string[];
}

export default function EducationCard({
  title,
  institution,
  duration,
  percentage,
  board,
  subjects,
  cgpa,
  coursework,
}: EducationCardProps) {
  const normalizedTitle = title.toLowerCase();

  const isSchool =
    normalizedTitle.includes("class x") ||
    normalizedTitle.includes("class xii");

  return (
    <div className="w-[280px] max-w-full rounded-xl bg-[var(--wa-bubble-other)] p-3.5 shadow-md sm:w-auto sm:max-w-md sm:rounded-2xl sm:p-5">
      {/* Title */}
      <h2 className="text-[15px] font-bold leading-5 text-[var(--wa-text-primary)] sm:text-lg">
        {title}
      </h2>

      {/* Details */}
      <div className="mt-3 space-y-2.5 text-[12px] leading-[18px] text-[var(--wa-text-primary)] sm:mt-4 sm:space-y-3 sm:text-sm sm:leading-normal">
        {/* Institution */}
        <div>
          <p className="font-semibold">
            🏫 Institution
          </p>

          <p className="mt-0.5">
            {institution}
          </p>
        </div>

        {/* Year */}
        <div>
          <p className="font-semibold">
            📅{" "}
            {isSchool
              ? "Year of Passing"
              : "Expected Graduation"}
          </p>

          <p className="mt-0.5">
            {duration}
          </p>
        </div>

        {/* Percentage */}
        {percentage && (
          <div>
            <p className="font-semibold">
              📊 Percentage
            </p>

            <p className="mt-0.5 text-sm font-semibold text-[var(--wa-green)] sm:text-base">
              {percentage}
            </p>
          </div>
        )}

        {/* CGPA */}
        {cgpa && (
          <div>
            <p className="font-semibold">
              🎯 CGPA
            </p>

            <p className="mt-0.5 text-sm font-semibold text-[var(--wa-green)] sm:text-base">
              {cgpa}
            </p>
          </div>
        )}

        {/* Board */}
        {board && (
          <div>
            <p className="font-semibold">
              📖 Board
            </p>

            <p className="mt-0.5">
              {board}
            </p>
          </div>
        )}

        {/* Subjects */}
        {subjects && subjects.length > 0 && (
          <div>
            <p className="font-semibold">
              📚 Subjects Studied
            </p>

            <div className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2 sm:gap-2">
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full bg-[var(--wa-selected-bg)] px-2 py-0.5 text-[10px] leading-4 text-[var(--wa-text-primary)] sm:px-3 sm:py-1 sm:text-xs"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coursework */}
        {coursework && coursework.length > 0 && (
          <div>
            <p className="font-semibold">
              📚 Relevant Coursework
            </p>

            <div className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2 sm:gap-2">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full bg-[var(--wa-selected-bg)] px-2 py-0.5 text-[10px] leading-4 text-[var(--wa-text-primary)] sm:px-3 sm:py-1 sm:text-xs"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}