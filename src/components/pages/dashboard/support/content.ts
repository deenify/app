import { clientEnv } from "@/env/client"

export const SUPPORT_EDITORIAL = {
    badge: "Support center",
    title: "We are here to help",
    lead: "Answers to common questions and ways to reach the team — plain and friendly.",
} as const

export type SupportFaq = {
    id: string
    question: string
    answer: string
}

export const SUPPORT_FAQS: SupportFaq[] = [
    {
        id: "account",
        question: "How do I change my email or password?",
        answer: "Open Profile → Account or Security. You can update your details there. If you are locked out, use the reset link on the login page.",
    },
    {
        id: "prayer",
        question: "Prayer times look wrong for my city",
        answer: "Check your location in Profile → Settings. Pick the calculation method your local masjid uses. Times can shift by a few minutes between methods.",
    },
    {
        id: "quran",
        question: "Audio or translation is missing",
        answer: "Some surahs need a moment to load on slow networks. Try again on Wi‑Fi. If it keeps failing, tell us which surah and reciter you used.",
    },
    {
        id: "bug",
        question: "I found a bug",
        answer: "Send a short note with what you tapped, what you expected, and a screenshot if you can. We fix issues in order of impact.",
    },
]

export const SUPPORT_CHANNELS = [
    { label: "Email", value: clientEnv.APP_SUPPORT_EMAIL, hint: "We reply within 2 business days" },
    { label: "Community", value: "Discord (coming soon)", hint: "Chat with other users" },
] as const
