"use client"

import AuthSplitCard from "@/components/pages/auth/AuthSplitCard"
import { RESET_PASSWORD_HIGHLIGHTS } from "@/components/pages/auth/content"
import ResetPasswordForm from "@/components/pages/auth/reset-password/ResetPasswordForm"

const ResetPasswordView = () => {
    return (
        <AuthSplitCard
            sideTitle="Set a new password and return with ease"
            sideDescription="Pick something memorable and strong — then you are one sign-in away from your dashboard."
            highlights={RESET_PASSWORD_HIGHLIGHTS}
        >
            <ResetPasswordForm />
        </AuthSplitCard>
    )
}

export default ResetPasswordView
