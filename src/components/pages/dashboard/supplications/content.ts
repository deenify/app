/** Supplications library — categories & catalog (extend with CMS/API). */

export type SupplicationCategoryId =
    | "all"
    | "morning-evening"
    | "salah-ritual"
    | "travel-safety"
    | "anxiety-relief"
    | "gratitude-joy"
    | "family-home"
    | "protection-divine"
    | "healing-shifa"
    | "knowledge-wisdom"
    | "forgiveness-tawbah"
    | "recommended"
    | "new-additions"
    | "popular-collections"
    | "featured-collections"
    | "trending-collections"
    | "latest-collections"
    | "oldest-collections"
    | "random-collections"
    | "alphabetical-collections"

export type SupplicationTag =
    | "Prophetic"
    | "Quranic"
    | "Urgent"
    | "Patience"
    | "Night"
    | "Morning"
    | "Wealth"
    | "Health"
    | "Children"
    | "Steadfastness"
    | "Success"

export type SupplicationItem = {
    id: string
    title: string
    excerpt: string
    arabic: string
    translation: string
    category: Exclude<SupplicationCategoryId, "all">
    tags: SupplicationTag[]
    reference?: string
    readSeconds: number
    image: string
}

export const SUPPLICATION_CATEGORIES: { id: SupplicationCategoryId; label: string }[] = [
    { id: "all", label: "All Collections" },
    { id: "morning-evening", label: "Morning & Evening" },
    { id: "salah-ritual", label: "Salah & Rituals" },
    { id: "travel-safety", label: "Travel & Safety" },
    { id: "anxiety-relief", label: "Anxiety & Relief" },
    { id: "gratitude-joy", label: "Gratitude & Joy" },
    { id: "family-home", label: "Family & Home" },
    { id: "protection-divine", label: "Divine Protection" },
    { id: "healing-shifa", label: "Healing (Shifa)" },
    { id: "knowledge-wisdom", label: "Knowledge & Wisdom" },
    { id: "forgiveness-tawbah", label: "Forgiveness (Tawbah)" },
    { id: "recommended", label: "Recommended" },
    { id: "new-additions", label: "New Additions" },
]

const IMAGES = {
    design1: "/images/designs/original-951106d2a573176f8a302e4e000314ce.webp",
    design2: "/images/designs/original-bf9bb17199c8e197482b1edd7e5654f7.webp",
    hero: "/images/pages/prayer/presense-hero-background.avif",
}

export type SupplicationDetailSection = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export function getCategoryLabel(categoryId: SupplicationCategoryId): string {
    return SUPPLICATION_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId
}

export function getSupplicationById(id: string): SupplicationItem | undefined {
    return SUPPLICATIONS_MOCK.find((item) => item.id === id)
}

export function getRelatedSupplications(id: string, limit = 3): SupplicationItem[] {
    const current = getSupplicationById(id)
    if (!current) return SUPPLICATIONS_MOCK.slice(0, limit)
    return SUPPLICATIONS_MOCK.filter(
        (item) => item.id !== id && (item.category === current.category || item.tags.some((t) => current.tags.includes(t)))
    ).slice(0, limit)
}

export function getSupplicationDetailSections(item: SupplicationItem): SupplicationDetailSection[] {
    const whenPoints = item.tags.includes("Morning")
        ? ["After Fajr before leaving home", "When starting your daily routine"]
        : item.tags.includes("Night")
            ? ["After Isha before sleep", "During quiet reflection at night"]
            : ["When the need arises with presence of heart", "After salah for deeper connection"]

    return [
        {
            number: 1,
            title: "Meaning & context",
            content: `${item.excerpt} This supplication is preserved in authentic Islamic tradition and is recited with sincerity, knowing that Allah hears every whisper of the heart.`,
            keyPoints: [
                item.reference ? `Source: ${item.reference}` : "Prophetic or Quranic tradition",
                `Category: ${getCategoryLabel(item.category)}`,
            ],
        },
        {
            number: 2,
            title: "When to recite",
            content: "Scholars encourage consistency over quantity. Repeat with understanding, pause between phrases, and let the words settle in the heart before rushing to the next task.",
            keyPoints: whenPoints,
        },
        {
            number: 3,
            title: "Spiritual benefit",
            content: "Regular remembrance softens the heart, anchors gratitude, and turns ordinary moments into acts of worship when recited with presence (khushūʿ).",
            keyPoints: [
                "Strengthens reliance upon Allah (tawakkul)",
                "Brings calm during anxiety and difficulty",
                "Connects daily life to prophetic cadence",
            ],
        },
    ]
}

