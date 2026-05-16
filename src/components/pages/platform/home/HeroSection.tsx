"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import { BookOpen, Clock } from "lucide-react";
import { HeroCommunityStatType } from "./content";

const HeroSection = ({ COMMUNITY_STATS }: { COMMUNITY_STATS: HeroCommunityStatType[] }) => {

    return (
        <section className="relative bg-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30" />

            {/* Prominent animated background patterns */}
            <motion.div
                className="absolute top-20 right-20 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-40"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-40"
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Content  */}
            <div className="container relative py-20 md:py-28">
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <p className="text-5xl md:text-7xl text-emerald-700 mb-8" style={{ fontFamily: "serif" }}>
                            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </p>
                        <p className="text-sm md:text-base text-gray-600 italic">
                            In the name of Allah, the Most Gracious, the Most Merciful
                        </p>
                    </div>
                </div>

                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-gray-900 text-3xl md:text-4xl font-heading mb-4">
                        Your Complete Islamic Companion
                    </h1>
                    <p className="mb-8 max-w-3xl mx-auto text-sm md:text-base text-gray-600">
                        Strengthen your faith with accurate prayer times, complete Quran access, authentic Hadith
                        collections, and essential Islamic tools - all in one beautifully designed application.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="default"
                            className="font-normal gap-1"
                            href="/quran"
                        >
                            <BookOpen className="mr-2 h-5 w-5" />
                            Read Quran
                        </Button>
                        <Button
                            size="lg"
                            variant="outline-emerald"
                            className="font-normal gap-1"
                            href="/prayer"
                        >
                            <Clock className="mr-2 h-5 w-5" />
                            View Prayer Times
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                    {COMMUNITY_STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center p-4 bg-white/80 backdrop-blur rounded-lg shadow-sm border border-emerald-100"
                        >
                            <div className="text-2xl font-semibold font-heading text-emerald-700">{stat.value}</div>
                            <div className="text-sm text-gray-600 tracking-tighter">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection