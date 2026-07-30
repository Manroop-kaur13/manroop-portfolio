"use client";

import Image from "next/image";

import {
  ArrowLeft,
  Cake,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({
  onBack,
}: ProfileScreenProps) {
  return (
    <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[var(--wa-chat-bg)]">
      {/* Header */}
      <header className="flex min-h-[72px] shrink-0 items-center gap-4 border-b border-[var(--wa-border)] bg-[var(--wa-header-bg)] px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--wa-text-primary)] transition hover:bg-[var(--wa-hover-bg)]"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h2 className="font-semibold text-[var(--wa-text-primary)]">
            Profile
          </h2>

          <p className="text-xs text-[var(--wa-text-secondary)]">
            Contact info
          </p>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-[max(24px,env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch]">
        {/* Profile Hero */}
        <section className="flex flex-col items-center border-b border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] px-6 py-8 text-center sm:py-10">
          {/* Profile Photo */}
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-[var(--wa-search-bg)] shadow-lg sm:h-36 sm:w-36">
            <Image
              src="/images/avatars/profile.jpg"
              alt="Manroop Kaur"
              fill
              className="object-cover"
              sizes="144px"
              priority
            />
          </div>

          {/* Name */}
          <h1 className="mt-5 text-2xl font-bold text-[var(--wa-text-primary)]">
            Manroop Kaur
          </h1>

          {/* Degree */}
          <p className="mt-1 text-sm text-[var(--wa-text-secondary)]">
            B.E. Computer Science & Engineering
          </p>

          {/* Focus */}
          <div className="mt-4 flex items-center gap-2 rounded-full bg-[var(--wa-hover-bg)] px-4 py-2 text-xs font-medium text-[var(--wa-green)]">
            <Sparkles size={14} />

            AI • Research • Development
          </div>
        </section>

        {/* WhatsApp-style About / Status */}
        <section className="border-b border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] px-5 py-5 sm:px-7">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--wa-green)]">
            About
          </p>

          <p className="mt-3 text-[15px] font-medium text-[var(--wa-text-primary)]">
            Somewhere between an idea and a commit.
          </p>
        </section>

        {/* Personal Information */}
        <section className="border-b border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] px-5 py-2 sm:px-7">
          {/* Date of Birth */}
          <div className="flex items-center gap-4 border-b border-[var(--wa-border)] py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-hover-bg)] text-[var(--wa-green)]">
              <Cake size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--wa-text-primary)]">
                13 July 2006
              </p>

              <p className="mt-0.5 text-xs text-[var(--wa-text-secondary)]">
                Date of Birth
              </p>
            </div>
          </div>

          {/* Birthplace */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-hover-bg)] text-[var(--wa-green)]">
              <MapPin size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--wa-text-primary)]">
                Kurukshetra, Haryana
              </p>

              <p className="mt-0.5 text-xs text-[var(--wa-text-secondary)]">
                Place of Birth
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="border-b border-[var(--wa-border)] bg-[var(--wa-sidebar-bg)] px-5 py-2 sm:px-7">
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-hover-bg)] text-[var(--wa-green)]">
              <GraduationCap size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium leading-5 text-[var(--wa-text-primary)]">
                Thapar Institute of Engineering and Technology
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--wa-text-secondary)]">
                B.E. Computer Science and Engineering
              </p>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section className="bg-[var(--wa-sidebar-bg)] px-5 py-5 sm:px-7">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--wa-green)]">
            Connect
          </p>

          <div className="space-y-1">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/manroop-kaur13"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-[var(--wa-hover-bg)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-hover-bg)] text-[var(--wa-green)]">
                <FaLinkedin size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--wa-text-primary)]">
                  LinkedIn
                </p>

                <p className="text-xs text-[var(--wa-text-secondary)]">
                  View professional profile
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Manroop-kaur13"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-[var(--wa-hover-bg)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-hover-bg)] text-[var(--wa-green)]">
                <FaGithub size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--wa-text-primary)]">
                  GitHub
                </p>

                <p className="text-xs text-[var(--wa-text-secondary)]">
                  Explore projects and code
                </p>
              </div>
            </a>

            {/* Resume */}
            <a
  href="/resume/Manroop_Kaur_Resume.pdf"
  className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-[var(--wa-hover-bg)]"
>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--wa-hover-bg)] text-[var(--wa-green)]">
                <FileText size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--wa-text-primary)]">
                  Resume
                </p>

                <p className="text-xs text-[var(--wa-text-secondary)]">
                  View resume
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}