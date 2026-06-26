import { clientEnv } from "@/env/client";
import type { Metadata } from "next";

const ogImage = `${clientEnv.APP_URL}/images/generic/og.png`;

export const defaultMeta: Metadata = {
    title: {
        default: clientEnv.APP_NAME,
        template: `%s — ${clientEnv.APP_DESCRIPTION}`,
    },
    description: clientEnv.APP_DESCRIPTION,
    keywords: [
        clientEnv.APP_NAME, "Quran", "Hadith", "Guides", "Learning", "Islam", "Islamic",
        "Islamic Education", "Islamic Learning", "Islamic Education", "Islamic Learning",
        "Quran", "Hadith", "Adhan", "Islamic App", "Hijri", "Muslim",
        `signin or signup -s ${clientEnv.APP_NAME}`
    ],
    themeColor: "#009966",
    metadataBase: new URL(clientEnv.APP_URL),
    openGraph: {
        title: clientEnv.APP_NAME,
        description: clientEnv.APP_DESCRIPTION,
        url: clientEnv.APP_URL,
        siteName: clientEnv.APP_NAME,
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: `${clientEnv.APP_NAME} OG Image`,
                type: "image/png",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: clientEnv.APP_NAME,
        description: clientEnv.APP_DESCRIPTION,
        creator: clientEnv.APP_TWITTER,
        site: clientEnv.API_URL,
        images: [ogImage],
    },
    applicationName: clientEnv.APP_NAME,
    appleWebApp: {
        title: clientEnv.APP_NAME,
        statusBarStyle: "black-translucent",
    },
    manifest: "/manifest.webmanifest",
    icons: {
        icon: [
            { url: "/icons/favicon.ico", sizes: "any" },
            { url: "/icons/favicon.ico", type: "image/ico" },
        ],
        apple: "/icons/apple-touch-icon.png",
    },
};
