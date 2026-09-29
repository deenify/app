import { ReactNode } from "react";
import DashboardLayoutWrapper from "@/components/layout/dashboard/DashboardLayoutWrapper";

interface DashboardLayoutProps {
    readonly children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <DashboardLayoutWrapper>
            {children}
        </DashboardLayoutWrapper>
    );
}
