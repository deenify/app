"use client"

import React, { useState } from "react"
import { Globe, ChevronDown, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils/clsx"

export type Language = {
    code: string
    name: string
    flag: string
}

interface LanguageSelectorProps {
    languages?: Language[]
    defaultLanguage?: string
    onLanguageChange?: (code: string) => void
    className?: string
    compact?: boolean
}



const DEFAULT_LANGUAGES: Language[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
]


export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    languages = DEFAULT_LANGUAGES,
    defaultLanguage = "en",
    onLanguageChange,
    className,
    compact = false,
}) => {
    const [selectedLang, setSelectedLang] = useState(defaultLanguage)
    const [open, setOpen] = useState(false)
    const currentLang = languages.find((l) => l.code === selectedLang)

    const handleLanguageChange = (code: string) => {
        setSelectedLang(code)
        onLanguageChange?.(code)
        setOpen(false)
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className={cn(
                "!focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
                "focus:outline-none !ring-0 !ring-offset-0",
                "active:ring-0 active:ring-offset-0",
                compact ? "w-10" : "w-[100px]",
            )} >
                <Button
                    asChild
                    variant="ghost"
                    className={cn(
                        "h-10 w-full",
                        compact ? "px-0 justify-center" : "px-3 gap-2 justify-between",
                        className,
                        open ? "bg-gray-200/50 text-gray-900" : "bg-transparent"
                    )}
                    shouldScale
                >
                    <div className={cn(
                        "flex items-center justify-start gap-2",
                        compact && "justify-center"
                    )}>
                        <Globe className="h-5 w-5 text-gray-600 flex-shrink-0" />
                        {!compact && (
                            <span className="text-gray-700 text-sm font-medium">
                                {currentLang?.code.toUpperCase() || "EN"}
                            </span>
                        )}
                    </div>

                    {!compact && (
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 text-gray-500 flex-shrink-0 transition-transform duration-200",
                                open ? "rotate-180" : "rotate-0"
                            )}
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[250px] border border-gray-200 shadow-none bg-white p-1.5"
            >
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                            "cursor-pointer flex items-center justify-between rounded-sm px-2.5 py-2 mb-0.5 last:mb-0 transition-colors duration-150",
                            "focus:bg-transparent focus:text-inherit focus:outline-none",
                            "data-[highlighted]:bg-transparent",
                            selectedLang === lang.code
                                ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 data-[highlighted]:bg-emerald-100"
                                : "text-gray-700 hover:bg-gray-50 data-[highlighted]:bg-gray-50"
                        )}
                    >
                        <div className="flex items-center min-w-0 flex-1">
                            <span className="mr-2.5 flex-shrink-0 text-base leading-none">{lang.flag}</span>
                            <span className="truncate text-xs font-medium">{lang.name}</span>
                            <span className="ml-2 text-[10px] text-gray-400 font-normal opacity-60">
                                {lang.code.toUpperCase()}
                            </span>
                        </div>
                        {selectedLang === lang.code && (
                            <Check strokeWidth={1.5} />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

