// app/layout.tsx

import "@/assets/globals.css";
import "@/env/client";
import "@/env/server";

import type { Metadata } from "next";
import { cn } from "@/lib/utils/clsx";
import { ReactNode } from "react";
import {
    instrumentSerif, notoSans,
    notoSansArabic, redHatText, moonwalk
} from "@/assets/fonts";
import { defaultMeta } from "@/assets/meta";
import LayoutWrapper from "@/components/layout/LayoutWrapper";


export const viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
}
export const metadata: Metadata = defaultMeta

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
                instrumentSerif.variable,
                moonwalk.variable,
            )}
        >
            <body className={notoSans.className}>
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    );
}
