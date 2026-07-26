"use client";

import type { ProjectSection } from "@/types/project";

import { OverviewSection } from "./sections/overview";
import { TechStackSection } from "./sections/tech-stack";
import { HardwareSection } from "./sections/hardware";
import { FeaturesSection } from "./sections/features";
import { PipelineSection } from "./sections/pipeline";
import { ContributionsSection } from "./sections/contributions";
import { ResultsSection } from "./sections/results";
import { ArchitectureSection } from "./sections/architecture";
import { GallerySection } from "./sections/gallery";
import { VideoSection } from "./sections/video";
import { LinksSection } from "./sections/links";

interface Props {
  section: ProjectSection;
}

export function ProjectSectionRenderer({ section }: Props) {
  switch (section.type) {
    case "overview":
      return (
        <OverviewSection
          title={section.title}
          description={section.description}
        />
      );

    case "tech-stack":
      return (
        <TechStackSection
          title={section.title}
          technologies={section.technologies}
        />
      );

    case "hardware":
      return (
        <HardwareSection
          title={section.title}
          hardware={section.hardware}
        />
      );

    case "features":
      return (
        <FeaturesSection
          title={section.title}
          features={section.features}
        />
      );

    case "pipeline":
      return (
        <PipelineSection
          title={section.title}
          steps={section.steps}
        />
      );

    case "contributions":
      return (
        <ContributionsSection
          title={section.title}
          contributions={section.contributions}
        />
      );

    case "results":
      return (
        <ResultsSection
          title={section.title}
          results={section.results}
        />
      );

   case "architecture":
  if (!section.image) return null;

  return (
    <ArchitectureSection
      title={section.title}
      image={section.image}
    />
  );

    case "gallery":
      return (
        <GallerySection
          title={section.title}
          images={section.images}
        />
      );

    case "video":
      return (
        <VideoSection
          title={section.title}
          video={section.video}
        />
      );

    case "links":
      return (
        <LinksSection
          title={section.title}
          links={section.links}
        />
      );

    default:
      return null;
  }
}