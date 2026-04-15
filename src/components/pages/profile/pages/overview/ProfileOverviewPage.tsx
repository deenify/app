"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
    ArrowUpRight,
    Bell,
    BookOpen,
    Flame,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { navigationShortCuts, profileSidebarContent } from "../../content"



const activity = [
    { title: "Read Surah Al-Kahf", detail: "Quran · 2 hours ago", icon: BookOpen, tone: "border-blue-200 bg-blue-50/40" },
    { title: "Completed Dhuhr", detail: "Prayer · 5 hours ago", icon: Flame, tone: "border-emerald-200 bg-emerald-50/50" },
    { title: "Morning adhkar streak", detail: "Dhikr · Yesterday", icon: Bell, tone: "border-purple-200 bg-purple-50/40" },
] as const

const ProfileOverviewPage = () => {

    return (
        <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {navigationShortCuts.map((item, index) => {
                    const Icon = item.icon

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                        >
                            <Link href={item.href} className="group block h-full">
                                <Card className="h-full border-layout-separator transition-shadow duration-200
                                hover:border-emerald-300 hover:shadow-md">
                                    <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2 pt-5">
                                        <div
                                            className={cn(
                                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1",
                                                item.tone
                                            )}
                                        >
                                            <Icon className="h-5 w-5" strokeWidth={2} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <CardTitle className="flex items-center justify-between gap-2 text-base font-medium text-gray-900">
                                                <span className="truncate">{item.label}</span>
                                                <ArrowUpRight
                                                    className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:-translate-y-1 
                                                    group-hover:translate-x-1 group-hover:text-emerald-600"
                                                    strokeWidth={2}
                                                />
                                            </CardTitle>
                                            <CardDescription className="text-xs sm:text-sm">
                                                {item.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-5 pt-0">
                                        <span className="text-xs font-medium text-emerald-700 group-hover:underline">Open</span>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-layout-separator">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Recent activity</CardTitle>
                        <CardDescription>Illustrative entries until your feed is connected.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {activity.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.title}
                                    className={cn(
                                        "flex gap-3 rounded-md border px-3 py-3 sm:px-4",
                                        item.tone
                                    )}
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/80 
                                    text-gray-700 ring-1 ring-gray-200">
                                        <Icon className="h-4 w-4" strokeWidth={2} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-600">{item.detail}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-white">Keep the intention pure</CardTitle>
                        <CardDescription className="text-emerald-50">
                            Small, consistent steps build lasting habits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed text-emerald-50/95">
                            &ldquo;And whoever does righteous deeds, whether male or female, while being a believer —
                            those will enter Paradise and will not be wronged, [even as much as] the speck on a date
                            seed.&rdquo;{" "}
                            <span className="font-medium text-white">Quran 4:124</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfileOverviewPage
