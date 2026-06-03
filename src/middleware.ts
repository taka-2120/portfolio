import { type NextRequest, NextResponse } from "next/server";
import { proxy } from "./proxy";

const PREVIEW_PASSWORD = process.env.BLOG_PREVIEW_PASSWORD ?? "";

function requireBasicAuth(request: NextRequest): NextResponse | null {
	if (!PREVIEW_PASSWORD) {
		return new NextResponse("Preview not available: BLOG_PREVIEW_PASSWORD not set", {
			status: 503,
		});
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

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (/^\/(en|ja)\/blog\/preview\//.test(pathname)) {
		const authResponse = requireBasicAuth(request);
		if (authResponse) return authResponse;
	}

	return proxy(request) ?? NextResponse.next();
}

export { config } from "./proxy";
