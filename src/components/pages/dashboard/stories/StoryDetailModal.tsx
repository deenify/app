"use client"

import { useRef } from "react"
import { BookOpen, Clock3, Lightbulb, Quote } from "lucide-react"
import { Modal } from "@/components/shared/Modal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { StoryTopic } from "./content"

type StoryDetailModalProps = {
    story: StoryTopic | null
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function StoryDetailModal({ story, isOpen, onOpenChange }: StoryDetailModalProps) {
    const lastStory = useRef<StoryTopic | null>(null)
    if (story) lastStory.current = story
    const display = story ?? lastStory.current

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            showClose
            title={
                display ? (
                    <span className="block min-w-0 truncate pr-2 font-medium tracking-tight text-base">
                        {display.title}
                    </span>
                ) : (
                    "Story"
                )
            }
            className={cn("max-w-[42rem]", "max-h-[85dvh] sm:max-h-[min(92dvh,720px)]")}
            classNames={{
                body: "p-0 pb-3",
                header: "px-3 py-2.5 sm:px-4 sm:py-3",
                title: "min-w-0 flex-1",
                content: "px-4 sm:px-6",
            }}
        >
            {display ? (
                <article className="flex flex-col bg-white pb-4">
                    <section className="shrink-0 border-b border-gray-100 bg-gradient-to-b from-blue-50/90 to-white px-1 pb-6 pt-2 sm:pb-7 sm:pt-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-blue-600/90">
                            Prophet
                        </p>
                        <p className="mt-2 text-xl font-medium tracking-tight text-gray-900 sm:text-2xl">
                            {display.prophet}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="blue" className="text-[10px] capitalize">
                                {display.category.replace("-", " ")}
                            </Badge>
                            <Badge variant="outline" className="bg-white text-[10px] text-gray-600">
                                <Clock3 className="mr-1 h-3 w-3" />
                                {display.readMinutes} min read
                            </Badge>
                        </div>
                    </section>

                    <div className="pt-5">
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-blue-800">
                                <Lightbulb className="h-3.5 w-3.5" />
                                Main lesson
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-gray-800">{display.lesson}</p>
                        </div>

                        <p className="mt-5 text-[15px] leading-[1.75] text-gray-700">{display.body}</p>

                        {display.quote && (
                            <blockquote className="mt-5 rounded-xl border border-gray-100 bg-[#fafafa] px-4 py-3">
                                <Quote className="mb-2 h-4 w-4 text-gray-400" />
                                <p className="text-sm leading-relaxed text-gray-700">{display.quote.text}</p>
                                <footer className="mt-2 text-xs font-medium text-gray-500">
                                    {display.quote.source}
                                </footer>
                            </blockquote>
                        )}

                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-900">Moral points</p>
                            <ul className="mt-3 space-y-2">
                                {display.moralPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="flex gap-2 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2.5 text-sm leading-relaxed text-gray-700"
                                    >
                                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </article>
            ) : null}
        </Modal>
    )
}
