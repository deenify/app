import { ReactNode } from "react";
import AuthLayoutWrapper from "@/components/layout/auth/AuthLayoutWrapper";
interface AuthLayoutProps {
    readonly children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthLayoutWrapper>
            {children}
        </AuthLayoutWrapper>
    );
}
