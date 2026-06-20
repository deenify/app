import "@/assets/globals.css";
import "@/env/index"

import type { Metadata } from "next";
import { cn } from "@/lib/utils/clsx";
import { ReactNode } from "react";
import { instrumentSerif, notoSans, notoSansArabic, redHatText } from "@/assets/fonts";
import { defaultMeta } from "@/assets/meta";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata: Metadata = {
    ...defaultMeta,
    viewport: {
        width: "device-width",
        initialScale: 1,
        userScalable: true,
        viewportFit: "cover",
    },
};

interface RootLayoutProptype {
    readonly children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProptype) {
    return (
        <html
            lang="en"
            className={cn(
                notoSans.variable,
                notoSansArabic.variable,
                redHatText.variable,
                instrumentSerif.variable
            )}
        >
            <body className={notoSans.className}>
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    );
}
