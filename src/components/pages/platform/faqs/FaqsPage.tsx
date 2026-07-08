"use client"

import { CircleHelp } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import MarketingCtaSection from "../home/MarketingCtaSection"
import FaqContactSection from "./FaqContactSection"
import FaqListSection from "./FaqListSection"
import { clientEnv } from "@/env/client"

const FaqsPage = () => {
    return (
        <div className="bg-white">
            <MarketingPageHero
                badge={{
                    icon: CircleHelp,
                    label: "Straight answers — no marketing fog",
                    labelMobile: "Straight answers",
                }}
                lead="Questions answered with"
                accent="intellectual honesty"
                subtitle={`Before you commit your daily routine to ${clientEnv.APP_NAME}, you deserve clarity on content, billing, privacy, and how the platform behaves across devices.`}
                subtitleMobile="Clear answers on content, billing, privacy, and how the platform works."
                image="/images/pages/marketing/home/mobile-overview.webp"
                imageAlt="Serene overview of the Deenify experience"
                primaryCta={{ label: "Browse topics", href: "#faq-topics" }}
                secondaryCta={{ label: "View pricing", href: "/pricing" }}
            />
            <div id="faq-topics">
                <FaqListSection />
            </div>
            <FaqContactSection />
            <MarketingCtaSection />
        </div>
    )
}

export default FaqsPage
