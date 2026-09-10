import type { MetadataRoute } from "next";
import { restaurant } from "@/data/restaurant";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: restaurant.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}