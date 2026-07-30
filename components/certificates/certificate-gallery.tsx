"use client";

import { certificates } from "@/data/certificates";
import { CertificateCard } from "./certificate-card";

export function CertificateGallery() {
  return (
    <div className="mb-4 flex w-full justify-start">
      <div
        className="
          grid w-[275px] grid-cols-1 gap-3
          sm:w-full sm:max-w-[680px]
          lg:grid-cols-2
        "
      >
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
          />
        ))}
      </div>
    </div>
  );
}