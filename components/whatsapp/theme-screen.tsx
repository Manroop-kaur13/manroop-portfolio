"use client";

import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeScreenProps {
  onBack: () => void;
}

export function ThemeScreen({
  onBack,
}: ThemeScreenProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && theme === "light";

  const handleToggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <main className="flex h-full min-w-0 flex-1 flex-col bg-[#0B141A]">
      {/* Header */}
      <header className="flex h-[68px] shrink-0 items-center gap-4 border-b border-[#2A3942] bg-[#202C33] px-4 sm:px-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-white">
            Theme
          </h1>

          <p className="text-xs text-gray-400">
            Choose your appearance
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-xl">
          <p className="mb-3 text-sm font-medium text-[#00A884]">
            Appearance
          </p>

          <div className="rounded-2xl bg-[#202C33] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-5">
              {/* Dark */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111B21] text-gray-200">
                  <Moon size={19} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Dark
                  </p>

                  <p className="text-xs text-gray-400">
                    Dark appearance
                  </p>
                </div>
              </div>

              {/* Toggle */}
             {/* Toggle */}
<button
  type="button"
  role="switch"
  aria-checked={isLight}
  aria-label="Toggle light and dark theme"
  onClick={handleToggle}
  disabled={!mounted}
  className={`relative h-[30px] w-[54px] shrink-0 rounded-full transition-colors duration-300 ${
    isLight
      ? "bg-[#25D366]"
      : "bg-[#3B4A54]"
  }`}
>
  <span
    className={`absolute left-[3px] top-[3px] h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${
      isLight
        ? "translate-x-6"
        : "translate-x-0"
    }`}
  />
</button>

              {/* Light */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111B21] text-gray-200">
                  <Sun size={19} />
                </div>

                <div className="hidden sm:block">
                  <p className="font-semibold text-white">
                    Light
                  </p>

                  <p className="text-xs text-gray-400">
                    Light appearance
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs leading-5 text-gray-400">
                Current theme:{" "}
                <span className="font-medium text-gray-200">
                  {mounted
                    ? isLight
                      ? "Light"
                      : "Dark"
                    : "Loading..."}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}