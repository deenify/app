export const PILLARS_EDITORIAL = {
    badge: "Five pillars",
    title: "The foundation of Islam",
    lead: "Five acts every Muslim learns — what they mean and why they matter, in simple words.",
} as const

export type PillarItem = {
    id: string
    title: string
    arabicLabel: string
    summary: string
    detail: string
}

export const PILLARS: PillarItem[] = [
    {
        id: "shahada",
        title: "Shahada (Faith)",
        arabicLabel: "الشهادة",
        summary: "Say and believe: there is no god but Allah, and Muhammad is His Messenger.",
        detail: "This is the entry to Islam. It means you worship Allah alone and accept the Prophet ﷺ as His final messenger. Everything else in Islam builds on this truth.",
    },
    {
        id: "salah",
        title: "Salah (Prayer)",
        arabicLabel: "الصلاة",
        summary: "Five daily prayers at set times — your direct link to Allah.",
        detail: "Fajr, Dhuhr, Asr, Maghrib, and Isha keep the heart awake. Prayer washes away sins, brings discipline, and reminds you that this life is short.",
    },
    {
        id: "zakah",
        title: "Zakah (Charity)",
        arabicLabel: "الزكاة",
        summary: "Give a fixed share of wealth to those Allah named as eligible.",
        detail: "Zakah is not optional charity — it is a right of the poor on your wealth. It purifies money and builds care in the community.",
    },
    {
        id: "sawm",
        title: "Sawm (Fasting)",
        arabicLabel: "الصوم",
        summary: "Fast Ramadan from dawn to sunset.",
        detail: "You skip food and drink for Allah’s sake. Fasting teaches hunger, empathy for the poor, and control over desires. Eid marks joy after the struggle.",
    },
    {
        id: "hajj",
        title: "Hajj (Pilgrimage)",
        arabicLabel: "الحج",
        summary: "Visit Makkah once in a lifetime if you are able.",
        detail: "Millions wear simple white clothes and stand equal before Allah. Hajj follows the path of Ibrahim عليه السلام and ends with forgiveness for many sins.",
    },
]
