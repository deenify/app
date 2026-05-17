import { ReactNode } from "react";
import { Metadata } from "next";
import DashboardLayoutWrapper from "@/components/layout/dashboard/DashboardLayoutWrapper";

interface DashboardLayoutProps {
    readonly children: ReactNode
}

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage your Deenify dashboard, privacy, and preferences.",
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <DashboardLayoutWrapper>
            {children}
        </DashboardLayoutWrapper>
    );
}
