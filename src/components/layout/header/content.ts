import { SearchItem } from "@/components/ui/input";
import {
    Settings, HelpCircle, User,
    BookOpen, TrendingUp, Clock, LucideIcon,
    Gift, FileText, Compass, Users
} from "lucide-react";

export interface MenuItem {
    label: string;
    icon: LucideIcon;
    href: string;
}
export interface MenuSection {
    label: string;
    sectionItems: MenuItem[];
}

export const profileMenuItems: MenuSection[] = [
    {
        label: "My Profile",
        sectionItems: [
            { label: "My Profile", icon: User, href: "/profile" },
            { label: "Settings & Preferences", icon: Settings, href: "/profile/settings" },
            { label: "Prayer History", icon: Clock, href: "/prayer-history" },
            { label: "My Dhikr Progress", icon: TrendingUp, href: "/dhikr-progress" },
            { label: "Reading Progress", icon: BookOpen, href: "/reading-progress" },
        ]
    },
    {
        label: "Help & Support",
        sectionItems: [
            { label: "Support Center", icon: HelpCircle, href: "/support-center" },
            { label: "Donate", icon: Gift, href: "/donate" },
        ]
    }
]


export const DEFAULT_SEARCH_ITEMS: SearchItem[] = [
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