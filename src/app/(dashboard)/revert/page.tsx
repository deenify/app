import { Metadata } from "next"
import RevertPage from "@/components/pages/dashboard/revert/RevertPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Revert Guide` },
    description: "Steps and resources for new Muslims and those exploring Islam.",
}

export default function Page() {
    return <RevertPage />
}
