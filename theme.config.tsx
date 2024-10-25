import { footer } from "@/components/footer";
import React from "react";

export default {
	footer: footer,
	head: ({ title, meta }) => (
		<>
			{meta.description && (
				<meta name="description" content={meta.description} />
			)}
			{meta.tag && <meta name="keywords" content={meta.tag} />}
			{meta.author && <meta name="author" content={meta.author} />}
		</>
	),
	readMore: "Read More →",
	postFooter: null,
	darkMode: false,
	navs: [
		{
			url: "https://github.com/shuding/nextra",
			name: "Nextra",
		},
	],
};
