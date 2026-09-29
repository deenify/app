"use client"

import React, { useState } from "react"
import { Bell, LucideIcon, X, Check, CheckCircle2, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils/clsx"

export type Notification = {
    id: string
    type: string
    title: string
    message: string
    time: string
    icon: LucideIcon
    color?: "red" | "emerald" | "blue" | "purple" | "yellow"
    read?: boolean
}

interface NotificationsPopoverProps {
    notifications?: Notification[]
    onSeeAll?: () => void
    className?: string
}


const DEFAULT_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "prayer",
        title: "Missed Prayer Alert",
        message: "You missed Fajr prayer today.",
        time: "2 hours ago",
        icon: Bell,
        color: "red",
        read: false,
    },
    {
        id: "2",
        type: "dhikr",
        title: "Dhikr Rank Updated",
        message: "You moved up to rank #127.",
        time: "5 hours ago",
        icon: Bell,
        color: "emerald",
        read: false,
    },
    {
        id: "3",
        type: "profile",
        title: "Profile Visit",
        message: "Ahmed Abdullah viewed your profile.",
        time: "1 day ago",
        icon: Bell,
        color: "blue",
        read: true,
    },
    {
        id: "3",
        type: "profile",
        title: "Profile Visit",
        message: "Ahmed Abdullah viewed your profile.",
        time: "1 day ago",
        icon: Bell,
        color: "blue",
        read: true,
    },
    {
        id: "3",
        type: "profile",
        title: "Profile Visit",
        message: "Ahmed Abdullah viewed your profile.",
        time: "1 day ago",
        icon: Bell,
        color: "blue",
        read: true,
    },
    {
        id: "3",
        type: "profile",
        title: "Profile Visit",
        message: "Ahmed Abdullah viewed your profile.",
        time: "1 day ago",
        icon: Bell,
        color: "blue",
        read: true,
    },
]

