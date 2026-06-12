"use client"

import { cn } from "@/lib/utils/clsx"
import type { ReactNode } from "react"

type InfiniteMarqueeProps = {
    children: ReactNode
    reverse?: boolean
    pauseOnHover?: boolean
    duration?: "trust" | "workspace"
    /** Gap between items inside each strip */
    gapClassName?: string
    /** Trailing padding on each strip — must match gap values for a seamless loop */
    stripPadClassName?: string
    className?: string
    trackClassName?: string
}

const DURATION_CLASS = {
    trust: {
        forward: "animate-trust-marquee",
        reverse: "animate-trust-marquee-reverse",
    },
    workspace: {
        forward: "animate-workspace-marquee",
        reverse: "animate-workspace-marquee-reverse",
    },
} as const

const MarqueeStrip = ({
    children,
    gapClassName,
    stripPadClassName,
    ariaHidden,
}: {
    children: ReactNode
    gapClassName: string
    stripPadClassName: string
    ariaHidden?: boolean
}) => (
    <div
        className={cn("flex shrink-0 items-center", gapClassName, stripPadClassName)}
        aria-hidden={ariaHidden}
    >
        {children}
    </div>
)

/**
 * Two identical strips; trailing padding equals item gap so -50% lands on a clean seam.
 * Reverse uses marquee-right keyframes (no mirror/flip).
 */
const InfiniteMarquee = ({
    children,
    reverse = false,
    pauseOnHover = false,
    duration = "trust",
    gapClassName = "gap-3 sm:gap-4",
    stripPadClassName = "pr-3 sm:pr-4",
    className,
    trackClassName,
}: InfiniteMarqueeProps) => {
    const animation = reverse
        ? DURATION_CLASS[duration].reverse
        : DURATION_CLASS[duration].forward

    return (
        <div
            className={cn(
                "overflow-hidden",
                pauseOnHover && "hover:[&_.marquee-track]:[animation-play-state:paused]",
                className
            )}
        >
            <div
                className={cn(
                    "marquee-track flex w-max will-change-transform motion-reduce:animate-none",
                    animation,
                    trackClassName
                )}
            >
                <MarqueeStrip gapClassName={gapClassName} stripPadClassName={stripPadClassName}>
                    {children}
                </MarqueeStrip>
                <MarqueeStrip
                    gapClassName={gapClassName}
                    stripPadClassName={stripPadClassName}
                    ariaHidden
                >
                    {children}
                </MarqueeStrip>
            </div>
        </div>
    )
}

export default InfiniteMarquee
