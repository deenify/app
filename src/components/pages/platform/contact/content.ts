import { Clock, Headphones, Mail, MessageSquare } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { clientEnv } from "@/env/client"

export type ContactChannel = {
    icon: LucideIcon
    title: string
    description: string
    action: string
    href: string
}

export const CONTACT_CHANNELS: ContactChannel[] = [
    {
        icon: Mail,
        title: "General inquiries",
        description: "Partnerships, press, and general questions about the platform.",
        action: clientEnv.APP_SUPPORT_EMAIL,
        href: `mailto:${clientEnv.APP_SUPPORT_EMAIL}`,
    },
    {
        icon: Headphones,
        title: "Product support",
        description: "Account issues, bugs, and feature questions from active users.",
        action: "Open support",
        href: "/support",
    },
    {
        icon: MessageSquare,
        title: "Feedback & ideas",
        description: "Roadmap input, UX suggestions, and content corrections.",
        action: "Send feedback",
        href: `mailto:${clientEnv.APP_SUPPORT_EMAIL}?subject=Feedback`,
    },
]

export const CONTACT_TOPICS = [
    "Account & billing",
    "Content correction",
    "Partnership inquiry",
    "Technical support",
    "Feature request",
    "Other",
]

export const CONTACT_RESPONSE_NOTE = {
    icon: Clock,
    title: "Response within 24 hours",
    description: "We read every message. Support requests are prioritized for active account holders.",
}
