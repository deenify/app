import type { LucideIcon } from "lucide-react"
import {
    Bell,
    Eye,
    LayoutDashboard,
    Palette,
    Settings,
    Shield,
    User,
} from "lucide-react"
import type { BadgeProps } from "@/components/ui/badge"



// Profile pages-header-content
export type profilePagesHeaderContentType = {
    path: string
    badge: {
        label: string
        variant: NonNullable<BadgeProps["variant"]>
        className?: string
    }
    title: string
    description: string
}
export const profilePagesHeaderContent: profilePagesHeaderContentType[] = [
    {
        path: "/profile",
        badge: { label: "Overview", variant: "emerald" as const },
        title: "Your profile at a glance",
        description:
            "Jump into any section from the shortcuts below. Everything here is structured to match your app shell — calm spacing, emerald accents, and clear hierarchy.",

    },
    {
        path: "/profile/account",
        badge: { label: "Account", variant: "blue" as const },
        title: "Personal information",
        description:
            "Update how you appear across Deenify. These fields are ready to bind to your auth layer when you connect an API.",
    },
    {
        path: "/profile/privacy",
        badge: { label: "Privacy", variant: "purple" as const },
        title: "Privacy controls",
        description:
            "Decide what others can infer from your activity. Defaults lean toward respectful visibility.",
    },
    {
        path: "/profile/security",
        badge: { label: "Security", variant: "red" as const },
        title: "Protect your account",
        description:
            "Layer sign-in with modern safeguards. Wire these toggles to your identity provider when ready.",
    },
    {
        path: "/profile/notifications",
        badge: { label: "Notifications", variant: "amber" as const },
        title: "Stay on time, gently",
        description: "Choose what nudges you toward consistency without noise.",
    },
    {
        path: "/profile/personalization",
        badge: { label: "Personalization", variant: "emerald" as const },
        title: "Make it feel like yours",
        description:
            "Language, reading comfort, and accent colors — tuned to match the rest of Deenify.",
    },
    {
        path: "/profile/settings",
        badge: {
            label: "Settings",
            variant: "emerald" as const,
        },
        title: "Defaults that follow you",
        description:
            "Prayer calculation, Asr juristic choice, and Hijri alignment — mirrors the v9 preferences layout, restyled for production polish.",
    },
]



// Profile header-content
export const profileHeaderContent = {
    name: "Ahmed Abdullah",
    email: "ahmed@example.com",
    initials: "AA",
    avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    location: "New York, USA",
    madhab: "Hanafi",
    prayerMethod: "ISNA",
    memberSince: "October 2024",
    stats: {
        streakDays: 127,
        activeSessions: 2,
        twoFactorEnabled: true,
    },
} as const



// Profile-Sidebar
export type profileSidebarContentType = {
    href: string
    label: string
    icon: LucideIcon
}
export const profileSidebarContent: profileSidebarContentType[] = [
    { href: "/profile", label: "Overview", icon: LayoutDashboard },
    { href: "/profile/account", label: "Account", icon: User },
    { href: "/profile/privacy", label: "Privacy", icon: Eye },
    { href: "/profile/security", label: "Security", icon: Shield },
    { href: "/profile/notifications", label: "Notifications", icon: Bell },
    { href: "/profile/personalization", label: "Personalization", icon: Palette },
    { href: "/profile/settings", label: "Settings", icon: Settings },
]




// Navigation Shortcuts 
export type navigationShortCutsContentType = {
    href: string
    label: string
    description: string
    icon: LucideIcon
    tone: string
}
export const navigationShortCuts: navigationShortCutsContentType[] = [
    {
        href: "/profile/account",
        label: "Account",
        description: "Name, email, and religious preferences",
        icon: User,
        tone: "bg-blue-50 text-blue-700 ring-blue-100",
    },
    {
        href: "/profile/privacy",
        label: "Privacy",
        description: "Visibility and activity sharing",
        icon: Eye,
        tone: "bg-purple-50 text-purple-700 ring-purple-100",
    },
    {
        href: "/profile/security",
        label: "Security",
        description: "Password, devices, and sign-in",
        icon: Shield,
        tone: "bg-red-50 text-red-700 ring-red-100",
    },
    {
        href: "/profile/notifications",
        label: "Notifications",
        description: "Reminders and delivery channels",
        icon: Bell,
        tone: "bg-amber-50 text-amber-800 ring-amber-100",
    },
    {
        href: "/profile/personalization",
        label: "Personalization",
        description: "Language, reading comfort, and accent",
        icon: Palette,
        tone: "bg-emerald-50 text-emerald-800 ring-emerald-100",
    },
    {
        href: "/profile/settings",
        label: "Settings",
        description: "Prayer defaults and app behavior",
        icon: Settings,
        tone: "bg-gray-100 text-gray-800 ring-gray-200",
    },
]



// Get pages-header-content
export function getProfilePagesHeader(pathname: string | null): profilePagesHeaderContentType {
    const path = pathname ?? ""
    const exact = profilePagesHeaderContent.find((h) => h.path === path)
    if (exact) return exact

    const byPrefix = [...profilePagesHeaderContent]
        .filter((h) => h.path !== "/profile")
        .sort((a, b) => b.path.length - a.path.length)
        .find((h) => path.startsWith(`${h.path}/`))

    return byPrefix ?? profilePagesHeaderContent[0]
}