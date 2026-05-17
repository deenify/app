import { ReactNode } from "react";
import { Metadata } from "next";
import { defaultMeta } from "@/assets/meta";
import PlatformLayoutWrapper from "@/components/layout/platform/PlatformLayoutWrapper";


interface PlatformLayoutProps {
    readonly children: ReactNode
}

export const metadata: Metadata = defaultMeta


export default function PlatformLayout({ children }: PlatformLayoutProps) {
    return (
        <PlatformLayoutWrapper>
            {children}
        </PlatformLayoutWrapper>
    );
}
