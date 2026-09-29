"use client"

import { clientEnv } from "@/env/client"

export type DashboardHeadMeta = {
    breadcrumb: string
    lead: string
    accent?: string
    subtitle: string
    mobileSubtitle?: string
}

const DASHBOARD_HEAD_META: Record<string, DashboardHeadMeta> = {
    "/dashboard": {
        breadcrumb: "Dashboard",
        lead: "Spiritual Cultivation",
        accent: "Core Dashboard",
        subtitle: "A consolidated view of prayer continuity, Qur'an engagement, and dhikr discipline, arranged for daily review with clarity and steadiness.",
        mobileSubtitle: "Review prayer, Qur'an, and dhikr continuity in one clear daily view.",
    },
    "/prayer": {
        breadcrumb: "Prayer",
        lead: "Prayer Times",
        accent: "Daily Rhythm",
        subtitle: "Keep the day anchored in its appointed windows, with times, presence, and devotional continuity held in one place.",
        mobileSubtitle: "Keep prayer times, presence, and daily continuity in one clear view.",
    },
    "/quran": {
        breadcrumb: "Quran",
        lead: "Quran",
        accent: "Reading Space",
        subtitle: `Engage with "Holy Qur'an" 114 surahs and 6,236 verses, the final Divine Revelation preserved in its revealed Arabic and entrusted to all mankind.`,
        mobileSubtitle: `Engage with the Holy Qur'an—114 surahs, 6,236 verses, preserved in its revealed Arabic.`
    },
    "/hadith": {
        breadcrumb: "Hadith",
        lead: "Hadith",
        accent: "Study Library",
        subtitle: "Browse prophetic narrations within a composed study library built for reading, verification, and deliberate return.",
        mobileSubtitle: "Study prophetic narrations in a calmer library for reading and verification.",
    },
    "/dhikr": {
        breadcrumb: "Dhikr",
        lead: "Dhikr",
        accent: "Daily Counter",
        subtitle: "Hold remembrance with disciplined repetition, lucid targets, and a quieter interface that protects concentration.",
        mobileSubtitle: "Keep dhikr, targets, and focus together in one quieter counter.",
    },
    "/guides": {
        breadcrumb: "Guides",
        lead: "Guides",
        accent: "Learning Paths",
        subtitle: "Structured learning paths for worship, character, and foundations, written to be practical, revisitable, and intellectually clear.",
        mobileSubtitle: "Follow clear learning paths for worship, character, and foundations.",
    },
    "/supplications": {
        breadcrumb: "Supplications",
        lead: "Supplications",
        accent: "Prayer Library",
        subtitle: "A searchable library of supplications, arranged for retrieval when the heart requires language, presence, and return.",
        mobileSubtitle: "Find supplications quickly when you need language, presence, and return.",
    },
    "/history": {
        breadcrumb: "History",
        lead: "History",
        accent: "Past & Lessons",
        subtitle: "Key people, places, and turning points from the Muslim past, arranged for study with clarity, sequence, and reflection.",
        mobileSubtitle: "Study key people, places, and turning points from the Muslim past.",
    },
    "/stories": {
        breadcrumb: "Stories",
        lead: "Stories",
        accent: "Prophetic Narratives",
        subtitle: "Stories from revelation and tradition, arranged to preserve moral clarity, patience, and spiritual orientation.",
        mobileSubtitle: "Read stories that preserve patience, clarity, and spiritual orientation.",
    },
    "/miracles": {
        breadcrumb: "Miracles",
        lead: "Miracles",
        accent: "Signs & Reflection",
        subtitle: "Miracles from revelation, prophecy, and creation, presented with restraint for reflection rather than spectacle.",
        mobileSubtitle: "Reflect on miracles from revelation and creation without spectacle.",
    },
    "/calendar": {
        breadcrumb: "Calendar",
        lead: "Calendar",
        accent: "Sacred Time",
        subtitle: "Follow the Hijri year as a lived calendar of seasons, observances, and communal rhythm.",
        mobileSubtitle: "Follow the Hijri year through seasons, observances, and shared rhythm.",
    },
    "/qibla": {
        breadcrumb: "Qibla",
        lead: "Qibla",
        accent: "Direction & Bearing",
        subtitle: "Orient the body toward prayer through a clear bearing view grounded in direction.",
        mobileSubtitle: "Find the prayer direction through a clear and calm bearing view.",
    },
    "/prophets": {
        breadcrumb: "Prophets",
        lead: "Prophets",
        accent: "Lineage Map",
        subtitle: "Trace prophetic relations and eras through a navigable lineage map built for study, memory, and orientation.",
        mobileSubtitle: "Trace prophetic relations and eras through a clear lineage map.",
    },
    "/support": {
        breadcrumb: "Support",
        lead: "Contact Support",
        accent: "Help Center",
        subtitle: "Find answers, contact the team, and resolve practical questions without leaving the app's working flow.",
        mobileSubtitle: "Get answers and contact the team without leaving the app flow.",
    },
    "/donate": {
        breadcrumb: "Give",
        lead: "Transparent Giving",
        accent: `Support ${clientEnv.APP_NAME}`,
        subtitle: "Choose a plan that sustains the work, expands access to authentic Islamic scholarship, and keeps serious Islamic learning open to more people for generations.",
        mobileSubtitle: "Support the work and keep serious Islamic learning open to more people.",
    },
    "/revert": {
        breadcrumb: "Become Muslim",
        lead: "Become Muslim",
        accent: "First Steps",
        subtitle: "A calm and reasoned path for those entering Islam, or weighing its truth with seriousness before they do.",
        mobileSubtitle: "Follow a calm path into Islam, or weigh its truth with seriousness.",
    },
    "/pillars": {
        breadcrumb: "Five Pillars",
        lead: "Foundations of Islam",
        accent: "Five Pillars",
        subtitle: "Revisit the core acts of Islam through plain guidance that is simple enough to begin, strong enough to retain, and practical enough to apply with confidence.",
        mobileSubtitle: "Revisit the core acts of Islam through simple, durable guidance.",
    },
}

export function getDashboardHeadMeta(pathname: string): DashboardHeadMeta | null {
    return DASHBOARD_HEAD_META[pathname] ?? null
}
