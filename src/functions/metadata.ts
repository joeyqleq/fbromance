import { Metadata } from "next";
import { APP_DESCRIPTION, APP_DOMAIN, APP_NAME } from "@/constants/site";

interface MetadataProps {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    canonical?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

export const generateMetadata = ({
    title = APP_NAME,
    description = APP_DESCRIPTION,
    image = "/opengraph-image",
    icons,
    noIndex = false,
    keywords = [
        "ForbiddenBromance",
        "Reddit analysis",
        "propaganda analysis",
        "influence operations",
        "Lebanon Israel",
        "open source investigation",
        "evidence dashboard"
    ],
    author = "poi5on",
    twitterHandle = "@poi5on",
    type = "website",
    locale = "en_US",
    alternates = {},
    canonical = APP_DOMAIN,
    publishedTime,
    modifiedTime
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(APP_DOMAIN);
    const imageUrl = image ? new URL(image, metadataBase).toString() : null;

    return {
        metadataBase,
        title: {
            template: `%s | ${APP_NAME}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: APP_NAME,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons: icons ?? {
            icon: [{ url: "/icon", type: "image/png", sizes: "512x512" }],
            apple: [{ url: "/icon", sizes: "512x512", type: "image/png" }],
            shortcut: ["/icon"],
        },
        alternates: {
            canonical,
        },

        openGraph: {
            type,
            siteName: APP_NAME,
            title,
            description,
            ...(imageUrl && {
                images: [{
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title
                }]
            }),
            locale,
            alternateLocale: Object.keys(alternates),
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime })
        },

        twitter: {
            card: imageUrl ? "summary_large_image" : "summary",
            site: twitterHandle,
            creator: twitterHandle,
            title,
            description,
            ...(imageUrl && { images: [imageUrl] })
        },

        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        verification: {},
    };
};
