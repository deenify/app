import { Metadata } from "next"
import SupplicationsPage from "@/components/pages/dashboard/supplications/SupplicationsPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Supplications` },
    description: "Curated duʿāʾ for salah, travel, gratitude, and difficult moments.",
}

export default function Page() {
    return <SupplicationsPage />
}
