"use client";

import {
    QuranHeroStats,
    QuranQuickAccess,
    QuranFeatures,
    QuranSurahs,
} from "@/components/pages/quran/content"
import HeroSection from "@/components/pages/quran/HeroSection"
import SearchSection from "@/components/pages/quran/SearchSection"
import QuickAccessSection from "@/components/pages/quran/QuickAccessSection"
import SurahListSection from "@/components/pages/quran/SurahListSection"
import FeaturesSection from "@/components/pages/quran/FeaturesSection"

const QuranPage = () => {
    return (
        <div>
            <HeroSection STATS={QuranHeroStats} />
            <SearchSection />
            <QuickAccessSection ITEMS={QuranQuickAccess} />
            <SurahListSection SURAHS={QuranSurahs} />
            <FeaturesSection FEATURES={QuranFeatures} />
        </div>
    )
}

export default QuranPage
