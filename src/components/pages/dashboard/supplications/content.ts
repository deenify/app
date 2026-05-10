/** Supplications library — categories & catalog (extend with CMS/API). */

export type SupplicationCategoryId =
    | "all"
    | "morning-evening"
    | "salah"
    | "travel"
    | "distress"
    | "gratitude"
    | "family"

export type SupplicationItem = {
    id: string
    title: string
    excerpt: string
    arabic: string
    translation: string
    category: Exclude<SupplicationCategoryId, "all">
    reference?: string
    readSeconds: number
}

export const SUPPLICATION_CATEGORIES: { id: SupplicationCategoryId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "morning-evening", label: "Morning & evening" },
    { id: "salah", label: "Prayer" },
    { id: "travel", label: "Travel" },
    { id: "distress", label: "Distress & refuge" },
    { id: "gratitude", label: "Gratitude" },
    { id: "family", label: "Family & home" },
]

export const SUPPLICATIONS_MOCK: SupplicationItem[] = [
    {
        id: "sayyid-istighfar",
        title: "Sayyid al-istighfār",
        excerpt: "Comprehensive seeking of forgiveness; taught as immense in reward when said with conviction.",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...",
        translation:
            "O Allah, You are my Lord; there is no god but You. You created me and I am Your servant… (seeking forgiveness and affirming lordship).",
        category: "morning-evening",
        reference: "Bukhari · emphasis in teaching duʿāʾ",
        readSeconds: 55,
    },
    {
        id: "entering-masjid",
        title: "Entering the mosque",
        excerpt: "Stepping from the world into rows of salah— adab at the threshold.",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        translation: "O Allah, open for me the gates of Your mercy.",
        category: "salah",
        readSeconds: 12,
    },
    {
        id: "traveling",
        title: "Mounting travel",
        excerpt: "Placing reliance upon Allah when distance interrupts routine.",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
        translation:
            "Glory to Him who placed this at our service while we could not have mastered it ourselves…",
        category: "travel",
        reference: "Quranic phrasing · travel adab",
        readSeconds: 35,
    },
    {
        id: "distress-yunus",
        title: "Supplication of Yunus",
        excerpt: "The dua of darkness—recognized across traditions for urgency and sincerity.",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        translation: "There is no deity except You; glory be to You; indeed I was among the wrongdoers.",
        category: "distress",
        reference: "Quran (associative remembrance)",
        readSeconds: 18,
    },
    {
        id: "rizq-barakah",
        title: "Barakah in provision",
        excerpt: "Asking Allah to bless lawful earning without scattering the heart.",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِيمَا رَزَقْتَنِي",
        translation: "O Allah, bless me in what You have provided me.",
        category: "gratitude",
        readSeconds: 14,
    },
    {
        id: "parents",
        title: "Mercy for parents",
        excerpt: "Following the Quranic cadence of compassion after their labor.",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        translation: "My Lord, have mercy upon them as they raised me when I was small.",
        category: "family",
        reference: "Quran 17:24 tone",
        readSeconds: 16,
    },
    {
        id: "sleep",
        title: "Before sleep",
        excerpt: "Handing the night to Allah—short phrases that close loops of worry.",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        translation: "In Your name, O Allah, I die and I live (i.e., I submit my sleep and waking to You).",
        category: "morning-evening",
        readSeconds: 12,
    },
    {
        id: "wudu-admission",
        title: "After wuḍūʾ",
        excerpt: "Elevation through purification—many narrations encourage testimony after ablution.",
        arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ...",
        translation: "I bear witness there is no god but Allah alone… (complete formulas vary by narration).",
        category: "salah",
        readSeconds: 40,
    },
    {
        id: "rain",
        title: "Rain & seasons",
        excerpt: "Mercy descends—asking benefit without harm.",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        translation: "O Allah, (send) beneficial rain—many variant wordings exist.",
        category: "gratitude",
        readSeconds: 10,
    },
]
