// src/app/[locale]/layout.js
import { getMessages } from '@/i18n/getMessages';
import Navbar from '@/components/Navbar';
import { SpeedInsights } from "@vercel/speed-insights/next"
import '@/styles/globals.css';

export async function generateStaticParams() {
  return ['en', 'es'].map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <Navbar locale={locale} messages={messages} />
        {children}
       <SpeedInsights />
      </body>
    </html>
  );
}

