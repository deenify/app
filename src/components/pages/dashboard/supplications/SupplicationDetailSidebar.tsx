"use client"

import Link from "next/link"
import { BookOpen, Bookmark, Clock3, Eye, Flame, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SupplicationItem } from "./content"

type SupplicationMetrics = {
    bookmarks: number
    reached: number
    authenticity: number
    popularity: number
}

type SupplicationDetailSidebarProps = {
    related: SupplicationItem[]
    readTimeMinutes: number
    metrics: SupplicationMetrics
    formatCompact: (num: number) => string
}

export default function SupplicationDetailSidebar({
    related,
    readTimeMinutes,
    metrics,
    formatCompact,
}: SupplicationDetailSidebarProps) {
    return (
        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-layout-separator lg:pl-6">
            <section className="border-b border-gray-100 pb-5">
                <div className="mb-3 flex items-center gap-2">
                    <TrendingUp size={18} className="text-purple-600" />
                    <p className="text-sm font-semibold text-gray-900">Supplication intelligence</p>
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
                    for practical remembrance.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
                    <ShieldCheck size={18} />
                    Reviewed for educational use
                </div>
            </section>

            <section>
                <p className="text-sm font-semibold text-gray-900">How to recite this duʿāʾ</p>
                <p className="mt-2 text-sm text-gray-600">
                    Read actively: pause at each phrase, connect the translation to the Arabic, then revisit after
                    salah for retention and reflection.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Clock3 size={18} />
                    Session length: {readTimeMinutes + 2} minutes (avg)
                </div>

                {related.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Related</p>
                        {related.map((relatedItem) => (
                            <Link
                                key={relatedItem.id}
                                href={`/supplications/${relatedItem.id}`}
                                className="block rounded-lg border border-gray-100 bg-white px-3 py-2 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
                            >
                                <p className="truncate text-sm font-medium text-gray-900">{relatedItem.title}</p>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button className="gap-2 max-[400px]:w-full" variant="default" href="/supplications">
                        <BookOpen size={18} />
                        Browse catalog
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
