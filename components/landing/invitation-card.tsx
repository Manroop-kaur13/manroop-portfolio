"use client";

import {
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface InvitationCardProps {
  onAccept: () => void;
}

export function InvitationCard({
  onAccept,
}: InvitationCardProps) {
  return (
    <section className="relative z-10 w-full max-w-[620px] overflow-hidden rounded-[28px] border border-white/10 bg-[#111B21]/90 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00A884]/10 blur-[100px]" />

      <div className="relative">
        {/* Top */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#00A884]/15 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
            👋
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00A884]">
              Portfolio Invitation
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Hi, I&apos;m Manroop.
            </h1>
          </div>
        </div>

        {/* Message */}
        <div className="mt-7 rounded-2xl rounded-tl-md bg-[#202C33] p-4 sm:p-5">
          <p className="text-sm leading-6 text-gray-200 sm:text-[15px] sm:leading-7">
            Instead of another static portfolio,
            I&apos;d like to take you through my work
            as a conversation-from projects and
            technical skills to experience and
            achievements.
          </p>

          <div className="mt-3 flex items-center justify-end gap-1 text-[11px] text-gray-400">
            <span>Just now</span>
            <span className="text-[#53BDEB]">
              ✓✓
            </span>
          </div>
        </div>

        {/* Experience hint */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3.5">
          <div>
            <p className="text-xs text-gray-400">
              Explore at your own pace
            </p>

            <p className="mt-0.5 text-sm font-medium text-white">
              An interactive portfolio experience
            </p>
          </div>

          <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00A884]/15 text-[#00A884]">
            <MessageCircle size={20} />
          </div>
        </div>

        {/* Accept */}
        <button
          type="button"
          onClick={onAccept}
          className="group mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#00A884] px-5 py-3.5 text-sm font-semibold text-[#071A15] transition hover:bg-[#06B892] active:scale-[0.985] sm:text-base"
        >
          Accept Invitation

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-gray-500 sm:text-xs">
          Built with Next.js, React & TypeScript
        </p>
      </div>
    </section>
  );
}