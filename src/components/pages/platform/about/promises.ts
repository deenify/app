import { Heart, Scale, Shield, type LucideIcon } from "lucide-react"

export type AboutPromise = {
    icon: LucideIcon
    title: string
    detail: string
}

export const ABOUT_PROMISES: AboutPromise[] = [
    {
        icon: Heart,
        title: "Worship stays free",
        detail: "Prayer times, qibla, and core Quran access — no paywall on essentials.",
    },
    {
        icon: Scale,
        title: "Sources matter",
        detail: "Hadith, guides, and catalogs cite established scholarly references.",
    },
    {
        icon: Shield,
        title: "Your data, your control",
        detail: "Export or delete your account from profile — no support ticket needed.",
    },
]
