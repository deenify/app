"use client"

import { BookOpen, CheckCircle2 } from "lucide-react"
import type { GuideSectionType } from "./content"

type GuideDetailContentProps = {
    title: string
    videoUrl: string
    learningPoints: string[]
    sections: GuideSectionType[]
}

const GuideDetailContent = ({ title, videoUrl, learningPoints, sections }: GuideDetailContentProps) => {
    return (
        <main className="min-w-0 space-y-7">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Watch and absorb</p>
                <p className="mt-1 text-sm text-gray-600">
                    Start with the walkthrough, then move into structured reflection points.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl">
                <div className="aspect-video w-full bg-gray-950 shadow-[0_12px_32px_rgba(2,6,23,0.24)]">
                    <iframe
                        src={videoUrl}
                        title={`${title} video guide`}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            <div className="border-b border-gray-100 pb-5 min-w-0">
                <p className="mb-3 text-sm font-semibold text-gray-900">Core learning points</p>
                <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {learningPoints.map((point) => (
                        <div key={point} className="inline-flex min-w-0 items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="break-words">{point}</span>
                        </div>
                    ))}
                </div>
            </div>

            <section className="min-w-0">
                <p className="mb-4 text-sm font-semibold text-gray-900">Intellectual framework</p>
                <div className="space-y-5">
                    {sections.map((s) => (
                        <section key={s.number} className="relative pl-6">
                            <span className="absolute left-0 top-1 h-full w-px bg-gray-200" />
                            <span className="absolute left-[-8px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-semibold text-white">
                                {s.number}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900">{s.title}</p>
                                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 break-words">{s.content}</p>
                                <ul className="mt-3 grid gap-1.5">
                                    {s.keyPoints.map((point) => (
                                        <li key={point} className="inline-flex min-w-0 items-start gap-2 text-sm text-gray-700">
                                            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                            <span className="break-words">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default GuideDetailContent
