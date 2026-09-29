"use client"

import type { ReactNode } from "react"
import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import MarketingSectionHead from "../home/MarketingSectionHead"

export type MarketingCtaButton = {
    label: string
    href: string
}

type MarketingCtaSectionProps = {
    lead: ReactNode
    accent: string
    subtitle?: string
    primaryCta: MarketingCtaButton
    secondaryCta?: MarketingCtaButton
}

const MarketingCtaSection = ({
    lead,
    accent,
    subtitle,
    primaryCta,
    secondaryCta,
}: MarketingCtaSectionProps) => {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="container">
                <div
                    className="relative overflow-hidden rounded-[2rem] border border-emerald-100 
                    bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 px-6 py-14 
                    text-center sm:px-12 sm:py-16"
                >
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.35]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.1), transparent 35%)",
                        }}
                    />
                    <div className="relative">
                        <div className="mx-auto max-w-2xl">
                            <MarketingSectionHead
                                lead={lead}
                                accent={accent}
                                subtitle={subtitle}
                            />
                        </div>

                        <Animate
                            variant="up"
                            animate="while_in_view"
                            delay={0.55}
                            duration={0.9}
                        >
                            <div className="mt-6 flex flex-col items-center justify-center gap-3 xs:mt-8 xs:flex-row">
                                <Button
                                    variant="default"
                                    href={primaryCta.href}
                                    className="h-10 w-max rounded-full px-8 text-sm font-medium sm:h-12 sm:px-12 sm:text-base"
                                >
                                    {primaryCta.label}
                                </Button>
                                {secondaryCta && (
                                    <Button
                                        variant="outline-emerald"
                                        href={secondaryCta.href}
                                        className="h-10 w-max rounded-full px-8 text-sm font-medium sm:h-12 sm:px-12 sm:text-base"
                                    >
                                        {secondaryCta.label}
                                    </Button>
                                )}
                            </div>
                        </Animate>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingCtaSection
