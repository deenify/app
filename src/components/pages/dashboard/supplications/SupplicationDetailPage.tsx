"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { notify } from "@/lib/notification/notify"
import {
    getRelatedSupplications,
    getSupplicationById,
    getSupplicationDetailSections,
} from "./content"
import SupplicationDetailHeader from "./SupplicationDetailHeader"
import SupplicationDetailContent from "./SupplicationDetailContent"
import SupplicationDetailSidebar from "./SupplicationDetailSidebar"

type SupplicationDetailPageProps = {
    supplicationId: string
}

export default function SupplicationDetailPage({ supplicationId }: SupplicationDetailPageProps) {
    const item = useMemo(() => getSupplicationById(supplicationId), [supplicationId])
    const sections = useMemo(() => (item ? getSupplicationDetailSections(item) : []), [item])
    const related = useMemo(() => getRelatedSupplications(supplicationId), [supplicationId])
    const learningPoints = useMemo(
        () => Array.from(new Set(sections.flatMap((section) => section.keyPoints))).slice(0, 8),
        [sections]
    )

    const readTimeMinutes = item ? Math.max(1, Math.round(item.readSeconds / 60)) : 1

    const metrics = useMemo(() => {
        const seed = Array.from(supplicationId).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
        return {
            bookmarks: 1200 + (seed % 3800),
            reached: 18000 + (seed % 82000),
            authenticity: 86 + (seed % 12),
            popularity: 72 + (seed % 23),
        }
    }, [supplicationId])

    const formatCompact = (num: number) =>
        new Intl.NumberFormat("en", { notation: "compact" }).format(num)

    const handleShare = () => {
        if (!item) return
        const url = `${window.location.origin}/supplications/${item.id}`
        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: `${item.title}: ${item.translation}`,
                url,
            })
        } else {
            navigator.clipboard.writeText(url)
            notify.success("Link copied to clipboard")
        }
    }

    if (!item) {
        return (
            <div className="container px-4 py-16 text-center sm:px-6">
                <p className="text-gray-600">Supplication not found.</p>
                <Button variant="ghost-emerald" className="mt-4" href="/supplications">
                    Back to Supplications
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <section>
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto pb-7 pt-6 sm:pb-8 sm:pt-8 md:pb-9 md:pt-10">
                        <SupplicationDetailHeader
                            item={item}
                            sectionsCount={sections.length}
                            href="/supplications"
                            onShare={handleShare}
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

                <div className="container relative py-6 sm:py-7">
                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6">
                        <SupplicationDetailContent
                            item={item}
                            learningPoints={learningPoints}
                            sections={sections}
                        />
                        <SupplicationDetailSidebar
                            related={related}
                            readTimeMinutes={readTimeMinutes}
                            metrics={metrics}
                            formatCompact={formatCompact}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
