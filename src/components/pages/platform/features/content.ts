import {
    BookOpen,
    Calendar,
    Compass,
    Filter,
    Headphones,
    Library,
    Moon,
    Repeat2,
    type LucideIcon,
} from "lucide-react"
import type { SplitPoint, SplitSectionVariant, SplitStat } from "../generic/MarketingSplitSection"

export type FeatureModule = {
    label: string
    icon: LucideIcon
    description: string
    href: string
}

export type FeatureSplitContent = {
    eyebrow: string
    lead: string
    accent: string
    description: string
    points: SplitPoint[]
    stats?: SplitStat[]
    image: string
    imageAlt: string
    imagePosition: "left" | "right"
    variant: SplitSectionVariant
    theme: "white" | "muted"
    primaryCta?: { label: string; href: string }
    secondaryCta?: { label: string; href: string }
}

export type RoutineStep = {
    icon: LucideIcon
    time: string
    label: string
    detail: string
}

export const FEATURE_ROUTINE_STEPS: RoutineStep[] = [
    {
        icon: Moon,
        time: "Before Fajr",
        label: "Check prayer schedule",
        detail: "See what's next and stay on rhythm",
    },
    {
        icon: BookOpen,
        time: "After Fajr",
        label: "Read a few ayat",
        detail: "Pick up where you left off",
    },
    {
        icon: Repeat2,
        time: "Between tasks",
        label: "Quick dhikr",
        detail: "A preset counter for the in-between moments",
    },
]

export const FEATURE_MODULES: FeatureModule[] = [
    {
        label: "Prayer",
        icon: Moon,
        description: "Location-aware schedules with presence panels tuned for every breakpoint.",
        href: "/prayer",
    },
    {
        label: "Quran",
        icon: BookOpen,
        description: "Read, listen, and bookmark with typography built for long sessions.",
        href: "/quran",
    },
    {
        label: "Hadith",
        icon: Library,
        description: "Collections, topics, and saved passages in a scholarly reading layout.",
        href: "/hadith",
    },
    {
        label: "Qibla",
        icon: Compass,
        description: "Compass guidance with calm visual feedback — no gimmicky overlays.",
        href: "/qibla",
    },
    {
        label: "Calendar",
        icon: Calendar,
        description: "Hijri rhythm with day detail panels and month navigation.",
        href: "/calendar",
    },
    {
        label: "Dhikr",
        icon: Repeat2,
        description: "Presets, counters, and shared remembrance without friction.",
        href: "/dhikr",
    },
]

/** Two deep-dive splits — the module grid above already maps the full shell */
export const FEATURE_SPLITS: FeatureSplitContent[] = [
    {
        eyebrow: "Where most days start",
        lead: "Prayer times that fit",
        accent: "real life",
        description:
            "You open the app to know what's next — not to hunt through menus. Prayer panels, qibla, and Hijri calendar sit where you expect them, tuned for phone and desktop alike.",
        points: [
            { icon: Moon, text: "Five daily prayers with location-aware schedules" },
            { icon: Compass, text: "Qibla direction without leaving the prayer view" },
            { icon: Calendar, text: "Hijri dates alongside your week at a glance" },
        ],
        stats: [
            { value: "5×", label: "Daily prayers" },
            { value: "40+", label: "Calc methods" },
        ],
        image: "/images/pages/dashboard/prayer/presense-hero-background.avif",
        imageAlt: "Prayer presence panel with serene backdrop",
        imagePosition: "left",
        variant: "floating-stats",
        theme: "white",
        primaryCta: { label: "Open prayer", href: "/prayer" },
    },
    {
        eyebrow: "When you sit to read",
        lead: "Quran and hadith with",
        accent: "room to focus",
        description:
            "Long sessions deserve calm typography — not cramped feeds. Read, listen, bookmark, and return to the same verse tomorrow exactly where you stopped.",
        points: [
            { icon: BookOpen, text: "Read and listen with adjustable type and spacing" },
            { icon: Headphones, text: "Reciter audio with verse-level navigation" },
            { icon: Filter, text: "Bookmarks that sync across your devices" },
        ],
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
        imageAlt: "Quran reading experience with warm lighting",
        imagePosition: "right",
        variant: "accent-bar",
        theme: "muted",
        primaryCta: { label: "Open Quran", href: "/quran" },
        secondaryCta: { label: "Browse hadith", href: "/hadith" },
    },
]
