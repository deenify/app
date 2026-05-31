export type HijriEventTone = "eid" | "fast" | "sacred" | "reminder"

export type HijriMonth = {
    index: number
    id: string
    nameEnglish: string
    nameArabic: string
    daysInMonth: number
}

export type HijriCalendarEvent = {
    day: number
    title: string
    description: string
    tone: HijriEventTone
}

export type HorizonEvent = {
    id: string
    name: string
    when: string
    horizon: "Soon" | "This month" | "Seasonal"
}

/** Display year — replace with API when Hijri calendar is wired. */
export const HIJRI_YEAR = 1447

export type HijriToday = {
    monthIndex: number
    day: number
    year: number
}

/** Live hijrī “today” from the device calendar (same source as header badge). */
export function getHijriToday(date: Date = new Date()): HijriToday {
    const parts = new Intl.DateTimeFormat("en-GB-u-ca-islamic", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    }).formatToParts(date)

    const read = (type: Intl.DateTimeFormatPartTypes) =>
        Number(parts.find((p) => p.type === type)?.value)

    const day = read("day")
    const month = read("month")
    const year = read("year")

    if (!day || !month || !year) {
        return { monthIndex: 11, day: 1, year: HIJRI_YEAR }
    }

    return {
        monthIndex: month - 1,
        day,
        year,
    }
}

/** Weekday column offset for day 1 of the observed month (0 = Sunday). */
export const MONTH_GRID_OFFSET = 2

export const HIJRI_MONTH_COUNT = 12

export const HIJRI_MONTHS: HijriMonth[] = [
    { index: 0, id: "muharram", nameEnglish: "Muharram", nameArabic: "مُحَرَّم", daysInMonth: 30 },
    { index: 1, id: "safar", nameEnglish: "Safar", nameArabic: "صَفَر", daysInMonth: 30 },
    { index: 2, id: "rabi-al-awwal", nameEnglish: "Rabi' al-Awwal", nameArabic: "رَبِيع الأوَّل", daysInMonth: 30 },
    { index: 3, id: "rabi-al-thani", nameEnglish: "Rabi' al-Thani", nameArabic: "رَبِيع الثَّانِي", daysInMonth: 30 },
    { index: 4, id: "jumada-al-awwal", nameEnglish: "Jumada al-Awwal", nameArabic: "جُمادى الأولى", daysInMonth: 30 },
    { index: 5, id: "jumada-al-thani", nameEnglish: "Jumada al-Thani", nameArabic: "جُمادى الثَّانِيَة", daysInMonth: 30 },
    { index: 6, id: "rajab", nameEnglish: "Rajab", nameArabic: "رَجَب", daysInMonth: 30 },
    { index: 7, id: "shaban", nameEnglish: "Sha'ban", nameArabic: "شَعْبَان", daysInMonth: 30 },
    { index: 8, id: "ramadan", nameEnglish: "Ramadan", nameArabic: "رَمَضَان", daysInMonth: 30 },
    { index: 9, id: "shawwal", nameEnglish: "Shawwal", nameArabic: "شَوَّال", daysInMonth: 30 },
    { index: 10, id: "dhul-qaadah", nameEnglish: "Dhul-Qa'dah", nameArabic: "ذُو القَعْدَة", daysInMonth: 30 },
    { index: 11, id: "dhul-hijjah", nameEnglish: "Dhul-Hijjah", nameArabic: "ذُو الحِجَّة", daysInMonth: 30 },
]

export const SACRED_MONTH_NAMES = ["Muharram", "Rajab", "Dhul-Qa'dah", "Dhul-Hijjah"] as const

export const CALENDAR_EDITORIAL = {
    lunarLead:
        "The Hijri calendar is lunar: months begin with verified crescent sighting or calculated new moon, depending on community practice. That is why Islamic dates move through the Gregorian year—it is a feature, not drift.",
    integration:
        "Use this view as orientation: sacred seasons, fasting opportunities, and pilgrimage windows become visible when lunar time is read alongside solar work schedules.",
    emptyDay:
        "No marked observances on this day in our current dataset. Use the time for personal dhikr, Qur'an review, or quiet planning—the lunar rhythm still holds the day.",
} as const

export const HIJRI_ANCHOR_VERSE = {
    ref: "Quran 9:36",
    text: "Indeed, the number of months with Allah is twelve [lunar] months in the register of Allah…",
} as const

export const MOON_PHASE_SAMPLE = {
    label: "Waxing gibbous",
    note: "Illumination updates when lunar astronomy is connected.",
} as const

