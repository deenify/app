"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Bookmark, Share2, CheckCircle2, Info, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils/clsx"
import { getGuideById, getGuideSectionsMock } from "./content"

interface GuideDetailPageProps {
    guideId: string
}

const GuideDetailPage = ({ guideId }: GuideDetailPageProps) => {
    const router = useRouter()
    const guide = useMemo(() => getGuideById(guideId), [guideId])
    const sections = useMemo(() => getGuideSectionsMock(guideId), [guideId])

    const progressValue = 0

    if (!guide) {
        return (
            <div className="container px-4 py-16 text-center sm:px-6">
                <p className="text-gray-600">Guide not found.</p>
                <Button variant="ghost-emerald" className="mt-4" onClick={() => router.push("/guides")}>
                    Back to Guides
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto pb-8 pt-6 sm:pb-10 sm:pt-8 md:pb-12 md:pt-10">
                        <Button
                            variant="ghost-emerald"
                            shouldScale={false}
                            onClick={() => router.push("/guides")}
                            className="mb-6 sm:mb-8"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Guides
                        </Button>

                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 sm:h-[4.5rem] sm:w-[4.5rem]">
                                    <BookOpen className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                            >
                                <Badge variant="emerald" className="mb-3 text-xs font-medium">
                                    Learning guide
                                </Badge>

                                <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[1.75rem] md:leading-snug">
                                    {guide.title}
                                </h1>

                                <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
                                    A structured outline with key points and practical steps. For nuanced cases, consult
                                    a qualified scholar.
                                </p>

                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-800"
                                    >
                                        {sections.length} sections
                                    </Badge>
                                    <Badge variant="outline" className="border-gray-200 bg-gray-50 text-xs text-gray-700">
                                        {guide.readTimeMinutes} min read
                                    </Badge>
                                    <Badge variant="outline" className="border-gray-200 bg-gray-50 text-xs text-gray-700">
                                        {guide.category.replace("-", " ")}
                                    </Badge>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                    <Button variant="default" shouldScale className="gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Start learning
                                    </Button>
                                    <Button variant="outline" shouldScale className="gap-2">
                                        <Bookmark className="h-4 w-4" />
                                        Bookmark
                                    </Button>
                                    <Button variant="outline" shouldScale className="gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </Button>
                                </div>
                            </motion.div>
                        </header>
                    </div>
                </div>
            </section>

            <section className={cn("relative w-full border-t border-layout-separator", "bg-gradient-to-br from-emerald-50 via-white to-teal-50")}>
                <div className="container py-6 sm:py-10">
                    <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
                        <Card className="border-gray-100">
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                    <Info className="h-4 w-4 text-blue-600" />
                                    About this guide
                                </CardTitle>
                                <CardDescription>What you should expect from this outline.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm leading-relaxed text-gray-700">
                                    This guide is designed as a calm, practical reference. Use it to understand the
                                    essential steps, then refine your practice with authentic resources and trusted
                                    teachers.
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                        <p className="mb-2 text-sm font-medium text-emerald-900">What you’ll learn</p>
                                        <ul className="space-y-1 text-sm text-emerald-800">
                                            <li className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
                                                Clear steps and sequence
                                            </li>
                                            <li className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
                                                Common mistakes to avoid
                                            </li>
                                            <li className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-700" />
                                                Practical weekly habits
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                                        <p className="mb-2 text-sm font-medium text-blue-900">Key benefits</p>
                                        <ul className="space-y-1 text-sm text-blue-800">
                                            <li className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                                                Stronger consistency
                                            </li>
                                            <li className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                                                Clearer understanding
                                            </li>
                                            <li className="flex gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                                                Better spiritual focus
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-200 bg-purple-50">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Learning progress</p>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Track sections as you complete them (coming soon).
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-semibold tabular-nums text-purple-700">
                                            {progressValue}%
                                        </p>
                                        <p className="text-xs text-gray-600">Complete</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Progress value={progressValue} className="h-3 bg-purple-100" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100">
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-emerald-600" />
                                    Guide sections
                                </CardTitle>
                                <CardDescription>Read the outline and follow the key takeaways.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    {sections.map((s) => (
                                        <div
                                            key={s.number}
                                            className="rounded-xl border border-gray-100 bg-white p-5 transition-colors hover:border-emerald-200"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white tabular-nums">
                                                    {s.number}
                                                </div>
                                                <div className="min-w-0 flex-1 space-y-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{s.title}</p>
                                                        <p className="mt-1 text-sm leading-relaxed text-gray-700">
                                                            {s.content}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                                        <div className="flex items-start gap-2">
                                                            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-medium text-blue-900">
                                                                    Key points
                                                                </p>
                                                                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                                                                    {s.keyPoints.map((p) => (
                                                                        <li key={p} className="flex items-start gap-2">
                                                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                                                                            <span>{p}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                                        <Button variant="outline" size="sm" shouldScale className="gap-1.5 text-xs">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            Mark complete
                                                        </Button>
                                                        <Button variant="outline" size="sm" shouldScale className="gap-1.5 text-xs">
                                                            <Bookmark className="h-3.5 w-3.5" />
                                                            Bookmark
                                                        </Button>
                                                        <Button variant="outline" size="sm" shouldScale className="gap-1.5 text-xs">
                                                            <Share2 className="h-3.5 w-3.5" />
                                                            Share
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GuideDetailPage

