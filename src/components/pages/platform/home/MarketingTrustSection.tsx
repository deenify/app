"use client"

import { cn } from "@/lib/utils/clsx"
import FadeEdge from "@/components/shared/FadeEdge"
import InfiniteMarquee from "@/components/shared/InfiniteMarquee"
import { TRUST_BADGES } from "./content"

const MarketingTrustSection = () => (
    <section className="py-10 sm:py-12">
        <div className="container text-center">
            <p className="text-sm text-gray-500">
                More than <span className="font-medium text-gray-700">500+</span> communities
                trust us with their daily practice
            </p>
        </div>

        <div className="container-marketing-wide mt-8">
            <div className="relative overflow-hidden py-2">
                <FadeEdge
                    fadeDirection="both"
                    hideBelow="md"
                    classNames={{
                        left: "from-white via-white/90 to-transparent",
                        right: "from-white via-white/90 to-transparent",
                    }}
                />
                <InfiniteMarquee
                    pauseOnHover
                    duration="trust"
                    gapClassName="gap-10 sm:gap-14"
                    stripPadClassName="pr-10 sm:pr-14"
                >
                    {TRUST_BADGES.map((badge) => (
                        <div
                            key={badge.name}
                            className="group/badge flex shrink-0 cursor-default items-center gap-3 px-1 py-2"
                        >
                            <div
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-wide grayscale opacity-[0.35] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/badge:grayscale-0 group-hover/badge:opacity-100",
                                    badge.bg,
                                    badge.fg
                                )}
                            >
                                {badge.abbr}
                            </div>
                            <span className="font-heading text-base font-semibold text-gray-300/90 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/badge:text-gray-800">
                                {badge.name}
                            </span>
                        </div>
                    ))}
                </InfiniteMarquee>
            </div>
        </div>
    </section>
)

export default MarketingTrustSection
