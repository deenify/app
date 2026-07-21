import { clientEnv } from "@/env/client"

export type LegalSection = {
    id: string
    title: string
    paragraphs: string[]
    bullets?: string[]
}

export type LegalDocument = {
    slug: "terms" | "privacy"
    eyebrow: string
    title: string
    accent: string
    summary: string
    summaryMobile: string
    updatedLabel: string
    readingNote: string
    readingNoteMobile: string
    sections: LegalSection[]
    relatedHref: string
    relatedLabel: string
}

const APP = clientEnv.APP_NAME
const SUPPORT = clientEnv.APP_SUPPORT_EMAIL

export const TERMS_DOCUMENT: LegalDocument = {
    slug: "terms",
    eyebrow: "Terms of use",
    title: "The agreement that",
    accent: "keeps us honest",
    summary: `These terms describe how you may use ${APP}, what we commit to provide, and the boundaries that protect both of us. Written plainly — not as a wall of fine print.`,
    summaryMobile: `How you may use ${APP}, what we provide, and the boundaries that protect both of us — in plain language.`,
    updatedLabel: "Last updated July 2026",
    readingNote: "About 6 minutes · Plain language",
    readingNoteMobile: "~6 min read",
    relatedHref: "/privacy",
    relatedLabel: "Read Privacy",
    sections: [
        {
            id: "acceptance",
            title: "Acceptance",
            paragraphs: [
                `By creating an account or using ${APP}, you agree to these Terms. If you do not agree, please do not use the service.`,
                "We may update these Terms when the product or the law requires it. Continued use after a published change means you accept the revised Terms.",
            ],
        },
        {
            id: "the-service",
            title: `What ${APP} is`,
            paragraphs: [
                `${APP} is a digital companion for prayer, Quran, Hadith, dhikr, and related learning. Features may evolve; availability can vary by plan, region, or device.`,
                "Content is provided for personal education and practice. It is not a substitute for qualified scholarly counsel when you need a formal ruling.",
            ],
        },
        {
            id: "accounts",
            title: "Your account",
            paragraphs: [
                "You are responsible for the accuracy of the information you provide and for keeping your credentials secure.",
                "Notify us promptly if you suspect unauthorized access. We may suspend accounts that threaten the safety, integrity, or lawful use of the platform.",
            ],
            bullets: [
                "One person per account unless we explicitly offer shared plans",
                "You must be old enough to form a binding contract in your jurisdiction",
                "Do not share, sell, or transfer your account",
            ],
        },
        {
            id: "acceptable-use",
            title: "Acceptable use",
            paragraphs: [
                `Use ${APP} respectfully and lawfully. You may not abuse, reverse-engineer, scrape at scale, or interfere with the service or other users.`,
            ],
            bullets: [
                "No harassment, hate, or harmful content directed at others",
                "No attempts to bypass security, billing, or access controls",
                "No automated bulk extraction of our libraries without written permission",
                `No impersonation of ${APP}, our team, or other users`,
            ],
        },
        {
            id: "subscriptions",
            title: "Plans & payments",
            paragraphs: [
                "Free and paid plans may differ in features and limits. Prices and billing intervals are shown at checkout and may change for future renewals with notice.",
                "Unless stated otherwise at purchase, subscriptions renew until cancelled. Taxes may apply based on your location.",
            ],
        },
        {
            id: "intellectual-property",
            title: "Intellectual property",
            paragraphs: [
                `The ${APP} product, branding, interface, and original materials we create are owned by us or our licensors. Sacred texts and classical sources remain in the public domain or under their respective rights; our presentation, curation, and tooling are ours.`,
                "You retain rights to content you create in the product (notes, bookmarks, preferences). You grant us a limited license to store and display that content solely to operate the service for you.",
            ],
        },
        {
            id: "disclaimers",
            title: "Disclaimers",
            paragraphs: [
                `${APP} is provided “as is.” We work carefully, but we do not guarantee uninterrupted availability, perfect accuracy of every calculation or translation, or fitness for a particular purpose.`,
                "Prayer times, qibla, and similar tools depend on location data, calculation methods, and device sensors — verify critical worship decisions with trusted local guidance when needed.",
            ],
        },
        {
            id: "liability",
            title: "Limitation of liability",
            paragraphs: [
                "To the fullest extent permitted by law, our liability for any claim arising from the service is limited to the amount you paid us in the twelve months before the claim — or zero if you use only a free plan.",
                "We are not liable for indirect, incidental, or consequential damages, including lost data or interruption of practice routines.",
            ],
        },
        {
            id: "termination",
            title: "Ending the relationship",
            paragraphs: [
                "You may stop using the service and delete your account at any time through profile settings or by contacting support.",
                "We may suspend or end access if these Terms are violated, if required by law, or if we discontinue the service with reasonable notice where practicable.",
            ],
        },
        {
            id: "contact-terms",
            title: "Questions",
            paragraphs: [
                `For terms-related questions, write to ${SUPPORT} or use the contact form. We read every message.`,
            ],
        },
    ],
}

