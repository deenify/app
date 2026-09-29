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
    {
        id: "leaving-masjid",
        title: "Leaving the Mosque",
        excerpt: "A short dua when departing the house of Allah.",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        translation: "O Allah, I ask You from Your bounty.",
        category: "salah-ritual",
        tags: ["Prophetic"],
        reference: "Sahih Muslim",
        readSeconds: 10,
        image: IMAGES.hero,
    },
    {
        id: "before-sleep",
        title: "Before Sleep",
        excerpt: "Closing the day with remembrance and trust in Allah.",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        translation: "In Your name, O Allah, I die and I live.",
        category: "morning-evening",
        tags: ["Prophetic", "Night"],
        reference: "Sahih Bukhari",
        readSeconds: 12,
        image: IMAGES.design1,
    },
    {
        id: "waking-up",
        title: "Upon Waking",
        excerpt: "Gratitude for returning life after sleep.",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        translation: "All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.",
        category: "morning-evening",
        tags: ["Prophetic", "Morning"],
        reference: "Sahih Bukhari",
        readSeconds: 20,
        image: IMAGES.design2,
    },
    {
        id: "before-eating",
        title: "Before Eating",
        excerpt: "Begin meals with Allah's name for blessing.",
        arabic: "بِسْمِ اللَّهِ",
        translation: "In the name of Allah.",
        category: "gratitude-joy",
        tags: ["Prophetic"],
        reference: "Sahih Muslim",
        readSeconds: 5,
        image: IMAGES.hero,
    },
    {
        id: "after-eating",
        title: "After Eating",
        excerpt: "Thanking Allah for provision after a meal.",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        translation: "All praise is for Allah who fed us and gave us drink and made us Muslims.",
        category: "gratitude-joy",
        tags: ["Prophetic"],
        reference: "Sunan at-Tirmidhi",
        readSeconds: 18,
        image: IMAGES.design1,
    },
    {
        id: "leaving-home",
        title: "Leaving Home",
        excerpt: "Trusting Allah when stepping out into the world.",
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        translation: "In the name of Allah, I place my trust in Allah. There is no power and no strength except with Allah.",
        category: "travel-safety",
        tags: ["Prophetic", "Morning"],
        reference: "Sunan Abi Dawud",
        readSeconds: 22,
        image: IMAGES.design2,
    },
    {
        id: "entering-home",
        title: "Entering Home",
        excerpt: "A greeting of peace when returning to one's household.",
        arabic: "السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ",
        translation: "Peace be upon us and upon the righteous servants of Allah.",
        category: "family-home",
        tags: ["Prophetic"],
        reference: "Sahih Muslim",
        readSeconds: 14,
        image: IMAGES.hero,
    },
    {
        id: "istikhara",
        title: "Salat al-Istikhara",
        excerpt: "Seeking Allah's guidance when facing a decision.",
        arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ",
        translation: "O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power.",
        category: "knowledge-wisdom",
        tags: ["Prophetic", "Success"],
        reference: "Sahih Bukhari",
        readSeconds: 45,
        image: IMAGES.design1,
    },
    {
        id: "rain-dua",
        title: "When It Rains",
        excerpt: "Recognizing rain as Allah's mercy upon the land.",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        translation: "O Allah, make it a beneficial downpour.",
        category: "gratitude-joy",
        tags: ["Prophetic"],
        reference: "Sahih Bukhari",
        readSeconds: 10,
        image: IMAGES.design2,
    },
    {
        id: "laylatul-qadr",
        title: "Laylat al-Qadr",
        excerpt: "The prophetic supplication for the Night of Decree.",
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        translation: "O Allah, You are Pardoning and love pardon, so pardon me.",
        category: "forgiveness-tawbah",
        tags: ["Prophetic", "Night"],
        reference: "Sunan at-Tirmidhi",
        readSeconds: 16,
        image: IMAGES.hero,
    },
    {
        id: "breaking-fast",
        title: "Breaking the Fast",
        excerpt: "Words of the fasting person at iftar are not rejected.",
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        translation: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
        category: "recommended",
        tags: ["Prophetic"],
        reference: "Sunan Abi Dawud",
        readSeconds: 18,
        image: IMAGES.design1,
    },
    {
        id: "anxiety-chest",
        title: "Relief from Anxiety",
        excerpt: "A comprehensive dua for worry, grief, and helplessness.",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        translation: "O Allah, I seek refuge in You from worry and grief.",
        category: "anxiety-relief",
        tags: ["Prophetic", "Urgent"],
        reference: "Sahih Bukhari",
        readSeconds: 28,
        image: IMAGES.design2,
    },
    {
        id: "morning-remembrance",
        title: "Morning Remembrance",
        excerpt: "Opening the day with praise and seeking a good end.",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
        translation: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah.",
        category: "morning-evening",
        tags: ["Prophetic", "Morning"],
        reference: "Sahih Muslim",
        readSeconds: 24,
        image: IMAGES.hero,
    },
    {
        id: "evening-remembrance",
        title: "Evening Remembrance",
        excerpt: "Closing daylight with acknowledgment of Allah's dominion.",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
        translation: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah.",
        category: "morning-evening",
        tags: ["Prophetic", "Night"],
        reference: "Sahih Muslim",
        readSeconds: 24,
        image: IMAGES.design1,
    },
    {
        id: "new-muslim-guide",
        title: "For the New Muslim",
        excerpt: "A gentle prayer for steadfastness after embracing Islam.",
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        translation: "O Allah, help me to remember You, thank You, and worship You in the best manner.",
        category: "new-additions",
        tags: ["Prophetic", "Steadfastness"],
        reference: "Sunan an-Nasa'i",
        readSeconds: 20,
        image: IMAGES.design2,
    },
    {
        id: "deceased-parents",
        title: "For Deceased Parents",
        excerpt: "Seeking forgiveness and mercy for parents who have passed.",
        arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        translation: "Our Lord, forgive me and my parents and the believers the Day the account is established.",
        category: "family-home",
        tags: ["Quranic", "Children"],
        reference: "Surah Ibrahim 41",
        readSeconds: 22,
        image: IMAGES.hero,
    },
    {
        id: "looking-mirror",
        title: "Upon Seeing Yourself",
        excerpt: "Thanking Allah for creating you in the best form.",
        arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
        translation: "O Allah, as You have made my appearance beautiful, make my character beautiful.",
        category: "recommended",
        tags: ["Prophetic"],
        reference: "Musnad Ahmad",
        readSeconds: 16,
        image: IMAGES.design1,
    },
    {
        id: "entering-market",
        title: "Entering the Marketplace",
        excerpt: "A light remembrance that brings a million rewards.",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ",
        translation: "There is no god but Allah alone, without partner. His is the dominion and His is the praise. He gives life and causes death, and He is Ever-Living and does not die.",
        category: "popular-collections",
        tags: ["Prophetic", "Wealth"],
        reference: "Sunan at-Tirmidhi",
        readSeconds: 35,
        image: IMAGES.design2,
    },
    {
        id: "protection-morning",
        title: "Morning Protection",
        excerpt: "Three Quls recited for comprehensive divine shield.",
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        translation: "Say: He is Allah, the One... Say: I seek refuge in the Lord of daybreak... Say: I seek refuge in the Lord of mankind.",
        category: "protection-divine",
        tags: ["Quranic", "Morning"],
        reference: "Surahs 112–114",
        readSeconds: 40,
        image: IMAGES.hero,
    },
    {
        id: "tahajjud-opening",
        title: "Opening Night Prayer",
        excerpt: "Praising Allah before standing in voluntary night prayer.",
        arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ",
        translation: "O Allah, to You belongs all praise. You are the Maintainer of the heavens and the earth.",
        category: "salah-ritual",
        tags: ["Prophetic", "Night"],
        reference: "Sahih Bukhari",
        readSeconds: 20,
        image: IMAGES.design1,
    },
    {
        id: "seeking-forgiveness",
        title: "Constant Istighfar",
        excerpt: "The Prophet ﷺ sought forgiveness more than seventy times daily.",
        arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        translation: "I seek forgiveness from Allah and repent to Him.",
        category: "forgiveness-tawbah",
        tags: ["Prophetic"],
        reference: "Sahih Bukhari",
        readSeconds: 8,
        image: IMAGES.design2,
    },
    {
        id: "children-protection",
        title: "Protection for Children",
        excerpt: "The prophetic words Ibrahim used for Ismail and Ishaq.",
        arabic: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
        translation: "I seek protection for you in the perfect words of Allah from every devil and poisonous creature, and from every evil eye.",
        category: "family-home",
        tags: ["Prophetic", "Children"],
        reference: "Sahih Bukhari",
        readSeconds: 30,
        image: IMAGES.hero,
    },
    {
        id: "gratitude-blessings",
        title: "Gratitude for Blessings",
        excerpt: "Acknowledging that all favor comes from Allah alone.",
        arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
        translation: "O Allah, whatever blessing I have received this morning is from You alone, without partner. So to You belongs praise and thanks.",
        category: "gratitude-joy",
        tags: ["Prophetic", "Morning"],
        reference: "Sunan Abi Dawud",
        readSeconds: 26,
        image: IMAGES.design1,
    },
]
