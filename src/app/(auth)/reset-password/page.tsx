import AuthPageShell from "@/components/pages/auth/AuthPageShell"
import ResetPasswordView from "@/components/pages/auth/reset-password/ResetPasswordView"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Reset password` },
    description: `Choose a new password for your ${serverEnv.APP_NAME} account and sign back in securely.`,
}

const Page = () => {
    return (
        <AuthPageShell>
            <ResetPasswordView />
        </AuthPageShell>
    )
}

export default Page
