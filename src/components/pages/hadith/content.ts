/** Mock data for Hadith explore — structure mirrors real collections for future API wiring. */

export type HadithCollectionType = {
    id: string
    nameEnglish: string
    nameArabic: string
    hadithCount: number
    compiler: string
    /** Display-only engagement label (e.g. from API later) */
    likesLabel: string
}

export const HadithCollections: HadithCollectionType[] = [
    {
        id: "sahih-bukhari",
        nameEnglish: "Sahih al-Bukhari",
        nameArabic: "صحيح البخاري",
        hadithCount: 7563,
        compiler: "Imam al-Bukhari",
        likesLabel: "18k",
    },
    {
        id: "sahih-muslim",
        nameEnglish: "Sahih Muslim",
        nameArabic: "صحيح مسلم",
        hadithCount: 7563,
        compiler: "Imam Muslim",
        likesLabel: "15k",
    },
    {
        id: "sunan-abu-dawud",
        nameEnglish: "Sunan Abu Dawud",
        nameArabic: "سنن أبي داود",
        hadithCount: 5274,
        compiler: "Abu Dawud al-Sijistani",
        likesLabel: "9.2k",
    },
    {
        id: "sunan-tirmidhi",
        nameEnglish: "Jami` at-Tirmidhi",
        nameArabic: "جامع الترمذي",
        hadithCount: 3956,
        compiler: "Imam at-Tirmidhi",
        likesLabel: "13k",
    },
    {
        id: "sunan-nasai",
        nameEnglish: "Sunan an-Nasa'i",
        nameArabic: "سنن النسائي",
        hadithCount: 5762,
        compiler: "Imam an-Nasa'i",
        likesLabel: "11k",
    },
    {
        id: "sunan-ibn-majah",
        nameEnglish: "Sunan Ibn Majah",
        nameArabic: "سنن ابن ماجه",
        hadithCount: 4341,
        compiler: "Ibn Majah",
        likesLabel: "7.8k",
    },
]

export type HadithTopicType = {
    id: string
    label: string
    hadithCount: number
    /** Short collection names for chip row (which books feature this theme most) */
    sourceBooks: string[]
    /** One-line context for the card */
    blurb: string
}

export const HadithTopics: HadithTopicType[] = [
    {
        id: "faith",
        label: "Faith & belief",
        hadithCount: 420,
        sourceBooks: ["Bukhari", "Muslim", "Tirmidhi", "Nasai"],
        blurb: "Aqeedah, sincerity, and pillars of Islam.",
    },
    {
        id: "prayer",
        label: "Prayer & purification",
        hadithCount: 890,
        sourceBooks: ["Bukhari", "Muslim", "Abu Dawud", "Nasai"],
        blurb: "Salah, wudu, mosques, and congregation.",
    },
    {
        id: "fasting",
        label: "Fasting",
        hadithCount: 310,
        sourceBooks: ["Bukhari", "Muslim", "Tirmidhi", "Ibn Majah"],
        blurb: "Ramadan, voluntary fasts, and rulings.",
    },
    {
        id: "zakat",
        label: "Zakat & charity",
        hadithCount: 240,
        sourceBooks: ["Bukhari", "Muslim", "Abu Dawud", "Nasai"],
        blurb: "Due wealth, sadaqah, and stewardship.",
    },
    {
        id: "hajj",
        label: "Hajj & Umrah",
        hadithCount: 280,
        sourceBooks: ["Bukhari", "Muslim", "Nasai", "Ibn Majah"],
        blurb: "Rites, ihram, and sacred months.",
    },
    {
        id: "transactions",
        label: "Transactions & ethics",
        hadithCount: 560,
        sourceBooks: ["Bukhari", "Muslim", "Abu Dawud", "Tirmidhi"],
        blurb: "Trade, contracts, honesty, and neighbours.",
    },
    {
        id: "family",
        label: "Family & manners",
        hadithCount: 480,
        sourceBooks: ["Bukhari", "Muslim", "Tirmidhi", "Nasai"],
        blurb: "Marriage, children, adab, and kinship.",
    },
    {
        id: "dua",
        label: "Supplication",
        hadithCount: 190,
        sourceBooks: ["Tirmidhi", "Abu Dawud", "Nasai", "Ibn Majah"],
        blurb: "Morning & evening, Qunoot, and remembrance.",
    },
]

export type HadithSavedItemType = {
    id: string
    collectionId: string
    collectionName: string
    collectionNameArabic: string
    /** Chapter / kitab title in English */
    titleEnglish: string
    /** Chapter / kitab title in Arabic */
    titleArabic: string
    /** Kitab index in the collection */
    bookNumber: number
    /** Bab / chapter index within the book */
    chapterNumber: number
    /** Hadith number in the printed book (collection-wide numbering) */
    hadithInBook: number
    /** Hadith order within this chapter / bab */
    hadithInChapter: number
    snippet: string
    savedAt: string
}

