"use client"

import { cn } from "@/lib/utils/clsx"
import FadeEdge from "@/components/shared/FadeEdge"
import InfiniteMarquee from "@/components/shared/InfiniteMarquee"
import { TRUST_BADGES } from "./content"

const MarketingTrustSection = () => {

    return (
        <section className="py-10 sm:py-12">
            <div className="container text-center">
                <p className="text-sm text-gray-500">
                    More than <span className="font-medium text-gray-700">500+</span> communities
                    trust us with their daily practice
                </p>
            </div>

            <div className="container-wide mt-8">
                <div className="relative overflow-hidden py-2 [&_.marquee-track]:gap-10 sm:[&_.marquee-track]:gap-14">
                    <FadeEdge
                        fadeDirection="both"
                        hideBelow="md"
                        classNames={{
                            left: "from-white via-white/90 to-transparent",
                            right: "from-white via-white/90 to-transparent",
                        }}
                    />
                    <InfiniteMarquee
                        content={TRUST_BADGES.map((badge) => (
                            <div
                                key={badge.name}
                                className="group/badge flex shrink-0 cursor-default items-center gap-3 px-1 py-2"
                            >
                                <div
                                    className={cn(
                                        "uppercase tracking-wide grayscale opacity-[0.35] transition-all duration-500",
                                        "flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold",
                                        "ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/badge:grayscale-0",
                                        "group-hover/badge:opacity-100",
                                        badge.bg,
                                        badge.fg
                                    )}
                                >
                                    {badge.abbr}
                                </div>
                                <span className="font-heading text-base font-semibold text-gray-300/90 
                            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] 
                            group-hover/badge:text-gray-800">
                                    {badge.name}
                                </span>
                            </div>
                        ))}
                        speedInSecond={160}
                        disableOnInteraction
                    />
                </div>
            </div>
        </section>
    )
}

export default MarketingTrustSection
