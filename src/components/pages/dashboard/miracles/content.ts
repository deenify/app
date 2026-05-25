export type MiracleSection = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export type MiracleCategory = { id: string; label: string }

export type MiracleTopic = {
    id: string
    title: string
    category: string
    excerpt: string
    readMinutes: number
    thumbnail: string
    videoUrl?: string
    quranRef?: string
    sections: MiracleSection[]
}

export const MIRACLES_EDITORIAL = {
    badge: "Islamic miracles",
    title: "Signs that strengthen faith",
    lead: "Miracles from the Quran, the prophets, and creation — explained simply, without hype.",
}

export const MIRACLES_CATEGORIES: MiracleCategory[] = [
    { id: "all", label: "All" },
    { id: "quran", label: "Quran" },
    { id: "prophets", label: "Prophets" },
    { id: "creation", label: "Creation" },
]

const section = (
    number: number,
    title: string,
    content: string,
    keyPoints: string[]
): MiracleSection => ({ number, title, content, keyPoints })

export const MIRACLES_TOPICS: MiracleTopic[] = [
    {
        id: "split-moon",
        title: "The splitting of the moon",
        category: "prophets",
        excerpt: "A sign shown to the Quraysh when they asked for proof.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1444703686981-a3edbc448375?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/2C8M7-hkiBc",
        quranRef: "Quran 54:1",
        sections: [
            section(1, "What happened", "The moon split into two parts as a sign. Companions saw it and later people reported the event.", ["Allah controls creation fully", "Signs invite reflection, not entertainment"]),
            section(2, "Faith response", "Believers saw proof of prophethood. Deniers made excuses. The lesson is honest hearts accept truth.", ["Do not mock signs", "Ask Allah for a sincere heart"]),
        ],
    },
    {
        id: "night-journey",
        title: "Al-Isra wal-Miʿraj",
        category: "prophets",
        excerpt: "The night journey from Makkah to Jerusalem and above the heavens.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/jn0f6f1R4tQ",
        quranRef: "Quran 17:1",
        sections: [
            section(1, "Isra — the earth journey", "The Prophet ﷺ traveled to Masjid al-Aqsa and led the prophets in prayer.", ["Leadership in worship unites the prophets", "Jerusalem has deep honor in Islam"]),
            section(2, "Miʿraj — the heavens", "He rose through the skies, met prophets, and received the five daily prayers.", ["Salah is a direct gift from Allah", "Time and space obey their Creator"]),
        ],
    },
    {
        id: "isa-birth",
        title: "The birth of ʿIsa (Jesus)",
        category: "prophets",
        excerpt: "Born without a father — a clear sign from Allah.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1519817915785-462f663f9f6e?w=800&q=80",
        quranRef: "Quran 19:16–21",
        sections: [
            section(1, "Maryam’s choice", "She devoted herself to Allah. Angels told her she would have a son by His command.", ["Chastity and trust in Allah", "Women of taqwa are honored in the Quran"]),
            section(2, "ʿIsa speaks", "Baby ʿIsa defended his mother from accusations. Creation without a father shows Allah’s power.", ["Do not confuse prophet with God", "Miracles point to the Creator"]),
        ],
    },
    {
        id: "musa-staff",
        title: "The staff of Musa",
        category: "prophets",
        excerpt: "A stick that became a snake before Pharaoh’s court.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        quranRef: "Quran 7:107",
        sections: [
            section(1, "Before Pharaoh", "Musa was told to throw his staff. It became a real snake, then returned to wood.", ["Truth beats stage magic", "Fear Allah more than tyrants"]),
            section(2, "Magicians submit", "When they saw real miracle, they fell in sujud. Pharaoh still chose arrogance.", ["Recognize truth quickly", "Pride blocks guidance"]),
        ],
    },
    {
        id: "quran-preservation",
        title: "Preservation of the Quran",
        category: "quran",
        excerpt: "The same words memorized and written for over 1,400 years.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1609599001995-17e2c321d92e?w=800&q=80",
        quranRef: "Quran 15:9",
        sections: [
            section(1, "Oral and written", "Companions memorized fully. Written copies were kept and cross-checked.", ["Millions still memorize today", "One Arabic text for the ummah"]),
            section(2, "Living miracle", "You can hear the same recitation worldwide. It is not hidden in a vault alone.", ["Recite daily", "Learn meaning step by step"]),
        ],
    },
    {
        id: "water-life",
        title: "Water and life",
        category: "creation",
        excerpt: "The Quran spoke about water before modern biology focused on it.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        quranRef: "Quran 21:30",
        sections: [
            section(1, "Revelation", "Allah says every living thing was made from water.", ["Gratitude for clean water", "Science can increase awe of Allah"]),
            section(2, "Balance", "We believe without needing labs. When facts align, faith grows — without worshipping science.", ["Stay humble", "Protect earth as amanah"]),
        ],
    },
    {
        id: "table-spread",
        title: "The table spread (Maʾidah)",
        category: "prophets",
        excerpt: "Food from heaven requested by the disciples of ʿIsa.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        quranRef: "Quran 5:112–115",
        sections: [
            section(1, "The request", "Disciples asked for a heavenly table to increase their certainty.", ["Ask Allah with respect", "Do not test Allah out of doubt"]),
            section(2, "Warning", "Allah warned of punishment if they disbelieved after seeing it. Miracles demand gratitude.", ["Thank Allah after every meal", "Share food with others"]),
        ],
    },
    {
        id: "bees",
        title: "Bees and honey",
        category: "creation",
        excerpt: "The Quran describes bees, homes, and healing honey.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
        quranRef: "Quran 16:68–69",
        sections: [
            section(1, "Inspired order", "Allah inspired the bee where to live and how to work.", ["Small creatures show great design", "Patience in teamwork"]),
            section(2, "Healing", "Honey has benefit for people. It reminds us to see blessings in nature.", ["Eat halal and wholesome", "Praise Allah for provision"]),
        ],
    },
]

export function getMiracleById(id: string): MiracleTopic | undefined {
    return MIRACLES_TOPICS.find((t) => t.id === id)
}
