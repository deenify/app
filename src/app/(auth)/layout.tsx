import { ReactNode } from "react";
import AuthLayoutShell from "@/components/pages/auth/AuthLayoutShell";
import { Metadata } from "next";

interface AuthLayoutProptype { readonly children: ReactNode }

export const metadata: Metadata = {
    title: "Deenify - Sign in or Sign up",
    description: "Sign in to your Deenify account or create a new one to continue your Quran, Hadith, guides and learning journey.",
}

export default function AuthLayout({ children }: AuthLayoutProptype) {
    return (
        <AuthLayoutShell>
            {children}
        </AuthLayoutShell>
    );
}
