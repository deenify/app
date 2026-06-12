"use client"

import Link from "next/link"
import { useMemo, type CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { WORKSPACE_MODULES, type WorkspaceModule } from "./content"
import { getWorkspaceColumns, groupWorkspaceRows } from "./workspace-rows"

type WorkspaceCardProps = {
    label: string
    icon: LucideIcon
    href: string
    className?: string
    style?: CSSProperties
}

const WorkspaceCard = ({ label, icon: Icon, href, className, style }: WorkspaceCardProps) => (
    <Link
        href={href}
        style={style}
        className={cn(
            "hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/50 sm:min-h-[5.75rem]",
            "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-emerald-200/90",
            "rounded-2xl border border-gray-100 bg-white p-3 shadow-sm outline-none transition-all",
            "group relative flex min-h-[5.25rem] flex-col items-center justify-center overflow-hidden",
            "hover:shadow-[0_16px_40px_rgba(16,185,129,0.14)] focus-visible:ring-2 focus-visible:ring-emerald-500/40",
            className
        )}
    >
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-emerald-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

        <ArrowUpRight
            className="absolute right-2 top-2 h-3.5 w-3.5 text-emerald-600 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ transform: "translate(5px, -5px)" }}
        />

        <div
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100/50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-emerald-200/60"
            )}
        >
            <Icon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={1.9} />
        </div>

        <span className="mt-2 text-center text-[10px] font-medium text-gray-600 transition-colors duration-300 group-hover:text-emerald-900 sm:text-[11px]">
            {label}
        </span>
    </Link>
)

type WorkspaceRowProps = {
    row: WorkspaceModule[]
    columns: number
}

const WorkspaceRow = ({ row, columns }: WorkspaceRowProps) => {
    const isFullRow = row.length === columns

    if (isFullRow) {
        return (
            <div
                className="grid w-full gap-3 sm:gap-4"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
                {row.map((module) => (
                    <WorkspaceCard key={module.label} {...module} />
                ))}
            </div>
        )
    }

    return (
        <div className="flex w-full justify-center gap-3 sm:gap-4">
            {row.map((module) => (
                <WorkspaceCard
                    key={module.label}
                    {...module}
                    className="min-w-0 shrink-0"
                    style={{
                        width: `calc((100% - ${(columns - 1) * 0.75}rem) / ${columns})`,
                    }}
                />
            ))}
        </div>
    )
}

const MarketingWorkspaceSection = () => {

    const isLgUp = useBreakpoint("lg", "up")
    const isMdUp = useBreakpoint("md", "up")
    const isSmUp = useBreakpoint("sm", "up")

    const columns = getWorkspaceColumns(isLgUp, isMdUp, isSmUp)
    const rows = useMemo(() => groupWorkspaceRows(WORKSPACE_MODULES, columns), [columns])

    return (
        <section className="overflow-hidden bg-white py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead="One workspace for your entire"
                        accent="routine"
                        subtitle="Every pillar of daily practice lives in a single, coherent shell — 
                        tap a module to enter the dashboard directly."
                    />
                </div>

                <div className="relative mx-auto mt-14 max-w-5xl">
                    <div className="absolute inset-0 rounded-full bg-emerald-100/35 blur-3xl" />
                    <div className="relative flex flex-wrap justify-center gap-3 sm:gap-4">
                        {rows.map((row, index) => (
                            <WorkspaceRow key={`workspace-row-${index}`} row={row} columns={columns} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingWorkspaceSection
