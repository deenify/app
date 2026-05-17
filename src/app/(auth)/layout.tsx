
import { ReactNode } from "react";
import { Metadata } from "next";
import AuthLayoutWrapper from "@/components/layout/auth/AuthLayoutWrapper";

interface AuthLayoutProps {
    readonly children: ReactNode
}

export const metadata: Metadata = {
    title: { absolute: "Deenify - Sign in or Sign up" },
    description: `Sign in to your Deenify account or create a new one to continue your Quran, 
    Hadith, guides and learning journey.`,
}


export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthLayoutWrapper>
            {children}
        </AuthLayoutWrapper>
    );
}
