"use client"

import React from "react"
import { Menu, BookOpen, FileText, Clock, Compass, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, type SearchItem } from "@/components/ui/input"
import { LanguageSelector } from "@/components/shared/LanguageSelector"
import { NotificationsPopover } from "@/components/shared/NotificationsPopover"
import {
    UserProfileDropdown,
    type UserPreferences,
} from "@/components/shared/UserProfileDropdown"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import MenuIcon from "@/assets/svg/MenuIcon"

export interface HeaderProps {
    userPreferences?: UserPreferences
    onToggleSidebar?: () => void
    searchItems?: SearchItem[]
    className?: string
}

const DEFAULT_SEARCH_ITEMS: SearchItem[] = [
    // Surahs
    { type: "Surah", name: "Al-Fatihah", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Baqarah", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Imran", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "An-Nisa", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Maidah", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Yasin", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Mulk", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Kahf", icon: BookOpen, page: "/quran" },
    // Hadith Collections
    { type: "Hadith", name: "Sahih Bukhari", icon: FileText, page: "/hadith" },
    { type: "Hadith", name: "Sahih Muslim", icon: FileText, page: "/hadith" },
    {
        type: "Hadith",
        name: "Sunan Abu Dawood",
        icon: FileText,
        page: "/hadith",
    },
    {
        type: "Hadith",
        name: "Jami at-Tirmidhi",
        icon: FileText,
        page: "/hadith",
    },
    // Features
    { type: "Feature", name: "Prayer Times", icon: Clock, page: "/prayer" },
    { type: "Feature", name: "Qibla Finder", icon: Compass, page: "/qibla" },
    { type: "Feature", name: "Dhikr Counter", icon: Users, page: "/dhikr" },
    {
        type: "Feature",
        name: "Islamic Calendar",
        icon: Clock,
        page: "/calendar",
    },
    {
        type: "Feature",
        name: "Supplications",
        icon: BookOpen,
        page: "/supplications",
    },
    {
        type: "Feature",
        name: "Guides & Learning",
        icon: BookOpen,
        page: "/guides",
    },
]

const getGreeting = (username?: string) => {
    const hour = new Date().getHours()
    const greeting =
        hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"
    return username ? `${greeting}, ${username}` : greeting
}

const Header: React.FC<HeaderProps> = ({
    userPreferences,
    onToggleSidebar,
    searchItems = DEFAULT_SEARCH_ITEMS,
    className,
}) => {

    const router = useRouter()
    const handleSearchSelect = (item: SearchItem) => {
        if (item.page) {
            router.push(item.page)
        }
    }

    return (
        <header className={cn("bg-white border-b border-layout-separator h-[73px] flex items-center md:px-6 px-4", className)}>
            <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
                {/* Left Section - Mobile Menu & Greeting */}
                <div className="flex items-center pr-2 sm:pr-4 min-w-0 flex-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleSidebar}
                        className="lg:hidden flex-shrink-0"
                    >
                        <MenuIcon />
                    </Button>

                    <div className="min-w-0">
                        <h1 className="text-gray-900 text-sm sm:text-base lg:text-lg font-medium truncate">
                            {getGreeting(userPreferences?.name)}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
                            Assalamu Alaikum wa Rahmatullahi wa Barakatuh
                        </p>
                    </div>
                </div>

                {/* Right Section - Search, Language, Notifications, Profile */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <Input
                        search
                        placeholder="e.g., Quran, Hadith, ..."
                        filteredItems={searchItems}
                        onItemSelect={handleSearchSelect}
                        className="w-64 h-10"
                        containerClassName="hidden lg:block"
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
                        }}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
