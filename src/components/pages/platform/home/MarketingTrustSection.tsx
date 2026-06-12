"use client"

import { cn } from "@/lib/utils/clsx"
import { TRUST_BADGES } from "./content"
import FadeEdge from "@/components/shared/FadeEdge"

const MarketingTrustSection = () => {
    const track = [...TRUST_BADGES, ...TRUST_BADGES]

    return (
        <section className="py-10 sm:py-12">
            <div className="container text-center">
                <p className="text-sm text-gray-500">
                    More than <span className="font-medium text-gray-700">500+</span>
                    communitie
                    trust us with their daily practice
                </p>
            </div>

            <div className="container-marketing-wide mt-8">
                <div className="group/trust relative overflow-hidden py-2">

                    <FadeEdge
                        fadeDirection="both"
                        classNames={{
                            left: "from-white via-white/90 to-transparent",
                            right: "from-white via-white/90 to-transparent",
                        }}
                    />

                    {/* trust slide  */}
                    <div
                        className="flex w-max animate-trust-marquee gap-10 will-change-transform 
                        motion-reduce:animate-none group-hover/trust:[animation-play-state:paused] sm:gap-14"
                        style={{ transform: "translate3d(0,0,0)" }}
                    >
                        {track.map((badge, index) => (
                            <div
                                key={`${badge.name}-${index}`}
                                className="group/badge flex shrink-0 cursor-default items-center gap-3 px-1 py-2"
                            >
                                <div
                                    className={cn(
                                        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                        "font-bold uppercase tracking-wide grayscale opacity-[0.35]",
                                        "flex h-9 w-9 items-center justify-center rounded-lg text-[10px]",
                                        "group-hover/badge:grayscale-0 group-hover/badge:opacity-100",
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingTrustSection
