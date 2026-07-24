import "server-only";

export type Presentation = {
	slug: string;
	title: string;
	date: string;
	conferenceName: string;
	conferenceUrl?: string;
	venue?: string;
	speakerDeckUrl: string;
	tags: string[];
	description: string;
	published: boolean;
};

export type PresentationWithContent = Presentation & { content: string };

const PORTAL_API_URL = process.env.PORTAL_API_URL;
const PORTAL_API_TOKEN = process.env.PORTAL_API_TOKEN;

async function apiFetch<T>(path: string): Promise<T> {
	if (!PORTAL_API_URL || !PORTAL_API_TOKEN) {
		throw new Error("PORTAL_API_URL and PORTAL_API_TOKEN must be set");
	}
	const res = await fetch(`${PORTAL_API_URL}${path}`, {
		headers: { Authorization: `Bearer ${PORTAL_API_TOKEN}` },
		next: { revalidate: 300 },
	});
	if (!res.ok) throw new Error(`Portal API ${res.status}: ${path}`);
	return res.json() as Promise<T>;
}

function normalizeTags(raw: unknown): string[] {
	if (Array.isArray(raw)) return raw.map(String);
	return [];
}

function normalizePresentation(raw: Record<string, unknown>): Presentation {
	return {
		slug: String(raw.slug ?? ""),
		title: String(raw.title ?? raw.slug ?? ""),
		date: String(raw.date ?? ""),
		conferenceName: String(raw.conferenceName ?? ""),
		conferenceUrl:
			typeof raw.conferenceUrl === "string" ? raw.conferenceUrl : undefined,
		venue: typeof raw.venue === "string" ? raw.venue : undefined,
		speakerDeckUrl: String(raw.speakerDeckUrl ?? ""),
		tags: normalizeTags(raw.tags),
		description: String(raw.description ?? ""),
		published: raw.published !== false,
	};
}

export async function getAllPresentations(
	lang: string,
): Promise<Presentation[]> {
	try {
		const presentations = await apiFetch<Record<string, unknown>[]>(
			`/api/presentations?lang=${lang}`,
		);
		return presentations.map(normalizePresentation).filter((p) => p.published);
	} catch {
		return [];
	}
}

export async function getPresentation(
	slug: string,
	lang: string,
): Promise<PresentationWithContent | null> {
	try {
		const raw = await apiFetch<Record<string, unknown>>(
			`/api/presentations/${slug}?lang=${lang}`,
		);
		return {
			...normalizePresentation({ ...raw, slug: raw.slug ?? slug }),
			content: String(raw.content ?? ""),
		};
	} catch {
		return null;
	}
}
