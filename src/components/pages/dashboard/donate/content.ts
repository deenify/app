import { clientEnv } from "@/env/client"

export const DONATE_EDITORIAL = {
    badge: "Donate",
    title: `Support ${clientEnv.APP_NAME}`,
    lead: "Pick a plan that fits you. Every gift keeps learning free for the ummah.",
} as const

export type DonateTier = {
    id: string
    amount: string
    priceCents: number
    period: string
    label: string
    impact: string
    features: string[]
    popular?: boolean
}

export const DONATE_TIERS: DonateTier[] = [
    {
        id: "coffee",
        amount: "$5",
        priceCents: 500,
        period: "/ month",
        label: "Supporter",
        impact: "Keeps the app online for hundreds of users each day.",
        features: ["Thank-you badge in profile", "Early feature previews"],
    },
    {
        id: "grow",
        amount: "$15",
        priceCents: 1500,
        period: "/ month",
        label: "Content friend",
        impact: "Funds new guides and translation checks.",
        features: ["All Supporter perks", "Name on supporters page (optional)", "Priority support"],
        popular: true,
    },
    {
        id: "build",
        amount: "$50",
        priceCents: 5000,
        period: "/ month",
        label: "Builder",
        impact: "Powers design, testing, and major releases.",
        features: ["All Content friend perks", "Quarterly impact email", "Direct feedback channel"],
    },
]

export function getDonateTierById(id: string): DonateTier | undefined {
    return DONATE_TIERS.find((t) => t.id === id)
}

export const DONATE_NOTE =
    "Checkout is in demo mode. Your card will not be charged until we connect a payment provider."
