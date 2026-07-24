const SpeakerDeckEmbed = ({ html }: { html: string }) => (
	<>
		<style>{`
			.speaker-deck-embed iframe {
				position: absolute !important;
				top: 0 !important;
				left: 0 !important;
				width: 100% !important;
				height: 100% !important;
				border: 0 !important;
			}
		`}</style>
		<div
			className="speaker-deck-embed"
			style={{
				position: "relative",
				width: "100%",
				aspectRatio: "16/9",
				borderRadius: "12px",
				overflow: "hidden",
				marginBottom: "36px",
			}}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Speaker Deck's own oEmbed iframe snippet
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	</>
);

export default SpeakerDeckEmbed;
