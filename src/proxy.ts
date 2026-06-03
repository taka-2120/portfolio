import { type NextRequest, NextResponse } from "next/server";

const locales = ["en", "ja"];
const defaultLocale = "en";

const PREVIEW_PASSWORD = process.env.BLOG_PREVIEW_PASSWORD ?? "";

function requireBasicAuth(request: NextRequest): NextResponse | null {
	if (!PREVIEW_PASSWORD) {
		return new NextResponse(
			"Preview not available: BLOG_PREVIEW_PASSWORD not set",
			{
				status: 503,
			},
		);
	}
	const authHeader = request.headers.get("authorization");
	if (!authHeader?.startsWith("Basic ")) {
		return new NextResponse("Unauthorized", {
			status: 401,
			headers: { "WWW-Authenticate": 'Basic realm="Blog Preview"' },
		});
	}
	const decoded = atob(authHeader.slice(6));
	const pass = decoded.slice(decoded.indexOf(":") + 1);
	if (pass !== PREVIEW_PASSWORD) {
		return new NextResponse("Unauthorized", {
			status: 401,
			headers: { "WWW-Authenticate": 'Basic realm="Blog Preview"' },
		});
	}
	return null;
}

function getLocale(_request: NextRequest) {
	return defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (/^\/(en|ja)\/blog\/preview(\/|$)/.test(pathname)) {
		const authResponse = requireBasicAuth(request);
		if (authResponse) return authResponse;
	}

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
