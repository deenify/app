// app/features/page.tsx
import { Metadata } from "next"
import FeaturesPage from "@/components/pages/platform/features/FeaturesPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Features` },
    description:
        `Explore ${serverEnv.APP_NAME} features — prayer, Quran, catalogs, dhikr, and fourteen modules in one coherent dashboard.`,
}

const Page = () => {
    return <FeaturesPage />
}

export default Page
