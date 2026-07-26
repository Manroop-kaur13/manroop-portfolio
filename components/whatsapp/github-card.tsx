"use client";

import { Github, ExternalLink } from "lucide-react";

interface Props {
  title: string;
  url: string;
}

export function GithubCard({
  title,
  url,
}: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border border-white/10 bg-[#1f2c33] p-4 transition hover:bg-[#25343d]"
    >
      <div className="flex items-center gap-3">
        <Github size={24} className="text-white" />

        <div className="flex-1">
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-gray-400">
            Open GitHub Repository
          </p>
        </div>

        <ExternalLink
          size={18}
          className="text-gray-400"
        />
      </div>
    </a>
  );
}