import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	image?: string;
	published: boolean;
};

export type BlogPostWithContent = BlogPost & {
	content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_LANG = new Set(["en", "ja"]);

function safeMdxPath(slug: string, lang: string): string | null {
	if (!VALID_SLUG.test(slug) || !VALID_LANG.has(lang)) return null;

	const preferred = path.resolve(BLOG_DIR, slug, `${lang}.mdx`);
	const fallback = path.resolve(BLOG_DIR, slug, "en.mdx");

	if (!preferred.startsWith(BLOG_DIR + path.sep)) return null;

	return fs.existsSync(preferred) ? preferred : fallback;
}

function parseTags(raw: unknown): string[] {
	if (Array.isArray(raw)) return raw.map(String);
	return [];
}

export function getAllPostSlugs(): string[] {
	if (!fs.existsSync(BLOG_DIR)) return [];
	return fs
		.readdirSync(BLOG_DIR)
		.filter(
			(name) =>
				VALID_SLUG.test(name) &&
				fs.statSync(path.join(BLOG_DIR, name)).isDirectory(),
		);
}

export function getAllPosts(lang: string): BlogPost[] {
	return getAllPostSlugs()
		.map((slug): BlogPost | null => {
			const filePath = safeMdxPath(slug, lang);
			if (!filePath || !fs.existsSync(filePath)) return null;
			const { data } = matter(fs.readFileSync(filePath, "utf-8"));
			return {
				slug,
				title: data.title ?? slug,
				date: data.date ?? "",
				description: data.description ?? "",
				tags: parseTags(data.tags),
				image: typeof data.image === "string" ? data.image : undefined,
				published: data.published !== false,
			};
		})
		.filter((p): p is BlogPost => p !== null && p.published)
		.sort((a, b) => {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return a.slug.localeCompare(b.slug);
		});
}

export function getPost(slug: string, lang: string): BlogPostWithContent | null {
	const filePath = safeMdxPath(slug, lang);
	if (!filePath || !fs.existsSync(filePath)) return null;
	const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
	return {
		slug,
		title: data.title ?? slug,
		date: data.date ?? "",
		description: data.description ?? "",
		tags: parseTags(data.tags),
		image: typeof data.image === "string" ? data.image : undefined,
		published: data.published !== false,
		content,
	};
}
