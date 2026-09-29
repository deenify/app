import type { LucideIcon } from "lucide-react"
import { BookOpen, Clock, Sparkles, TrendingUp } from "lucide-react"
import type { DashboardChartSeries } from "@/components/shared/charts/graphical-charts/DashboardAreaChart"

export type DashboardStatTone = "emerald" | "blue" | "amber" | "purple"

export type DashboardStatItem = {
    label: string
    value: string
    badge: string
    hint: string
    icon: LucideIcon
    tone: DashboardStatTone
    href: string
}

export type DashboardActivityRow = {
    activity: string
    category: string
    time: string
    points: string
}

export type DashboardGoalItem = {
    label: string
    value: number
    icon: LucideIcon
    tone: "blue" | "amber" | "purple"
}

export const DASHBOARD_EDITORIAL = {
    badge: "Spiritual overview",
    // title: "Your week at a glance",
    title: "Dashboard overview",
    lead: "Prayer rhythm, Qurʾān momentum, and dhikr habits—summarized so you can adjust before the day ends.",
} as const

export const DASHBOARD_STATS: DashboardStatItem[] = [
    {
        label: "Prayer streak",
        value: "12 days",
        badge: "+2",
        hint: "from last week",
        icon: Clock,
        tone: "emerald",
        href: "/prayer",
    },
    {
        label: "Qurʾān progress",
        value: "Juz 14",
        badge: "4 pages",
        hint: "read today",
        icon: BookOpen,
        tone: "blue",
        href: "/quran",
    },
    {
        label: "Dhikr daily",
        value: "850",
        badge: "85%",
        hint: "of daily goal",
        icon: Sparkles,
        tone: "amber",
        href: "/dhikr",
    },
    {
        label: "Community rank",
        value: "Top 5%",
        badge: "Silver",
        hint: "tier this month",
        icon: TrendingUp,
        tone: "purple",
        href: "/community",
    },
]

export const DASHBOARD_ACTIVITY_DATA = [
    { name: "Mon", prayers: 5, quran: 30, dhikr: 100 },
    { name: "Tue", prayers: 4, quran: 45, dhikr: 150 },
    { name: "Wed", prayers: 5, quran: 20, dhikr: 80 },
    { name: "Thu", prayers: 5, quran: 60, dhikr: 200 },
    { name: "Fri", prayers: 5, quran: 15, dhikr: 300 },
    { name: "Sat", prayers: 3, quran: 90, dhikr: 120 },
    { name: "Sun", prayers: 5, quran: 40, dhikr: 180 },
]

export const DASHBOARD_CHART_SERIES: DashboardChartSeries[] = [
    {
        dataKey: "prayers",
        label: "Prayers",
        color: "#059669",
        gradientId: "dashPrayers",
        strokeWidth: 2.5,
    },
    {
        dataKey: "quran",
        label: "Qurʾān",
        color: "#2563eb",
        gradientId: "dashQuran",
        strokeWidth: 2,
        dashed: true,
    },
]

export const DASHBOARD_RECENT_ACTIVITY: DashboardActivityRow[] = [
    { activity: "Read Surah Al-Kahf", category: "Qurʾān", time: "2 hours ago", points: "+50" },
    { activity: "Morning dhikr", category: "Dhikr", time: "5 hours ago", points: "+20" },
    { activity: "Fajr prayer", category: "Salah", time: "12 hours ago", points: "+30" },
    { activity: "Donated to charity", category: "Sadaqah", time: "Yesterday", points: "+100" },
    { activity: "Hadith of the day", category: "Learning", time: "Yesterday", points: "+10" },
]

export const DASHBOARD_DAILY_GOALS: DashboardGoalItem[] = [
    { label: "Qurʾān", value: 60, icon: BookOpen, tone: "blue" },
    { label: "Dhikr", value: 85, icon: Sparkles, tone: "amber" },
    { label: "Sadaqah", value: 20, icon: TrendingUp, tone: "purple" },
]

export type ChallengeType = "reading" | "action" | "exploration"

export type ChallengeItem = {
    id: string
    type: ChallengeType
    title: string
    description: string
    points: number
    status: "available" | "completed" | "locked"
    difficulty: "Easy" | "Medium" | "Hard"
    metadata?: {
        chapter?: string
        verseHint?: string
        correctReference?: string
        link?: string
    }
}

export const DAILY_CHALLENGES: ChallengeItem[] = [
    {
        id: "ch-1",
        type: "reading",
        title: "Qurʾān Journey",
        description: "Read Surah Al-Kahf (Chapter 18). It is a source of light between two Fridays.",
        points: 50,
        status: "available",
        difficulty: "Easy",
        metadata: {
            chapter: "18",
            link: "/quran/18"
        }
    },
    {
        id: "ch-2",
        type: "exploration",
        title: "Verse Explorer",
        description: "Identify the Surah: 'Indeed, with hardship [will be] ease.'",
        points: 100,
        status: "available",
        difficulty: "Medium",
        metadata: {
            verseHint: "94:5",
            correctReference: "Ash-Sharh"
        }
    },
    {
        id: "ch-3",
        type: "action",
        title: "Night Vigil",
        description: "Complete 2 Rakat of Tahajjud prayer before Fajr.",
        points: 150,
        status: "available",
        difficulty: "Hard"
    },
    {
        id: "ch-4",
        type: "action",
        title: "Morning Adhkar",
        description: "Recite your morning supplications for protection and peace.",
        points: 40,
        status: "available",
        difficulty: "Easy"
    },
    {
        id: "ch-5",
        type: "exploration",
        title: "Prophetic Wisdom",
        description: "Which Surah is often called 'The Heart of the Quran'?",
        points: 120,
        status: "available",
        difficulty: "Medium",
        metadata: {
            verseHint: "Search Hadith",
            correctReference: "Ya-Sin"
        }
    },
    {
        id: "ch-6",
        type: "reading",
        title: "Knowledge Seeker",
        description: "Read the story of Prophet Ibrahim (AS) in Surah Maryam.",
        points: 200,
        status: "locked",
        difficulty: "Hard",
        metadata: {
            chapter: "19",
            link: "/quran/19"
        }
    }
]

export const DASHBOARD_INSPIRATION = {
    badge: "Hadith of the day",
    quote: "The best among you are those who learn the Qurʾān and teach it.",
    source: "Sahih al-Bukhari",
} as const

export const DASHBOARD_PRAYER_HIGHLIGHT = "Asr"
export const DASHBOARD_PRAYER_COMPLETED = ["Fajr", "Dhuhr"] as const


export const StatVariants = {
    emerald: { icon: "text-emerald-600", bg: "bg-emerald-50", badge: "emerald" },
    blue: { icon: "text-blue-600", bg: "bg-blue-50", badge: "blue" },
    amber: { icon: "text-amber-600", bg: "bg-amber-50", badge: "amber" },
    purple: { icon: "text-purple-600", bg: "bg-purple-50", badge: "purple" },
} as const

export const GoalVariants = {
    blue: { text: "text-blue-600", track: "bg-blue-50", indicator: "bg-blue-600" },
    amber: { text: "text-amber-600", track: "bg-amber-50", indicator: "bg-amber-600" },
    purple: { text: "text-purple-600", track: "bg-purple-50", indicator: "bg-purple-600" },
} as const