export type HistorySection = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export type HistoryCategory = { id: string; label: string }

export type HistoryTopic = {
    id: string
    title: string
    category: string
    excerpt: string
    readMinutes: number
    era: string
    thumbnail?: string
    videoUrl?: string
    sections: HistorySection[]
}

export const HISTORY_EDITORIAL = {
    badge: "Islamic history",
    title: "Key moments in our past",
    lead: "Short reads on people, places, and events that shaped the Muslim world — written in plain language.",
}

export const HISTORY_CATEGORIES: HistoryCategory[] = [
    { id: "all", label: "All" },
    { id: "early", label: "Early Islam" },
    { id: "empires", label: "Empires" },
    { id: "scholars", label: "Scholars" },
    { id: "modern", label: "Modern era" },
]

const section = (
    number: number,
    title: string,
    content: string,
    keyPoints: string[]
): HistorySection => ({ number, title, content, keyPoints })

export const HISTORY_TOPICS: HistoryTopic[] = [
    {
        id: "hijrah",
        title: "The Hijrah to Madinah",
        category: "early",
        era: "622 CE",
        excerpt: "When the Muslims moved to Madinah and built a new community.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4f9f0ee?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/2C8M7-hkiBc",
        sections: [
            section(1, "Why they left Makkah", "The Muslims faced harm and boycott. Allah allowed migration for those who could not worship freely.", ["Migration is allowed when faith is at risk", "The Prophet ﷺ planned with care"]),
            section(2, "Building Madinah", "In Madinah, Muslims became one community with the Ansar and Muhajirun. Masjid an-Nabawi became the heart of the city.", ["Brotherhood between migrants and locals", "A constitution for peace with tribes"]),
        ],
    },
    {
        id: "khulafa",
        title: "The Rightly Guided Caliphs",
        category: "early",
        era: "632–661 CE",
        excerpt: "The four leaders who ruled after the Prophet ﷺ passed away.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b02a88df0?w=800&q=80",
        sections: [
            section(1, "Abu Bakr and unity", "He kept the ummah together when the Prophet ﷺ passed away and began compiling the Quran.", ["Short rule focused on stability", "Fought those who refused zakah falsely"]),
            section(2, "Expansion with justice", "Umar and Uthman spread Islam with fairness. Ali faced trials but stayed firm on the Quran and Sunnah.", ["Judges were held accountable", "Public treasury was not private wealth"]),
        ],
    },
    {
        id: "badr",
        title: "The Battle of Badr",
        category: "early",
        era: "624 CE",
        excerpt: "A small Muslim army won against a larger force — with Allah’s help.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        sections: [
            section(1, "Before the fight", "Muslims wanted their goods back from a trade caravan. They met the Quraysh army instead.", ["Numbers were not on the Muslim side", "Prayer and dua came first"]),
            section(2, "Victory and lesson", "Allah gave victory. It raised hope but also taught reliance on Him, not pride.", ["Captives were treated with dignity", "Faith matters more than weapons"]),
        ],
    },
    {
        id: "andalus",
        title: "Al-Andalus",
        category: "empires",
        era: "711–1492 CE",
        excerpt: "Muslim Spain and its schools, art, and trade.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/IVYC0Dd2Zng",
        sections: [
            section(1, "Cities of light", "Cordoba and Granada had libraries, baths, and markets. Learning was valued.", ["Muslims, Christians, and Jews often traded ideas", "Architecture still inspires today"]),
            section(2, "Decline and memory", "Political splits weakened the region over time. Still, Andalus left a mark on science and culture.", ["Unity matters for strength", "Knowledge should be shared, not locked away"]),
        ],
    },
    {
        id: "ottoman",
        title: "The Ottoman era",
        category: "empires",
        era: "1299–1922 CE",
        excerpt: "A long empire that guarded holy sites and trade routes.",
        readMinutes: 6,
        thumbnail: "https://images.unsplash.com/photo-1527834287169-4aab2b5c0c0c?w=800&q=80",
        sections: [
            section(1, "Role of the caliphate", "Ottoman sultans later held the title of caliph. They protected Makkah and Madinah routes.", ["Hajj caravans were organized", "Awqaf supported schools and hospitals"]),
            section(2, "Reform and end", "The empire faced modern wars and internal change. It ended, but Muslim lands kept seeking renewal.", ["Strength needs internal reform", "History teaches humility"]),
        ],
    },
    {
        id: "ibn-sina",
        title: "Ibn Sina and medicine",
        category: "scholars",
        era: "980–1037 CE",
        excerpt: "A scholar whose books were used in Europe for hundreds of years.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1576086213369-97f3c81b6b7?w=800&q=80",
        sections: [
            section(1, "Canon of medicine", "His book organized healing, herbs, and the body. It was a standard text for centuries.", ["Faith and science can work together", "Writing preserves knowledge for the ummah"]),
            section(2, "Legacy", "Muslim lands built hospitals and libraries. Seeking knowledge is worship when done for Allah.", ["Study with teachers", "Share what you learn simply"]),
        ],
    },
    {
        id: "printing",
        title: "Books and the printing press",
        category: "modern",
        era: "1800s–1900s",
        excerpt: "How knowledge spread faster in the modern age.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        sections: [
            section(1, "More readers", "Printing made Quran copies, newspapers, and school books cheaper.", ["Literacy became a community goal", "Ideas traveled faster — good and bad"]),
            section(2, "Revival movements", "Scholars called Muslims back to the Quran and Sunnah while facing colonial pressure.", ["Know your sources", "Reform with wisdom, not rage"]),
        ],
    },
    {
        id: "saladin",
        title: "Salah al-Din and Jerusalem",
        category: "empires",
        era: "1187 CE",
        excerpt: "He took Jerusalem back with mercy after years of crusader rule.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        sections: [
            section(1, "Unity before battle", "He united Muslim rulers enough to face a strong enemy.", ["Politics needs patience", "Purpose should be Allah’s pleasure"]),
            section(2, "Mercy at victory", "When Jerusalem opened, he did not repeat the mass killings of the crusaders.", ["Chivalry is part of Islam", "Power must be restrained"]),
        ],
    },
]

export function getHistoryById(id: string): HistoryTopic | undefined {
    return HISTORY_TOPICS.find((t) => t.id === id)
}
