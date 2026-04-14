// src/app/[locale]/layout.js
// Locale layout: NO html/body here — those only live in the root layout.js
import { getMessages } from '@/i18n/getMessages';
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateStaticParams() {
  return ['en', 'es'].map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Just pass children through — no wrapping html/body
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}
