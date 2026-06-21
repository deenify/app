import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Pricing` },
    description: `Compare the different plans and features of ${serverEnv.APP_NAME}.`,
}

const PricingPage = () => {
    return (
        <div>PricingPage</div>
    )
}

export default PricingPage