export const MockHadithSaved: HadithSavedItemType[] = [
    {
        id: "1",
        collectionId: "sahih-bukhari",
        collectionName: "Sahih al-Bukhari",
        collectionNameArabic: "صحيح البخاري",
        titleEnglish: "How the Divine Inspiration was revealed",
        titleArabic: "كَيْفَ كَانَ بَدْءُ الْوَحْيِ إِلَى رَسُولِ اللَّهِ",
        bookNumber: 1,
        chapterNumber: 1,
        hadithInBook: 1,
        hadithInChapter: 1,
        snippet: "The commencement of the Divine Inspiration to Allah's Messenger was in the form of good dreams…",
        savedAt: new Date().toISOString(),
    },
    {
        id: "2",
        collectionId: "sahih-muslim",
        collectionName: "Sahih Muslim",
        collectionNameArabic: "صحيح مسلم",
        titleEnglish: "The Book of Faith",
        titleArabic: "كتاب الإيمان",
        bookNumber: 1,
        chapterNumber: 3,
        hadithInBook: 45,
        hadithInChapter: 2,
        snippet: "It is narrated on the authority of Umar that the Messenger of Allah said: Actions are judged by intentions…",
        savedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
]

export const TOTAL_HADITH_COUNT_DISPLAY = "~20k+"

/** Scholarly grading for UI + filters (extend as your API provides). */
export type HadithAuthenticityGrade = "sahih" | "hasan" | "daif" | "munkar" | "unknown"

/** Mock narrations for collection detail — replace with API response shape later. */
export type MockHadithNarrationType = {
    id: string
    /** In-book reference label (e.g. Book 1, Hadith 1) */
    reference: {
        book: number
        chapter: number
        hadithNumber: number
        hadithInChapter: number
    }
    /** Global or collection catalog number (displayed in margin) */
    catalogNumber: number
    /** Thematic tags (first 1–2 shown as chips; overflow as +N) */
    topics: string[]
    narrator: string
    arabic: string
    english: string
    /** Hadith authenticity / grading */
    authenticityGrade: HadithAuthenticityGrade
    /** Optional scholarly note (chain weakness, idtirab, etc.) — API later */
    chainNote?: string
}

const MOCK_HADITH_SEED: MockHadithNarrationType[] = [
    {
        id: "m1",
        reference: {
            book: 1,
            chapter: 1,
            hadithNumber: 1,
            hadithInChapter: 1,
        },
        catalogNumber: 1,
        topics: ["Faith", "Intentions", "Actions", "Reward"],
        narrator: "Umar ibn al-Khattab",
        arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
        english: "Actions are judged by intentions, and every person will get what they intended.",
        authenticityGrade: "sahih",
    },
    {
        id: "m2",
        reference: {
            book: 1,
            chapter: 1,
            hadithNumber: 2,
            hadithInChapter: 2,
        },
        catalogNumber: 97,
        topics: ["Innovation", "Sunnah"],
        narrator: "Aisha",
        arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
        english: "Whoever introduces into this matter of ours what is not from it, it is rejected.",
        authenticityGrade: "hasan",
    },
    {
        id: "m3",
        reference: {
            book: 1,
            chapter: 1,
            hadithNumber: 3,
            hadithInChapter: 3,
        },
        catalogNumber: 205,
        topics: ["Halal & Haram", "Knowledge"],
        narrator: "Abdullah ibn Umar",
        arabic: "الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ",
        english: "The lawful is clear and the unlawful is clear, and between them are doubtful matters.",
        authenticityGrade: "sahih",
        chainNote: "Muttafaqun ‘alayh in this wording — chain continuous to the Companion.",
    },
    {
        id: "m4",
        reference: {
            book: 1,
            chapter: 1,
            hadithNumber: 4,
            hadithInChapter: 4,
        },
        catalogNumber: 6502,
        topics: ["Manners", "Speech", "Faith"],
        narrator: "Abu Hurayrah",
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا",
        english: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
        authenticityGrade: "daif",
        chainNote: "Some scholars grade this as weak due to a disputed narrator in one link — verify with your madhhab.",
    },
    {
        id: "m5",
        reference: {
            book: 1,
            chapter: 1,
            hadithNumber: 5,
            hadithInChapter: 5,
        },
        catalogNumber: 7042,
        topics: ["Brotherhood", "Iman"],
        narrator: "Anas ibn Malik",
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        english: "None of you truly believes until he loves for his brother what he loves for himself.",
        authenticityGrade: "sahih",
    },
]

/** Same seed list per collection until API provides real chapters/hadiths. */
export function getMockHadithsForCollection(_collectionId: string): MockHadithNarrationType[] {
    return MOCK_HADITH_SEED
}
