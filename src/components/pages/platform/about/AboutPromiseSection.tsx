"use client"

import Animate from "@/components/shared/motion/Animate"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { ABOUT_PROMISES } from "./promises"

const AboutPromiseSection = () => {
    return (
        <section className="bg-marketing-light py-14 sm:py-20">
            <div className="container">
                <MarketingSectionHead
                    lead="Our promise to"
                    accent="every member"
                    subtitle="Three commitments we hold ourselves to — the same ones we'd expect from any tool sitting next to our own practice."
                />

                <Animate variant="up" animate="while_in_view" delay={0.4} duration={0.95}>
                    <div className="mx-auto mt-10 max-w-md sm:mt-12">
                        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br 
                        from-white via-emerald-50/30 to-white p-5 shadow-[0_16px_48px_rgba(16,185,129,0.08)] sm:p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                                What you can count on
                            </p>

                            <div className="mt-5 space-y-0">
                                {ABOUT_PROMISES.map((promise, index) => {
                                    const Icon = promise.icon
                                    const isLast = index === ABOUT_PROMISES.length - 1

                                    return (
                                        <div key={promise.title} className="relative flex gap-4">
                                            {!isLast && (
                                                <span
                                                    className="absolute left-[19px] top-10 h-[calc(100%-8px)] w-px bg-emerald-200"
                                                    aria-hidden
                                                />
                                            )}
                                            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center 
                                            rounded-full border border-emerald-100 bg-white text-emerald-600 shadow-sm">
                                                <Icon className="h-4 w-4" strokeWidth={1.9} />
                                            </span>
                                            <div className="pb-6 pt-1.5">
                                                <p className="font-heading text-sm font-semibold text-gray-900 sm:text-base">
                                                    {promise.title}
                                                </p>
                                                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{promise.detail}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Animate>
            </div>
        </section>
    )
}

export default AboutPromiseSection
