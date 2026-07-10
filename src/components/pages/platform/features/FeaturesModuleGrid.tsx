"use client"

import Link from "next/link"
import { ArrowRight, LayoutDashboard } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { Button } from "@/components/ui/button"
import { FEATURE_MODULES } from "./content"

const CONTENT_BASE_DELAY = 0.4
const STAGGER_STEP = 0.08

const FeaturesModuleGrid = () => {
    return (
        <section id="modules" className="bg-marketing-light py-14 sm:py-20">
            <div className="container">
                <MarketingSectionHead
                    lead="Every module,"
                    accent="intentionally distinct"
                    subtitle="Fourteen tools, one sidebar — tap any tile below to jump straight into the dashboard module."
                />

                <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                    {FEATURE_MODULES.map((module, index) => {
                        const Icon = module.icon

                        return (
                            <Stagger
                                key={module.label}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={CONTENT_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.85}
                            >
                                <Link
                                    href={module.href}
                                    className="group block h-full rounded-md border border-gray-100 bg-white p-5 
                                    transition-all hover:border-emerald-200 hover:shadow-[0_12px_32px_rgba(16,185,129,0.1)] 
                                    sm:rounded-2xl sm:p-6"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 
                                    text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                                    </span>
                                    <h3 className="mt-4 font-heading text-base font-semibold text-gray-900 sm:text-lg">
                                        {module.label}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{module.description}</p>
                                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 
                                    opacity-0 transition-opacity group-hover:opacity-100">
                                        Open module
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </Link>
                            </Stagger>
                        )
                    })}
                </div>

                <Animate variant="up" animate="while_in_view" delay={0.5} duration={0.9}>
                    <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-3 sm:mt-12 xs:flex-row xs:justify-center">
                        <Button
                            variant="default"
                            href="/dashboard"
                            className="group h-11 w-full rounded-md px-8 text-sm font-medium sm:rounded-full xs:w-auto"
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Explore full dashboard
                        </Button>
                        <Button
                            variant="outline-emerald"
                            href="/register"
                            className="h-11 w-full rounded-md px-8 text-sm font-medium sm:rounded-full xs:w-auto"
                        >
                            Create free account
                        </Button>
                    </div>
                    <p className="mx-auto mt-4 max-w-sm text-center text-xs text-gray-500 sm:text-sm">
                        Worship essentials are free — no card required to start.
                    </p>
                </Animate>
            </div>
        </section>
    )
}

export default FeaturesModuleGrid