export const HORIZON_EVENTS: HorizonEvent[] = [
    { id: "shawwal-six", name: "Six days of Shawwal", when: "Days 2–7 Shawwal", horizon: "Soon" },
    { id: "arafah", name: "Day of ʿArafah", when: "9 Dhul-Hijjah", horizon: "Seasonal" },
    { id: "eid-adha", name: "ʿEid al-Aḍḥā", when: "10 Dhul-Hijjah", horizon: "Seasonal" },
    { id: "ashura", name: "Day of ʿĀshūrāʾ", when: "10 Muharram", horizon: "Seasonal" },
]

const EVENTS: Record<number, HijriCalendarEvent[]> = {
    0: [
        {
            day: 1,
            title: "New Hijri year",
            description: "Muharram opens the year—many communities increase reflection and voluntary fasting.",
            tone: "sacred",
        },
        {
            day: 10,
            title: "ʿĀshūrāʾ",
            description: "A day of historical gravity; voluntary fasting is widely encouraged the day before or after as well.",
            tone: "fast",
        },
    ],
    6: [
        {
            day: 1,
            title: "Rajab begins",
            description: "A sacred month—renew intentions before Shaʿbān and Ramaḍān.",
            tone: "sacred",
        },
        {
            day: 27,
            title: "Isrāʾ & Miʿrāj (commemoration)",
            description: "Many mosques hold lectures on the night journey; local calendars vary.",
            tone: "reminder",
        },
    ],
    7: [
        {
            day: 15,
            title: "Mid-Shaʿbān",
            description: "A night of forgiveness in popular devotion—verify with your local scholars.",
            tone: "reminder",
        },
    ],
    8: [
        {
            day: 1,
            title: "Ramaḍān begins",
            description: "Fasting from true dawn to sunset; tarāwīḥ and Qur'an rhythm intensify.",
            tone: "fast",
        },
        {
            day: 27,
            title: "Laylat al-Qadr (seeking)",
            description: "The odd nights of the last ten are especially sought for worship.",
            tone: "sacred",
        },
        {
            day: 30,
            title: "Eid eve preparation",
            description: "Zakāt al-Fiṭr and Eid garments—communities confirm moon sighting.",
            tone: "eid",
        },
    ],
    9: [
        {
            day: 1,
            title: "ʿEid al-Fiṭr",
            description: "Celebration after Ramaḍān—prayer, kinship, and gratitude.",
            tone: "eid",
        },
        {
            day: 6,
            title: "White days fasting pattern",
            description: "Optional fasts on the 13th–15th are a gentle sunnah rhythm.",
            tone: "fast",
        },
        {
            day: 15,
            title: "Mid-month reflection",
            description: "A checkpoint to carry Ramaḍān habits forward.",
            tone: "reminder",
        },
    ],
    10: [
        {
            day: 1,
            title: "Dhul-Qa'dah opens",
            description: "Sacred month of pause before Ḥajj season peaks.",
            tone: "sacred",
        },
    ],
    11: [
        {
            day: 8,
            title: "Ḥajj days begin",
            description: "Pilgrims enter iḥrām; the world turns toward Makkah.",
            tone: "sacred",
        },
        {
            day: 9,
            title: "Day of ʿArafah",
            description: "The standing at ʿArafah—fasting is encouraged for non-pilgrims.",
            tone: "fast",
        },
        {
            day: 10,
            title: "ʿEid al-Aḍḥā",
            description: "Sacrifice, prayer, and days of tashrīq follow.",
            tone: "eid",
        },
    ],
}

export function getMonthByIndex(index: number): HijriMonth {
    return HIJRI_MONTHS[index] ?? HIJRI_MONTHS[0]
}

export function getEventsForMonth(monthIndex: number): HijriCalendarEvent[] {
    return EVENTS[monthIndex] ?? []
}

export function getEventsForDay(monthIndex: number, day: number): HijriCalendarEvent[] {
    return getEventsForMonth(monthIndex).filter((e) => e.day === day)
}

export function dayHasEvents(monthIndex: number, day: number): boolean {
    return getEventsForDay(monthIndex, day).length > 0
}

export const EVENT_TONE_STYLES: Record<
    HijriEventTone,
    { badge: string; dot: string }
> = {
    eid: { badge: "border-amber-200 bg-amber-50 text-amber-900", dot: "bg-amber-500" },
    fast: { badge: "border-emerald-200 bg-emerald-50 text-emerald-900", dot: "bg-emerald-500" },
    sacred: { badge: "border-purple-200 bg-purple-50 text-purple-900", dot: "bg-purple-500" },
    reminder: { badge: "border-sky-200 bg-sky-50 text-sky-900", dot: "bg-sky-500" },
}
