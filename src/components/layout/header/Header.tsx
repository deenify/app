"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Menu, Bell, Search, Globe, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
    userPreferences?: { name?: string }
    onToggleSidebar?: () => void
}

const Header: React.FC<HeaderProps> = ({ userPreferences, onToggleSidebar }) => {
    const [selectedLang, setSelectedLang] = React.useState("en")

    const getGreeting = (username?: string) => {
        const hour = new Date().getHours()
        if (hour < 12) return `Good Morning, ${username ?? "Guest"}`
        if (hour < 18) return `Good Afternoon, ${username ?? "Guest"}`
        return `Good Evening, ${username ?? "Guest"}`
    }

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
        { code: "ur", name: "اردو", flag: "🇵🇰" },
        { code: "tr", name: "Türkçe", flag: "🇹🇷" },
        { code: "fr", name: "Français", flag: "🇫🇷" },
        { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
        { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
        { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    ]
    const currentLang = languages.find((l) => l.code === selectedLang)

    return (
        <header className="w-full relative">
            <div className="flex items-center justify-between px-4 h-[70px] w-full absolute inset-x-0 top-0 bg-white border-b border-gray-200 z-40">
                <div className="flex items-center gap-3 min-w-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={onToggleSidebar}
                    >
                        <Menu className="h-5 w-5 text-gray-600" />
                    </Button>

                    <div className="flex flex-col font-system font-normal">
                        <h4 className="text-gray-900 text-sm sm:text-base truncate">
                            {getGreeting(userPreferences?.name)}
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm truncate">
                            Assalamu Alaikum wa Rahmatullahi wa Barakatuh
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div>
                        <Input
                            placeholder="Search..."
                            className="w-full h-9 max-w-[250px]"
                            showSearchIcon
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="border-none outline-none w-[100px]">
                            <Button variant="ghost" size="sm" className="gap-2 w-full h-9 justify-start border border-gray-300" asChild>
                                <Globe size={18} className="text-gray-600 flex-shrink-0" />
                                <span className="hidden sm:inline text-gray-600 truncate min-w-0 text-xs leading-none flex-1 text-left uppercase">
                                    {currentLang?.code}
                                </span>
                                <ChevronDown className="h-4 w-4 text-gray-600 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-[180px] px-2" >
                            {languages.map((lang, i) => (
                                <React.Fragment key={i}>
                                    <DropdownMenuItem
                                        onClick={() => setSelectedLang(lang.code)}
                                        className={cn(
                                            "mx-0 mb-[2px] flex items-center justify-between rounded-md border border-transparent hover:border-gray-400 transition-[background] cursor-pointer",
                                            selectedLang === lang.code && "bg-accent border-gray-400"
                                        )}
                                    >
                                        <div className="flex items-center w-full min-w-0">
                                            <span className="mr-2">{lang.flag}</span>
                                            <span className="truncate min-w-0 w-full">{lang.name}</span>
                                        </div>
                                        {selectedLang === lang.code && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </DropdownMenuItem>
                                </React.Fragment>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" size="icon" className="w-9 h-9">
                        <div className="w-max h-max relative">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span
                                className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
                                style={{ transform: "translateY(-55%) translateX(47%)" }}
                            />
                        </div>
                    </Button>

                    <Avatar className="w-[36px] h-[36px] cursor-pointer">
                        <AvatarFallback className="bg-emerald-600 text-white">
                            {userPreferences?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div >
        </header >
    )
}

export default Header
