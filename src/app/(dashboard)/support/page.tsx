import { Metadata } from "next"
import SupportPage from "@/components/pages/dashboard/support/SupportPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Support` },
    description: `Get help, browse FAQs, and contact the ${serverEnv.APP_NAME} support team.`,
}

export default function Page() {
    return <SupportPage />
}
