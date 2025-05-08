// src/app/layout.js
export const metadata = {
    title: 'We Wrap It For U',
    description: 'Especialistas en rotulación de vehículos y señalización.',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html>
        <body>{children}</body>
      </html>
    );
  }
  