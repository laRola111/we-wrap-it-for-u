import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/config';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const isMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`)
  );

  if (isMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|images).*)'],
};