const colorClasses = {
    red: "bg-red-100 text-red-600",
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    yellow: "bg-yellow-100 text-yellow-600",
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
    notifications = DEFAULT_NOTIFICATIONS,
    onSeeAll,
    className,
}) => {
    const [open, setOpen] = useState(false)
    const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications)

    const unreadCount = localNotifications.filter(n => !n.read).length

    const handleNotificationClick = (notification: Notification) => {
        setLocalNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n))
    }

    const handleMarkAsRead = (e: React.MouseEvent, notificationId: string) => {
        e.stopPropagation()
        setLocalNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n))
    }

    const handleDismiss = (e: React.MouseEvent, notificationId: string) => {
        e.stopPropagation()
        setLocalNotifications(prev => prev.filter(n => n.id !== notificationId))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger >
                <Button
                    asChild
                    variant="ghost"
                    shouldScale
                    className={cn(
                        "h-10 w-10 p-0 relative",
                        "!focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
                        "focus:outline-none !ring-0 !ring-offset-0",
                        "active:ring-0 active:ring-offset-0",
                        className,
                        open ? "bg-gray-200/50 text-gray-900" : "bg-transparent"
                    )}
                >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                sideOffset={8}
                align="end"
                collisionPadding={16}
                className={cn(
                    "w-[calc(100vw-32px)] sm:w-[380px] max-w-[380px]",
                    "p-0 border border-gray-200 bg-white",
                    "max-h-[calc(100vh-200px)]",
                    "flex flex-col overflow-hidden",
                    "shadow-xl"
                )}
            >
                {/* Header Section - Fixed at top */}
                <header className="flex-shrink-0 px-4 py-3 border-b border-gray-200 relative">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-900 font-semibold text-base font-heading">Notifications</h3>
                        <div className="flex items-center gap-4">
                            {unreadCount > 0 && (
                                <Badge
                                    severity="high"
                                    className="px-2 py-0.5 font-medium text-xs"
                                >
                                    {unreadCount} new
                                </Badge>
                            )}
                            <Button
                                type="button"
                                variant="ghost-emerald"
                                size="icon"
                                shouldScale
                                className="w-6 h-6 rounded-md duration-100 border border-emerald-200 
                                text-black bg-emerald-50 md:hidden outline-none ring-0"
                                onClick={() => setOpen(false)}
                                aria-label="Close settings"
                            >
                                <X size={16} strokeWidth={2} />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Notifications Section - Scrollable content */}
                <section className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                    <div className="p-2">
                        {!localNotifications?.length ? (
                            <div className="flex flex-col items-center justify-center text-center py-8 px-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={1.5} />
                                </div>

                                <h4 className="text-gray-900 font-semibold text-base font-heading mb-2">
                                    You&apos;re all caught up!
                                </h4>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed max-w-[240px]">
                                    No new notifications at the moment. We&apos;ll notify you when something important happens.
                                </p>
                                <Button
                                    variant="link"
                                    className="text-emerald-600 font-medium text-sm"
                                    onClick={() => {
                                        setOpen(false)
                                        onSeeAll?.()
                                    }}
                                >
                                    See All
                                </Button>
                            </div>
                        ) : (
                            localNotifications?.map((notification, idx) => {
                                const Icon = notification.icon
                                const colorClass = colorClasses[notification.color || "blue"]
                                const isRead = notification.read

                                return (
                                    <div
                                        key={idx}
                                        onDoubleClick={() => handleNotificationClick(notification)}
                                        className={cn(
                                            "group relative p-2.5 rounded-md last:mb-0 transition-all duration-150 mb-1.5 select-none",
                                            "border border-layout-separator",
                                            // Background & Gradients
                                            isRead
                                                ? "bg-gray-50/50 hover:bg-gray-50"
                                                : (cn(
                                                    "border-l-2 border-emerald-500 ring-1 ring-emerald-100 hover:ring-emerald-300 cursor-pointer",
                                                    "bg-[linear-gradient(to_right,oklch(0.979_0.021_166.113_/_0.4),oklch(0.979_0.021_166.113_/_0.15),transparent)]",
                                                    "hover:bg-[linear-gradient(to_right,var(--color-emerald-50),oklch(0.979_0.021_166.113_/_0.5),transparent)]",
                                                ))
                                        )}
                                    >
                                        <div className="flex items-start gap-2.5">
                                            {/* Bell-Icon  */}
                                            <div
                                                className={cn(
                                                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                                                    colorClass
                                                )}
                                            >
                                                <Icon size={16} />
                                            </div>

                                            {/* Notification-Content  */}
                                            <div className="flex-1 min-w-0">

                                                <div className="flex items-start justify-between gap-2">
                                                    {/* notification title  */}
                                                    <h4 className={cn(
                                                        "text-sm mb-0.5 font-heading truncate",
                                                        isRead
                                                            ? "text-gray-700 font-medium"
                                                            : "text-gray-900 font-semibold"
                                                    )}>
                                                        {notification.title}
                                                    </h4>
                                                    {/* notification actions  */}
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {!isRead && (
                                                            <button
                                                                onClick={(e) => handleMarkAsRead(e, notification.id)}
                                                                className="p-1 rounded-sm hover:bg-emerald-100 text-emerald-600 transition-colors"
                                                                title="Mark as read"
                                                            >
                                                                <Check className="h-3 w-3" strokeWidth={2.5} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={(e) => handleDismiss(e, notification.id)}
                                                            className="p-1 rounded-sm hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
                                                            title="Dismiss"
                                                        >
                                                            <X className="h-3 w-3" strokeWidth={2.5} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* notification message  */}
                                                <p className="text-xs text-gray-600 mb-1 leading-relaxed">
                                                    {notification.message}
                                                </p>

                                                {/* notification time + read status  */}
                                                <div className="flex items-center gap-1.5 pt-1.5">
                                                    <p className="text-xs text-gray-400">
                                                        {notification.time}
                                                    </p>
                                                    {isRead && (
                                                        <>
                                                            <span className="h-1 w-1 bg-emerald-500 rounded-full"></span>
                                                            <CheckCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                                                        </>
                                                    )}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </section>

                {/* Actions Section - Fixed at bottom */}
                {localNotifications.length > 0 && (
                    <footer className="flex-shrink-0 px-3 py-2.5 border-t border-gray-200">
                        <Button
                            variant="outline-emerald"
                            size="sm"
                            className="w-full font-medium"
                            onClick={() => {
                                setOpen(false)
                                onSeeAll?.()
                            }}
                        >
                            See All Notifications
                        </Button>

                        <div className="pt-1.5 px-2 text-center mx-auto flex justify-center items-center flex-col">
                            <p className="text-xs text-gray-500 mx-auto text-center flex items-center gap-1">
                                Double tap to mark as read
                                <CheckCheck className="h-3.5 w-3.5 text-emerald-600 inline" strokeWidth={2.5} />
                            </p>
                        </div>
                    </footer>
                )}
            </PopoverContent>
        </Popover>
    )
}

