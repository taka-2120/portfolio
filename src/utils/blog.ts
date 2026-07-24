import "server-only";

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

const BLOG_API_URL = process.env.PORTAL_API_URL;
const BLOG_API_KEY = process.env.PORTAL_API_TOKEN;

async function apiFetch<T>(path: string): Promise<T> {
	if (!BLOG_API_URL || !BLOG_API_KEY) {
		throw new Error("PORTAL_API_URL and PORTAL_API_TOKEN must be set");
	}
	const res = await fetch(`${BLOG_API_URL}${path}`, {
		headers: { Authorization: `Bearer ${BLOG_API_KEY}` },
		next: { revalidate: 300 },
	});
	if (!res.ok) throw new Error(`Blog API ${res.status}: ${path}`);
	return res.json() as Promise<T>;
}

function normalizeTags(raw: unknown): string[] {
	if (Array.isArray(raw)) return raw.map(String);
	return [];
}

export async function getAllPosts(lang: string): Promise<BlogPost[]> {
	try {
		const posts = await apiFetch<Record<string, unknown>[]>(
			`/api/blog?lang=${lang}`,
		);
		return posts
			.map((raw) => ({
				slug: String(raw.slug ?? ""),
				title: String(raw.title ?? raw.slug ?? ""),
				date: String(raw.date ?? ""),
				description: String(raw.description ?? ""),
				tags: normalizeTags(raw.tags),
				image: typeof raw.image === "string" ? raw.image : undefined,
				published: raw.published !== false,
			}))
			.filter((p) => p.published);
	} catch {
		return [];
	}
}

export async function getAllPostsIncludingDrafts(
	lang: string,
): Promise<BlogPost[]> {
	try {
		const posts = await apiFetch<Record<string, unknown>[]>(
			`/api/blog?lang=${lang}&include_drafts=true`,
		);
		return posts.map((raw) => ({
			slug: String(raw.slug ?? ""),
			title: String(raw.title ?? raw.slug ?? ""),
			date: String(raw.date ?? ""),
			description: String(raw.description ?? ""),
			tags: normalizeTags(raw.tags),
			image: typeof raw.image === "string" ? raw.image : undefined,
			published: raw.published !== false,
		}));
	} catch {
		return [];
	}
}

export async function getPost(
	slug: string,
	lang: string,
): Promise<BlogPostWithContent | null> {
	try {
		const raw = await apiFetch<Record<string, unknown>>(
			`/api/blog/${slug}?lang=${lang}`,
		);
		return {
			slug: String(raw.slug ?? slug),
			title: String(raw.title ?? slug),
			date: String(raw.date ?? ""),
			description: String(raw.description ?? ""),
			tags: normalizeTags(raw.tags),
			image: typeof raw.image === "string" ? raw.image : undefined,
			published: raw.published !== false,
			content: String(raw.content ?? ""),
		};
	} catch {
		return null;
	}
}
