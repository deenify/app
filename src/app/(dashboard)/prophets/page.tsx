import { Metadata } from "next"
import ProphetsPage from "@/components/pages/dashboard/prophets-lineage/ProphetsPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Prophetic Lineage` },
    description: "Explore the chain of prophets from Adam to Muhammad ﷺ.",
}

export default function Page() {
    return <ProphetsPage />
}
