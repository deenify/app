"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import { DashboardStatItem, StatVariants } from "./content"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

type DashboardStatsProps = {
    items: DashboardStatItem[]
}

export function DashboardStats({ items }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4 xl:gap-4">
            {items.map((stat, index) => {
                const tone = StatVariants[stat.tone]
                const Icon = stat.icon

                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                    >
                        <Link href={stat.href} className="block h-full">
                            <Card className="border-layout-separator transition-shadow duration-200
                            hover:border-emerald-300 hover:shadow-md group cursor-pointer">
                                <CardContent className="p-4 sm:p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="text-xs font-medium text-gray-500 sm:text-sm">{stat.label}</p>
                                        <div
                                            className={cn(
                                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                                tone.bg,
                                                tone.icon
                                            )}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="mt-3 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                                                {stat.value}
                                            </p>
                                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                                <Badge variant={tone.badge} className="h-5 px-1.5 text-xs">
                                                    {stat.badge}
                                                </Badge>
                                                <span className="text-xs text-gray-500">{stat.hint}</span>
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            size={18}
                                            className="shrink-0 text-gray-400 transition-transform group-hover:-translate-y-1 
                                        group-hover:translate-x-1 group-hover:text-emerald-600"
                                            strokeWidth={2}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                )
            })}
        </div>
    )
}
