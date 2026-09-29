import AuthPageShell from "@/components/pages/auth/AuthPageShell"
import RegisterView from "@/components/pages/auth/register/RegisterView"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Create Your Account` },
    description: `Create a free account to track Quran, Hadith, and personal growth in one calm place.`,
}

const Page = () => {
    return (
        <AuthPageShell className="relative flex w-full flex-1 flex-col items-center justify-center py-10">
            <RegisterView />
        </AuthPageShell>
    )
}

export default Page
