"use client"

import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import { clientEnv } from "@/env/client"
import { ABOUT_STATS } from "./content"

const AboutCommunitySection = () => {
    return (
        <section className="border-y border-emerald-100/80 bg-emerald-50/40 py-14 sm:py-16">
            <div className="container">
                <div className="mx-auto grid max-w-4xl items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                    <Animate variant="up" animate="while_in_view" delay={0.3} duration={0.9}>
                        <div className="rounded-2xl border border-white/80 bg-white p-6 shadow-sm sm:p-7">
                            <p className="font-accent text-base italic leading-relaxed text-emerald-800 sm:text-lg">
                                &ldquo;We did not set out to build another Islamic app. We set out to build the one we
                                wished existed when we opened our phones between prayers.&rdquo;
                            </p>
                            <p className="mt-4 text-sm text-gray-500">— The {clientEnv.APP_NAME} team</p>
                        </div>
                    </Animate>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {ABOUT_STATS.map((stat, index) => (
                            <Stagger
                                key={stat.label}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={0.35}
                                delay={0.08}
                                duration={0.8}
                            >
                                <div className="rounded-xl border border-white/90 bg-white/90 px-4 py-4 text-center 
                                shadow-sm backdrop-blur-sm sm:py-5">
                                    <p className="font-heading text-xl font-semibold text-emerald-700 sm:text-2xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-600 sm:text-sm">{stat.label}</p>
                                </div>
                            </Stagger>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutCommunitySection
