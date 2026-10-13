import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './globals.css';
import { identity, seo } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  authors: [{ name: identity.name }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: identity.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
};

export const viewport: Viewport = {
  themeColor: '#050605',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: identity.name,
  jobTitle: identity.role,
  email: `mailto:${identity.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressCountry: 'IN' },
  url: seo.url,
  sameAs: [identity.links.github, identity.links.linkedin, identity.links.unstop],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Mask animated elements before first paint; Motion.tsx lifts it.
            Failsafe: if scripts never run, the mask lifts itself after 4s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pre');setTimeout(function(){d.classList.remove('motion-pre')},4000)}}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
