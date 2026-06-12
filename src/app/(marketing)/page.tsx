import { Metadata } from "next"
import MarketingAboutSection from "@/components/pages/platform/home/MarketingAboutSection"
import MarketingCtaSection from "@/components/pages/platform/home/MarketingCtaSection"
import MarketingFaqSection from "@/components/pages/platform/home/MarketingFaqSection"
import MarketingFeaturesSection from "@/components/pages/platform/home/MarketingFeaturesSection"
import MarketingHeroSection from "@/components/pages/platform/home/MarketingHeroSection"
import MarketingPricingSection from "@/components/pages/platform/home/MarketingPricingSection"
import MarketingTestimonialsSection from "@/components/pages/platform/home/MarketingTestimonialsSection"
import MarketingTrustSection from "@/components/pages/platform/home/MarketingTrustSection"
import MarketingWorkspaceSection from "@/components/pages/platform/home/MarketingWorkspaceSection"

export const metadata: Metadata = {
    title: { absolute: "Deenify — Your Complete Islamic Companion" },
    description:
        "Prayer times, Quran, dhikr, and curated Islamic learning — unified in one thoughtfully designed dashboard.",
}

const HomePage = () => {
    return (
        <div className="bg-white">
            <MarketingHeroSection />
            <MarketingTrustSection />
            <MarketingFeaturesSection />
            <MarketingAboutSection />
            <MarketingWorkspaceSection />
            <MarketingTestimonialsSection />
            <MarketingPricingSection />
            <MarketingFaqSection />
            <MarketingCtaSection />
        </div>
    )
}

export default HomePage
