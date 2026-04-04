"use client"

import React, { useState } from "react"
import {
    LogOut,
    ChevronDown,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils/clsx"
import { profileMenuItems } from "../layout/header/content"
import Link from "next/link"

export type UserStats = {
    daysStreak?: number
    points?: number
    globalRank?: number
}

export type UserPreferences = {
    name?: string
    email?: string
    avatar?: string
    stats?: UserStats
}

interface UserProfileDropdownProps {
    user?: UserPreferences
    onSignOut?: () => void
    className?: string
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
    user,
    onSignOut,
    className,
}) => {
    const [open, setOpen] = useState(false)
    const initials = user?.name?.charAt(0)?.toUpperCase() || "U"
    const stats = user?.stats || {}

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                className={cn(
                    "!focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
                    "focus:outline-none !ring-0 !ring-offset-0",
                    "active:ring-0 active:ring-offset-0",
                )}
            >
                <Button
                    asChild
                    variant="ghost"
                    className={cn(
                        "h-10 justify-center",
                        "px-0 sm:px-2",
                        "gap-0 sm:gap-2",
                        "min-w-[40px] sm:min-w-[60px]",
                        "w-10 sm:w-auto",
                        className
                    )}
                    shouldScale
                >
                    <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="bg-emerald-600 text-white text-sm font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="hidden sm:inline h-4 w-4 text-gray-600 flex-shrink-0" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={8}
                collisionPadding={16}
                className={cn(
                    "w-[calc(100vw-32px)] sm:w-[380px] max-w-[380px]",
                    "border border-gray-200 p-0",
                    "max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin",
                    "shadow-lg"
                )}
            >
                {/* Header Section */}
                <div className="sm:p-5 py-5 px-3 border-b border-gray-200">
                    <div className="flex items-center space-x-4 mb-5">
                        <Avatar className="h-14 w-14 flex-shrink-0">
                            <AvatarFallback className="bg-emerald-600 text-white text-lg font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <div className="w-full flex items-start justify-between gap-3">
                                <p className="text-gray-900 font-semibold text-base truncate font-heading">
                                    {user?.name || "User"}
                                </p>
                                <Button
                                    type="button"
                                    variant="ghost-emerald"
                                    size="icon"
                                    shouldScale
                                    className="w-6 h-6 rounded-md duration-100 border border-emerald-200 
                                    text-black bg-emerald-50 md:hidden"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close settings"
                                >
                                    <X size={16} strokeWidth={2} />
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 truncate md:mt-1">
                                {user?.email || "user@example.com"}
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 sm:gap-2.5 gap-1">
                        <div className="text-center p-3 bg-emerald-50 rounded-md border border-emerald-100">
                            <p className="text-emerald-700 font-bold text-lg">
                                {stats.daysStreak || 0}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">Streak</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-md border border-blue-100">
                            <p className="text-blue-700 font-bold text-lg">
                                {stats.points || 0}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">Points</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-md border border-purple-100">
                            <p className="text-purple-700 font-bold text-lg">
                                #{stats.globalRank || 0}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">Rank</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="px-2 py-2">
                    {profileMenuItems.map((section, idx) => (
                        <div key={idx} className="mb-3 last:mb-0">
                            <div className="px-2 py-1.5 mb-1">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                                    {section.label}
                                </p>
                            </div>
                            {section.sectionItems.map((item, idxx) => (
                                <Link
                                    key={idxx}
                                    href={item.href}
                                    className="block"
                                >
                                    <DropdownMenuItem
                                        className={cn(
                                            "cursor-pointer rounded-sm px-2.5 py-2 mb-0.5 last:mb-0 transition-colors duration-150",
                                            "hover:bg-emerald-50 hover:text-emerald-900",
                                            "focus:bg-emerald-50 focus:text-emerald-900"
                                        )}
                                    >
                                        <item.icon className="mr-2 h-4 w-4 text-gray-600" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Sign Out */}
                <div className="p-1.5 border-t border-gray-200">
                    <DropdownMenuItem
                        onClick={onSignOut}
                        className={cn(
                            "cursor-pointer rounded-sm px-2.5 py-2 transition-colors duration-150",
                            "hover:bg-red-50 hover:text-red-600 text-red-600",
                            "focus:bg-red-50 focus:text-red-600"
                        )}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

