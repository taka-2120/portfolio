import { type NextRequest, NextResponse } from "next/server";

const locales = ["en", "ja"];
const defaultLocale = "en";

function getLocale(_request: NextRequest) {
	return defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	if (
		pathname.includes("/app-ads.txt") ||
		pathname.includes("/.well-known/apple-app-site-association")
	)
		return;

	switch (pathname) {
		case "/time-meet/privacy-policy/en":
			request.nextUrl.pathname = "/en/services/time-meet/privacy-policy";
			break;
		case "/time-meet/privacy-policy/ja":
			request.nextUrl.pathname = "/ja/services/time-meet/privacy-policy";
			break;
		case "/eco-notify/privacy-policy/en":
			request.nextUrl.pathname = "/en/services/eco-cycle/privacy-policy";
			break;
		case "/eco-notify/privacy-policy/ja":
			request.nextUrl.pathname = "/ja/services/eco-cycle/privacy-policy";
			break;
		case "/en/services/eco-notify/privacy-policy":
			request.nextUrl.pathname = "/en/services/eco-cycle/privacy-policy";
			break;
		case "/ja/services/eco-notify/privacy-policy":
			request.nextUrl.pathname = "/ja/services/eco-cycle/privacy-policy";
			break;
		default: {
			const locale = getLocale(request);
			request.nextUrl.pathname = `/${locale}${pathname}`;
			break;
		}
	}
	return NextResponse.redirect(request.nextUrl);
}
export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next).*)",
		// Optional: only run on root (/) URL
		// '/'
	],
};
