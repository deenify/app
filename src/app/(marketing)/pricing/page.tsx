// app/pricing/page.tsx
import { Metadata } from "next"
import PricingPage from "@/components/pages/platform/pricing/PricingPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Pricing` },
    description:
        `Compare ${serverEnv.APP_NAME} plans — begin free with prayer, Quran, and dhikr. Upgrade for sync, depth, and community allocation.`,
}

const Page = () => {
    return <PricingPage />
}

export default Page
