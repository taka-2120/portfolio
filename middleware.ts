import { NextRequest } from 'next/server';

let locales = ['en', 'ja'];

const IMAGE_FILE = /\.(jpg|png|svg)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next') || IMAGE_FILE.test(pathname)) {
    return;
  }
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  const locale = 'en';
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return Response.redirect(request.nextUrl);
}
