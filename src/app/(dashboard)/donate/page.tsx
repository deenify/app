import { Metadata } from "next"
import DonatePage from "@/components/pages/dashboard/donate/DonatePage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Donate` },
    description: `Support ${serverEnv.APP_NAME} and help us build better tools for the ummah.`,
}

export default function Page() {
    return <DonatePage />
}
