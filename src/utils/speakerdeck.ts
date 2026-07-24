import "server-only";

export type SpeakerDeckEmbed = {
	html: string;
	thumbnailUrl: string;
	title: string;
};

export async function getSpeakerDeckEmbed(
	url: string,
): Promise<SpeakerDeckEmbed | null> {
	try {
		const res = await fetch(
			`https://speakerdeck.com/oembed.json?url=${encodeURIComponent(url)}`,
			{ next: { revalidate: 300 } },
		);
		if (!res.ok) return null;
		const data = await res.json();
		if (typeof data.html !== "string") return null;
		return {
			html: data.html,
			thumbnailUrl:
				typeof data.thumbnail_url === "string" ? data.thumbnail_url : "",
			title: typeof data.title === "string" ? data.title : "",
		};
	} catch {
		return null;
	}
}
