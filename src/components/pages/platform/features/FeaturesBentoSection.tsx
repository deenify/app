"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Stagger from "@/components/shared/motion/Stagger"
import { cn } from "@/lib/utils/clsx"
import { FEATURE_BENTO_MODULES } from "./content"

const CONTENT_BASE_DELAY = 0.4
const STAGGER_STEP = 0.05

const FeaturesBentoSection = () => {
    return (
        <section id="modules" className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-heading text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                        Tap any tile to{" "}
                        <span className="font-accent italic text-emerald-600">open it live</span>
                    </h2>
                    <p className="mt-3 text-sm text-gray-600 sm:text-base">
                        Fourteen tools, one sidebar — each tile jumps straight into the dashboard module.
                    </p>
                </div>

                <div
                    className="mx-auto mt-10 grid max-w-5xl auto-rows-[minmax(120px,auto)] grid-cols-2 gap-2 
                    sm:mt-12 sm:grid-cols-4 sm:gap-4"
                >
                    {FEATURE_BENTO_MODULES.map((mod, index) => {
                        const Icon = mod.icon
                        const isFeatured = mod.className.includes("row-span-2")

                        return (
                            <Stagger
                                key={mod.label}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={CONTENT_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.8}
                            >
                                <Link
                                    href={mod.href}
                                    className={cn(
                                        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border",
                                        "transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)]",
                                        isFeatured
                                            ? "border-emerald-200 bg-gradient-to-br from-emerald-600 to-emerald-800 p-5 text-white sm:p-7"
                                            : "border-gray-100 bg-marketing-card p-3.5 sm:p-5",
                                        mod.className
                                    )}
                                >
                                    <div className="min-w-0">
                                        <span
                                            className={cn(
                                                "flex h-9 w-9 items-center justify-center rounded-full transition-colors sm:h-10 sm:w-10",
                                                isFeatured
                                                    ? "bg-white/15 text-white"
                                                    : "bg-white text-gray-900 group-hover:bg-emerald-600 group-hover:text-white"
                                            )}
                                        >
                                            <Icon className="h-4 w-4" strokeWidth={1.9} />
                                        </span>
                                        <h3
                                            className={cn(
                                                "mt-3 truncate font-heading font-semibold sm:mt-4",
                                                isFeatured ? "text-xl sm:text-2xl" : "text-sm text-gray-900 sm:text-base"
                                            )}
                                        >
                                            {mod.label}
                                        </h3>
                                        <p
                                            className={cn(
                                                "mt-1 truncate text-xs sm:text-sm",
                                                isFeatured ? "text-emerald-100" : "text-gray-500"
                                            )}
                                        >
                                            {mod.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        className={cn(
                                            "mt-3 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:mt-4",
                                            isFeatured ? "text-emerald-200" : "text-gray-300 group-hover:text-emerald-600"
                                        )}
                                    />
                                </Link>
                            </Stagger>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeaturesBentoSection
