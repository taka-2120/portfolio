import Footer from "@/components/custom/footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "nextra-theme-docs/style.css";
import Header from "@/components/custom/header";
import { Layout, Navbar } from "nextra-theme-docs";

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

export const metadata: Metadata = {
	title: "Yu Takahashi's Portfolio",
	description: "Here's my experience and projects!",
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: "en" | "ja" }>;
}>) {
	const { lang } = await params;

	const navbar = <Header lang={lang} />;
	const footer = <Footer />;

	return (
		<html lang={lang} dir="ltr" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Layout
					footer={footer}
					navbar={navbar}
					pageMap={[{ title: "Home", href: "/" }]}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}
