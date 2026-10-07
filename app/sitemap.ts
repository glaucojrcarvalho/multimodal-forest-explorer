import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.siteUrl,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${SITE.siteUrl}/disclaimer`,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${SITE.siteUrl}/ethics`,
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];
}
