"use client"

import {
    Activity, AlertTriangle, Check, Flame, Globe,
    Pencil, ShieldAlert, ShieldCheck, Sparkles
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { profileHeaderContent } from "./content"

const statTone = ["text-emerald-700", "text-blue-700", "text-purple-700"] as const

const statIconStyle = [
    "border-emerald-200 bg-emerald-50 text-emerald-700",
    "border-blue-200 bg-blue-50 text-blue-700",
    "border-purple-200 bg-purple-50 text-purple-700",
] as const

const pillStyle = [
    "text-emerald-700 border-emerald-200 bg-emerald-50",
    "text-blue-700 border-blue-200 bg-blue-50",
    "text-purple-700 border-purple-200 bg-purple-50",
] as const

const ProfileHeader = () => {
    const { name, email, initials, avatarSrc, location, madhab, prayerMethod, stats } = profileHeaderContent

    const statItems = [
        { label: "Streak", fullLabel: "day streak", value: stats.streakDays, chip: "#234", icon: Flame, sub: "days" },
        { label: "Sessions", fullLabel: "active sessions", value: stats.activeSessions, chip: "Healthy", icon: Activity, sub: "devices" },
        { label: "2FA", fullLabel: "2-factor auth", value: "2FA", chip: stats.twoFactorEnabled ? "Enabled" : "Disabled", icon: ShieldCheck, sub: "security" },
    ] as const

    return (
        <Card className="overflow-hidden border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60 shadow-sm">
            <CardContent className="p-4 md:p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <Avatar className="h-28 w-28 border-4 border-white shadow-md sm:h-32 sm:w-32">
                            <AvatarImage src={avatarSrc} alt="" />
                            <AvatarFallback className="bg-emerald-600 text-2xl font-medium text-white sm:text-3xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            type="button" size="icon" variant="default" shouldScale
                            aria-label="Edit profile"
                            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-md"
                        >
                            <Pencil size={14} strokeWidth={2} />
                        </Button>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1 text-center md:text-left">

                        {/* Name + email */}
                        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <h1 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
                            <Badge variant="emerald" className="font-medium">
                                <Sparkles className="mr-1 h-3 w-3" strokeWidth={2} />
                                Active learner
                            </Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 sm:text-base">{email}</p>

                        {/* Meta badges */}
                        <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
                                <Globe className="mr-1 h-3 w-3" strokeWidth={2} />{location}
                            </Badge>
                            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-800">
                                Madhab · {madhab}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
                                Prayer · {prayerMethod}
                            </Badge>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 max-w-md sm:max-w-lg md:mx-0">

                            {/* Pills — below 340px only */}
                            <div className="grid grid-cols-2 gap-2 sm:hidden">
                                {statItems.map((item, i) => {
                                    const is2FA = item.label === "2FA"
                                    const enabled = stats.twoFactorEnabled

                                    const Icon = is2FA
                                        ? enabled
                                            ? ShieldCheck
                                            : ShieldAlert
                                        : item.icon

                                    return (
                                        <div
                                            key={item.label}
                                            className={cn(
                                                "inline-flex items-center gap-1.5 rounded-md border bg-white/80 px-2.5 py-2 text-[12px] whitespace-nowrap",
                                                pillStyle[i],
                                                i === statItems.length - 1 && "col-span-2"
                                            )}
                                        >
                                            {/* LEFT ICON */}
                                            <Icon className="h-4 w-4 shrink-0" />

                                            {/* TEXT */}
                                            <p className="flex flex-1 items-center gap-2 truncate">
                                                <span className="font-semibold">
                                                    {item.value}
                                                </span>

                                                {is2FA ? (
                                                    <>
                                                        <span>
                                                            {enabled ? "Enabled" : "Disabled"}
                                                        </span>

                                                        {/* RIGHT STATUS ICON */}
                                                        {enabled ? (
                                                            <Check className="h-4 w-4 text-emerald-600 shrink-0 ml-auto" />
                                                        ) : (
                                                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 ml-auto" />
                                                        )}
                                                    </>
                                                ) : (
                                                    <span>{item.label}</span>
                                                )}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Cards — 341px and above */}
                            <div className="hidden sm:flex items-stretch gap-2.5 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none]">
                                {statItems.map((item, i) => (
                                    <div key={item.label} className="min-w-[140px] flex-1 snap-start rounded-md border border-gray-200/80 bg-white/90 px-3 py-2.5 shadow-sm">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">{item.label}</p>
                                            <span className={cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border", statIconStyle[i])} aria-hidden>
                                                <item.icon className="h-3.5 w-3.5" strokeWidth={2} />
                                            </span>
                                        </div>
                                        <div className={cn("mt-1.5 text-xl font-semibold tabular-nums leading-none self-start text-left", statTone[i])}>
                                            {item.value}
                                        </div>
                                        <div className="mt-1.5 flex items-center justify-between gap-2">
                                            <span className="text-[11px] text-gray-600">{item.sub}</span>
                                            <span className={cn(
                                                "inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                                                item.chip === "Enabled"
                                                    ? "border-purple-200 bg-purple-50 text-purple-700"
                                                    : "border-gray-200 bg-gray-50 text-gray-600"
                                            )}>
                                                {item.chip}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileHeader