"use client"

import { useMemo } from "react"
import { BookHeart, BookOpen, Clock3, Lightbulb, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/shared/buttons/BackButton"
import { getStoryById } from "./content"

type StoryDetailPageProps = { storyId: string }

export default function StoryDetailPage({ storyId }: StoryDetailPageProps) {
    const story = useMemo(() => getStoryById(storyId), [storyId])

    if (!story) {
        return (
            <div className="container px-4 py-16 text-center">
                <p className="text-gray-600">Story not found.</p>
                <Button variant="ghost-purple" className="mt-4" href="/stories">
                    Back to stories
                </Button>
            </div>
        )
    }

    const categoryLabel = story.category.replace("-", " ")

    return (
        <div className="bg-white">
            <section className="border-b border-layout-separator">
                <div className="container px-4 sm:px-6">
                    <header className="mx-auto flex max-w-3xl flex-col items-start pb-8 pt-6 sm:pb-10 sm:pt-8">
                        <BackButton
                            renderMobileVariant={false}
                            className="!mb-0"
                            buttonProps={{ variant: "ghost-purple", href: "/stories", shouldScale: false }}
                            label="Back to stories"
                            labelMbl="Back"
                        />

                        <div className="mt-7 flex w-full flex-col items-start gap-1.5 sm:mt-8 sm:gap-2">
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center justify-center rounded-lg bg-purple-50 p-2.5 text-purple-700">
                                    <BookHeart className="h-4.5 w-4.5" strokeWidth={2} />
                                </div>
                                <Badge variant="purple" className="text-xs font-medium">
                                    Prophetic story
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-[2rem]">
                                {story.title}
                            </h1>
                            <p className="mt-2 text-sm text-purple-700">{story.prophet}</p>
                            <p className="mt-2 text-sm text-gray-500">{story.excerpt}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="outline" className="capitalize bg-purple-50/50 text-purple-700">
                                    {categoryLabel}
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                    <Clock3 className="mr-1 h-3 w-3" />
                                    {story.readMinutes} min
                                </Badge>
                            </div>
                        </div>
                    </header>
                </div>
            </section>

            <section className="border-t border-gray-50">
                <div className="container py-8 sm:py-10">
                    <article className="mx-auto max-w-3xl space-y-8">
                        <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5">
                            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-purple-800">
                                <Lightbulb className="h-3.5 w-3.5" />
                                Main lesson
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-gray-800">{story.lesson}</p>
                        </div>

                        <p className="text-[15px] leading-[1.75] text-gray-700">{story.body}</p>

                        {story.quote && (
                            <blockquote className="rounded-2xl border border-purple-100 bg-[#fafafa] px-5 py-4">
                                <Quote className="mb-2 h-4 w-4 text-purple-500" />
                                <p className="text-sm leading-relaxed text-gray-700">{story.quote.text}</p>
                                <footer className="mt-2 text-xs font-medium text-purple-600">
                                    {story.quote.source}
                                </footer>
                            </blockquote>
                        )}

                        <div>
                            <p className="text-sm font-medium text-gray-900">Moral points</p>
                            <ul className="mt-3 space-y-2">
                                {story.moralPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="flex gap-2 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2.5 text-sm leading-relaxed text-gray-700"
                                    >
                                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl border border-purple-100 bg-purple-50/30 px-4 py-3 text-sm text-purple-900">
                            <BookHeart className="h-4 w-4 shrink-0 text-purple-600" />
                            <span>Reflect on this story and share its lesson with someone you care about.</span>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    )
}
