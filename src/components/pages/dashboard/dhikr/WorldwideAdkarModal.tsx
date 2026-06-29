"use client"

import React, { useState } from "react"
import { Modal } from "@/components/shared/Modal"
import { usePagination } from "@/hooks/usePagination"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { Input } from "@/components/ui/input"
import {
    Plus,
    Globe
} from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { Pagination } from "@/components/ui/pagination"


import ContributorAvatar from "./ContributorAvatar"

interface WorldwideAdkarModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (adkhar: any) => void
    existingIds?: string[]
}

const WORLDWIDE_ADKHAR = Array.from({ length: 50 }, (_, i) => ({
    id: `world-${i}`,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    title: "Subhanallah wa bihamdihi",
    translation: "Glory be to Allah and His is the praise, Glory be to Allah the Great.",
    author: {
        id: `${i}`,
        name: `Contributor ${i}`,
        username: `@user_${i}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`
    }
}))

export function WorldwideAdkarModal({
    isOpen,
    onOpenChange,
    onSelect,
    existingIds = []
}: WorldwideAdkarModalProps) {

    const [search, setSearch] = useState("")
    const isMobile = useBreakpoint("sm", "down")

    const filteredItems = WORLDWIDE_ADKHAR.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.translation.toLowerCase().includes(search.toLowerCase()) ||
        item.author.name.toLowerCase().includes(search.toLowerCase())
    )

    const { paginatedItems, page, setPage, totalPages } = usePagination(filteredItems, 10)

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                        <Globe className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">Worldwide Adkar</p>
                        <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 truncate">Explore community shared formulas</p>
                    </div>
                </div>
            }
            className="w-[min(calc(100vw-2rem),700px)] h-[min(85dvh,640px)]"
            classNames={{
                body: "p-0 min-h-0",
                content: "p-0 overflow-hidden flex min-h-0 flex-1 flex-col",
                footer: "border-t border-gray-100 bg-gray-50/50 py-3 shrink-0"
            }}
            footer={
                totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        align="center"
                        isMobile={isMobile}
                        scrollContainerId="worldwide-adkar-list"
                    />
                )
            }
        >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="relative shrink-0 border-b border-gray-100 p-4 sm:p-6 sm:pb-4">
                    <Input
                        placeholder={!isMobile
                            ? "Search worldwide adkar or contributors..."
                            : "Search..."
                        }
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-11"
                        search
                    />
                </div>

                <div
                    id="worldwide-adkar-list"
                    className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 pr-3 scrollbar-thin sm:grid-cols-2 sm:p-6 sm:pt-4"
                >
                    {paginatedItems.map((item) => {
                        const isAdded = existingIds.includes(item.id)

                        return (
                            <button
                                key={item.id}
                                disabled={isAdded}
                                onClick={() => onSelect(item)}
                                className={cn(
                                    "group flex w-full min-w-0 flex-col rounded-2xl border p-4 text-left transition-all bg-white sm:p-5",
                                    isAdded
                                        ? "opacity-60 grayscale-[0.5] border-emerald-100 cursor-default"
                                        : "border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-lg hover:shadow-emerald-50/50"
                                )}
                            >
                                <div className="mb-4 min-w-0 space-y-2">
                                    <div className="w-full min-w-0 overflow-hidden">
                                        <p
                                            className="font-arabic truncate text-left text-lg text-gray-900 sm:text-xl"
                                            dir="rtl"
                                        >
                                            {item.arabic}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                                    <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">{item.translation}</p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2"   >
                                        <ContributorAvatar
                                            user={item.author}
                                            classNames={{ trigger: "text-left" }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold text-gray-700 truncate group-hover/author:text-emerald-700 transition-colors">
                                                {item.author.name}
                                            </p>
                                            <p className="text-[10px] text-gray-400 truncate">{item.author.username}</p>
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg flex items-center justify-center transition-all",
                                        isAdded
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-gray-50 text-gray-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-12"
                                    )}>
                                        {isAdded ? (
                                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={3}>
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                        )}
                                    </div>
                                </div>
                            </button>
                        )
                    })}

                    {paginatedItems.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <p className="text-sm text-gray-400 font-medium">No results found for &quot;{search}&quot;</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}
