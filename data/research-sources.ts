import type { ProvenanceRecord } from "../lib/provenance";

export const RESEARCH_SOURCES: ProvenanceRecord[] = [
  {
    id: "nibio-smartforest",
    title: "SFI SmartForest",
    kind: "public-source",
    sourceUrl: "https://www.nibio.no/en/projects/sfi-smartforest-bringing-industry-4.0-to-the-norwegian-forest-sector",
    organization: "NIBIO",
    usageNote: "Public project page used for conceptual research framing only."
  },
  {
    id: "nibio-single-tree-ai",
    title: "AI opens the door to single-tree-based forestry",
    kind: "public-source",
    sourceUrl: "https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2024/ai-opens-the-door-to-single-tree-based-forestry",
    organization: "NIBIO",
    usageNote: "Public article used to frame tree-level AI visualization."
  }
];
