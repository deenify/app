export const REVERT_EDITORIAL = {
    badge: "Becoming Muslim",
    title: "Your path to Islam",
    lead: "Practical steps to embrace Islam, or a calm, reasoned path for those still searching — take the Shahada when your heart is ready.",
} as const

export const REVERT_TRACKS = [
    { id: "become-muslim", label: "Become Muslim" },
    { id: "why-islam", label: "Why Islam" },
] as const

export type RevertTrackId = (typeof REVERT_TRACKS)[number]["id"]

export type WhyIslamSection = {
    id: string
    title: string
    summary: string
    points: string[]
}

export const WHY_ISLAM_SECTIONS: WhyIslamSection[] = [
    {
        id: "creator",
        title: "Everything made has a maker",
        summary: "If you see a car, you know someone designed and built it. The universe is far greater.",
        points: [
            "A car has parts that work together, a purpose, and a maker you never met — yet you trust a mind made it.",
            "The sky, your body, and the laws of physics are more ordered than any machine. Order without a mind is harder to explain than a maker.",
            "You have power, will, and knowledge. Whatever brought the universe must have power, will, and knowledge at least as great — not less.",
            "Whatever depends on something else cannot be the final explanation. The first cause cannot depend on another cause, or the chain never starts.",
        ],
    },
    {
        id: "no-infinite",
        title: "Why there cannot be infinite creators",
        summary: "If everything needs a creator, you get an endless loop that never begins.",
        points: [
            "If every being needed another being to create it, nothing would ever exist — like an endless line of people each waiting for the person behind them to start walking.",
            "So reality needs one being that was not created: always existed, uncaused, and the source of everything else.",
            "Muslims call that being Allah — the true God, not a god among many, and not a part of the universe.",
            "Science can describe how things change; it does not remove the question of why anything exists at all.",
        ],
    },
    {
        id: "allah-ilah",
        title: "Allah, ilah, and the Shahada",
        summary: "Arabic words matter: ilah means “god”; Allah means the true God.",
        points: [
            "Ilah can be true or false — people have taken sun, idols, or desire as “gods.”",
            "Allah is al-Ilah: the only God who truly deserves worship — eternal, one, all-powerful, all-knowing.",
            "The Shahada first negates false gods: La ilaha — there is no god (worthy of worship) in truth except what people invent or imagine.",
            "Then it affirms: illallah — except Allah. And Muhammad is His messenger, so we follow revelation, not guesswork.",
        ],
    },
    {
        id: "prophet-quran",
        title: "Why Muhammad ﷺ and the Qur'an",
        summary: "A claim to revelation must be checked with honesty, not hype.",
        points: [
            "The Prophet ﷺ was known as truthful (as-Sadiq al-Amin) before he preached Islam. Enemies could not prove he lied when challenged.",
            "The Qur'an is in Arabic the Arabs could not imitate, though they tried. It speaks on law, history, and the unseen with consistency over 23 years.",
            "Islam does not ask blind faith: reflect, ask, and compare. When the evidence satisfies your mind and heart, say the Shahada.",
            "Becoming Muslim is a start: prayer, character, and learning come step by step — Allah does not burden you beyond what you can bear.",
        ],
    },
    {
        id: "next-steps",
        title: "When you are ready",
        summary: "Faith is between you and Allah; witnesses are encouraged but not always required for validity.",
        points: [
            "Say with meaning: Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah.",
            "Learn wudu and salah slowly — one prayer at a time is enough at first.",
            "Find a masjid or trusted mentor; use guides in this app for prayer and daily worship.",
            "Ignore harsh voices online. Grow with good company and sound scholars.",
        ],
    },
]

export type RevertStep = {
    id: string
    title: string
    summary: string
    tips: string[]
}

export const REVERT_STEPS: RevertStep[] = [
    {
        id: "learn",
        title: "Learn the basics",
        summary: "Understand who Allah is and who the Prophet ﷺ is.",
        tips: [
            "Read short guides on Tawhid and the Shahada.",
            "Ask questions — there is no shame in not knowing yet.",
        ],
    },
    {
        id: "shahada",
        title: "Take the Shahada",
        summary: "Say the testimony of faith with sincerity, alone or with witnesses.",
        tips: [
            "Arabic: Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan rasulullah.",
            "You can say it in your language first if that helps your heart.",
        ],
    },
    {
        id: "wudu",
        title: "Learn wudu and prayer",
        summary: "Start with one prayer at a time. Quality beats speed.",
        tips: [
            "Use the Wudu and Salah guides in the app.",
            "Pray in private until you feel steady.",
        ],
    },
    {
        id: "community",
        title: "Find good company",
        summary: "A local masjid or online mentor makes the journey easier.",
        tips: [
            "Introduce yourself to the imam after Jumuʿah.",
            "Join a new-Muslim class if your city has one.",
        ],
    },
    {
        id: "grow",
        title: "Grow slowly",
        summary: "Islam is a lifetime journey, not a weekend project.",
        tips: [
            "Add one habit per month — Quran, dhikr, or charity.",
            "Ignore harsh critics; follow scholars you trust.",
        ],
    },
]
