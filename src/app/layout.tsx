import "@/styles/globals.css";
import { cn, generateMetadata } from "@/functions";
import { body, display, mono } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/global/providers";
import { PoisonAnalytics } from "@/components/poison/analytics";

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-default overflow-x-hidden !scrollbar-hide selection:bg-primary/30 selection:text-foreground",
                    body.variable,
                    display.variable,
                    mono.variable,
                )}
            >
                <Toaster
                    richColors
                    theme="dark"
                    position="top-right"
                />
                <Providers>
                    <PoisonAnalytics />
                    {children}
                </Providers>
            </body>
        </html>
    );
};
