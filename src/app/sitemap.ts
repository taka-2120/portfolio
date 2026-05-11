import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/utils/blog";

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://yu-dev.vercel.app";

const langs = ["en", "ja"] as const;

const staticRoutes = ["", "/blog", "/experiences", "/services"];

export default function sitemap(): MetadataRoute.Sitemap {
	const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
		langs.map((lang) => ({
			url: `${BASE_URL}/${lang}${route}`,
			changeFrequency: route === "/blog" ? "weekly" : "monthly",
			priority: route === "" ? 1.0 : 0.8,
		})),
	);

	const slugs = getAllPostSlugs();
	const blogEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
		langs.map((lang) => ({
			url: `${BASE_URL}/${lang}/blog/${slug}`,
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
	);

	return [...staticEntries, ...blogEntries];
}
