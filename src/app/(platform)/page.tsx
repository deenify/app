// app/page.tsx

import {
    FeaturesSectionFeatures, HeroCommunityStats,
    WhyChooseUsStats,
    WhyChooseUsFeatures
} from "@/components/pages/platform/home/content"
import FeatureSection from "@/components/pages/platform/home/FeatureSection"
import HeroSection from "@/components/pages/platform/home/HeroSection"
import YourProgressSection from "@/components/pages/platform/home/YourProgressSection"
import LearnGrowSection from "@/components/pages/platform/home/LearnGrowSection"
import TestimonialSection from "@/components/pages/platform/home/TestimonialSection"
import WhyChooseUsSection from "@/components/pages/platform/home/WhyChooseUsSection"
import CallToActionSection from "@/components/pages/platform/home/CallToActionSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify" },
    description: `Welcome to Deenify - Your daily Islamic lifestyle app — 
    Quran, Hadith, Adhan, Qibla, and more.`,
}

const HomePage = () => {
    return (
        <div>
            <HeroSection COMMUNITY_STATS={HeroCommunityStats} />
            <FeatureSection FEATURES={FeaturesSectionFeatures} />
            <YourProgressSection />
            <LearnGrowSection />
            <TestimonialSection />
            <WhyChooseUsSection
                FEATURES={WhyChooseUsFeatures}
                STATS={WhyChooseUsStats}
            />
            <CallToActionSection />
        </div>
    )
}

export default HomePage