export const SUPPLICATIONS_MOCK: SupplicationItem[] = [
    {
        id: "sayyid-istighfar",
        title: "Sayyid al-Istighfār",
        excerpt: "The master of seeking forgiveness, acknowledged as the most superior form of repentance.",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        translation:
            "O Allah, You are my Lord; there is no god but You. You created me and I am Your servant, and I am faithful to Your covenant and Your promise as much as I am able. I seek refuge with You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for no one forgives sins except You.",
        category: "forgiveness-tawbah",
        tags: ["Prophetic", "Morning", "Night"],
        reference: "Sahih Bukhari",
        readSeconds: 55,
        image: IMAGES.design1,
    },
    {
        id: "entering-masjid",
        title: "Entering the Mosque",
        excerpt: "A plea for divine mercy when entering the house of Allah.",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        translation: "O Allah, open for me the gates of Your mercy.",
        category: "salah-ritual",
        tags: ["Prophetic"],
        reference: "Sahih Muslim",
        readSeconds: 12,
        image: IMAGES.hero,
    },
    {
        id: "traveling",
        title: "Prayer for Travel",
        excerpt: "Seeking protection and ease during a journey, acknowledging Allah's control over all things.",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        translation:
            "Glory to Him who has brought this under our control, though we could not have done it by ourselves. And indeed, to our Lord we will surely return.",
        category: "travel-safety",
        tags: ["Quranic", "Patience"],
        reference: "Surah Az-Zukhruf 13-14",
        readSeconds: 35,
        image: IMAGES.design2,
    },
    {
        id: "distress-yunus",
        title: "Dua of Yunus (AS)",
        excerpt: "The powerful supplication made by Prophet Yunus from within the belly of the whale.",
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        translation: "There is no deity except You; glory be to You; indeed I was among the wrongdoers.",
        category: "anxiety-relief",
        tags: ["Quranic", "Urgent", "Prophetic"],
        reference: "Surah Al-Anbiya 87",
        readSeconds: 18,
        image: IMAGES.design1,
    },
    {
        id: "rizq-barakah",
        title: "Barakah in Provision",
        excerpt: "A short but comprehensive ask for blessing in what one has been given.",
        arabic: "اللَّهُمَّ بَارِكْ لِي فِيمَا رَزَقْتَنِي",
        translation: "O Allah, bless me in what You have provided me.",
        category: "gratitude-joy",
        tags: ["Prophetic", "Wealth"],
        readSeconds: 14,
        image: IMAGES.hero,
    },
    {
        id: "parents",
        title: "Mercy for Parents",
        excerpt: "A Quranic command and prayer to seek mercy for those who raised us.",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        translation: "My Lord, have mercy upon them as they raised me when I was small.",
        category: "family-home",
        tags: ["Quranic", "Children"],
        reference: "Surah Al-Isra 24",
        readSeconds: 16,
        image: IMAGES.design2,
    },
    {
        id: "protection-evil",
        title: "Protection from All Evil",
        excerpt: "Seeking comprehensive safety from known and unknown harms.",
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْء فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        translation: "In the name of Allah, with whose name nothing in the earth or the sky can cause harm, and He is the All-Hearing, the All-Knowing.",
        category: "protection-divine",
        tags: ["Prophetic", "Morning"],
        reference: "Sunan Abi Dawud",
        readSeconds: 25,
        image: IMAGES.hero,
    },
    {
        id: "healing-shifa",
        title: "Dua for the Sick",
        excerpt: "The Prophet's (SAW) prayer for relief and complete recovery.",
        arabic: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
        translation: "Remove the hardship, O Lord of mankind, and grant healing, for You are the Healer. There is no healing but Your healing, a healing that leaves no trace of illness.",
        category: "healing-shifa",
        tags: ["Prophetic", "Health"],
        reference: "Sahih Bukhari",
        readSeconds: 30,
        image: IMAGES.design2,
    },
    {
        id: "knowledge",
        title: "Increase in Knowledge",
        excerpt: "The fundamental ask for intellectual and spiritual growth.",
        arabic: "رَّبِّ زِدْنِي عِلْمًا",
        translation: "My Lord, increase me in knowledge.",
        category: "knowledge-wisdom",
        tags: ["Quranic", "Success"],
        reference: "Surah Ta-Ha 114",
        readSeconds: 8,
        image: IMAGES.design1,
    },
    {
        id: "steadfastness",
        title: "Firmness of Heart",
        excerpt: "Asking for spiritual stability in changing times.",
        arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        translation: "O Turner of the hearts, make my heart firm upon Your religion.",
        category: "anxiety-relief",
        tags: ["Prophetic", "Steadfastness"],
        reference: "Sunan at-Tirmidhi",
        readSeconds: 15,
        image: IMAGES.design2,
    },
]
