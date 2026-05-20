"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getGuideById, getGuideSectionsMock } from "./content"
import GuideDetailHeader from "./GuideDetailHeader"
import GuideDetailContent from "./GuideDetailContent"
import GuideDetailSidebar from "./GuideDetailSidebar"
import { motion } from "framer-motion"

interface GuideDetailPageProps {
    guideId: string
}

const guideVideoMap: Record<string, string> = {
    wudu: "https://www.youtube.com/embed/jn0f6f1R4tQ",
    salah: "https://www.youtube.com/embed/ZxeL2M0wIZw",
    ramadan: "https://www.youtube.com/embed/XXQ0B6f_1dw",
    zakah: "https://www.youtube.com/embed/PlB6X5Q5YDo",
    umrah: "https://www.youtube.com/embed/83fVJQ4VYpQ",
    "hadith-intro": "https://www.youtube.com/embed/6dt9xYB3J7Y",
    isnad: "https://www.youtube.com/embed/NQn1j06L6l0",
    tajweed: "https://www.youtube.com/embed/43Q4LsiJvUQ",
    sabr: "https://www.youtube.com/embed/NwHV4V4E8Ps",
}

const GuideDetailPage = ({ guideId }: GuideDetailPageProps) => {
    const router = useRouter()
    const guide = useMemo(() => getGuideById(guideId), [guideId])
    const sections = useMemo(() => getGuideSectionsMock(guideId), [guideId])
    const videoUrl = guideVideoMap[guideId] ?? "https://www.youtube.com/embed/jn0f6f1R4tQ"
    const learningPoints = useMemo(
        () => Array.from(new Set(sections.flatMap((section) => section.keyPoints))).slice(0, 8),
        [sections]
    )
    const metrics = useMemo(() => {
        const seed = Array.from(guideId).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
        return {
            bookmarks: 1200 + (seed % 3800),
            reached: 18000 + (seed % 82000),
            authenticity: 86 + (seed % 12),
            popularity: 72 + (seed % 23),
        }
    }, [guideId])

    const formatCompact = (num: number) => new Intl.NumberFormat("en", { notation: "compact" }).format(num)

    if (!guide) {
        return (
            <div className="container px-4 py-16 text-center sm:px-6">
                <p className="text-gray-600">Guide not found.</p>
                <Button variant="ghost-emerald" className="mt-4" href="/guides">
                    Back to Guides
                </Button>
            </div >
        )
    }

    return (
        <div className="bg-white">
            <section>
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto pb-7 pt-6 sm:pb-8 sm:pt-8 md:pb-9 md:pt-10">
                        <GuideDetailHeader
                            guide={guide}
                            sectionsCount={sections.length}
                            href="/guides"
                        />
                    </div>
                </div>
            </section>

            <section className="relative w-full overflow-hidden">
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-10 left-[-24px] h-40 w-40 rounded-full bg-amber-50 blur-3xl"
                    animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-16 h-36 w-36 rounded-full bg-emerald-300 blur-3xl"
                    animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                />

                <div className="container py-6 sm:py-7 relative">
                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6">
                        <GuideDetailContent
                            title={guide.title}
                            videoUrl={videoUrl}
                            learningPoints={learningPoints}
                            sections={sections}
                        />
                        <GuideDetailSidebar
                            metrics={metrics}
                            readTimeMinutes={guide.readTimeMinutes}
                            formatCompact={formatCompact}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GuideDetailPage

