import {
    BookHeart,
    BookOpen,
    Calendar,
    Compass,
    GraduationCap,
    HandHeart,
    Headphones,
    Heart,
    Landmark,
    Library,
    Moon,
    Repeat2,
    Scroll,
    Sparkles,
    type LucideIcon,
} from "lucide-react"

export type TourPanel = {
    id: string
    step: string
    label: string
    title: string
    accent: string
    description: string
    image: string
    highlights: { icon: LucideIcon; text: string }[]
    href: string
    cta: string
}

export type BentoModule = {
    label: string
    icon: LucideIcon
    description: string
    href: string
    className: string
}

export type JourneyMoment = {
    time: string
    module: string
    detail: string
    icon: LucideIcon
    tint: string
}

export const FEATURE_TOUR_PANELS: TourPanel[] = [
    {
        id: "worship",
        step: "01",
        label: "Worship",
        title: "Start every day with",
        accent: "prayer rhythm",
        description:
            "Open the app to see what's next — not to dig through menus. Schedules, qibla, and Hijri dates live where you expect them.",
        image: "/images/pages/dashboard/prayer/presense-hero-background.avif",
        highlights: [
            { icon: Moon, text: "Five daily prayers, location-aware" },
            { icon: Compass, text: "Qibla without leaving the view" },
            { icon: Calendar, text: "Hijri calendar at a glance" },
            { icon: Repeat2, text: "Dhikr presets for between tasks" },
        ],
        href: "/prayer",
        cta: "Open prayer module",
    },
    {
        id: "read",
        step: "02",
        label: "Sacred text",
        title: "Sit down to",
        accent: "read & reflect",
        description:
            "Quran and hadith with calm typography — bookmark a verse today, pick up exactly there tomorrow.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
        highlights: [
            { icon: BookOpen, text: "Read and listen with adjustable type" },
            { icon: Headphones, text: "Reciter audio, verse by verse" },
            { icon: Library, text: "Hadith collections and saved passages" },
        ],
        href: "/quran",
        cta: "Open Quran module",
    },
    {
        id: "learn",
        step: "03",
        label: "Learning",
        title: "Return to catalogs",
        accent: "worth keeping",
        description:
            "Duas, guides, history, and stories — filterable libraries that behave like serious reading products.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
        highlights: [
            { icon: Heart, text: "Supplications with collection filters" },
            { icon: GraduationCap, text: "Guides for reverts and deepening study" },
            { icon: Landmark, text: "History and stories with bookmarks" },
        ],
        href: "/guides",
        cta: "Browse guides",
    },
]

export const FEATURE_BENTO_MODULES: BentoModule[] = [
    {
        label: "Prayer",
        icon: Moon,
        description: "Schedules & presence panels",
        href: "/prayer",
        className: "sm:col-span-2 sm:row-span-2",
    },
    {
        label: "Quran",
        icon: BookOpen,
        description: "Read, listen, bookmark",
        href: "/quran",
        className: "sm:col-span-2",
    },
    {
        label: "Hadith",
        icon: Library,
        description: "Collections & topics",
        href: "/hadith",
        className: "",
    },
    {
        label: "Qibla",
        icon: Compass,
        description: "Compass direction",
        href: "/qibla",
        className: "",
    },
    {
        label: "Calendar",
        icon: Calendar,
        description: "Hijri day panels",
        href: "/calendar",
        className: "",
    },
    {
        label: "Dhikr",
        icon: Repeat2,
        description: "Presets & counters",
        href: "/dhikr",
        className: "",
    },
    {
        label: "Duas",
        icon: Heart,
        description: "Supplication library",
        href: "/supplications",
        className: "sm:col-span-2",
    },
    {
        label: "Guides",
        icon: GraduationCap,
        description: "Structured pathways",
        href: "/guides",
        className: "",
    },
    {
        label: "History",
        icon: Landmark,
        description: "Islamic narratives",
        href: "/history",
        className: "",
    },
    {
        label: "Miracles",
        icon: Sparkles,
        description: "Prophetic signs",
        href: "/miracles",
        className: "",
    },
    {
        label: "Stories",
        icon: BookHeart,
        description: "Moral parables",
        href: "/stories",
        className: "",
    },
    {
        label: "Pillars",
        icon: Scroll,
        description: "Five pillars",
        href: "/pillars",
        className: "",
    },
    {
        label: "Donate",
        icon: HandHeart,
        description: "One-tap sadaqah",
        href: "/donate",
        className: "",
    },
    {
        label: "Support",
        icon: Headphones,
        description: "Faith-aware help",
        href: "/support",
        className: "",
    },
]

export const FEATURE_JOURNEY: JourneyMoment[] = [
    {
        time: "Fajr",
        module: "Prayer",
        detail: "Check schedule · stay on rhythm",
        icon: Moon,
        tint: "from-emerald-600/90 to-emerald-800/90",
    },
    {
        time: "Morning",
        module: "Quran",
        detail: "A few ayat from your bookmark",
        icon: BookOpen,
        tint: "from-teal-600/90 to-emerald-700/90",
    },
    {
        time: "Afternoon",
        module: "Dhikr",
        detail: "Quick remembrance between tasks",
        icon: Repeat2,
        tint: "from-emerald-700/90 to-teal-800/90",
    },
    {
        time: "Evening",
        module: "Guides",
        detail: "Study or browse hadith",
        icon: GraduationCap,
        tint: "from-emerald-800/90 to-gray-900/90",
    },
]
