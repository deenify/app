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
} from "@/components/pages/home/content"
import FeatureSection from "@/components/pages/home/FeatureSection"
import HeroSection from "@/components/pages/home/HeroSection"
import YourProgressSection from "@/components/pages/home/YourProgressSection"
import LearnGrowSection from "@/components/pages/home/LearnGrowSection"
import TestimonialSection from "@/components/pages/home/TestimonialSection"
import WhyChooseUsSection from "@/components/pages/home/WhyChooseUsSection"
import CallToActionSection from "@/components/pages/home/CallToActionSection"

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