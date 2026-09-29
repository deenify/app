"use client"

import AuthSplitCard from "@/components/pages/auth/AuthSplitCard"
import { FORGOT_PASSWORD_HIGHLIGHTS } from "@/components/pages/auth/content"
import ForgotPasswordForm from "@/components/pages/auth/forgot-password/ForgotPasswordForm"

const ForgotPasswordView = () => {
    return (
        <AuthSplitCard
            sideTitle="Recover access without losing your place"
            sideDescription="Enter the email on your account and we will send a secure link to choose a new password."
            highlights={FORGOT_PASSWORD_HIGHLIGHTS}
        >
            <ForgotPasswordForm />
        </AuthSplitCard>
    )
}

export default ForgotPasswordView