export const PRIVACY_DOCUMENT: LegalDocument = {
    slug: "privacy",
    eyebrow: "Privacy policy",
    title: "How we handle",
    accent: "what is yours",
    summary: `Privacy is part of the craft — not an afterthought. This policy explains what ${APP} collects, why we collect it, and the choices you retain.`,
    summaryMobile: `What ${APP} collects, why we collect it, and the choices you keep — privacy as part of the craft.`,
    updatedLabel: "Last updated July 2026",
    readingNote: "About 7 minutes · Plain language",
    readingNoteMobile: "~7 min read",
    relatedHref: "/terms",
    relatedLabel: "Read Terms",
    sections: [
        {
            id: "promise",
            title: "Our stance",
            paragraphs: [
                `We collect only what we need to run ${APP} well: authenticate you, sync your progress, personalize prayer and reading experiences, and improve reliability.`,
                "We do not sell your personal information. We do not build advertising profiles from your worship or reading habits.",
            ],
        },
        {
            id: "data-we-collect",
            title: "Information we collect",
            paragraphs: [
                "Depending on how you use the product, we may process:",
            ],
            bullets: [
                "Account details — name, email, password (hashed), and preferences you set",
                "Usage data — modules opened, reading progress, bookmarks, and feature interactions needed for sync",
                "Device & technical data — browser or app version, approximate region, and diagnostics that help us fix bugs",
                "Location — only when you enable it for prayer times, qibla, or similar tools; you can revoke access anytime",
                "Communications — messages you send to support or through contact forms",
            ],
        },
        {
            id: "how-we-use",
            title: "How we use it",
            paragraphs: [
                "We use personal data to provide and secure the service, personalize your dashboard, process subscriptions, respond to support, and meet legal obligations.",
                "Aggregated or de-identified insights may help us understand which features deserve more care — never to target you with third-party ads.",
            ],
        },
        {
            id: "sharing",
            title: "When we share",
            paragraphs: [
                "We share data only with trusted processors who help us operate (hosting, email delivery, analytics, payment providers) under contracts that limit their use of your information.",
                "We may disclose information if required by law, to protect rights and safety, or in connection with a merger or acquisition — with notice when legally allowed.",
            ],
        },
        {
            id: "retention",
            title: "Retention",
            paragraphs: [
                "We keep account and progress data while your account is active. After deletion, we remove or anonymize personal data within a reasonable period, except where law requires longer retention (for example, billing records).",
            ],
        },
        {
            id: "security",
            title: "Security",
            paragraphs: [
                "We use industry-standard safeguards — encryption in transit, access controls, and careful handling of credentials. No system is perfect; please use a strong unique password and enable available protections.",
            ],
        },
        {
            id: "your-choices",
            title: "Your choices",
            paragraphs: [
                "You can update profile details, manage notification and location permissions, export or review certain data where available, and request account deletion.",
                `Depending on where you live, you may have rights to access, correct, delete, or restrict processing of your personal data. Contact ${SUPPORT} to exercise those rights.`,
            ],
        },
        {
            id: "children",
            title: "Children",
            paragraphs: [
                `${APP} is not directed at children under 13 (or the minimum age in your region). If you believe a child has created an account, contact us and we will take appropriate steps.`,
            ],
        },
        {
            id: "international",
            title: "International transfers",
            paragraphs: [
                "Your information may be processed in countries other than your own. Where required, we use appropriate safeguards for those transfers.",
            ],
        },
        {
            id: "contact-privacy",
            title: "Privacy contact",
            paragraphs: [
                `Questions about this policy or your data: ${SUPPORT}, or the contact page. We treat privacy inquiries with the same seriousness as product bugs.`,
            ],
        },
    ],
}
