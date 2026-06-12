import Image from "next/image"
import { Headphones, TrendingUp, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

const MarketingHeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white pb-16 pt-10 sm:pb-20 sm:pt-14">
            <div className="container">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-1.5 text-xs font-medium text-emerald-800">
                        <Headphones className="h-3.5 w-3.5" />
                        Faith-aware support, every day of the week
                    </div>

                    <h1 className="font-heading text-[2rem] font-semibold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]">
                        Transform intention into{" "}
                        <span className="font-accent text-[1.02em] italic text-emerald-600">
                            spiritual rhythm
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                        Deenify unifies prayer, Quran, remembrance, and curated learning into one
                        dashboard — composed for Muslims who expect software to feel as considered
                        as the practices it serves.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button variant="default" size="lg" href="/dashboard" className="rounded-full px-8">
                            Open Dashboard
                        </Button>
                        <Button variant="outline-emerald" size="lg" href="/register" className="rounded-full px-8">
                            Create free account
                        </Button>
                    </div>
                </div>

                <div className="relative mx-auto mt-14 max-w-5xl sm:mt-16">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 p-3 shadow-[0_24px_80px_rgba(16,185,129,0.12)] sm:p-4">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-gray-900">
                            <Image
                                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80"
                                alt="Scenic backdrop for dashboard preview"
                                fill
                                className="object-cover opacity-90"
                                priority
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                                <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur">
                                    <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
                                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        <span className="ml-2 text-xs text-gray-400">dashboard.deenify.app</span>
                                    </div>
                                    <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-emerald-50/50">
                                        <Image
                                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                                            alt="Dashboard preview placeholder — replace with your app screenshot"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -left-2 top-[18%] hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:block lg:-left-8">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Today&apos;s rhythm</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">Dhuhr in 42m</p>
                        <p className="text-xs text-emerald-600">On schedule</p>
                    </div>

                    <div className="absolute -right-2 top-[12%] hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:block lg:-right-6">
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

                    <div className="absolute -bottom-4 left-[8%] hidden rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:flex sm:items-center sm:gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <span
                                    key={i}
                                    className="inline-flex h-8 w-8 rounded-full border-2 border-white bg-emerald-100"
                                />
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">12k+ engaged users</p>
                            <p className="text-xs text-gray-500">Across 40+ countries</p>
                        </div>
                        <Users className="ml-1 h-4 w-4 text-emerald-600" />
                    </div>

                    <div className="absolute bottom-[20%] right-[6%] hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-lg md:block">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                            <Wallet className="h-3 w-3" />
                            Sadaqah ready
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">One-tap donate</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingHeroSection
