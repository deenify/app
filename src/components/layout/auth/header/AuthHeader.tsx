"use client"

import React from "react"
import { type UserPreferences } from "@/components/shared/UserProfileDropdown"
import { cn } from "@/lib/utils/clsx"
import Logo from "@/components/shared/Logo"

interface PlatformHeaderProps {
    userPreferences?: UserPreferences
    className?: string
}


const PlatformHeader: React.FC<PlatformHeaderProps> = ({
    userPreferences,
    className,
}) => {

    // Greeting Helper
    const getGreeting = (username?: string) => {
        const hour = new Date().getHours()
        const greeting = hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening"

        return username ? `${greeting}, ${username}` : greeting
    }


    return (
        <header className={cn("bg-white.. border-b border-layout-separator.. h-[73px] flex items-center md:px-6 px-4", className)}>
            <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
                {/* Left Section - Logo (Mobile) & Greeting */}
                <div className="min-w-0 flex-1">
                    {/* Logo - Mobile Only */}
                    <Logo
                        href='/'
                        title={getGreeting(userPreferences?.name)}
                        subtitle="Assalamu Alaikum wa Rahmatullahi wa Barakatuh"
                        isContentAncored={false}
                        className="min-w-0 mr-3 w-full"
                        classNames={{
                            contentWrapper: "min-w-0 whitespace-normal overflow-visible",
                            titleWrapper: "block min-w-0 w-full max-w-full",
                            title: "text-gray-900 text-sm sm:text-base lg:text-lg font-medium break-words leading-[1.16]",
                            subtitle: "text-xs sm:text-sm text-gray-500 line-clamp-1 hidden sm:block truncate",
                        }}
                    />
                </div>
            </div>
        </header>
    )
}

export default PlatformHeader
