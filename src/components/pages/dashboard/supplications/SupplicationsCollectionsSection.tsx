"use client"

import { useIncrementalReveal } from "@/hooks/useIncrementalReveal"
import Stagger from "@/components/shared/motion/Stagger"
import SupplicationCard from "./SupplicationCard"
import type { SupplicationItem } from "./content"

type Props = {
    items: SupplicationItem[]
    bookmarkedIds: Set<string>
    onToggleBookmark: (id: string) => void
}

export default function SupplicationsCollectionsSection({
    items,
    bookmarkedIds,
    onToggleBookmark,
}: Props) {
    const { items: visibleItems, sentinelRef, newFromIndex } = useIncrementalReveal({
        items,
        batchLength: 18,
        offsetTop: 480,
    })

    return (
        <section className="min-h-[45dvh] pb-12">
            <div className="container space-y-6 px-4 sm:px-6 md:px-6">
                {items.length === 0 ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">Nothing matches yet</p>
                        <p className="mt-2 text-sm text-gray-500">Broaden the topic filter or clear search.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {visibleItems.map((item, index) => (
                            <Stagger
                                key={item.id}
                                index={index - newFromIndex}
                                animate={index >= newFromIndex}
                            >
                                <SupplicationCard
                                    item={item}
                                    isBookmarked={bookmarkedIds.has(item.id)}
                                    onToggleBookmark={() => onToggleBookmark(item.id)}
                                />
                            </Stagger>
                        ))}
                        <div ref={sentinelRef} className="col-span-full h-px w-full" aria-hidden />
                    </div>
                )}
            </div>
        </section>
    )
}
