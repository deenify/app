import {
    Settings,
    HelpCircle,
    User,
    BookOpen,
    TrendingUp,
    Clock,
    LucideIcon,
    Gift
} from "lucide-react";

export interface MenuItem {
    label: string;
    icon: LucideIcon;
    href: string;
}
export interface MenuSection {
    label: string;
    sectionItems: MenuItem[];
}

export const profileMenuItems: MenuSection[] = [
    {
        label: "My Profile",
        sectionItems: [
            { label: "My Profile", icon: User, href: "/profile" },
            { label: "Settings & Preferences", icon: Settings, href: "/settings" },
            { label: "Prayer History", icon: Clock, href: "/prayer-history" },
            { label: "My Dhikr Progress", icon: TrendingUp, href: "/dhikr-progress" },
            { label: "Reading Progress", icon: BookOpen, href: "/reading-progress" },
        ]
    },
    {
        label: "Help & Support",
        sectionItems: [
            { label: "Support Center", icon: HelpCircle, href: "/support-center" },
            { label: "Donate", icon: Gift, href: "/donate" },
        ]
    }
]

