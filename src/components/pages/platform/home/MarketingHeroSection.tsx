"use client"

import Image from "next/image"
import { Headphones, TrendingUp, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import Animate from "@/components/shared/motion/Animate"
import { clientEnv } from "@/env/client"

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
                        <h1 className="font-heading font-semibold leading-[1.15] tracking-tight 
                    text-gray-900 text-4xl sm:text-5xl lg:text-[3.25rem]">
                            Transform <br className="block xs:hidden" />  intention into{" "}
                            <span className="font-accent text-[1.02em] italic text-emerald-600">
                                —  spiritual rhythm
                            </span>
                        </h1>
                    </Animate>
                    <Animate variant="up" delay={0.62} duration={0.92}>
                        <p className="mx-auto mt-4 md:max-w-2xl max-w-md sm:max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-5 
                           sm:text-base sm:block hidden">
                            {clientEnv.APP_NAME} unifies Qur’an (95+ languages), Hadith, prayer, dhikr, structured guidance & more —
                            single coherent software, built for those who expect Islam to rendered with precision.
                        </p>

                        <p className="mx-auto mt-4 max-w-[320px] xs:max-w-full text-sm leading-relaxed text-gray-600 sm:mt-5 
                           sm:text-base lg:text-lg sm:hidden block">
                            {clientEnv.APP_NAME} unifies Qur’an (95+ langs), Hadith, Prayer, Guidance & much more —
                            coherent software, rendered with precision.
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
                            <div className="relative aspect-[16/10] overflow-hidden rounded-md 
                        sm:rounded-[1.25rem]">
                                <Image
                                    src="/images/pages/marketing/home/mobile-overview.webp"
                                    alt="Scenic backdrop for dashboard preview"
                                    fill
                                    className="object-cover"
                                    priority
                                />
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
