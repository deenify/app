"use client";

import {
    FeaturesSectionFeatures, HeroCommunityStats,
    YourProgressTrackingPointStats,
    YourProgressWeeklyActivity,
    YourProgressActivityDistribution,
    YourProgressTodayGoals,
    LearnGrowPages,
    TESTIMONIALS,
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

const HomePage = () => {
    return (
        <div>
            <HeroSection COMMUNITY_STATS={HeroCommunityStats} />
            <FeatureSection FEATURES={FeaturesSectionFeatures} />
            <YourProgressSection
                TrackingPointStats={YourProgressTrackingPointStats}
                WeeklyActivity={YourProgressWeeklyActivity}
                ActivityDistribution={YourProgressActivityDistribution}
                TodayGoals={YourProgressTodayGoals}
            />
            <LearnGrowSection LearnGrowPages={LearnGrowPages} />
            <TestimonialSection TESTIMONIALS={TESTIMONIALS} />
            <WhyChooseUsSection
                FEATURES={WhyChooseUsFeatures}
                STATS={WhyChooseUsStats}
            />
            <CallToActionSection />
        </div>
    )
}

export default HomePage