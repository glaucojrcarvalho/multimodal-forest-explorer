import type { PublicResearchProject } from "../lib/research/projects";

export const PUBLIC_RESEARCH_PROJECTS: PublicResearchProject[] = [
  {
    id: "smartforest",
    title: "SFI SmartForest",
    organization: "NIBIO",
    publicUrl:
      "https://www.nibio.no/en/projects/sfi-smartforest-bringing-industry-4.0-to-the-norwegian-forest-sector",
    summary:
      "A public research initiative focused on bringing digitalisation and Industry 4.0 approaches into the Norwegian forest sector.",
    themes: ["forest digitalisation", "decision support", "data integration"],
    usageNote:
      "Public NIBIO project page used as conceptual inspiration only; this prototype is independent."
  },
  {
    id: "single-tree-ai",
    title: "AI opens the door to single-tree-based forestry",
    organization: "NIBIO",
    publicUrl:
      "https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2024/ai-opens-the-door-to-single-tree-based-forestry",
    summary:
      "Public research communication describing AI and laser-scanning approaches for extracting detailed information at individual-tree level.",
    themes: ["LiDAR", "individual trees", "machine learning"],
    usageNote:
      "Public NIBIO article used to frame tree-level visualization and AI-output concepts."
  },
  {
    id: "cloud-ai-forestry",
    title: "SmartForest with artificial intelligence in the cloud",
    organization: "NIBIO",
    publicUrl:
      "https://www.nibio.no/en/about-eng/research-matters/division-of-forest-and-forest-resources/research-matters-forest-and-forest-resources-2022/smartforest-with-artificial-intelligence-in-the-cloud",
    summary:
      "Public research communication on cloud-based processing and AI analysis of large forest datasets and sensor observations.",
    themes: ["cloud", "sensor data", "AI workflows"],
    usageNote:
      "Public NIBIO article used as architectural inspiration for data-processing and decision-support concepts."
  }
];
