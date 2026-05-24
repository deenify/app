"use client"

import { CheckCircle2, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils/clsx"

type DashboardInspirationCardProps = {
    badge: string
    quote: string
    source: string
}

export function DashboardInspirationCard({ badge, quote, source }: DashboardInspirationCardProps) {
    const [isRead, setIsRead] = useState(false)

    const handleMarkAsRead = () => {
        setIsRead(!isRead)
    }

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
                        variant={isRead ? "default" : "secondary"}
                        shouldScale
                        className={cn(
                            "w-full sm:w-auto",
                            isRead && "bg-emerald-700 text-white pointer-events-none"
                        )}
                        onClick={handleMarkAsRead}
                    >
                        {isRead
                            ? <span className="flex items-center gap-2">
                                <span>Read 15s ago</span>
                                <CheckCircle2 size={16} className="text-white" />
                            </span>
                            : "Mark Read (+15xp)"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
