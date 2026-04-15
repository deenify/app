"use client"

import { Activity, CalendarDays, Flame, Globe, Pencil, ShieldCheck, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { profileHeaderContent } from "./content"

const statTone = [
    "text-emerald-700",
    "text-blue-700",
    "text-purple-700",
] as const


const ProfileHeader = () => {

    const {
        name, email, initials, avatarSrc,
        location, madhab, prayerMethod, stats
    } = profileHeaderContent

    const profileSecurityStats = [
        { label: "days Streak", value: stats.streakDays, chip: "#234", icon: Flame },
        { label: "Active sessions", value: stats.activeSessions, chip: "Healthy", icon: Activity },
        {
            label: "Two-factor auth",
            value: "2FA", chip: stats.twoFactorEnabled
                ? "Enabled"
                : "Disabled",
            icon: ShieldCheck
        },
    ] as const

    return (
        <Card
            className={cn(
                "overflow-hidden border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60",
                "shadow-sm"
            )}
        >
            <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
                    <div className="relative shrink-0">
                        <Avatar className="h-28 w-28 border-4 border-white shadow-md sm:h-32 sm:w-32">
                            <AvatarImage src={avatarSrc} alt="" />
                            <AvatarFallback className="bg-emerald-600 text-2xl font-medium text-white sm:text-3xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            type="button"
                            size="icon"
                            variant="default"
                            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-md"
                            shouldScale
                            aria-label="Edit profile"
                        >
                            <Pencil
                                size={14}
                                strokeWidth={2}
                            />
                        </Button>
                    </div>

                    <div className="min-w-0 flex-1 text-center md:text-left">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 space-y-1">
                                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                                    <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl">
                                        {name}
                                    </h1>
                                    <Badge variant="emerald" className="font-medium">
                                        <Sparkles className="mr-1 h-3 w-3" strokeWidth={2} />
                                        Active learner
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 sm:text-base">{email}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
                                <Globe className="mr-1 h-3 w-3" strokeWidth={2} />
                                {location}
                            </Badge>
                            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-800">
                                Madhab · {madhab}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
                                Prayer · {prayerMethod}
                            </Badge>
                        </div>

                        {/* (Streak + Rank) 
                          - (active sessions + status) 
                          - (2fa auth + enable/disable status)  */}
                        <div className="mt-6 grid max-w-md grid-cols-3 gap-3 sm:max-w-lg md:mx-0">
                            {profileSecurityStats.map((item, i) => {
                                const Icon = item.icon

                                return (
                                    <div
                                        key={item.label}
                                        className="relative rounded-md border border-gray-200/80 bg-white/90 px-3 py-3 text-left shadow-sm"
                                    >
                                        <div className={cn("text-center text-xl font-semibold tabular-nums sm:text-2xl", statTone[i])}>
                                            {item.value}
                                        </div>
                                        <p className="mt-1 text-center text-[11px] font-medium uppercase tracking-wide text-gray-500">
                                            {item.label}
                                        </p>

                                        <div className="flex justify-center">
                                            <span
                                                className={cn(
                                                    "mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                                                    item.chip === "Enabled"
                                                        ? "border-purple-200 bg-purple-50 text-purple-700"
                                                        : "border-gray-200 bg-gray-50 text-gray-600"
                                                )}
                                            >
                                                <Icon className="h-3 w-3" strokeWidth={2} />
                                                {item?.chip || ""}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileHeader
