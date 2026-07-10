import {
    BookOpen,
    Compass,
    Eye,
    Heart,
    Layers,
    Scale,
    Shield,
    Sparkles,
    Users,
} from "lucide-react"
import type { SplitPoint, SplitSectionVariant } from "../generic/MarketingSplitSection"

export type AboutStat = {
    value: string
    label: string
}

export type AboutSplitContent = {
    eyebrow: string
    lead: string
    accent: string
    description: string
    points: SplitPoint[]
    image: string
    imageAlt: string
    imagePosition: "left" | "right"
    variant: SplitSectionVariant
    theme: "white" | "muted"
    primaryCta?: { label: string; href: string }
}

export const ABOUT_SPLITS: AboutSplitContent[] = [
    {
        eyebrow: "How it started",
        lead: "We were tired of",
        accent: "scattered apps",
        description:
            "Prayer in one app, Quran in another, duas buried in a PDF. We built Deenify because daily practice should live in one place — not across five icons on your home screen.",
        points: [
            { icon: Heart, text: "Made by people who actually use it between prayers" },
            { icon: Layers, text: "One dashboard instead of a folder of single-purpose apps" },
            { icon: Eye, text: "Designed to stay out of your way once you're reading" },
        ],
        image: "/images/pages/marketing/home/mobile-overview.webp",
        imageAlt: "Deenify mobile overview",
        imagePosition: "left",
        variant: "default",
        theme: "white",
        primaryCta: { label: "See what's inside", href: "/features" },
    },
    {
        eyebrow: "How we build",
        lead: "Calm screens for",
        accent: "long reading",
        description:
            "Quran nights and hadith study need space to breathe. We obsess over line height, margins, and motion — the small things you feel but don't name when a screen just works.",
        points: [
            { icon: BookOpen, text: "Typography tuned for surah-length sessions" },
            { icon: Sparkles, text: "Animations that guide, never distract" },
            { icon: Compass, text: "Layouts tested from phone to wide monitor" },
        ],
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
        imageAlt: "Thoughtful reading environment",
        imagePosition: "right",
        variant: "inset-panel",
        theme: "muted",
    },
    {
        eyebrow: "What we won't bend on",
        lead: "Trust is not a",
        accent: "feature toggle",
        description:
            "Scholarly sources, honest privacy, and free access to worship essentials — these aren't upsells. They're the baseline for software that sits next to someone's deen.",
        points: [
            { icon: Scale, text: "Content cited against established scholarly sources" },
            { icon: Shield, text: "Your data stays yours — export or delete anytime" },
            { icon: Users, text: "Supporter plans fund content, not basic prayer tools" },
        ],
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
        imageAlt: "Community and learning",
        imagePosition: "left",
        variant: "accent-bar",
        theme: "white",
        primaryCta: { label: "View plans", href: "/pricing" },
    },
]

export const ABOUT_STATS: AboutStat[] = [
    { value: "12k+", label: "Active users" },
    { value: "40+", label: "Countries" },
    { value: "500+", label: "Communities" },
    { value: "14", label: "Core modules" },
]
