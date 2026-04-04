"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ScrollText, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import HadithCard from "./HadithCard"
import HadithSettingSidebar from "./HadithSettingSidebar"
import { HadithCollections, getMockHadithsForCollection } from "./content"
import BackButton from "@/components/shared/buttons/BackButton"

interface HadithCollectionPageProps {
    collectionId: string
}

export default function HadithDetailPage({ collectionId }: HadithCollectionPageProps) {
    const router = useRouter()
    const [showSettings, setShowSettings] = useState(false)

    const collection = useMemo(
        () => HadithCollections.find((c) => c.id === collectionId),
        [collectionId]
    )
    const mockHadiths = useMemo(() => getMockHadithsForCollection(collectionId), [collectionId])

    if (!collection) {
        return (
            <div className="container px-4 py-16 text-center sm:px-6">
                <p className="text-gray-600">Collection not found.</p>
                <Button variant="ghost-emerald" className="mt-4" href="/hadith">
                    Back to Hadith
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto pb-8 pt-6 sm:pb-10 sm:pt-8 md:pb-12 md:pt-10">
                        <BackButton
                            renderMobileVariant={false}
                            buttonProps={{
                                variant: "ghost-emerald",
                                shouldScale: false,
                                onClick: () => router.push("/hadith"),
                                size: "default",
                            }}
                            label="Back to Hadith"
                            labelMbl="Back"
                        />

                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-[0_1px_0_rgba(16,185,129,0.12)] ring-1 ring-emerald-100 sm:h-[4.5rem] sm:w-[4.5rem]">
                                    <ScrollText className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                            >
                                <Badge variant="emerald" className="mb-3 text-xs font-medium">
                                    Hadith collection
                                </Badge>

                                <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[1.75rem] md:leading-snug">
                                    {collection.nameEnglish}
                                </h1>

                                <p
                                    className="mx-auto mt-3 max-w-xl text-xl font-medium leading-relaxed text-emerald-800 sm:text-2xl"
                                    dir="rtl"
                                >
                                    {collection.nameArabic}
                                </p>

                                <p className="mt-3 text-sm text-gray-600 sm:text-base">{collection.compiler}</p>

                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="border-emerald-200 bg-emerald-50 text-xs text-emerald-800"
                                    >
                                        {collection.hadithCount.toLocaleString()} hadiths
                                    </Badge>
                                </div>
                            </motion.div>
                        </header>
                    </div>
                </div>
            </section>

            <section
                className={cn(
                    "relative w-full border-t border-layout-separator",
                    "bg-gradient-to-br from-emerald-50 via-white to-teal-50"
                )}
            >
                {/* <motion.div
                    className="pointer-events-none absolute -top-8 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-200 blur-3xl sm:left-[18%] sm:translate-x-0"
                    animate={{ opacity: [0.35, 0.5, 0.35] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                /> */}
                <motion.div
                    className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-teal-100 blur-3xl"
                    aria-hidden
                />

                <div className="relative h-[calc(100vh-200px)] flex">
                    {/* hadiths-listings  */}
                    <main className="container h-full py-4 sm:py-6 overflow-hidden">
                        <div className="mx-auto flex h-full max-w-4xl flex-col scrollbar-thin overflow-y-auto pr-1 sm:pr-2">
                            <div className="flex flex-col gap-5 py-2 sm:gap-6 h-max">
                                {mockHadiths.map((h, i) => (
                                    <HadithCard
                                        key={h.id}
                                        hadith={h}
                                        collectionNameEnglish={collection.nameEnglish}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* settings-sidebar  */}
                    <HadithSettingSidebar open={showSettings} onClose={() => setShowSettings(false)} />
                </div>

                {/* settings-sidebar toggler  */}
                {!showSettings ? (
                    <div className="fixed right-4 top-28 z-10 sm:right-6 sm:top-32">
                        <Button
                            type="button"
                            shouldScale
                            onClick={() => setShowSettings(true)}
                            className={cn(
                                "h-11 w-11 rounded-full border border-amber-300 bg-amber-400 px-0 shadow-lg",
                                "text-amber-50 hover:bg-amber-500 hover:text-white hover:border-amber-400",
                                "sm:h-12 sm:w-12"
                            )}
                            aria-label="Open reader settings"
                        >
                            <Settings
                                className={cn(
                                    "h-5 w-5 sm:h-[22px] sm:w-[22px]",
                                    "drop-shadow-[0_1px_0_rgb(255_255_255_/_0.45),0_2px_4px_rgb(90_45_10_/_0.55),0_6px_18px_rgb(69_26_3_/_0.45)]"
                                )}
                                strokeWidth={2.25}
                            />
                        </Button>
                    </div>
                ) : null}
            </section>
        </div>
    )
}
