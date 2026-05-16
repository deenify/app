import type { TabItem } from "@/components/shared/Tabs"
import { type SearchItem } from "@/components/ui/input"
import {
    BookOpen, FileText, Clock, Compass, Users,
    MenuIcon,
    Globe,
    Settings,
} from "lucide-react"


export const SEARCH_ITEMS: SearchItem[] = [
    { type: "Surah", name: "Al-Fatihah", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Baqarah", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Imran", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "An-Nisa", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Maidah", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Yasin", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Mulk", icon: BookOpen, page: "/quran" },
    { type: "Surah", name: "Al-Kahf", icon: BookOpen, page: "/quran" },
    { type: "Hadith", name: "Sahih Bukhari", icon: FileText, page: "/hadith" },
    { type: "Hadith", name: "Sahih Muslim", icon: FileText, page: "/hadith" },
    { type: "Hadith", name: "Sunan Abu Dawood", icon: FileText, page: "/hadith" },
    { type: "Hadith", name: "Jami at-Tirmidhi", icon: FileText, page: "/hadith" },
    { type: "Feature", name: "Prayer Times", icon: Clock, page: "/prayer" },
    { type: "Feature", name: "Qibla Finder", icon: Compass, page: "/qibla" },
    { type: "Feature", name: "Dhikr Counter", icon: Users, page: "/dhikr" },
    { type: "Feature", name: "Islamic Calendar", icon: Clock, page: "/calendar" },
    { type: "Feature", name: "Supplications", icon: BookOpen, page: "/supplications" },
    { type: "Feature", name: "Guides & Learning", icon: BookOpen, page: "/guides" },
]

export const LANGUAGES = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
]


export const DrawerTabs: TabItem[] = [
    { id: "menu", label: "Menu", icon: MenuIcon },
    { id: "language", label: "Language", icon: Globe },
    { id: "settings", label: "Settings", icon: Settings },
]