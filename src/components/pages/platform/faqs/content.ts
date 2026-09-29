import { clientEnv } from "@/env/client"

export type FaqCategory = {
    id: string
    label: string
    description: string
}

export type FaqEntry = {
    question: string
    answer: string
    categoryId: string
}

export const FAQ_CATEGORIES: FaqCategory[] = [
    {
        id: "getting-started",
        label: "Getting started",
        description: "Accounts, onboarding, and your first week on the platform.",
    },
    {
        id: "features",
        label: "Features & content",
        description: "Modules, catalogs, offline use, and how content is curated.",
    },
    {
        id: "billing",
        label: "Accounts & billing",
        description: "Plans, upgrades, cancellations, and supporter tiers.",
    },
    {
        id: "privacy",
        label: "Privacy & data",
        description: "What we store, how we protect it, and your control over it.",
    },
]

export const FAQ_PAGE_ITEMS: FaqEntry[] = [
    {
        categoryId: "getting-started",
        question: `Is ${clientEnv.APP_NAME} suitable for new Muslims?`,
        answer:
            "Yes. Guides, revert pathways, and plain-language catalogs are structured for first steps — without overwhelming terminology on day one.",
    },
    {
        categoryId: "getting-started",
        question: "Do I need an account to use prayer times?",
        answer:
            "Core prayer schedules and qibla direction work without signing in. An account unlocks sync, bookmarks, and personalized progress across devices.",
    },
    {
        categoryId: "getting-started",
        question: `Can I use ${clientEnv.APP_NAME} on mobile and desktop?`,
        answer:
            "The dashboard is responsive across breakpoints — from phone to wide displays — with layouts tuned per module.",
    },
    {
        categoryId: "features",
        question: "Does the app work offline?",
        answer:
            "Core prayer schedules and saved Quran passages are available offline. Streaming audio requires connectivity.",
    },
    {
        categoryId: "features",
        question: "How is content verified?",
        answer:
            "Collections are curated against established scholarly sources. Detail pages cite references where applicable.",
    },
    {
        categoryId: "features",
        question: `What makes ${clientEnv.APP_NAME} different?`,
        answer:
            "We optimize for intellectual calm: fewer gimmicks, stronger typography, and catalogs that behave like serious reading products.",
    },
    {
        categoryId: "features",
        question: "Which languages does the Quran support?",
        answer:
            "Translations span 95+ languages with typography tuned for long reading sessions. Audio recitations are available for listen mode.",
    },
    {
        categoryId: "billing",
        question: "Is the Basic plan really free?",
        answer:
            "Yes. Worship essentials — prayer, Quran, dhikr, and catalog browsing — remain free. Paid tiers add sync, filters, and community allocation features.",
    },
    {
        categoryId: "billing",
        question: "Can I cancel a paid plan anytime?",
        answer:
            "Yes. Downgrade or cancel from profile settings. Your account reverts to Basic at the end of the billing period — no support ticket required.",
    },
    {
        categoryId: "billing",
        question: "What does the Enterprise tier support?",
        answer:
            "Enterprise is for communities and organizations that want group onboarding, charitable allocation transparency, and direct roadmap consultation.",
    },
    {
        categoryId: "privacy",
        question: "What personal data do you collect?",
        answer:
            "We store account credentials, optional profile preferences, and usage needed for sync. We do not sell personal data to third parties.",
    },
    {
        categoryId: "privacy",
        question: "Can I export or delete my account?",
        answer:
            "Yes. Profile settings include data export and account deletion. Deletion is permanent and removes synced bookmarks and preferences.",
    },
]
