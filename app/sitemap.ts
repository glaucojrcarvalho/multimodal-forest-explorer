import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://multimodal-forest-explorer.vercel.app";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/disclaimer`,
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];
}
