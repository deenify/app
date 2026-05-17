import { ReactNode } from "react";
import PlatformLayoutWrapper from "@/components/layout/platform/PlatformLayoutWrapper";
interface PlatformLayoutProps {
    readonly children: ReactNode
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
    return (
        <PlatformLayoutWrapper>
            {children}
        </PlatformLayoutWrapper>
    );
}
