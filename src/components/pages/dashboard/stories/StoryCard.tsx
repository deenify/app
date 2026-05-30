"use client"

import { BookHeart } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import type { StoryTopic } from "./content"

type StoryCardProps = {
    story: StoryTopic
    onOpen: () => void
}

export default function StoryCard({ story, onOpen }: StoryCardProps) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className={cn(
                "group flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-white p-5 text-left",
                "transition-[border-color,box-shadow] duration-300",
                "hover:border-gray-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.05)] active:scale-[0.99]"
            )}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 ring-1 ring-gray-100">
                <BookHeart className="h-5 w-5" strokeWidth={1.6} />
            </div>

            <span className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
                {story.prophet}
            </span>
            <p className="mt-1 text-[15px] font-medium leading-snug tracking-tight text-gray-900 group-hover:text-blue-800">
                {story.title}
            </p>
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">{story.excerpt}</p>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                <span className="capitalize">{story.category.replace("-", " ")}</span>
                <span className="tabular-nums">{story.readMinutes} min</span>
            </div>
        </button>
    )
}
