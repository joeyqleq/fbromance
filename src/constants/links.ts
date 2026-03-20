import { ChartPieIcon, LucideIcon, ScanSearchIcon, ShieldAlertIcon, UsersIcon, RadioTowerIcon, FolderSearch2Icon, Rows3Icon, LanguagesIcon, RadarIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/app",
        label: "Overview",
        icon: ChartPieIcon,
    },
    {
        href: "/app/timeline",
        label: "Timeline",
        icon: Rows3Icon
    },
    {
        href: "/app/narratives",
        label: "Narratives",
        icon: ScanSearchIcon
    },
    {
        href: "/app/users",
        label: "Users",
        icon: UsersIcon
    },
    {
        href: "/app/events",
        label: "Events",
        icon: RadioTowerIcon
    },
    {
        href: "/app/hebrew",
        label: "Hebrew",
        icon: LanguagesIcon
    },
    {
        href: "/app/sources",
        label: "Sources",
        icon: RadarIcon
    },
    {
        href: "/app/rhetoric",
        label: "Rhetoric",
        icon: ShieldAlertIcon
    },
    {
        href: "/app/evidence",
        label: "Evidence",
        icon: FolderSearch2Icon
    },
];

export const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { name: "Home", href: "/" },
            { name: "Features", href: "/" },
            { name: "Pricing", href: "/" },
            { name: "Contact", href: "/" },
            { name: "Download", href: "/" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/help-center" },
            { name: "Community", href: "/community" },
            { name: "Guides", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "API Docs", href: "/api-docs" },
            { name: "SDKs", href: "/sdks" },
            { name: "Tools", href: "/tools" },
            { name: "Open Source", href: "/open-source" },
            { name: "Changelog", href: "/changelog" },
        ],
    },
];
