"use client"

import { Sparkles } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import MarketingCtaSection from "../generic/MarketingCtaSection"
import FeaturesBentoSection from "./FeaturesBentoSection"
import FeaturesJourneySection from "./FeaturesJourneySection"
import FeaturesTourStackSection from "./FeaturesTourStackSection"
import { clientEnv } from "@/env/client"

const FeaturesPage = () => {
    return (
        <div className="bg-white">
            <MarketingPageHero
                badge={{
                    icon: Sparkles,
                    label: "14 modules · one dashboard · zero app switching",
                    labelMobile: "14 modules · one dashboard",
                }}
                lead="Your whole routine,"
                accent="one app"
                subtitle={`${clientEnv.APP_NAME} replaces the scattered apps on your home screen — prayer, Quran, hadith, dhikr, and learning catalogs in a single dashboard you open every day.`}
                subtitleMobile="Prayer, Quran, dhikr, and catalogs — one dashboard, not five apps."
                image="/images/pages/marketing/home/dashboard-banner.webp"
                imageAlt="Deenify dashboard overview"
                primaryCta={{ label: "Open dashboard", href: "/dashboard" }}
                secondaryCta={{ label: "Take the tour", href: "#tour" }}
            />

            <FeaturesTourStackSection />
            <FeaturesBentoSection />
            <FeaturesJourneySection />
            <MarketingCtaSection
                lead={<>Ready to open <br className="block xs:hidden" /> every</>}
                accent="module?"
                subtitle={`Worship, Quran, and catalogs are waiting in one sidebar — open ${clientEnv.APP_NAME} and start with the tool you reach for first.`}
                primaryCta={{ label: "Open dashboard", href: "/dashboard" }}
                secondaryCta={{ label: "Create free account", href: "/register" }}
            />
        </div>
    )
}

export default FeaturesPage
