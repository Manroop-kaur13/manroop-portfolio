"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

interface LinkItem {
  label: string;
  url: string;
}

interface Props {
  title: string;
  links: LinkItem[];
}

export function LinksSection({
  title,
  links,
}: Props) {
  const getIcon = (label: string) => {
    const normalizedLabel =
      label.toLowerCase();

    if (normalizedLabel.includes("github")) {
      return <FaGithub size={21} />;
    }

    if (
      normalizedLabel.includes("linkedin")
    ) {
      return <FaLinkedin size={21} />;
    }

    return <ExternalLink size={20} />;
  };

  return (
    <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-md bg-[var(--wa-bubble-other)] p-4 text-[var(--wa-text-primary)] shadow">
      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold">
        🔗 {title}
      </h3>

      {/* Links */}
      <div className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-[var(--wa-border)] bg-[var(--wa-hover-bg)] p-3 text-[var(--wa-text-primary)] transition hover:opacity-80"
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Platform Icon */}
              <div className="shrink-0 text-[var(--wa-green)]">
                {getIcon(link.label)}
              </div>

              {/* Label */}
              <span className="truncate">
                {link.label}
              </span>
            </div>

            {/* External Link */}
            <ExternalLink
              size={16}
              className="ml-3 shrink-0 text-[var(--wa-text-secondary)]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}