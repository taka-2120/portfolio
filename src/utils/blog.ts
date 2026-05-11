import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	published: boolean;
};

export type BlogPostWithContent = BlogPost & {
	content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function getMdxPath(slug: string, lang: string): string {
	const preferred = path.join(BLOG_DIR, slug, `${lang}.mdx`);
	const fallback = path.join(BLOG_DIR, slug, "en.mdx");
	return fs.existsSync(preferred) ? preferred : fallback;
}

export function getAllPostSlugs(): string[] {
	if (!fs.existsSync(BLOG_DIR)) return [];
	return fs
		.readdirSync(BLOG_DIR)
		.filter((name) => fs.statSync(path.join(BLOG_DIR, name)).isDirectory());
}

export function getAllPosts(lang: string): BlogPost[] {
	return getAllPostSlugs()
		.map((slug) => {
			const filePath = getMdxPath(slug, lang);
			if (!fs.existsSync(filePath)) return null;
			const { data } = matter(fs.readFileSync(filePath, "utf-8"));
			return {
				slug,
				title: data.title ?? slug,
				date: data.date ?? "",
				description: data.description ?? "",
				tags: data.tags ?? [],
				published: data.published !== false,
			} satisfies BlogPost;
		})
		.filter((p): p is BlogPost => p !== null && p.published)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, lang: string): BlogPostWithContent | null {
	const filePath = getMdxPath(slug, lang);
	if (!fs.existsSync(filePath)) return null;
	const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
	return {
		slug,
		title: data.title ?? slug,
		date: data.date ?? "",
		description: data.description ?? "",
		tags: data.tags ?? [],
		published: data.published !== false,
		content,
	};
}
