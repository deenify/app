"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import FadeEdge from "@/components/shared/FadeEdge"
import InfiniteMarquee from "@/components/shared/InfiniteMarquee"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { WORKSPACE_MARQUEE_ROWS, type WorkspaceModule } from "./content"

type WorkspaceModuleChipProps = WorkspaceModule & {
    isTouchMode: boolean
    isActive: boolean
    onActivate: (label: string) => void
}

const chipBaseClass = cn(
    "group relative flex shrink-0 items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-4 py-2.5 shadow-sm transition-all duration-300 sm:gap-3 sm:px-5 sm:py-3",
    "hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]"
)

const WorkspaceModuleChip = ({
    label,
    icon: Icon,
    href,
    isTouchMode,
    isActive,
    onActivate,
}: WorkspaceModuleChipProps) => {
    const iconBlock = (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white sm:h-9 sm:w-9">
            <Icon className="h-4 w-4" strokeWidth={1.9} />
        </span>
    )

    const labelBlock = (
        <span className="whitespace-nowrap text-xs font-medium text-gray-700 group-hover:text-emerald-900 sm:text-sm">
            {label}
        </span>
    )

    if (!isTouchMode) {
        return (
            <Link href={href} className={chipBaseClass}>
                {iconBlock}
                {labelBlock}
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
        )
    }

    return (
        <div
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            onClick={() => onActivate(label)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onActivate(label)
                }
            }}
            className={cn(
                chipBaseClass,
                "cursor-pointer",
                isActive && "border-emerald-200 shadow-[0_8px_24px_rgba(16,185,129,0.12)]"
            )}
        >
            {iconBlock}
            {labelBlock}
            {isActive && (
                <Link
                    href={href}
                    onClick={(e) => e.stopPropagation()}
                    className="ml-1 inline-flex items-center gap-0.5 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-medium text-white transition hover:bg-emerald-700 sm:text-[11px]"
                >
                    Open
                    <ChevronRight className="h-3 w-3" />
                </Link>
            )}
        </div>
    )
}

type WorkspaceMarqueeRowProps = {
    items: WorkspaceModule[]
    reverse?: boolean
    isTouchMode: boolean
    activeLabel: string | null
    onActivate: (label: string) => void
    isPaused: boolean
}

const WorkspaceMarqueeRow = ({
    items,
    reverse,
    isTouchMode,
    activeLabel,
    onActivate,
    isPaused,
}: WorkspaceMarqueeRowProps) => (
    <div className="relative overflow-hidden py-1.5 sm:py-2">
        <FadeEdge
            fadeDirection="both"
            hideBelow="md"
            classNames={{
                left: "from-white via-white/90 to-transparent",
                right: "from-white via-white/90 to-transparent",
            }}
        />
        <InfiniteMarquee
            reverse={reverse}
            duration="workspace"
            trackClassName={isPaused ? "![animation-play-state:paused]" : undefined}
        >
            {items.map((module) => (
                <WorkspaceModuleChip
                    key={module.label}
                    {...module}
                    isTouchMode={isTouchMode}
                    isActive={activeLabel === module.label}
                    onActivate={onActivate}
                />
            ))}
        </InfiniteMarquee>
    </div>
)

const MarketingWorkspaceSection = () => {
    const isMdUp = useBreakpoint("md", "up")
    const isTouchMode = !isMdUp
    const [activeLabel, setActiveLabel] = useState<string | null>(null)

    const handleActivate = (label: string) => {
        setActiveLabel((current) => (current === label ? null : label))
    }

    const isPaused = isTouchMode && activeLabel !== null

    return (
        <section className="overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead={<>One workspace for <br className='block xs:hidden' /> your entire</>}
                        accent="routine"
                        subtitle={
                            isTouchMode
                                ? "Tap a module to pause and open it — your full dashboard is one tap away."
                                : "Every pillar of daily practice lives in a single, coherent shell — tap a module to enter the dashboard directly."
                        }
                    />
                </div>
            </div>

            <div className="container-marketing-wide mt-10 sm:mt-12">
                <div
                    className={cn(
                        "relative mx-auto max-w-5xl space-y-2 overflow-hidden sm:space-y-3",
                        !isTouchMode &&
                        "group/workspace hover:[&_.marquee-track]:[animation-play-state:paused]"
                    )}
                >
                    {WORKSPACE_MARQUEE_ROWS.map((row, index) => (
                        <WorkspaceMarqueeRow
                            key={index}
                            items={row.items}
                            reverse={row.reverse}
                            isTouchMode={isTouchMode}
                            activeLabel={activeLabel}
                            onActivate={handleActivate}
                            isPaused={isPaused}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingWorkspaceSection
