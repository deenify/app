import {
    BookHeart,
    BookOpen,
    Calendar,
    Compass,
    Heart,
    Landmark,
    Library,
    Moon,
    Scroll,
    Sparkles,
    GraduationCap,
    HandHeart,
    Headphones,
    Repeat2,
    type LucideIcon,
} from "lucide-react"

export type TrustBadge = {
    name: string
    abbr: string
    bg: string
    fg: string
    ring: string
}

export const TRUST_BADGES: TrustBadge[] = [
    { name: "MasjidOne", abbr: "MO", bg: "bg-emerald-600", fg: "text-white", ring: "ring-emerald-200" },
    { name: "UmmahHub", abbr: "UH", bg: "bg-sky-600", fg: "text-white", ring: "ring-sky-200" },
    { name: "NoorPath", abbr: "NP", bg: "bg-amber-500", fg: "text-white", ring: "ring-amber-200" },
    { name: "SafaLearn", abbr: "SL", bg: "bg-purple-600", fg: "text-white", ring: "ring-purple-200" },
    { name: "BarakahTech", abbr: "BT", bg: "bg-rose-600", fg: "text-white", ring: "ring-rose-200" },
    { name: "HijraLabs", abbr: "HL", bg: "bg-teal-600", fg: "text-white", ring: "ring-teal-200" },
    { name: "QuranCloud", abbr: "QC", bg: "bg-indigo-600", fg: "text-white", ring: "ring-indigo-200" },
    { name: "MinaretCo", abbr: "MC", bg: "bg-orange-500", fg: "text-white", ring: "ring-orange-200" },
    { name: "Sakinah", abbr: "SK", bg: "bg-cyan-600", fg: "text-white", ring: "ring-cyan-200" },
    { name: "Tawbah", abbr: "TW", bg: "bg-lime-600", fg: "text-white", ring: "ring-lime-200" },
    { name: "FajrWorks", abbr: "FW", bg: "bg-violet-600", fg: "text-white", ring: "ring-violet-200" },
    { name: "Ihsan", abbr: "IH", bg: "bg-fuchsia-600", fg: "text-white", ring: "ring-fuchsia-200" },
    { name: "Rahma", abbr: "RH", bg: "bg-emerald-700", fg: "text-white", ring: "ring-emerald-200" },
    { name: "NurWorks", abbr: "NW", bg: "bg-blue-600", fg: "text-white", ring: "ring-blue-200" },
    { name: "Sabr", abbr: "SB", bg: "bg-stone-600", fg: "text-white", ring: "ring-stone-200" },
    { name: "Hikmah", abbr: "HK", bg: "bg-yellow-600", fg: "text-white", ring: "ring-yellow-200" },
]

export type FeatureCard = {
    title: string
    description: string
    image: string
}

export const FEATURE_CARDS: FeatureCard[] = [
    {
        title: "Prayer rhythm, precisely timed",
        description:
            "Location-aware adhan schedules and presence panels that keep worship anchored to your day.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80",
    },
    {
        title: "Quran with deliberate depth",
        description:
            "Read, listen, and bookmark with typography tuned for long, focused sessions.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80",
    },
    {
        title: "Catalogs worth returning to",
        description:
            "Supplications, guides, history, and stories — filterable libraries with reading-room calm.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
    },
    {
        title: "Remembrance without friction",
        description:
            "Dhikr presets and counters built for the pockets of time between life's demands.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    },
]

export type WorkspaceModule = { label: string; icon: LucideIcon; href: string }

export const WORKSPACE_MODULES: WorkspaceModule[] = [
    { label: "Prayer", icon: Moon, href: "/prayer" },
    { label: "Quran", icon: BookOpen, href: "/quran" },
    { label: "Hadith", icon: Library, href: "/hadith" },
    { label: "Qibla", icon: Compass, href: "/qibla" },
    { label: "Calendar", icon: Calendar, href: "/calendar" },
    { label: "Dhikr", icon: Repeat2, href: "/dhikr" },
    { label: "Duas", icon: Heart, href: "/supplications" },
    { label: "Guides", icon: GraduationCap, href: "/guides" },
    { label: "History", icon: Landmark, href: "/history" },
    { label: "Miracles", icon: Sparkles, href: "/miracles" },
    { label: "Stories", icon: BookHeart, href: "/stories" },
    { label: "Pillars", icon: Scroll, href: "/pillars" },
    { label: "Donate", icon: HandHeart, href: "/donate" },
    { label: "Support", icon: Headphones, href: "/support" },
]

const WORKSPACE_ROW_SIZE = 5

/** Three equal-length marquee rows — alternating direction */
export const WORKSPACE_MARQUEE_ROWS: { items: WorkspaceModule[]; reverse: boolean }[] = [
    { items: WORKSPACE_MODULES.slice(0, WORKSPACE_ROW_SIZE), reverse: false },
    { items: WORKSPACE_MODULES.slice(WORKSPACE_ROW_SIZE, WORKSPACE_ROW_SIZE * 2), reverse: true },
    {
        items: [
            ...WORKSPACE_MODULES.slice(WORKSPACE_ROW_SIZE * 2),
            WORKSPACE_MODULES[0],
        ],
        reverse: false,
    },
]

export type Testimonial = {
    quote: string
    name: string
    role: string
    avatar: string
}

export const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "Deenify feels like someone finally treated an Islamic app with editorial restraint. I open it for prayer times and stay for the guides. The typography and spacing make long reading sessions genuinely pleasant.",
        name: "Amina Rahman",
        role: "Product Designer · London",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
        quote:
            "The catalogs are unusually thoughtful — filters, bookmarks, and reading modes that respect both study and quick reference. It is the first platform I have recommended without caveats to my students.",
        name: "Omar El-Hassan",
        role: "Professor of Islamic Studies",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
        quote:
            "Our study circle adopted Deenify for hadith nights. The interface disappears; the content remains dignified. Everyone commented on how calm and intentional the experience feels on mobile.",
        name: "Fatima Noor",
        role: "Community Educator · Toronto",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
    {
        quote:
            "I recommend it to reverts in our masjid — the guides and supplications are structured without feeling childish. New Muslims finally have software that matches the seriousness of what they are learning.",
        name: "Yusuf Malik",
        role: "Foundational CEO, NurPath",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
    {
        quote:
            "Prayer panels, dhikr, and Quran in one shell — finally an app that respects both craft and creed. I use it between shifts and never feel like I am fighting the interface.",
        name: "Layla Karim",
        role: "Healthcare Director · Dubai",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    },
]

export type PricingPlan = {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    cta: string
    href: string
    highlighted?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: "Basic",
        price: "$0",
        period: "/ month",
        description:
            "For individuals beginning a composed daily routine with prayer, Quran, and remembrance at the center.",
        features: [
            "Prayer times & qibla direction",
            "Quran read, listen & bookmarks",
            "Core dhikr presets & counters",
            "Catalog browsing across modules",
            "Mobile & desktop responsive layouts",
            "Community support access",
        ],
        cta: "Get Started",
        href: "/register",
    },
    {
        name: "Professional",
        price: "$6",
        period: "/ month",
        description:
            "For members who want depth, sync across devices, and early access to refinements as they ship.",
        features: [
            "Everything included in Basic",
            "Advanced bookmarks & cloud sync",
            "Extended catalog filters & search",
            "Priority feature access & previews",
            "Offline Quran passages & schedules",
            "Early roadmap input sessions",
        ],
        cta: "Upgrade to Pro",
        href: "/register",
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "$12",
        period: "/ month",
        description:
            "For communities and organizations sustaining verified content, outreach, and charitable allocation at scale.",
        features: [
            "Everything included in Professional",
            "Supporter recognition on platform",
            "Roadmap consultation with the team",
            "Charitable allocation transparency",
            "Dedicated onboarding for groups",
            "Priority content verification requests",
        ],
        cta: "Get Started",
        href: "/donate",
    },
]

export type FaqItem = { question: string; answer: string }

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "Is Deenify suitable for new Muslims?",
        answer:
            "Yes. Guides, revert pathways, and plain-language catalogs are structured for first steps — without overwhelming terminology on day one.",
    },
    {
        question: "Does the app work offline?",
        answer:
            "Core prayer schedules and saved Quran passages are available offline. Streaming audio requires connectivity.",
    },
    {
        question: "How is content verified?",
        answer:
            "Collections are curated against established scholarly sources. Detail pages cite references where applicable.",
    },
    {
        question: "Can I use Deenify on mobile and desktop?",
        answer:
            "The dashboard is responsive across breakpoints — from phone to wide displays — with layouts tuned per module.",
    },
    {
        question: "What makes Deenify different?",
        answer:
            "We optimize for intellectual calm: fewer gimmicks, stronger typography, and catalogs that behave like serious reading products.",
    },
]
