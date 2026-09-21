import type { MetadataRoute } from "next";
import { permitirIndexacion, urlSitio } from "@/lib/url-sitio";

export default function robots(): MetadataRoute.Robots {
  const base = urlSitio();

  if (!permitirIndexacion()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/es/gracias", "/en/gracias", "/es/styleguide", "/en/styleguide"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
