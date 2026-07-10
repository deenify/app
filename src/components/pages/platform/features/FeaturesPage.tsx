"use client"

import { Sparkles } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import MarketingSplitSection from "../generic/MarketingSplitSection"
import MarketingCtaSection from "../home/MarketingCtaSection"
import FeaturesModuleGrid from "./FeaturesModuleGrid"
import FeaturesRoutineSection from "./FeaturesRoutineSection"
import { FEATURE_SPLITS } from "./content"
import { clientEnv } from "@/env/client"

const FeaturesPage = () => {
    return (
        <div className="bg-white">
            <MarketingPageHero
                badge={{
                    icon: Sparkles,
                    label: "Your daily Islamic toolkit",
                    labelMobile: "Daily Islamic toolkit",
                }}
                lead="Everything you reach for,"
                accent="in one place"
                subtitle={`${clientEnv.APP_NAME} brings prayer, Quran, hadith, dhikr, and learning catalogs into a single dashboard — so you're not switching apps five times before Dhuhr.`}
                subtitleMobile="Prayer, Quran, dhikr, and more — one dashboard, not five apps."
                image="/images/pages/marketing/home/dashboard-banner.webp"
                imageAlt="Deenify dashboard overview"
                primaryCta={{ label: "Open dashboard", href: "/dashboard" }}
                secondaryCta={{ label: "Browse modules", href: "#modules" }}
            />

            <FeaturesModuleGrid />

            {FEATURE_SPLITS.map((section) => (
                <MarketingSplitSection
                    key={section.eyebrow}
                    eyebrow={section.eyebrow}
                    lead={section.lead}
                    accent={section.accent}
                    description={section.description}
                    points={section.points}
                    stats={section.stats}
                    image={section.image}
                    imageAlt={section.imageAlt}
                    imagePosition={section.imagePosition}
                    variant={section.variant}
                    theme={section.theme}
                    primaryCta={section.primaryCta}
                    secondaryCta={section.secondaryCta}
                />
            ))}

            <FeaturesRoutineSection />
            <MarketingCtaSection />
        </div>
    )
}

export default FeaturesPage
