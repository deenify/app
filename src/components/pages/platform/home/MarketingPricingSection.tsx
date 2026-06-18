"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { PRICING_PLANS, type PricingPlan } from "./content"
import { Badge } from "@/components/ui/badge"


type PricingCardProps = {
    plan: PricingPlan
    expanded: boolean
    onToggle: () => void
}

const PricingCard = ({ plan, expanded, onToggle }: PricingCardProps) => {
    return (
        <article className="relative flex flex-col rounded-md border border-gray-200 bg-marketing-card p-5 sm:p-6 lg:p-7">
            {plan.highlighted && (
                <Badge
                    variant="emerald"
                    className="absolute right-4 top-4 bg-emerald-600 text-white py-1 
                px-4 text-[10px] font-medium uppercase tracking-tigh font-heading rounded-md"
                >
                    popular
                </Badge>
            )}

            <h3 className="font-heading text-lg font-semibold text-emerald-700">{plan.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 lg:mt-3 lg:min-h-[2.75rem]">
                {plan.description}
            </p>
            <p className="mt-4 font-heading text-[2rem] font-semibold leading-none text-emerald-700 sm:text-[2.35rem] lg:mt-5">
                {plan.price}
                <span className="text-sm font-normal text-gray-500">{plan.period}</span>
            </p>

            <Button
                variant={plan.highlighted ? "default" : "secondary"}
                href={plan.href}
                className={cn(
                    "mt-5 w-full rounded-md py-5 text-sm font-medium lg:mt-6 shadow-sm shadow-transparent hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)]",
                    !plan.highlighted && "bg-gray-900 text-white hover:bg-gray-900/90 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                )}
            >
                {plan.cta}
            </Button>

            <button
                type="button"
                aria-expanded={expanded}
                onClick={onToggle}
                className="flex items-center pt-3 font-semibold text-gray-800
            text-xs transition-colors md:hidden gap-1.5 w-max"
            >
                Includes
                <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={cn(
                        "text-gray-500 transition-transform duration-300 mt-0.5",
                        expanded && "rotate-180"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
            </button>

            <div
                className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    "ease-[cubic-bezier(0.22,1,0.36,1)] md:grid-rows-[1fr]",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
            >
                <div className="overflow-hidden">
                    <ul className="space-y-3 border-t border-gray-300/80 pt-3 mt-3">
                        {plan.features.map((feature: string) => (
                            <li key={feature} className="flex items-start gap-2.5 text-xs xs:text-sm text-gray-700">
                                <span
                                    className="mt-[5.6px] x:mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"
                                    aria-hidden
                                />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    )
}


const MarketingPricingSection = () => {
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

    return (
        <section id="pricing" className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead="Transparent"
                        accent="pricing"
                        subtitle="Begin without friction. Upgrade when you want deeper libraries and a direct hand in what we build next."
                    />
                </div>

                <div className="mx-auto mt-10 grid max-w-xl lg:max-w-none gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
                    {PRICING_PLANS.map((plan) => (
                        <PricingCard
                            key={plan.name}
                            plan={plan}
                            expanded={expandedPlan === plan.name}
                            onToggle={() =>
                                setExpandedPlan((current) =>
                                    current === plan.name ? null : plan.name
                                )
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingPricingSection
