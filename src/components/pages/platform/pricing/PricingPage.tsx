"use client"

import { Tag } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import MarketingPricingSection from "../home/MarketingPricingSection"
import MarketingCtaSection from "../home/MarketingCtaSection"
import PricingComparisonSection from "./PricingComparisonSection"
import PricingNotesSection from "./PricingNotesSection"
import { clientEnv } from "@/env/client"

const PricingPage = () => {
    return (
        <div className="bg-white">
            <MarketingPageHero
                badge={{
                    icon: Tag,
                    label: "Transparent plans — no surprise tiers",
                    labelMobile: "Transparent plans",
                }}
                lead="Invest in depth,"
                accent="not distraction"
                subtitle={`${clientEnv.APP_NAME} keeps worship essentials free. Paid tiers unlock sync, filters, and community allocation — priced for individuals and organizations who want to sustain the work.`}
                subtitleMobile={`Essentials stay free. Paid tiers unlock depth and help sustain ${clientEnv.APP_NAME}.`}
                image="/images/pages/marketing/home/dashboard-banner.webp"
                imageAlt="Deenify dashboard overview on a serene backdrop"
                primaryCta={{ label: "Start free", href: "/register" }}
                secondaryCta={{ label: "View comparison", href: "#comparison" }}
            />
            <MarketingPricingSection />
            <div id="comparison">
                <PricingComparisonSection />
            </div>
            <PricingNotesSection />
            <MarketingCtaSection />
        </div>
    )
}

export default PricingPage
