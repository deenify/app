"use client"

import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"

export type DashboardBreadcrumItem = {
    label: string
    href?: string
    icon?: LucideIcon
}


type DashboardBreadcrumProps = {
    items: DashboardBreadcrumItem[]
    className?: string
}


const DashboardBreadcrum = ({
    items,
    className,
}: DashboardBreadcrumProps) => {
    return (
        <section className={cn("w-full hidden md:block", className)}>
            <div className="flex min-w-0 items-center sm:gap-2.5 gap-1.5">
                <Link
                    href="/"
                    aria-label="Go to home"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                            bg-white shadow-sm ring-1 ring-gray-200 sm:h-9 sm:w-9"
                >
                    <Image
                        src="/images/generic/deenify-prefix-1.png"
                        alt="Deenify"
                        width={28}
                        height={28}
                        className="sm:h-6 sm:w-6 w-5 h-5 object-contain"
                        priority
                    />
                </Link>

                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />

                <nav aria-label="Breadcrumb" className="min-w-0">
                    <ol className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                        {items.map((item, index) => {
                            const Icon = item.icon
                            const isLast = index === items.length - 1

                            const content = (
                                <>
                                    {Icon ? (
                                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 shadow-sm">
                                            <Icon className="h-3.5 w-3.5" />
                                        </span>
                                    ) : null}
                                    <span className={cn(
                                        "truncate capitalize",
                                        isLast && "font-medium text-gray-900"
                                    )}>
                                        {item.label}
                                    </span>
                                </>
                            )

                            return (
                                <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
                                    {item.href && !isLast ? (
                                        <Link
                                            href={item.href}
                                            className="inline-flex min-w-0 items-center gap-1.5 rounded-md py-0.5 transition-colors hover:text-gray-900"
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <div className="inline-flex min-w-0 items-center gap-1.5 py-0.5">
                                            {content}
                                        </div>
                                    )}
                                    {!isLast ? <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" /> : null}
                                </li>
                            )
                        })}
                    </ol>
                </nav>
            </div>
        </section >
    )
}

export default DashboardBreadcrum
