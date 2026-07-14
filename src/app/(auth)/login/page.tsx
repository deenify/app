import AuthPageShell from "@/components/pages/auth/AuthPageShell"
import LoginView from "@/components/pages/auth/login/LoginView"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Sign in` },
    description: `Sign in to your ${serverEnv.APP_NAME} account to continue 
    your Quran, Hadith, guides and learning journey.`,
}

const Page = () => {
    return (
        <AuthPageShell>
            <LoginView />
        </AuthPageShell>
    )
}

export default Page
