"use client"

import AuthSplitCard from "@/components/pages/auth/AuthSplitCard"
import { SIGNIN_HIGHLIGHTS } from "@/components/pages/auth/content"
import LoginPanel from "@/components/pages/auth/login/LoginPanel"

const LoginView = () => {
    return (
        <AuthSplitCard
            sideTitle="Keep your daily deen journey consistent"
            sideDescription="Log in to continue Quran reading, Hadith learning, and your personal growth tracking."
            highlights={SIGNIN_HIGHLIGHTS}
        >
            <LoginPanel />
        </AuthSplitCard>
    )
}

export default LoginView
