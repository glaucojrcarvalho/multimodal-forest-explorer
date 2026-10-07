const defaultSiteUrl = "https://multimodal-forest-explorer.vercel.app";

export const SITE = {
  name: "Forest Intelligence Explorer",
  shortName: "Forest Explorer",
  description:
    "Independent research prototype exploring multimodal AI for forest monitoring and biodiversity understanding.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  repositoryUrl:
    "https://github.com/glaucojrcarvalho/multimodal-forest-explorer",
  disclaimer:
    "Independent prototype based on public research sources. Not an official NIBIO, NMBU, SmartForest, or SingleTree project."
} as const;
