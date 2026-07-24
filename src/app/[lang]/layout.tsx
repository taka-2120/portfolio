import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/custom/footer";

import "nextra-theme-docs/style.css";
import { Layout } from "nextra-theme-docs";
import Header from "@/components/custom/header";
import { getAllPosts } from "@/utils/blog";
import { getAllPresentations } from "@/utils/presentations";

export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "ja" }];
}

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://yu-dev.vercel.app";

export const metadata: Metadata = {
	title: {
		default: "Yu Takahashi's Portfolio",
		template: "%s | Yu Takahashi",
	},
	description:
		"Software engineer focused on iOS and Web development. Showcasing apps, experiences, and technical writing.",
	metadataBase: new URL(BASE_URL),
	openGraph: {
		type: "website",
		siteName: "Yu Takahashi's Portfolio",
	},
	twitter: {
		card: "summary",
		site: "@yu_dev",
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}>) {
	const { lang } = await params;

	const [posts, presentations] = await Promise.all([
		getAllPosts(lang),
		getAllPresentations(lang),
	]);
	const showBlog = posts.length > 0;
	const showPresentations = presentations.length > 0;
	const navbar = (
		<Header
			lang={lang}
			showBlog={showBlog}
			showPresentations={showPresentations}
		/>
	);
	const footer = <Footer />;

	return (
		<html lang={lang} dir="ltr" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Layout
					footer={footer}
					navbar={navbar}
					pageMap={[{ name: "Home", route: "/" }]}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
