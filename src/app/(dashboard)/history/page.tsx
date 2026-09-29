import { Metadata } from "next"
import HistoryPage from "@/components/pages/dashboard/history/HistoryPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Islamic History` },
    description: "Explore key moments in Islamic history in simple, short reads.",
}

export default function Page() {
    return <HistoryPage />
}
