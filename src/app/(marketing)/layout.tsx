import { ReactNode } from "react";
import { Metadata } from "next";
import { defaultMeta } from "@/assets/meta";
import MarketingLayoutWrapper from "@/components/layout/marketing/MarketingLayoutWrapper";


interface MarketingLayoutWrapperProps {
    readonly children: ReactNode
}

export const metadata: Metadata = defaultMeta


export default function PlatformLayout({ children }: MarketingLayoutWrapperProps) {
    return (
        <MarketingLayoutWrapper>
            {children}
        </MarketingLayoutWrapper>
    );
}
