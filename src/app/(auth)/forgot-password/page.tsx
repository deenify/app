import AuthPageShell from "@/components/pages/auth/AuthPageShell"
import ForgotPasswordView from "@/components/pages/auth/forgot-password/ForgotPasswordView"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Forgot password` },
    description: `Reset your ${serverEnv.APP_NAME} password securely and get back to your learning journey.`,
}

const Page = () => {
    return (
        <AuthPageShell>
            <ForgotPasswordView />
        </AuthPageShell>
    )
}

export default Page
