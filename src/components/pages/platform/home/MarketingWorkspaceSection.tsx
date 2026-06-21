"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import FadeEdge from "@/components/shared/FadeEdge"
import InfiniteMarquee from "@/components/shared/InfiniteMarquee"
import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { WORKSPACE_MARQUEE_ROWS, type WorkspaceModule } from "./content"
import { Button } from "@/components/ui/button"

const CONTENT_BASE_DELAY = 0.55
const STAGGER_STEP = 0.12


type WorkspaceMarqueeRowProps = {
    items: WorkspaceModule[]
    reverse?: boolean
    isPaused: boolean
}

const WorkspaceMarqueeRow = ({
    items,
    reverse,
    isPaused
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
            direction={reverse ? "right" : "left"}
            speedInSecond={80}
            itemInteractionEffect={false}
            disableOnInteraction
            content={items.map((module, idx) => (
                <div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isPaused}
                    className={cn(
                        "group relative flex shrink-0 items-center gap-2.5 rounded-md border border-gray-100",
                        "bg-white px-4 py-2.5 shadow-sm transition-all duration-300 sm:px-5 sm:py-3",
                        "hover:border-emerald-200 hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)] cursor-default",
                        "hover:border-emerald-300 hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]"
                    )}
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 
                   text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white 
                   marker: sm:h-9 sm:w-9 flex-shrink-0">
                        <module.icon className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <span className="whitespace-nowrap text-xs font-medium text-gray-700
                   group-hover:text-emerald-900 sm:text-sm">
                        {module.label}
                        <Button
                            href={module.href}
                            size="sm"
                            variant="link"
                            className="gap-1 w-max text-[10px] flex p-0 h-max sm:h-max leading-none"
                        >
                            Open
                            <ArrowUpRight
                                size={14}
                                className="text-emerald-600 opacity-0 transition-opacity 
                            group-hover:opacity-100"
                            />
                        </Button>
                    </span>
                </div>
            ))}
        />
    </div>
)

const MarketingWorkspaceSection = () => {
    const isMdUp = useBreakpoint("md", "up")
    const [isPaused, setIsPaused] = useState(false)

    return (
        <section className="overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead={<>One workspace for <br className='block xs:hidden' /> your entire</>}
                        accent="routine"
                        subtitle={!isMdUp
                            ? "Tap a module to pause and open it — your full dashboard is one tap away."
                            : "Every pillar of daily practice lives in a single, coherent shell — tap a module to enter the dashboard directly."
                        }
                    />
                </div>
            </div>

            <div className="container-narrow mt-10 sm:mt-12">
                <div
                    className={cn(
                        "relative space-y-2 overflow-hidden sm:space-y-3",
                        isPaused && "[&_.marquee-track]:[animation-play-state:paused]"
                    )}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {WORKSPACE_MARQUEE_ROWS.map((row, index) => (
                        <Stagger
                            key={index}
                            index={index}
                            animation="while_in_view"
                            variant="in"
                            baseDelay={CONTENT_BASE_DELAY}
                            delay={STAGGER_STEP}
                            duration={1.1}
                        >
                            <WorkspaceMarqueeRow
                                items={row.items}
                                reverse={row.reverse}
                                isPaused={isPaused}
                            />
                        </Stagger>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingWorkspaceSection
