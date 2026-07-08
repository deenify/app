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

export type PricingNote = {
    title: string
    description: string
}

export const PRICING_NOTES: PricingNote[] = [
    {
        title: "No hidden tiers",
        description:
            "Every plan lists exactly what you receive. Upgrades unlock depth — not essential worship tools.",
    },
    {
        title: "Cancel anytime",
        description:
            "Paid plans renew monthly. Downgrade or cancel from your profile without contacting support.",
    },
    {
        title: "Community-first allocation",
        description:
            "Enterprise contributions support verified content, outreach, and transparent charitable allocation.",
    },
]
