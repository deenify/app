"use client"

import { CheckCircle2 } from "lucide-react"
import MarketingSectionHead from "../home/MarketingSectionHead"
import Stagger from "@/components/shared/motion/Stagger"
import { clientEnv } from "@/env/client"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { ABOUT_CRAFT_METRICS, ABOUT_CRAFT_POINTS } from "./content"

const POINTS_BASE_DELAY = 0.55
const STAGGER_STEP = 0.12

const AboutCaseStudySection = () => {
    const isXsUp = useBreakpoint("xs", "up")
    const isSmUp = useBreakpoint("sm", "up")

    return (
        <section className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <MarketingSectionHead
                            lead={isXsUp ? "The craft behind" : "Craft behind"}
                            accent="the dashboard"
                            subtitle={
                                isSmUp
                                    ? `${clientEnv.APP_NAME} treats prayer, Quran, and learning as interconnected disciplines — with the visual discipline of a premium product studio, not a feature checklist.`
                                    : `${clientEnv.APP_NAME} treats prayer, Quran, and learning as one authored product.`
                            }
                            align="left"
                        />

                        <ul className="mt-8 space-y-3">
                            {ABOUT_CRAFT_POINTS.map((point, index) => (
                                <Stagger
                                    key={point}
                                    index={index}
                                    animation="while_in_view"
                                    variant="up"
                                    baseDelay={POINTS_BASE_DELAY}
                                    delay={STAGGER_STEP}
                                    duration={0.85}
                                >
                                    <li className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        {point}
                                    </li>
                                </Stagger>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        {ABOUT_CRAFT_METRICS.map((stat, index) => (
                            <Stagger
                                key={stat.label}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                delay={0.07}
                                duration={0.5}
                            >
                                <div className="rounded-md border border-gray-100 bg-white p-3.5 text-center shadow-sm sm:rounded-2xl sm:p-6">
                                    <p className="font-heading text-3xl font-semibold text-emerald-700">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </Stagger>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutCaseStudySection
