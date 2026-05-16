"use client"

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
    return (
        <section className="min-h-[45dvh] pb-12">
            <div className="container px-4 sm:px-6 md:px-6">
                {items.length === 0 ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                        <p className="text-sm font-semibold text-gray-900">Nothing matches yet</p>
                        <p className="mt-2 text-sm text-gray-500">Broaden the topic filter or clear search.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {items.map((item, index) => (
                            <SupplicationCard
                                key={item.id}
                                item={item}
                                index={index}
                                isBookmarked={bookmarkedIds.has(item.id)}
                                onToggleBookmark={() => onToggleBookmark(item.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
