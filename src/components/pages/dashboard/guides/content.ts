export type GuideDifficulty = "beginner" | "intermediate" | "advanced"

export type GuideCategoryId =
    | "worship"
    | "fasting"
    | "charity"
    | "hajj"
    | "family"
    | "sharia"
    | "ethics"
    | "quran"
    | "hadith"
    | "history"
    | "spirituality"
    | "afterlife"
    | "new-muslim"
    | "daily-life"
    | "women"
    | "youth"
    | "advanced"
    | "contemporary"

export type GuideType = {
    id: string
    title: string
    category: GuideCategoryId
    difficulty: GuideDifficulty
    /** Display-only read time for UI */
    readTimeMinutes: number
    /** Short teaser for card */
    excerpt: string
}

export type GuideSectionType = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export type FivePillarType = {
    title: string
    description: string
    details: string
}

export const FivePillars: FivePillarType[] = [
    {
        title: "Shahada (Faith)",
        description: `The testimony: “There is no god but Allah, and Muhammad is His Messenger.”`,
        details:
            "The Shahada is the foundation of Islam. It is a sincere affirmation of Allah’s oneness and the Prophethood of Muhammad ﷺ.",
    },
    {
        title: "Salah (Prayer)",
        description: "The five daily prayers performed at their appointed times.",
        details:
            "Salah is the believer’s connection to Allah — Fajr, Dhuhr, Asr, Maghrib, and Isha — with humility and presence of heart.",
    },
    {
        title: "Zakah (Charity)",
        description: "An obligatory purification of wealth given to those entitled.",
        details:
            "Zakah nurtures mercy and social responsibility. It purifies wealth and supports the vulnerable in the community.",
    },
    {
        title: "Sawm (Fasting)",
        description: "Fasting Ramadan from dawn to sunset as a spiritual discipline.",
        details:
            "Fasting cultivates taqwa, patience, gratitude, and empathy. It is not only abstention, but an elevation of character.",
    },
    {
        title: "Hajj (Pilgrimage)",
        description: "Pilgrimage to Makkah once in a lifetime for those able.",
        details:
            "Hajj unites Muslims across languages and cultures. It commemorates the legacy of Ibrahim عليه السلام and renews devotion.",
    },
]

export const GuideCategories: Array<{ id: "all" | GuideCategoryId; label: string }> = [
    { id: "all", label: "All topics" },
    { id: "worship", label: "Worship & prayer" },
    { id: "fasting", label: "Fasting & Ramadan" },
    { id: "charity", label: "Zakah & charity" },
    { id: "hajj", label: "Hajj & Umrah" },
    { id: "family", label: "Marriage & family" },
    { id: "sharia", label: "Islamic law" },
    { id: "ethics", label: "Ethics & character" },
    { id: "quran", label: "Quran studies" },
    { id: "hadith", label: "Hadith studies" },
    { id: "history", label: "Islamic history" },
    { id: "spirituality", label: "Spirituality" },
    { id: "afterlife", label: "Death & afterlife" },
    { id: "new-muslim", label: "New Muslim" },
    { id: "daily-life", label: "Daily life" },
    { id: "women", label: "Women in Islam" },
    { id: "youth", label: "Youth & education" },
    { id: "advanced", label: "Advanced topics" },
    { id: "contemporary", label: "Contemporary issues" },
]

export const GuidesMock: GuideType[] = [
    {
        id: "wudu",
        title: "How to Perform Wudu (Ablution)",
        category: "worship",
        difficulty: "beginner",
        readTimeMinutes: 8,
        excerpt: "A clear step-by-step guide, common mistakes, and the sunnah of purification.",
    },
    {
        id: "salah",
        title: "Step-by-Step Guide to Salah",
        category: "worship",
        difficulty: "beginner",
        readTimeMinutes: 14,
        excerpt: "Practical flow of the prayer with key pillars, obligations, and recommended acts.",
    },
    {
        id: "ramadan",
        title: "Complete Guide to Ramadan",
        category: "fasting",
        difficulty: "beginner",
        readTimeMinutes: 12,
        excerpt: "Intentions, rules, spiritual focus, and how to make Ramadan transformational.",
    },
    {
        id: "zakah",
        title: "Zakah Calculation Guide",
        category: "charity",
        difficulty: "intermediate",
        readTimeMinutes: 10,
        excerpt: "Nisab, zakatable assets, and a structured way to calculate responsibly.",
    },
    {
        id: "umrah",
        title: "Umrah: Step by Step",
        category: "hajj",
        difficulty: "intermediate",
        readTimeMinutes: 11,
        excerpt: "Ihram, tawaf, sa‘i, and etiquette — a calm walkthrough for first timers.",
    },
    {
        id: "hadith-intro",
        title: "Introduction to Hadith",
        category: "hadith",
        difficulty: "beginner",
        readTimeMinutes: 9,
        excerpt: "What hadith is, how it’s preserved, and how to read narrations responsibly.",
    },
    {
        id: "isnad",
        title: "Understanding Isnad",
        category: "hadith",
        difficulty: "advanced",
        readTimeMinutes: 13,
        excerpt: "A high-level view of chains, reliability, and why isnad matters in scholarship.",
    },
    {
        id: "tajweed",
        title: "Tajweed Rules Basics",
        category: "quran",
        difficulty: "beginner",
        readTimeMinutes: 10,
        excerpt: "Foundational articulation and rules for improving recitation steadily.",
    },
    {
        id: "sabr",
        title: "Patience (Sabr) in Islam",
        category: "ethics",
        difficulty: "intermediate",
        readTimeMinutes: 7,
        excerpt: "Sabr in hardship, obedience, and avoiding sin — and how to practice it daily.",
    },
]

export function getGuideById(id: string): GuideType | undefined {
    return GuidesMock.find((g) => g.id === id)
}

export function getGuideSectionsMock(_id: string): GuideSectionType[] {
    return [
        {
            number: 1,
            title: "Introduction",
            content:
                "This guide provides a structured introduction to the topic, emphasizing clarity, authenticity, and practical practice.",
            keyPoints: ["Context and purpose", "Why it matters", "How to apply it consistently"],
        },
        {
            number: 2,
            title: "Core principles",
            content:
                "Key principles are anchored in Quran and Sunnah, supported by scholarly explanation and a balanced approach.",
            keyPoints: ["Foundations", "Evidence-first approach", "Avoiding extremes"],
        },
        {
            number: 3,
            title: "Practical steps",
            content:
                "A step-by-step pathway you can follow, with common pitfalls highlighted and a simple weekly routine.",
            keyPoints: ["Clear steps", "Common mistakes", "A sustainable routine"],
        },
        {
            number: 4,
            title: "Common questions",
            content:
                "A set of frequently asked questions with concise answers and suggestions for deeper study if needed.",
            keyPoints: ["Misconceptions", "Edge cases", "When to ask a scholar"],
        },
        {
            number: 5,
            title: "Spiritual benefits",
            content:
                "How this practice refines character, strengthens faith, and connects your daily life to worship.",
            keyPoints: ["Taqwa and sincerity", "Character growth", "Consistency over intensity"],
        },
    ]
}

