import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/status", "/roadmap", "/governance", "/contribute"];
  return paths.map((path) => ({ url: `https://digitalghana.dev${path}`, lastModified: new Date("2026-09-01"), changeFrequency: path === "" || path === "/status" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
