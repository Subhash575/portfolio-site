import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://subhashrana.dev";
  const lastModified = new Date();

  const sections = ["", "#about", "#projects", "#experience", "#contact"];

  return sections.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
