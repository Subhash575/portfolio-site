import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/projects/pilot-cli`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
