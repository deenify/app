"use client"

import { useState } from "react"
import MarketingSectionHead from "./MarketingSectionHead"
import { PRICING_PLANS } from "./content"
import Stagger from "@/components/shared/motion/Stagger"
import PricingCard from "../generic/PricingCard"

const CONTENT_BASE_DELAY = 0.55
const STAGGER_STEP = 0.12


const MarketingPricingSection = () => {
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

    return (
        <section id="pricing" className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHead
                        lead="Transparent"
                        accent="pricing"
                        subtitle="Begin without friction. Upgrade when you want deeper libraries and a direct hand in what we build next."
                    />
                </div>

                <div className="mx-auto mt-10 grid max-w-xl lg:max-w-none gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
                    {PRICING_PLANS.map((plan, index) => (
                        <Stagger
                            key={plan.name}
                            index={index}
                            animation="while_in_view"
                            variant="up"
                            baseDelay={CONTENT_BASE_DELAY}
                            delay={STAGGER_STEP}
                            duration={0.85}
                        >
                            <PricingCard
                                plan={plan}
                                expanded={expandedPlan === plan.name}
                                onToggle={() =>
                                    setExpandedPlan((current) =>
                                        current === plan.name ? null : plan.name
                                    )
                                }
                            />
                        </Stagger>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingPricingSection
