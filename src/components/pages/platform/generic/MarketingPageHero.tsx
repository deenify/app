"use client"

import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"

type MarketingPageHeroCta = {
    label: string
    href: string
}

type MarketingPageHeroProps = {
    badge?: {
        icon: LucideIcon
        label: string
        labelMobile?: string
    }
    lead: React.ReactNode
    accent: string
    subtitle: string
    subtitleMobile?: string
    image: string
    imageAlt: string
    primaryCta?: MarketingPageHeroCta
    secondaryCta?: MarketingPageHeroCta
    className?: string
}

const MarketingPageHero = ({
    badge,
    lead,
    accent,
    subtitle,
    subtitleMobile,
    image,
    imageAlt,
    primaryCta,
    secondaryCta,
    className,
}: MarketingPageHeroProps) => {
    const BadgeIcon = badge?.icon

    return (
        <section className={cn("relative overflow-hidden bg-white", className)}>
            <div className="container pb-10 pt-8 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    <div className="text-center lg:text-left">
                        {badge && BadgeIcon && (
                            <Animate variant="up" duration={0.7} delay={0.2}>
                                <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border 
                                border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-[11px] font-medium text-emerald-800 
                                sm:mb-5 sm:px-4 sm:text-xs">
                                    <BadgeIcon className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate hidden sm:block">{badge.label}</span>
                                    <span className="truncate block sm:hidden">
                                        {badge.labelMobile ?? badge.label}
                                    </span>
                                </div>
                            </Animate>
                        )}

                        <Animate variant="up" delay={0.32} duration={0.88}>
                            <h1 className="font-heading font-semibold leading-[1.12] tracking-tight text-gray-900 
                            text-3xl xs:text-4xl sm:text-[2.65rem] lg:text-[2.85rem] xl:text-[3rem]">
                                {lead}{" "}
                                <span className="font-accent text-[1.02em] italic text-emerald-600">{accent}</span>
                            </h1>
                        </Animate>

                        <Animate variant="up" delay={0.48} duration={0.92}>
                            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-5 
                            sm:text-base lg:mx-0">
                                <span className="hidden sm:inline">{subtitle}</span>
                                <span className="inline sm:hidden">{subtitleMobile ?? subtitle}</span>
                            </p>
                        </Animate>

                        {(primaryCta || secondaryCta) && (
                            <Animate variant="up" delay={0.64} duration={0.98}>
                                <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 xs:w-auto xs:flex-row 
                                xs:items-center xs:justify-center lg:justify-start xs:gap-4">
                                    {primaryCta && (
                                        <Button
                                            variant="default"
                                            href={primaryCta.href}
                                            className="h-10 w-full rounded-md px-8 text-sm font-medium sm:h-11 
                                            sm:rounded-full xs:w-auto"
                                        >
                                            {primaryCta.label}
                                        </Button>
                                    )}
                                    {secondaryCta && (
                                        <Button
                                            variant="outline-emerald"
                                            href={secondaryCta.href}
                                            className="h-10 w-full rounded-md px-8 text-sm font-medium sm:h-11 
                                            sm:rounded-full xs:w-auto"
                                        >
                                            {secondaryCta.label}
                                        </Button>
                                    )}
                                </div>
                            </Animate>
                        )}
                    </div>

                    <Animate variant="up" delay={0.72} duration={1.1}>
                        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                            <div className="relative overflow-hidden rounded-md border border-gray-200/80 
                            bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 p-1.5 shadow-[0_20px_60px_rgba(16,185,129,0.1)] 
                            sm:rounded-[1.5rem] sm:p-3">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-md sm:rounded-[1.15rem] 
                                sm:aspect-[16/11]">
                                    <Image
                                        src={image}
                                        alt={imageAlt}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t 
                                        from-gray-900/55 via-gray-900/15 to-transparent"
                                        aria-hidden
                                    />
                                </div>
                            </div>
                        </div>
                    </Animate>
                </div>
            </div>
        </section>
    )
}

export default MarketingPageHero
