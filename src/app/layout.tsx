import "@/styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: 'ziopsyop.tech — An Open Investigation into r/ForbiddenBromance',
  description: 'A data-driven investigation into wartime narrative behavior, rhetorical mode-switching, and hasbara culture patterns on r/ForbiddenBromance.',
  keywords: ['hasbara', 'reddit investigation', 'ForbiddenBromance', 'data analysis', 'open source intelligence', 'Lebanon Israel'],
  authors: [{ name: 'ziopsyop.tech' }],
  openGraph: {
    title: 'ziopsyop.tech — The Peace Forum That Wasn\'t',
    description: 'Six years of data. One subreddit. A structured investigation.',
    url: 'https://zi0psy0p.tech',
    siteName: 'ziopsyop.tech',
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
                className="min-h-screen bg-background text-foreground antialiased font-default overflow-x-hidden !scrollbar-hide"
            >
                <Analytics />
                {children}
            </body>
        </html>
    );
};
