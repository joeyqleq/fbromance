import "@/styles/globals.css";
import { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Doto } from 'next/font/google';
import { Analytics } from "@/components/Analytics";

const doto = Doto({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-display' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'poi5on.m3 — An Open Investigation into r/ForbiddenBromance',
  description: 'A data-driven investigation into wartime narrative behavior, rhetorical mode-switching, and hasbara culture patterns on r/ForbiddenBromance.',
  keywords: ['hasbara', 'reddit investigation', 'ForbiddenBromance', 'data analysis', 'open source intelligence', 'Lebanon Israel'],
  authors: [{ name: 'poi5on.m3' }],
  openGraph: {
    title: 'poi5on.m3 — The Peace Forum That Wasn\'t',
    description: 'Six years of data. One subreddit. A structured investigation.',
    url: 'https://poi5on.me',
    siteName: 'poi5on.m3',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${doto.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} min-h-screen bg-background text-foreground antialiased font-default overflow-x-hidden !scrollbar-hide`}
            >
                <Analytics />
                {children}
            </body>
        </html>
    );
};
