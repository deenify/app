import { ReactNode } from "react";
import AuthLayoutWrapper from "@/components/layout/auth/AuthLayoutWrapper";
interface AuthLayoutProps {
    readonly children: ReactNode
}

<<<<<<< Updated upstream
export const metadata: Metadata = {
    title: "Deenify - Sign in or Sign up",
    description: "Sign in to your Deenify account or create a new one to continue your Quran, Hadith, guides and learning journey.",
}


=======
>>>>>>> Stashed changes
export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthLayoutWrapper>
            {children}
        </AuthLayoutWrapper>
    );
}
