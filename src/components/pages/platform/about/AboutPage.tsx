"use client"

import { PenLine } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import MarketingCtaSection from "../generic/MarketingCtaSection"
import AboutBentoSection from "./AboutBentoSection"
import AboutCaseStudySection from "./AboutCaseStudySection"
import AboutTeamSection from "./AboutTeamSection"
import AboutTimelineSection from "./AboutTimelineSection"
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
                secondaryCta={{ label: "Read our story", href: "#story" }}
            />

            <AboutTimelineSection />
            <AboutCaseStudySection />
            <AboutBentoSection />
            <AboutTeamSection />
            <MarketingCtaSection
                lead={<>Join the people building <br className="block xs:hidden" /> with</>}
                accent="intention"
                subtitle={`If ${clientEnv.APP_NAME}'s mission resonates — start free, explore the dashboard, and make daily practice feel authored again.`}
                primaryCta={{ label: "Try the dashboard", href: "/dashboard" }}
                secondaryCta={{ label: "See features", href: "/features" }}
            />
        </div>
    )
}

export default AboutPage
