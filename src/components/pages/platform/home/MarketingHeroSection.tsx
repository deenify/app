"use client"

import Image from "next/image"
import { Headphones, TrendingUp, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import Animate from "@/components/shared/motion/Animate"

const MarketingHeroSection = () => {

    return (
        <section className="relative overflow-hidden bg-white pb-12 pt-8 sm:pb-20 sm:pt-14">
            <div className="container">
                <div className="text-center">
                    {/* badge → heading → copy → buttons → preview */}
                    <Animate variant="up" duration={0.7} delay={0.3}>
                        <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border 
                    border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-[11px] font-medium text-emerald-800 
                    sm:mb-6 sm:px-4 sm:text-xs">
                            <Headphones className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate hidden md:block">
                                Faith-aware support, every day of the week
                            </span>
                            <span className="truncate block md:hidden">
                                Faith-aware support
                            </span>
                        </div>
                    </Animate>

                    <Animate variant="up" delay={0.42} duration={0.88}>
                        <h1 className="font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-tight 
                    text-gray-900 xs:text-[2rem] sm:text-5xl lg:text-[3.25rem]">
                            Transform  intention into{" "}
                            <span className="font-accent text-[1.02em] italic text-emerald-600">
                                spiritual rhythm
                            </span>
                        </h1>
                    </Animate>

                    <Animate variant="up" delay={0.62} duration={0.92}>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-5 
                    sm:text-base lg:text-lg">
                            Deenify unifies prayer, Quran, remembrance, and curated learning into one
                            dashboard — composed for Muslims who expect software to feel as considered
                            as the practices it serves.
                        </p>
                    </Animate>

                    <Animate variant="up" delay={0.84} duration={0.98}>
                        <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 xs:w-auto xs:flex-row 
                    xs:items-center xs:justify-center xs:gap-4">
                            <Button
                                variant="default"
                                href="/dashboard"
                                className="w-full h-10 sm:h-12 xs:w-auto rounded-md sm:rounded-full text-sm font-medium px-8 sm:px-10"
                            >
                                Open Dashboard
                            </Button>
                            <Button
                                variant="outline-emerald"
                                href="/register"
                                className="w-full h-10 sm:h-12 xs:w-auto rounded-md sm:rounded-full text-sm font-medium px-8 sm:px-10"
                            >
                                Create free account
                            </Button>
                        </div>
                    </Animate>
                </div>

                <Animate variant="up" delay={1.2} duration={2.5}>
                    <div className="relative mx-auto mt-8 max-w-5xl sm:mt-14 lg:mt-16">
                        <div
                            className="relative overflow-hidden border border-gray-200/80 bg-gradient-to-br 
                        from-emerald-50 via-white to-amber-50/40 p-2 shadow-[0_24px_80px_rgba(16,185,129,0.12)] 
                        sm:rounded-[1.75rem] sm:p-4 rounded-md"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-gray-900 
                        sm:rounded-[1.25rem]">
                                <Image
                                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80"
                                    alt="Scenic backdrop for dashboard preview"
                                    fill
                                    className="object-cover opacity-90"
                                    priority
                                />
                                <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 lg:p-10">
                                    <div className="relative w-full max-w-2xl overflow-hidden rounded-md border 
                                border-white/20 bg-white/95 shadow-2xl backdrop-blur sm:rounded-2xl">
                                        <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2 sm:px-4 sm:py-3">
                                            <span className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
                                            <span className="h-2 w-2 rounded-full bg-amber-400 sm:h-2.5 sm:w-2.5" />
                                            <span className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
                                            <span className="ml-1 truncate text-[10px] text-gray-400 sm:ml-2 sm:text-xs">
                                                dashboard.deenify.app
                                            </span>
                                        </div>
                                        <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-emerald-50/50">
                                            <Image
                                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                                                alt="Dashboard preview placeholder"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -left-2 top-[18%] hidden rounded-2xl border border-gray-100 
                    bg-white p-4 shadow-lg lg:block lg:-left-8">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Today&apos;s rhythm</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">Dhuhr in 42m</p>
                            <p className="text-xs text-emerald-600">On schedule</p>
                        </div>

                        <div className="absolute -right-2 top-[12%] hidden rounded-2xl border border-gray-100 
                    bg-white p-4 shadow-lg lg:block lg:-right-6">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Weekly consistency</p>
                            <div className="mt-2 flex items-end gap-1">
                                {[40, 65, 55, 80, 70, 90, 60].map((h, i) => (
                                    <span
                                        key={i}
                                        className="w-2 rounded-sm bg-emerald-500"
                                        style={{ height: `${h * 0.35}px` }}
                                    />
                                ))}
                            </div>
                            <p className="mt-2 flex items-center gap-1 text-xs text-gray-600">
                                <TrendingUp className="h-3 w-3 text-emerald-600" />
                                +12% vs last week
                            </p>
                        </div>

                        <div className="absolute -bottom-4 left-[8%] hidden rounded-2xl border border-gray-100 
                    bg-white px-4 py-3 shadow-lg lg:flex lg:items-center lg:gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <span
                                        key={i}
                                        className="inline-flex h-8 w-8 rounded-full border-2 
                                    border-white bg-emerald-100"
                                    />
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">12k+ engaged users</p>
                                <p className="text-xs text-gray-500">Across 40+ countries</p>
                            </div>
                            <Users className="ml-1 h-4 w-4 text-emerald-600" />
                        </div>

                        <div className="absolute bottom-[20%] right-[6%] hidden rounded-2xl border 
                    border-gray-100 bg-white p-4 shadow-lg xl:block">
                            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase 
                        tracking-wider text-gray-400">
                                <Wallet className="h-3 w-3" />
                                Sadaqah ready
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">One-tap donate</p>
                        </div>
                    </div>
                </Animate>
            </div>
        </section>
    )
}

export default MarketingHeroSection
