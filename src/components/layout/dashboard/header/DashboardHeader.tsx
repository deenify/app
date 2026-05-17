"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input, type SearchItem } from "@/components/ui/input"
import { LanguageSelector } from "@/components/shared/LanguageSelector"
import { NotificationsPopover } from "@/components/shared/NotificationsPopover"
import {
    UserProfileDropdown,
    type UserPreferences,
} from "@/components/shared/UserProfileDropdown"
import { cn } from "@/lib/utils/clsx"
import { useRouter } from "next/navigation"
import MenuIcon from "@/assets/svg/MenuIcon"
import Logo from "@/components/shared/Logo"
import { DEFAULT_SEARCH_ITEMS } from "./content"


interface DashboardHeaderProps {
    userPreferences?: UserPreferences
    onToggleSidebar?: () => void
    searchItems?: SearchItem[]
    className?: string
}


const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userPreferences,
    onToggleSidebar,
    searchItems = DEFAULT_SEARCH_ITEMS,
    className,
}) => {
    const router = useRouter()


    // Search selection Helper 
    const handleSearchSelect = (item: SearchItem) => {
        if (item.page) {
            router.push(item.page)
        }
    }

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
        <header className={cn("bg-white border-b border-layout-separator h-[73px] flex items-center md:px-6 px-4", className)}>
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
                            iconWrapper: "lg:hidden",
                            contentWrapper: "min-w-0 whitespace-normal overflow-visible",
                            titleWrapper: "block min-w-0 w-full max-w-full",
                            title: "text-gray-900 text-sm sm:text-base lg:text-lg font-medium break-words leading-[1.16]",
                            subtitle: "text-xs sm:text-sm text-gray-500 line-clamp-1 hidden sm:block truncate",
                        }}
                    />
                </div>

                {/* Right Section - Search, Language, Notifications, Profile, Menu (Mobile) */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <Input
                        search
                        placeholder="e.g., Quran, Hadith, ..."
                        filteredItems={searchItems}
                        onItemSelect={handleSearchSelect}
                        className="hidden lg:block"
                        classNames={{ input: "w-64 h-10 text-base" }}
                    />

                    <div className="hidden lg:flex">
                        <LanguageSelector
                            onLanguageChange={(code) => {
                                // Handle language change if needed
                                console.log("Language changed to:", code)
                            }}
                        />
                    </div>

                    <NotificationsPopover
                        onSeeAll={() => {
                            router.push("/notifications")
                        }}
                    />

                    <UserProfileDropdown
                        user={userPreferences}
                        onSignOut={() => {
                            // Handle sign out
                            console.log("Sign out clicked")
                            router.push("/login")
                        }}
                    />

                    {/* Ham-Burger Menu-Button - Mobile-Only */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleSidebar}
                        shouldScale
                        className={cn(
                            "lg:hidden flex-shrink-0",
                            "h-10 w-10 p-0",
                            "hover:bg-gray-100/80 active:bg-gray-200/60",
                            "text-gray-600 hover:text-gray-900",
                            "rounded-lg",
                            "transition-colors duration-150",
                            "!focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
                            "focus:outline-none !ring-0 !ring-offset-0",
                            "active:ring-0 active:ring-offset-0"
                        )}
                    >
                        <MenuIcon />
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader
