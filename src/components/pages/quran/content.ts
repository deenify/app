import {
    BookOpen,
    Bookmark,
    Headphones,
    Languages,
    BookMarked,
    LucideIcon,
} from "lucide-react"

// Hero
export type QuranHeroStatType = {
    value: string
    label: string
}
export const QuranHeroStats: QuranHeroStatType[] = [
    { value: "114", label: "Surahs" },
    { value: "6,236", label: "Verses" },
    { value: "30", label: "Juz" },
    { value: "7", label: "Manzil" },
]

// Quick access
export type QuranQuickAccessType = {
    icon: LucideIcon
    title: string
    desc: string
    bgColor: string
    iconColor: string
    href: string
}
export const QuranQuickAccess: QuranQuickAccessType[] = [
    {
        icon: BookOpen,
        title: "Continue Reading",
        desc: "Al-Baqarah, Verse 255",
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
        href: "/quran/2/255",
    },
    {
        icon: Bookmark,
        title: "Bookmarks",
        desc: "12 saved verses",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        href: "/quran/bookmarks",
    },
    {
        icon: BookMarked,
        title: "Last Read",
        desc: "Surah Al-Fatiha",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        href: "/quran/1",
    },
]

// Features
export type QuranFeatureType = {
    icon: LucideIcon
    title: string
    description: string
}
export const QuranFeatures: QuranFeatureType[] = [
    {
        icon: Languages,
        title: "Multiple Translations",
        description: "Read the Quran in your preferred language with verified translations.",
    },
    {
        icon: Headphones,
        title: "Audio Recitation",
        description: "Listen to beautiful recitations by renowned Qaris from around the world.",
    },
    {
        icon: Bookmark,
        title: "Bookmarks & Notes",
        description: "Save verses and add personal notes to enhance your study.",
    },
]

// Surah list (114 surahs)
export type QuranSurahType = {
    number: number
    nameArabic: string
    nameEnglish: string
    verses: number
    revelation: "Meccan" | "Medinan"
}
export const QuranSurahs: QuranSurahType[] = [
    { number: 1, nameArabic: "الفاتحة", nameEnglish: "Al-Fatiha", verses: 7, revelation: "Meccan" },
    { number: 2, nameArabic: "البقرة", nameEnglish: "Al-Baqarah", verses: 286, revelation: "Medinan" },
    { number: 3, nameArabic: "آل عمران", nameEnglish: "Aali Imran", verses: 200, revelation: "Medinan" },
    { number: 4, nameArabic: "النساء", nameEnglish: "An-Nisa", verses: 176, revelation: "Medinan" },
    { number: 5, nameArabic: "المائدة", nameEnglish: "Al-Ma'idah", verses: 120, revelation: "Medinan" },
    { number: 6, nameArabic: "الأنعام", nameEnglish: "Al-An'am", verses: 165, revelation: "Meccan" },
    { number: 7, nameArabic: "الأعراف", nameEnglish: "Al-A'raf", verses: 206, revelation: "Meccan" },
    { number: 8, nameArabic: "الأنفال", nameEnglish: "Al-Anfal", verses: 75, revelation: "Medinan" },
    { number: 9, nameArabic: "التوبة", nameEnglish: "At-Tawbah", verses: 129, revelation: "Medinan" },
    { number: 10, nameArabic: "يونس", nameEnglish: "Yunus", verses: 109, revelation: "Meccan" },
    { number: 11, nameArabic: "هود", nameEnglish: "Hud", verses: 123, revelation: "Meccan" },
    { number: 12, nameArabic: "يوسف", nameEnglish: "Yusuf", verses: 111, revelation: "Meccan" },
    { number: 13, nameArabic: "الرعد", nameEnglish: "Ar-Ra'd", verses: 43, revelation: "Medinan" },
    { number: 14, nameArabic: "إبراهيم", nameEnglish: "Ibrahim", verses: 52, revelation: "Meccan" },
    { number: 15, nameArabic: "الحجر", nameEnglish: "Al-Hijr", verses: 99, revelation: "Meccan" },
    { number: 16, nameArabic: "النحل", nameEnglish: "An-Nahl", verses: 128, revelation: "Meccan" },
    { number: 17, nameArabic: "الإسراء", nameEnglish: "Al-Isra", verses: 111, revelation: "Meccan" },
    { number: 18, nameArabic: "الكهف", nameEnglish: "Al-Kahf", verses: 110, revelation: "Meccan" },
    { number: 19, nameArabic: "مريم", nameEnglish: "Maryam", verses: 98, revelation: "Meccan" },
    { number: 20, nameArabic: "طه", nameEnglish: "Taha", verses: 135, revelation: "Meccan" },
    { number: 21, nameArabic: "الأنبياء", nameEnglish: "Al-Anbiya", verses: 112, revelation: "Meccan" },
    { number: 22, nameArabic: "الحج", nameEnglish: "Al-Hajj", verses: 78, revelation: "Medinan" },
    { number: 23, nameArabic: "المؤمنون", nameEnglish: "Al-Mu'minun", verses: 118, revelation: "Meccan" },
    { number: 24, nameArabic: "النور", nameEnglish: "An-Nur", verses: 64, revelation: "Medinan" },
    { number: 25, nameArabic: "الفرقان", nameEnglish: "Al-Furqan", verses: 77, revelation: "Meccan" },
    { number: 26, nameArabic: "الشعراء", nameEnglish: "Ash-Shu'ara", verses: 227, revelation: "Meccan" },
    { number: 27, nameArabic: "النمل", nameEnglish: "An-Naml", verses: 93, revelation: "Meccan" },
    { number: 28, nameArabic: "القصص", nameEnglish: "Al-Qasas", verses: 88, revelation: "Meccan" },
    { number: 29, nameArabic: "العنكبوت", nameEnglish: "Al-Ankabut", verses: 69, revelation: "Meccan" },
    { number: 30, nameArabic: "الروم", nameEnglish: "Ar-Rum", verses: 60, revelation: "Meccan" },
    { number: 31, nameArabic: "لقمان", nameEnglish: "Luqman", verses: 34, revelation: "Meccan" },
    { number: 32, nameArabic: "السجدة", nameEnglish: "As-Sajdah", verses: 30, revelation: "Meccan" },
    { number: 33, nameArabic: "الأحزاب", nameEnglish: "Al-Ahzab", verses: 73, revelation: "Medinan" },
    { number: 34, nameArabic: "سبأ", nameEnglish: "Saba", verses: 54, revelation: "Meccan" },
    { number: 35, nameArabic: "فاطر", nameEnglish: "Fatir", verses: 45, revelation: "Meccan" },
    { number: 36, nameArabic: "يس", nameEnglish: "Ya-Sin", verses: 83, revelation: "Meccan" },
    { number: 37, nameArabic: "الصافات", nameEnglish: "As-Saffat", verses: 182, revelation: "Meccan" },
    { number: 38, nameArabic: "ص", nameEnglish: "Sad", verses: 88, revelation: "Meccan" },
    { number: 39, nameArabic: "الزمر", nameEnglish: "Az-Zumar", verses: 75, revelation: "Meccan" },
    { number: 40, nameArabic: "غافر", nameEnglish: "Ghafir", verses: 85, revelation: "Meccan" },
    { number: 41, nameArabic: "فصلت", nameEnglish: "Fussilat", verses: 54, revelation: "Meccan" },
    { number: 42, nameArabic: "الشورى", nameEnglish: "Ash-Shura", verses: 53, revelation: "Meccan" },
    { number: 43, nameArabic: "الزخرف", nameEnglish: "Az-Zukhruf", verses: 89, revelation: "Meccan" },
    { number: 44, nameArabic: "الدخان", nameEnglish: "Ad-Dukhan", verses: 59, revelation: "Meccan" },
    { number: 45, nameArabic: "الجاثية", nameEnglish: "Al-Jathiyah", verses: 37, revelation: "Meccan" },
    { number: 46, nameArabic: "الأحقاف", nameEnglish: "Al-Ahqaf", verses: 35, revelation: "Meccan" },
    { number: 47, nameArabic: "محمد", nameEnglish: "Muhammad", verses: 38, revelation: "Medinan" },
    { number: 48, nameArabic: "الفتح", nameEnglish: "Al-Fath", verses: 29, revelation: "Medinan" },
    { number: 49, nameArabic: "الحجرات", nameEnglish: "Al-Hujurat", verses: 18, revelation: "Medinan" },
    { number: 50, nameArabic: "ق", nameEnglish: "Qaf", verses: 45, revelation: "Meccan" },
    { number: 51, nameArabic: "الذاريات", nameEnglish: "Adh-Dhariyat", verses: 60, revelation: "Meccan" },
    { number: 52, nameArabic: "الطور", nameEnglish: "At-Tur", verses: 49, revelation: "Meccan" },
    { number: 53, nameArabic: "النجم", nameEnglish: "An-Najm", verses: 62, revelation: "Meccan" },
    { number: 54, nameArabic: "القمر", nameEnglish: "Al-Qamar", verses: 55, revelation: "Meccan" },
    { number: 55, nameArabic: "الرحمن", nameEnglish: "Ar-Rahman", verses: 78, revelation: "Medinan" },
    { number: 56, nameArabic: "الواقعة", nameEnglish: "Al-Waqi'ah", verses: 96, revelation: "Meccan" },
    { number: 57, nameArabic: "الحديد", nameEnglish: "Al-Hadid", verses: 29, revelation: "Medinan" },
    { number: 58, nameArabic: "المجادلة", nameEnglish: "Al-Mujadila", verses: 22, revelation: "Medinan" },
    { number: 59, nameArabic: "الحشر", nameEnglish: "Al-Hashr", verses: 24, revelation: "Medinan" },
    { number: 60, nameArabic: "الممتحنة", nameEnglish: "Al-Mumtahanah", verses: 13, revelation: "Medinan" },
    { number: 61, nameArabic: "الصف", nameEnglish: "As-Saf", verses: 14, revelation: "Medinan" },
    { number: 62, nameArabic: "الجمعة", nameEnglish: "Al-Jumu'ah", verses: 11, revelation: "Medinan" },
    { number: 63, nameArabic: "المنافقون", nameEnglish: "Al-Munafiqun", verses: 11, revelation: "Medinan" },
    { number: 64, nameArabic: "التغابن", nameEnglish: "At-Taghabun", verses: 18, revelation: "Medinan" },
    { number: 65, nameArabic: "الطلاق", nameEnglish: "At-Talaq", verses: 12, revelation: "Medinan" },
    { number: 66, nameArabic: "التحريم", nameEnglish: "At-Tahrim", verses: 12, revelation: "Medinan" },
    { number: 67, nameArabic: "الملك", nameEnglish: "Al-Mulk", verses: 30, revelation: "Meccan" },
    { number: 68, nameArabic: "القلم", nameEnglish: "Al-Qalam", verses: 52, revelation: "Meccan" },
    { number: 69, nameArabic: "الحاقة", nameEnglish: "Al-Haqqah", verses: 52, revelation: "Meccan" },
    { number: 70, nameArabic: "المعارج", nameEnglish: "Al-Ma'arij", verses: 44, revelation: "Meccan" },
    { number: 71, nameArabic: "نوح", nameEnglish: "Nuh", verses: 28, revelation: "Meccan" },
    { number: 72, nameArabic: "الجن", nameEnglish: "Al-Jinn", verses: 28, revelation: "Meccan" },
    { number: 73, nameArabic: "المزمل", nameEnglish: "Al-Muzzammil", verses: 20, revelation: "Meccan" },
    { number: 74, nameArabic: "المدثر", nameEnglish: "Al-Muddaththir", verses: 56, revelation: "Meccan" },
    { number: 75, nameArabic: "القيامة", nameEnglish: "Al-Qiyamah", verses: 40, revelation: "Meccan" },
    { number: 76, nameArabic: "الإنسان", nameEnglish: "Al-Insan", verses: 31, revelation: "Medinan" },
    { number: 77, nameArabic: "المرسلات", nameEnglish: "Al-Mursalat", verses: 50, revelation: "Meccan" },
    { number: 78, nameArabic: "النبأ", nameEnglish: "An-Naba", verses: 40, revelation: "Meccan" },
    { number: 79, nameArabic: "النازعات", nameEnglish: "An-Nazi'at", verses: 46, revelation: "Meccan" },
    { number: 80, nameArabic: "عبس", nameEnglish: "Abasa", verses: 42, revelation: "Meccan" },
    { number: 81, nameArabic: "التكوير", nameEnglish: "At-Takwir", verses: 29, revelation: "Meccan" },
    { number: 82, nameArabic: "الانفطار", nameEnglish: "Al-Infitar", verses: 19, revelation: "Meccan" },
    { number: 83, nameArabic: "المطففين", nameEnglish: "Al-Mutaffifin", verses: 36, revelation: "Meccan" },
    { number: 84, nameArabic: "الانشقاق", nameEnglish: "Al-Inshiqaq", verses: 25, revelation: "Meccan" },
    { number: 85, nameArabic: "البروج", nameEnglish: "Al-Buruj", verses: 22, revelation: "Meccan" },
    { number: 86, nameArabic: "الطارق", nameEnglish: "At-Tariq", verses: 17, revelation: "Meccan" },
    { number: 87, nameArabic: "الأعلى", nameEnglish: "Al-A'la", verses: 19, revelation: "Meccan" },
    { number: 88, nameArabic: "الغاشية", nameEnglish: "Al-Ghashiyah", verses: 26, revelation: "Meccan" },
    { number: 89, nameArabic: "الفجر", nameEnglish: "Al-Fajr", verses: 30, revelation: "Meccan" },
    { number: 90, nameArabic: "البلد", nameEnglish: "Al-Balad", verses: 20, revelation: "Meccan" },
    { number: 91, nameArabic: "الشمس", nameEnglish: "Ash-Shams", verses: 15, revelation: "Meccan" },
    { number: 92, nameArabic: "الليل", nameEnglish: "Al-Layl", verses: 21, revelation: "Meccan" },
    { number: 93, nameArabic: "الضحى", nameEnglish: "Ad-Duha", verses: 11, revelation: "Meccan" },
    { number: 94, nameArabic: "الشرح", nameEnglish: "Ash-Sharh", verses: 8, revelation: "Meccan" },
    { number: 95, nameArabic: "التين", nameEnglish: "At-Tin", verses: 8, revelation: "Meccan" },
    { number: 96, nameArabic: "العلق", nameEnglish: "Al-Alaq", verses: 19, revelation: "Meccan" },
    { number: 97, nameArabic: "القدر", nameEnglish: "Al-Qadr", verses: 5, revelation: "Meccan" },
    { number: 98, nameArabic: "البينة", nameEnglish: "Al-Bayyinah", verses: 8, revelation: "Medinan" },
    { number: 99, nameArabic: "الزلزلة", nameEnglish: "Az-Zalzalah", verses: 8, revelation: "Medinan" },
    { number: 100, nameArabic: "العاديات", nameEnglish: "Al-Adiyat", verses: 11, revelation: "Meccan" },
    { number: 101, nameArabic: "القارعة", nameEnglish: "Al-Qari'ah", verses: 11, revelation: "Meccan" },
    { number: 102, nameArabic: "التكاثر", nameEnglish: "At-Takathur", verses: 8, revelation: "Meccan" },
    { number: 103, nameArabic: "العصر", nameEnglish: "Al-Asr", verses: 3, revelation: "Meccan" },
    { number: 104, nameArabic: "الهمزة", nameEnglish: "Al-Humazah", verses: 9, revelation: "Meccan" },
    { number: 105, nameArabic: "الفيل", nameEnglish: "Al-Fil", verses: 5, revelation: "Meccan" },
    { number: 106, nameArabic: "قريش", nameEnglish: "Quraysh", verses: 4, revelation: "Meccan" },
    { number: 107, nameArabic: "الماعون", nameEnglish: "Al-Ma'un", verses: 7, revelation: "Meccan" },
    { number: 108, nameArabic: "الكوثر", nameEnglish: "Al-Kawthar", verses: 3, revelation: "Meccan" },
    { number: 109, nameArabic: "الكافرون", nameEnglish: "Al-Kafirun", verses: 6, revelation: "Meccan" },
    { number: 110, nameArabic: "النصر", nameEnglish: "An-Nasr", verses: 3, revelation: "Medinan" },
    { number: 111, nameArabic: "المسد", nameEnglish: "Al-Masad", verses: 5, revelation: "Meccan" },
    { number: 112, nameArabic: "الإخلاص", nameEnglish: "Al-Ikhlas", verses: 4, revelation: "Meccan" },
    { number: 113, nameArabic: "الفلق", nameEnglish: "Al-Falaq", verses: 5, revelation: "Meccan" },
    { number: 114, nameArabic: "الناس", nameEnglish: "An-Nas", verses: 6, revelation: "Meccan" },
]
