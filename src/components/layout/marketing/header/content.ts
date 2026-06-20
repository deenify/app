import type { LucideIcon } from "lucide-react"
import { BookOpen, Home, Info, Mail, Sparkles, Tag } from "lucide-react"

export type MarketingNavItem = {
    label: string
    href: string
    icon: LucideIcon
}

export const MARKETING_NAV: MarketingNavItem[] = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: Info },
    { label: "Features", href: "/features", icon: Sparkles },
    { label: "Pricing", href: "/pricing", icon: Tag },
    { label: "Contact", href: "/contact", icon: Mail },
    { label: "Blog", href: "/blog", icon: BookOpen },
]
