"use client"

import { useMemo } from "react"
import { BookOpen, CheckCircle2, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/shared/buttons/BackButton"
import { getMiracleById } from "./content"

type MiracleDetailPageProps = { topicId: string }

export default function MiracleDetailPage({ topicId }: MiracleDetailPageProps) {
    const topic = useMemo(() => getMiracleById(topicId), [topicId])
    const overview = useMemo(
        () =>
            topic
                ? `${topic.excerpt} ${topic.sections.map((s) => s.content).join(" ")}`.trim()
                : "",
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

                        <section className="rounded-2xl border border-gray-100 bg-[#fafafa] px-5 py-5 sm:px-6 sm:py-6">
                            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400">
                                Overview
                            </p>
                            <p className="mt-3 text-[15px] leading-[1.75] text-gray-700">{overview}</p>
                        </section>

                        {learningPoints.length > 0 && (
                            <section>
                                <p className="text-sm font-medium text-gray-900">Key takeaways</p>
                                <ul className="mt-4 space-y-3">
                                    {learningPoints.map((point) => (
                                        <li
                                            key={point}
                                            className="flex gap-3 text-sm leading-relaxed text-gray-600"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        <section>
                            <p className="text-sm font-medium text-gray-900">Timeline of ideas</p>
                            <div className="mt-5 space-y-8">
                                {topic.sections.map((s) => (
                                    <article key={s.number} className="relative pl-8">
                                        <span className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-medium text-white">
                                            {s.number}
                                        </span>
                                        <h3 className="text-sm font-medium text-gray-900">{s.title}</h3>
                                        <p className="mt-2 text-sm leading-[1.7] text-gray-600">{s.content}</p>
                                        {s.keyPoints.length > 0 && (
                                            <ul className="mt-3 space-y-2">
                                                {s.keyPoints.map((p) => (
                                                    <li key={p} className="flex gap-2 text-sm text-gray-600">
                                                        <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/80" />
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    </article>
                </div>
            </section>
        </div>
    )
}
