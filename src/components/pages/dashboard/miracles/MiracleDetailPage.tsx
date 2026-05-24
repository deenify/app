"use client"

import { useMemo } from "react"
import { Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/shared/buttons/BackButton"
import {
    getTopicOverview,
    KeyTakeaways,
    ReadingOverview,
    TimelineOfIdeas,
} from "@/components/shared/learn/DetailReadingBlocks"
import { getMiracleById } from "./content"

type MiracleDetailPageProps = { topicId: string }

export default function MiracleDetailPage({ topicId }: MiracleDetailPageProps) {
    const topic = useMemo(() => getMiracleById(topicId), [topicId])
    const overview = useMemo(
        () => (topic ? getTopicOverview(topic.sections, topic.excerpt) : ""),
        [topic]
    )
    const learningPoints = useMemo(
        () =>
            topic ? Array.from(new Set(topic.sections.flatMap((s) => s.keyPoints))).slice(0, 6) : [],
        [topic]
    )

    if (!topic) {
        return (
            <div className="container px-4 py-16 text-center">
                <p className="text-gray-600">Sign not found.</p>
                <Button variant="ghost-emerald" className="mt-4" href="/miracles">
                    Back to miracles
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <section className="border-b border-gray-100">
                <div className="container px-4 sm:px-6">
                    <div className="mx-auto max-w-3xl pb-8 pt-6 sm:pb-10 sm:pt-8">
                        <BackButton
                            renderMobileVariant={false}
                            buttonProps={{ variant: "ghost-emerald", href: "/miracles", shouldScale: false }}
                            label="Back to miracles"
                            labelMbl="Back"
                        />
                        <Badge variant="emerald" className="mt-4 text-xs font-medium">
                            Miracle
                        </Badge>
                        <h1 className="mt-3 text-3xl font-medium tracking-tight text-gray-900 sm:text-[2rem]">
                            {topic.title}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">{topic.excerpt}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {topic.quranRef && (
                                <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                    {topic.quranRef}
                                </Badge>
                            )}
                            <Badge variant="outline" className="capitalize bg-gray-50 text-gray-600">
                                {topic.category}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                <Clock3 className="mr-1 h-3 w-3" />
                                {topic.readMinutes} min
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-gray-50">
                <div className="container py-8 sm:py-10">
                    <article className="mx-auto max-w-3xl space-y-10">
                        {topic.videoUrl && (
                            <div className="overflow-hidden rounded-2xl bg-gray-950">
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={topic.videoUrl}
                                        title={`${topic.title} video`}
                                        className="h-full w-full"
                                        loading="lazy"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}

                        <ReadingOverview text={overview} />
                        <KeyTakeaways points={learningPoints} />
                        <TimelineOfIdeas sections={topic.sections} />
                    </article>
                </div>
            </section>
        </div>
    )
}
