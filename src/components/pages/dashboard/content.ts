/** Shared data & editorial copy — worship experience layer (not tied to Figma layouts). */
export const DEFAULT_LOCATION_LABEL = "New York, USA"

export type PrayerWindow = {
    id: string
    name: string
    arabic: string
    transliteration: string
    time: string
    phase: "dawn" | "noon" | "afternoon" | "dusk" | "night"
    completed: boolean
}

/** Demo schedule — swap for API / calculation engine */
export const PRAYER_WINDOWS: PrayerWindow[] = [
    { id: "Fajr", name: "Fajr", arabic: "الفجر", transliteration: "Fajr", time: "05:45 AM", phase: "dawn", completed: true },
    { id: "Dhuhr", name: "Dhuhr", arabic: "الظهر", transliteration: "Ẓuhr", time: "01:15 PM", phase: "noon", completed: true },
    { id: "Asr", name: "Asr", arabic: "العصر", transliteration: "ʿAṣr", time: "04:30 PM", phase: "afternoon", completed: false },
    { id: "Maghrib", name: "Maghrib", arabic: "المغرب", transliteration: "Maghrib", time: "06:45 PM", phase: "dusk", completed: false },
    { id: "Isha", name: "Isha", arabic: "العشاء", transliteration: "ʿIshāʾ", time: "08:15 PM", phase: "night", completed: false },
]

export const PRAYER_EDITORIAL = {
    arcLead:
        "The five prayers are not five interruptions—they are five openings where the day is reframed around remembrance. When you align outward times with inward presence, the schedule stops feeling like logistics and becomes architecture.",
    windowsLead:
        "Each window marks a conversation between celestial rhythm (sun and moon) and human discipline. Times shift with location and method—the numbers below are placeholders until you connect calculation settings.",
    stillness:
        "Khushūʿ (humble attentiveness) grows when salah anchors your attention before notifications and noise. Start small: one rakʿah with full presence, then let the habit compound across weeks.",
} as const

export const PRAYER_FIQH_NOTE =
    "Prayer times follow astronomical boundaries; schools and coordinates yield small differences. Pick a reliable method for your region and stay consistent—exact minute variance is normal across calculators."

export const POST_SALAH_DHIKR = [
    { arabic: "سُبْحَانَ اللهِ", label: "Subḥān Allāh", count: "33×" },
    { arabic: "الْحَمْدُ لِلَّهِ", label: "Alḥamdulillāh", count: "33×" },
    { arabic: "اللهُ أَكْبَرُ", label: "Allāhu akbar", count: "34×" },
] as const

export const QIBLA_EDITORIAL = {
    lead: "Qibla is direction, not distance: every prayer line converges on the Kaʿbah as a shared axis of worship for the ummah. Your compass bridges local geography to that single focal point.",
    accuracy:
        "Metal, speakers, and indoor environments skew magnetometers. Calibrate outdoors when possible, hold the device flat, and treat the bearing as a refined estimate—not a substitute for learning prayer from qualified teachers.",
} as const

export const QIBLA_PROTOCOL_STEPS = [
    "Hold the phone flat, parallel to the ground—tilt breaks compass fusion.",
    "Calibrate if the browser prompts; figure-eight motions often help sensors settle.",
    "Face your body until the indicator aligns; verify once more before takbīr.",
    "Step away from large metal objects, vehicles, and thick concrete with wiring.",
] as const

