import { Heart, PenLine, Scale, Shield, type LucideIcon } from "lucide-react"

export type TimelineMilestone = {
    title: string
    description: string
}

export type AboutValueTile = {
    icon: LucideIcon
    title: string
    description: string
}

export type CraftMetric = {
    value: string
    label: string
}

export type TeamMember = {
    name: string
    role: string
    bio: string
    avatar: string
}

export const ABOUT_TIMELINE: TimelineMilestone[] = [
    {
        title: "Five apps, zero continuity",
        description:
            "Prayer in one place, Quran in another, duas in a PDF. Every switch broke focus. We wanted one screen we trusted between prayers.",
    },
    {
        title: "One dashboard, fourteen modules",
        description:
            "We designed each module like its own product — then unified them under one sidebar, one account, and one visual language.",
    },
    {
        title: "Used daily, across 40+ countries",
        description:
            "Study circles, masjid educators, and individual practitioners now rely on a single shell for worship, reading, and learning.",
    },
]

export const ABOUT_VALUE_TILES: AboutValueTile[] = [
    {
        icon: PenLine,
        title: "Authored, not assembled",
        description: "One visual language across prayer, catalogs, and settings.",
    },
    {
        icon: Heart,
        title: "Worship stays free",
        description: "Prayer, qibla, and core Quran — never behind a paywall.",
    },
    {
        icon: Scale,
        title: "Sources cited",
        description: "Hadith and guides reference established scholarship.",
    },
    {
        icon: Shield,
        title: "Your data, yours",
        description: "Export or delete from profile — no ticket required.",
    },
]

export const ABOUT_CRAFT_POINTS = [
    "Typography and spacing designed for long reading sessions",
    "Prayer presence panels tuned for mobile and desktop",
    "Scholar-aware catalogs with filters, bookmarks, and detail pages",
    "A single account across worship, study, and remembrance",
]

export const ABOUT_CRAFT_METRICS: CraftMetric[] = [
    { value: "14+", label: "Core modules" },
    { value: "6", label: "Curated catalogs" },
    { value: "40+", label: "Countries reached" },
    { value: "24/7", label: "Prayer awareness" },
]

export const ABOUT_TEAM: TeamMember[] = [
    {
        name: "Yusuf Rahman",
        role: "Co-founder, Product",
        bio: "Leads product direction with a focus on calm interfaces for daily worship and study.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
    {
        name: "Amina Noor",
        role: "Co-founder, Engineering",
        bio: "Owns the dashboard architecture — performance, sync, and module continuity.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
        name: "Omar El-Hassan",
        role: "Head of Content",
        bio: "Curates hadith, guides, and catalogs against established scholarly sources.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
        name: "Fatima Karim",
        role: "Community Lead",
        bio: "Runs faith-aware support and community programs with the same clarity as the product.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
]
