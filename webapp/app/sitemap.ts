import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.publicclipboard.com";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
    },
  ];
}
