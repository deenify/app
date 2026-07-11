"use client"

import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { clientEnv } from "@/env/client"
import { ABOUT_TIMELINE } from "./content"

const STAGGER_STEP = 0.12
const CONTENT_BASE_DELAY = 0.35

const AboutTimelineSection = () => {
    return (
        <section id="story" className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHead
                        lead="From frustration to"
                        accent="one dashboard"
                        subtitle={`Three chapters in how ${clientEnv.APP_NAME} went from a scattered-tool problem to a daily practice shell.`}
                    />
                </div>

                <div className="mx-auto mt-12 max-w-2xl sm:mt-16">
                    {ABOUT_TIMELINE.map((milestone, index) => {
                        const isLast = index === ABOUT_TIMELINE.length - 1

                        return (
                            <Stagger
                                key={milestone.title}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={CONTENT_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.85}
                            >
                                <div className="relative flex gap-6 pb-10 sm:gap-8 sm:pb-12">
                                    {!isLast && (
                                        <span
                                            className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-emerald-200 sm:left-[13px]"
                                            aria-hidden
                                        />
                                    )}

                                    <span
                                        className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center 
                                        rounded-full border-2 border-emerald-500 bg-white sm:h-7 sm:w-7"
                                    >
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-heading text-lg font-semibold text-gray-900 sm:text-xl">
                                            {milestone.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </Stagger>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default AboutTimelineSection
