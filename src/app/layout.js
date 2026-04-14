// src/app/layout.js
// Root layout: provides the ONLY html/body wrapper — locale layout must NOT repeat them

import SmartCursor from '@/components/SmartCursor';
import PageLoader from '@/components/PageLoader';
import '@/styles/globals.css';

export const metadata = {
  title: 'We Wrap It For U',
  description: 'Especialistas en rotulación de vehículos y señalización.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <PageLoader />
        <SmartCursor />
        {children}
      </body>
    </html>
  );
}