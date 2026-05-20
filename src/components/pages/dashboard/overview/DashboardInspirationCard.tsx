"use client"

import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type DashboardInspirationCardProps = {
    badge: string
    quote: string
    source: string
}

export function DashboardInspirationCard({ badge, quote, source }: DashboardInspirationCardProps) {
    return (
        <Card className="relative overflow-hidden border-none bg-emerald-600 text-white shadow-lg shadow-emerald-100 p-0">
            <Sparkles
                className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-12 opacity-10 sm:h-32 sm:w-32"
                aria-hidden
            />
            <CardHeader className="relative p-4 pt-6">
                <Badge variant="emerald" className="w-max">
                    {badge}
                </Badge>
            </CardHeader>
            <CardContent className="relative space-y-5 p-4">
                <p className="text-sm font-medium leading-relaxed sm:text-base">{quote}</p>
                <div className="flex flex-col gap-3 border-t border-emerald-500/50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-100">
                            Source
                        </p>
                        <p className="text-xs">{source}</p>
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        shouldScale
                        className="w-full bg-white text-emerald-700 hover:bg-emerald-50 sm:w-auto"
                    >
                        Share
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
