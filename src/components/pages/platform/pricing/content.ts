export type PricingComparisonRow = {
    feature: string
    basic: boolean | string
    professional: boolean | string
    enterprise: boolean | string
}

export const PRICING_COMPARISON: PricingComparisonRow[] = [
    {
        feature: "Prayer times & qibla",
        basic: true,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Quran read, listen & bookmarks",
        basic: true,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Core dhikr presets",
        basic: true,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Catalog browsing",
        basic: true,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Cloud sync across devices",
        basic: false,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Advanced filters & search",
        basic: false,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Offline passages & schedules",
        basic: false,
        professional: true,
        enterprise: true,
    },
    {
        feature: "Group onboarding",
        basic: false,
        professional: false,
        enterprise: true,
    },
    {
        feature: "Charitable allocation reports",
        basic: false,
        professional: false,
        enterprise: true,
    },
]

export const PRICING_PAYMENT_STATS = [
    { value: "256-bit", label: "SSL encrypted" },
    { value: "Cancel", label: "Anytime" },
    { value: "0 hidden", label: "Fees" },
]
