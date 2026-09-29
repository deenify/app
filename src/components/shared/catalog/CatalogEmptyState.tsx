"use client"

import { Bookmark, SearchX } from "lucide-react"

type CatalogEmptyStateProps = {
    variant?: "search" | "bookmarks"
    title?: string
    description?: string
    savedTotal?: number
}

export default function CatalogEmptyState({
    variant = "search",
    title,
    description,
    savedTotal = 0,
}: CatalogEmptyStateProps) {
    if (variant === "bookmarks") {
        if (savedTotal > 0) {
            return (
                <div className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-gray-100 bg-white p-20 text-center shadow-sm">
                    <div className="group mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 transition-all hover:bg-emerald-50">
                        <SearchX className="h-10 w-10 text-gray-300 transition-colors group-hover:text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900">
                        {title ?? "No matching bookmarks"}
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-gray-400">
                        {description ?? "Try another keyword or clear your filters."}
                    </p>
                </div>
            )
        }

        return (
            <div className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-gray-100 bg-white p-16 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Bookmark className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-medium text-gray-900">{title ?? "No bookmarks yet"}</h3>
                <p className="mt-1.5 text-sm text-gray-500">
                    {description ?? "Save items from the full catalog to find them here quickly."}
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-gray-100 bg-white p-20 text-center shadow-sm">
            <div className="group mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 transition-all hover:bg-emerald-50">
                <SearchX className="h-10 w-10 text-gray-300 transition-colors group-hover:text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-gray-900">
                {title ?? "No matches in our library"}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-gray-400">
                {description ?? "Try refining your search terms or expanding your filters."}
            </p>
        </div>
    )
}
