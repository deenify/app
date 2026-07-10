"use client"

import { PenLine } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import MarketingSplitSection from "../generic/MarketingSplitSection"
import MarketingCtaSection from "../home/MarketingCtaSection"
import AboutCommunitySection from "./AboutCommunitySection"
import AboutPromiseSection from "./AboutPromiseSection"
import { ABOUT_SPLITS } from "./content"
import { clientEnv } from "@/env/client"

const AboutPage = () => {
    return (
        <div className="bg-white">
            <MarketingPageHero
                badge={{
                    icon: PenLine,
                    label: "Built by Muslims, for daily practice",
                    labelMobile: "Built for daily practice",
                }}
                lead="The app we wished"
                accent="already existed"
                subtitle={`${clientEnv.APP_NAME} started as a frustration with scattered tools — and became a dashboard we actually open between prayers, not just during Ramadan.`}
                subtitleMobile="One dashboard for the tools you actually use every day."
                image="/images/pages/marketing/home/mobile-overview.webp"
                imageAlt="Deenify on mobile"
                primaryCta={{ label: "Try the dashboard", href: "/dashboard" }}
                secondaryCta={{ label: "See features", href: "/features" }}
            />

            <MarketingSplitSection
                eyebrow={ABOUT_SPLITS[0].eyebrow}
                lead={ABOUT_SPLITS[0].lead}
                accent={ABOUT_SPLITS[0].accent}
                description={ABOUT_SPLITS[0].description}
                points={ABOUT_SPLITS[0].points}
                image={ABOUT_SPLITS[0].image}
                imageAlt={ABOUT_SPLITS[0].imageAlt}
                imagePosition={ABOUT_SPLITS[0].imagePosition}
                variant={ABOUT_SPLITS[0].variant}
                theme={ABOUT_SPLITS[0].theme}
                primaryCta={ABOUT_SPLITS[0].primaryCta}
            />

            <AboutCommunitySection />

            <MarketingSplitSection
                eyebrow={ABOUT_SPLITS[1].eyebrow}
                lead={ABOUT_SPLITS[1].lead}
                accent={ABOUT_SPLITS[1].accent}
                description={ABOUT_SPLITS[1].description}
                points={ABOUT_SPLITS[1].points}
                image={ABOUT_SPLITS[1].image}
                imageAlt={ABOUT_SPLITS[1].imageAlt}
                imagePosition={ABOUT_SPLITS[1].imagePosition}
                variant={ABOUT_SPLITS[1].variant}
                theme={ABOUT_SPLITS[1].theme}
            />

            <MarketingSplitSection
                eyebrow={ABOUT_SPLITS[2].eyebrow}
                lead={ABOUT_SPLITS[2].lead}
                accent={ABOUT_SPLITS[2].accent}
                description={ABOUT_SPLITS[2].description}
                points={ABOUT_SPLITS[2].points}
                image={ABOUT_SPLITS[2].image}
                imageAlt={ABOUT_SPLITS[2].imageAlt}
                imagePosition={ABOUT_SPLITS[2].imagePosition}
                variant={ABOUT_SPLITS[2].variant}
                theme={ABOUT_SPLITS[2].theme}
                primaryCta={ABOUT_SPLITS[2].primaryCta}
            />

            <AboutPromiseSection />
            <MarketingCtaSection />
        </div>
    )
}

export default AboutPage
