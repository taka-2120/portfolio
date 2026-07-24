import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({});

const nextConfig: NextConfig = {
	i18n: {
		locales: ["en", "ja"],
		defaultLocale: "en",
	},
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "files.speakerdeck.com",
			},
		],
	},
};

export default withNextra(nextConfig);
