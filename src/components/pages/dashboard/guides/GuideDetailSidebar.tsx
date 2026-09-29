"use client"

import { BookOpen, Bookmark, Clock3, Eye, Flame, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

type GuideMetrics = {
    bookmarks: number
    reached: number
    authenticity: number
    popularity: number
}

type GuideDetailSidebarProps = {
    metrics: GuideMetrics
    readTimeMinutes: number
    formatCompact: (num: number) => string
}

const GuideDetailSidebar = ({ metrics, readTimeMinutes, formatCompact }: GuideDetailSidebarProps) => {
    return (
        <aside className="space-y-6 min-w-0 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-layout-separator lg:pl-6">
            <section className="border-b border-gray-100 pb-5">
                <div className="mb-3 flex items-center gap-2">
                    <TrendingUp size={18} className="text-purple-600" />
                    <p className="text-sm font-semibold text-gray-900">Guide intelligence</p>
                </div>
                <div className="space-y-2.5 text-sm text-gray-700">
                    <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex min-w-0 items-center gap-2">
                            <Bookmark size={18} className="shrink-0 text-gray-500" />
                            <span className="truncate">Bookmarked</span>
                        </span>
                        <span className="font-semibold text-gray-900">{formatCompact(metrics.bookmarks)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex min-w-0 items-center gap-2">
                            <Eye size={18} className="shrink-0 text-gray-500" />
                            <span className="truncate">People reached</span>
                        </span>
                        <span className="font-semibold text-gray-900">{formatCompact(metrics.reached)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex min-w-0 items-center gap-2">
                            <ShieldCheck size={18} className="shrink-0 text-gray-500" />
                            <span className="truncate">Authenticity score</span>
                        </span>
                        <span className="font-semibold text-emerald-700">{metrics.authenticity}%</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex min-w-0 items-center gap-2">
                            <Flame size={18} className="shrink-0 text-gray-500" />
                            <span className="truncate">Popularity</span>
                        </span>
                        <span className="font-semibold text-purple-700">{metrics.popularity}%</span>
                    </div>
                </div>
            </section>

            <section className="border-b border-gray-100 pb-5">
                <p className="mb-2 text-sm font-semibold text-gray-900">Scholarly confidence</p>
                <p className="text-sm leading-relaxed text-gray-600">
                    Compiled from recognized Sunni reference traditions and aligned with mainstream scholarly positions
                    for practical learning.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
                    <ShieldCheck size={18} />
                    Reviewed for educational use
                </div>
            </section>

            <section>
                <p className="text-sm font-semibold text-gray-900">How to study this guide</p>
                <p className="mt-2 text-sm text-gray-600">
                    Read actively: pause the video at key ideas, map each section to one action item, then revisit
                    after salah for retention and reflection.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Clock3 size={18} />
                    Session length: {readTimeMinutes + 6} minutes (avg)
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button className="gap-2 max-[400px]:w-full" variant="default">
                        <BookOpen size={18} />
                        Continue Learning
                    </Button>
                    <Button className="gap-2 max-[400px]:w-full" variant="secondary">
                        <Users size={18} />
                        Share to group
                    </Button>
                </div>
            </section>
        </aside>
    )
}

export default GuideDetailSidebar
