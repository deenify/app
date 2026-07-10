"use client"

import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"

export type SplitPoint = {
    icon: LucideIcon
    text: string
}

export type SplitStat = {
    value: string
    label: string
}

export type SplitCta = {
    label: string
    href: string
}

export type SplitSectionVariant =
    | "default"
    | "floating-stats"
    | "accent-bar"
    | "inset-panel"

type MarketingSplitSectionProps = {
    eyebrow?: string
    lead: string
    accent: string
    description: string
    points?: SplitPoint[]
    stats?: SplitStat[]
    image: string
    imageAlt: string
    imagePosition?: "left" | "right"
    variant?: SplitSectionVariant
    theme?: "white" | "muted"
    primaryCta?: SplitCta
    secondaryCta?: SplitCta
    className?: string
}

const POINTS_BASE_DELAY = 0.5
const STAGGER_STEP = 0.1

const MarketingSplitSection = ({
    eyebrow,
    lead,
    accent,
    description,
    points = [],
    stats = [],
    image,
    imageAlt,
    imagePosition = "left",
    variant = "default",
    theme = "white",
    primaryCta,
    secondaryCta,
    className,
}: MarketingSplitSectionProps) => {
    const imageBlock = (
        <Animate variant="up" animate="while_in_view" delay={0.35} duration={1}>
            <div className={cn("relative", stats.length > 0 && variant === "floating-stats" && "pb-6 sm:pb-8")}>
                <div
                    className={cn(
                        "relative overflow-hidden",
                        variant === "default" &&
                            "rounded-md border border-gray-200/80 bg-white p-1.5 shadow-[0_16px_48px_rgba(16,185,129,0.08)] sm:rounded-2xl sm:p-2",
                        variant === "floating-stats" &&
                            "rounded-md border border-emerald-100/80 bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 p-1.5 shadow-[0_20px_60px_rgba(16,185,129,0.12)] sm:rounded-[1.5rem] sm:p-3",
                        variant === "accent-bar" &&
                            "rounded-md sm:rounded-2xl",
                        variant === "inset-panel" &&
                            "rounded-md border border-gray-200 bg-marketing-card p-3 sm:rounded-2xl sm:p-4"
                    )}
                >
                    <div
                        className={cn(
                            "relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]",
                            variant === "default" && "rounded-md sm:rounded-[1.15rem]",
                            variant === "floating-stats" && "rounded-md sm:rounded-[1.15rem]",
                            variant === "accent-bar" && "rounded-md sm:rounded-xl",
                            variant === "inset-panel" && "rounded-md sm:rounded-xl"
                        )}
                    >
                        <Image
                            src={image}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/25 via-transparent to-white/10"
                            aria-hidden
                        />
                    </div>
                </div>

                {stats.length > 0 && variant === "floating-stats" && (
                    <div className="absolute -bottom-4 left-4 right-4 flex gap-2 sm:-bottom-5 sm:left-6 sm:right-6 sm:gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex-1 rounded-md border border-white/80 bg-white/95 px-3 py-2.5 
                                text-center shadow-lg backdrop-blur-sm sm:rounded-xl sm:px-4 sm:py-3"
                            >
                                <p className="font-heading text-lg font-semibold text-emerald-700 sm:text-xl">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] text-gray-500 sm:text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Animate>
    )

    const contentBlock = (
        <div
            className={cn(
                variant === "accent-bar" && "relative pl-5 sm:pl-6",
                variant === "inset-panel" && "rounded-md border border-gray-100 bg-white p-5 sm:rounded-2xl sm:p-8"
            )}
        >
            {variant === "accent-bar" && (
                <span
                    className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-emerald-500"
                    aria-hidden
                />
            )}

            {eyebrow && (
                <Animate variant="up" animate="while_in_view" delay={0.25} duration={0.8}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600 sm:text-xs">
                        {eyebrow}
                    </p>
                </Animate>
            )}

            <Animate variant="up" animate="while_in_view" delay={0.32} duration={0.88}>
                <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.15] tracking-tight text-gray-900 sm:text-[1.75rem] lg:text-[2rem]">
                    {lead}{" "}
                    <span className="font-accent text-[1.02em] italic text-emerald-600">{accent}</span>
                </h2>
            </Animate>

            <Animate variant="up" animate="while_in_view" delay={0.42} duration={0.92}>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">{description}</p>
            </Animate>

            {points.length > 0 && (
                <ul className="mt-6 space-y-3 sm:mt-8">
                    {points.map((point, index) => {
                        const Icon = point.icon

                        return (
                            <Stagger
                                key={point.text}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={POINTS_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.85}
                            >
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                                    </span>
                                    <span className="text-sm leading-relaxed text-gray-700 sm:text-[0.9375rem]">
                                        {point.text}
                                    </span>
                                </li>
                            </Stagger>
                        )
                    })}
                </ul>
            )}

            {(primaryCta || secondaryCta) && (
                <Animate variant="up" animate="while_in_view" delay={0.58} duration={0.9}>
                    <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:items-center sm:mt-8">
                        {primaryCta && (
                            <Button
                                variant="default"
                                href={primaryCta.href}
                                className="h-10 w-full rounded-md px-6 text-sm font-medium sm:h-11 sm:rounded-full xs:w-auto"
                            >
                                {primaryCta.label}
                            </Button>
                        )}
                        {secondaryCta && (
                            <Button
                                variant="outline-emerald"
                                href={secondaryCta.href}
                                className="h-10 w-full rounded-md px-6 text-sm font-medium sm:h-11 sm:rounded-full xs:w-auto"
                            >
                                {secondaryCta.label}
                            </Button>
                        )}
                    </div>
                </Animate>
            )}
        </div>
    )

    return (
        <section
            className={cn(
                "py-14 sm:py-20 lg:py-24",
                theme === "muted" ? "bg-marketing-light" : "bg-white",
                className
            )}
        >
            <div className="container">
                <div
                    className={cn(
                        "grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20",
                        imagePosition === "right" && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    )}
                >
                    {imageBlock}
                    <div className={cn(stats.length > 0 && variant === "floating-stats" && "lg:pt-2")}>
                        {contentBlock}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingSplitSection
