import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'StreetWOD — Comunidad CrossFit · Rankings · WODs · Duelos',
    template: '%s | StreetWOD',
  },
  description:
    'StreetWOD: la comunidad para atletas de CrossFit. Rankings mundiales, WODs, benchmarks, duelos 1vs1 y mucho más.',
  metadataBase: new URL('https://streetwod.vercel.app'),
  openGraph: {
    siteName: 'StreetWOD',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
