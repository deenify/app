export {
    DEFAULT_LOCATION_LABEL,
    POST_SALAH_DHIKR,
    PRAYER_EDITORIAL,
    PRAYER_FIQH_NOTE,
    PRAYER_WINDOWS,
    type PrayerWindow,
} from "@/components/pages/dashboard/content"

export type PrayerEntry = {
    id: string
    name: string
    arabic: string
    transliteration: string
    time: string
    phase?: "dawn" | "noon" | "afternoon" | "dusk" | "night"
    hint?: string
    description?: string
    chips?: string[]
}

export type PrayerSection = {
    id: string
    title: string
    subtitle: string
    entries: PrayerEntry[]
}

export const PRAYER_SECTIONS: PrayerSection[] = [
    {
        id: "daily",
        title: "Daily obligatory",
        subtitle: "الفرائض · five anchors of the day",
        entries: [
            {
                id: "Fajr",
                name: "Fajr",
                arabic: "الفجر",
                transliteration: "Fajr",
                time: "05:45 AM",
                phase: "dawn",
                description: "Begins at true dawn; ends at sunrise — the quietest opening of the day.",
                chips: ["Farḍ", "Dawn"],
            },
            {
                id: "Dhuhr",
                name: "Dhuhr",
                arabic: "الظهر",
                transliteration: "Ẓuhr",
                time: "01:15 PM",
                phase: "noon",
                description: "When the sun passes its zenith until Asr — pause at midday.",
                chips: ["Farḍ", "Zenith"],
            },
            {
                id: "Asr",
                name: "Asr",
                arabic: "العصر",
                transliteration: "ʿAṣr",
                time: "04:30 PM",
                phase: "afternoon",
                description: "Afternoon prayer before the sun turns gold — guard this window.",
                chips: ["Farḍ", "Afternoon"],
            },
            {
                id: "Maghrib",
                name: "Maghrib",
                arabic: "المغرب",
                transliteration: "Maghrib",
                time: "06:45 PM",
                phase: "dusk",
                description: "Immediately after sunset; brief and luminous — do not delay casually.",
                chips: ["Farḍ", "Sunset"],
            },
            {
                id: "Isha",
                name: "Isha",
                arabic: "العشاء",
                transliteration: "ʿIshāʾ",
                time: "08:15 PM",
                phase: "night",
                description: "Night prayer after twilight fades; Witr follows in voluntary rhythm.",
                chips: ["Farḍ", "Night"],
            },
        ],
    },
    {
        id: "voluntary",
        title: "Voluntary & seasonal",
        subtitle: "النوافل · rhythm beyond the farḍ",
        entries: [
            {
                id: "jummah",
                name: "Jumuʿah",
                arabic: "الجمعة",
                transliteration: "Jumuʿah",
                time: "01:15 PM",
                hint: "Friday only",
                description: "Congregational prayer replacing Dhuhr on Friday for those obligated.",
                chips: ["Jamāʿah", "Friday", "Farḍ"],
            },
            {
                id: "duha",
                name: "Duḥā",
                arabic: "الضحى",
                transliteration: "Chasht / Duḥā",
                time: "09:30 AM",
                hint: "Mid-morning",
                description: "Optional prayer after sunrise until before Dhuhr — charity for your joints.",
                chips: ["Nafl", "Morning"],
            },
            {
                id: "tahajjud",
                name: "Tahajjud",
                arabic: "تهجد",
                transliteration: "Tahajjud",
                time: "02:18 AM",
                hint: "Last third of night",
                description: "Stand in the last third of the night when the heavens are nearest.",
                chips: ["Nafl", "Night"],
            },
            {
                id: "witr",
                name: "Witr",
                arabic: "الوتر",
                transliteration: "Witr",
                time: "08:35 PM",
                hint: "After ʿIshāʾ",
                description: "Odd-numbered closing prayer — strongly emphasized in Sunnah after ʿIshāʾ.",
                chips: ["Witr", "Closing"],
            },
        ],
    },
]

export const DEMO_CURRENT_PRAYER_ID = "Asr"
export const DEMO_NEXT_PRAYER_ID = "Maghrib"
export const DEMO_COUNTDOWN = "01h 22m"
export const SUNRISE_TIME = "06:52 AM"
export const DEMO_QAZA_COUNT = 2
export const DEMO_FAJR_STREAK = 12
export const CALCULATION_METHOD = "Muslim World League"

export const INITIAL_LOGGED: Record<string, boolean> = {
    Fajr: true,
    Dhuhr: true,
    Asr: false,
    Maghrib: false,
    Isha: false,
    jummah: false,
    duha: false,
    tahajjud: false,
    witr: false,
}
