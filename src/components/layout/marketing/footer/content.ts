export type FooterLink = { label: string; href: string }

export const FOOTER_PRODUCT: FooterLink[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Prayer times", href: "/prayer" },
    { label: "Quran", href: "/quran" },
    { label: "Hadith", href: "/hadith" },
    { label: "Dhikr", href: "/dhikr" },
]

export const FOOTER_LEARN: FooterLink[] = [
    { label: "Supplications", href: "/supplications" },
    { label: "Guides", href: "/guides" },
    { label: "History", href: "/history" },
    { label: "Miracles", href: "/miracles" },
    { label: "Stories", href: "/stories" },
]

export const FOOTER_COMPANY: FooterLink[] = [
    { label: "About", href: "/#about" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Support", href: "/support" },
    { label: "Donate", href: "/donate" },
]

export const FOOTER_LEGAL: FooterLink[] = [
    { label: "Terms & Conditions", href: "/#terms" },
    { label: "Privacy Policy", href: "/#privacy" },
    { label: "Refund Policy", href: "/#refund" },
]
