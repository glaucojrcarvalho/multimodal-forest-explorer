const defaultSiteUrl = "https://forest.glaucojrcarvalho.com";

export const SITE = {
  name: "Forest Intelligence Explorer",
  shortName: "Forest Explorer",
  description:
    "Independent research prototype using real FOR-age Lillomarka point clouds, published tree-age benchmarks, and traceable forest AI research sources.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  repositoryUrl:
    "https://github.com/glaucojrcarvalho/multimodal-forest-explorer",
  disclaimer:
    "Independent prototype based on public research sources. Not an official NIBIO, NMBU, SmartForest, or SingleTree project."
} as const;
