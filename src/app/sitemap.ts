import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/blog";

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://yu-dev.vercel.app";

const langs = ["en", "ja"] as const;

const staticRoutes = ["", "/blog", "/experiences", "/services"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
		langs.map((lang) => ({
			url: `${BASE_URL}/${lang}${route}`,
			changeFrequency: route === "/blog" ? "weekly" : "monthly",
			priority: route === "" ? 1.0 : 0.8,
		})),
	);

	const [enPosts, jaPosts] = await Promise.all([
		getAllPosts("en"),
		getAllPosts("ja"),
	]);

	const publishedSlugs = new Set([
		...enPosts.map((p) => p.slug),
		...jaPosts.map((p) => p.slug),
	]);

	const blogEntries: MetadataRoute.Sitemap = [...publishedSlugs].flatMap(
		(slug) =>
			langs.map((lang) => ({
				url: `${BASE_URL}/${lang}/blog/${slug}`,
				changeFrequency: "monthly" as const,
				priority: 0.7,
			})),
	);

	return [...staticEntries, ...blogEntries];
}
