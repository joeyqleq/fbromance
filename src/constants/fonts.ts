import localFont from "next/font/local";

export const body = localFont({
    src: [
        {
            path: "../../public/fonts/Satoshi-Light.woff2",
            weight: "300",
        },
        {
            path: "../../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
        },
        {
            path: "../../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
        },
        {
            path: "../../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
        },
        {
            path: "../../public/fonts/Satoshi-Black.woff2",
            weight: "900",
        },
    ],
    variable: "--font-body",
});

export const display = localFont({
    src: [
        {
            path: "../../public/fonts/Walsheim-Light.otf",
            weight: "300",
        },
        {
            path: "../../public/fonts/Walsheim-Regular.otf",
            weight: "400",
        },
        {
            path: "../../public/fonts/Walsheim-Medium.otf",
            weight: "500",
        },
        {
            path: "../../public/fonts/Walsheim-Bold.otf",
            weight: "700",
        },
        {
            path: "../../public/fonts/Walsheim-Black.otf",
            weight: "900",
        },
    ],
    variable: "--font-display",
});

export const mono = {
    variable: "",
};
