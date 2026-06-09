"use client"

import Image from "next/image"
import { BookOpen, Check, CheckCircle2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { notify } from "@/lib/notification/notify"
import type { SupplicationDetailSection, SupplicationItem } from "./content"

type SupplicationDetailContentProps = {
    item: SupplicationItem
    learningPoints: string[]
    sections: SupplicationDetailSection[]
}

export default function SupplicationDetailContent({
    item,
    learningPoints,
    sections,
}: SupplicationDetailContentProps) {
    const [copiedArabic, setCopiedArabic] = useState(false)
    const [copiedTranslation, setCopiedTranslation] = useState(false)

    const handleCopy = (text: string, type: "arabic" | "translation") => {
        navigator.clipboard.writeText(text)
        if (type === "arabic") {
            setCopiedArabic(true)
            setTimeout(() => setCopiedArabic(false), 2000)
        } else {
            setCopiedTranslation(true)
            setTimeout(() => setCopiedTranslation(false), 2000)
        }
        notify.success(`${type === "arabic" ? "Arabic" : "Translation"} copied`)
    }

    return (
        <main className="min-w-0 space-y-7">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Read and reflect</p>
                <p className="mt-1 text-sm text-gray-600">
                    Start with the Arabic and translation, then move into structured reflection points.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-video w-full bg-gray-950 shadow-[0_12px_32px_rgba(2,6,23,0.24)]">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                </div>
            </div>

            <div className="min-w-0 space-y-5 border-b border-gray-100 pb-5">
                <section className="rounded-2xl border border-gray-100 bg-[#fafafa] px-5 py-5 sm:px-6 sm:py-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-900">Arabic text</p>
                        <Button
                            variant="ghost-emerald"
                            size="sm"
                            className="h-8 gap-1.5 px-2.5"
                            onClick={() => handleCopy(item.arabic, "arabic")}
                        >
                            {copiedArabic ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            <span className="text-xs">Copy</span>
                        </Button>
                    </div>
                    <p className="font-arabic text-right text-2xl leading-[1.9] text-gray-900 sm:text-3xl" dir="rtl">
                        {item.arabic}
                    </p>
                </section>

                <section className="rounded-2xl border border-gray-100 bg-white px-5 py-5 sm:px-6 sm:py-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-900">Translation</p>
                        <Button
                            variant="ghost-emerald"
                            size="sm"
                            className="h-8 gap-1.5 px-2.5"
                            onClick={() => handleCopy(item.translation, "translation")}
                        >
                            {copiedTranslation ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            <span className="text-xs">Copy</span>
                        </Button>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 break-words">{item.translation}</p>
                </section>
            </div>

            {learningPoints.length > 0 && (
                <div className="min-w-0 border-b border-gray-100 pb-5">
                    <p className="mb-3 text-sm font-semibold text-gray-900">Core reflection points</p>
                    <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {learningPoints.map((point) => (
                            <div key={point} className="inline-flex min-w-0 items-start gap-2 text-sm text-gray-700">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                <span className="break-words">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <section className="min-w-0">
                <p className="mb-4 text-sm font-semibold text-gray-900">Spiritual framework</p>
                <div className="space-y-5">
                    {sections.map((s) => (
                        <section key={s.number} className="relative pl-6">
                            <span className="absolute left-0 top-1 h-full w-px bg-gray-200" />
                            <span className="absolute left-[-8px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-semibold text-white">
                                {s.number}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900">{s.title}</p>
                                <p className="mt-1.5 break-words text-sm leading-relaxed text-gray-600">{s.content}</p>
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
