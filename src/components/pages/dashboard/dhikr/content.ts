/** Dhikr counter — presets, targets, editorial layer (swap counts/API later). */

export type DhikrPreset = {
    id: string
    title: string
    arabic: string
    transliteration: string
    defaultTarget: number
    context: "post-salah" | "morning-evening" | "anytime" | "istighfar"
    insight: string
}

export const DHIKR_PRESETS: DhikrPreset[] = [
    {
        id: "subhan",
        title: "Subḥān Allāh",
        arabic: "سُبْحَانَ اللهِ",
        transliteration: "Subḥān Allāh",
        defaultTarget: 33,
        context: "post-salah",
        insight: "Declaring Allah free from imperfection clears mental clutter—often paired after salah in sets of 33.",
    },
    {
        id: "hamd",
        title: "Alḥamdulillāh",
        arabic: "الْحَمْدُ لِلَّهِ",
        transliteration: "Alḥamdulillāh",
        defaultTarget: 33,
        context: "post-salah",
        insight: "Gratitude reframes perception; repeating alḥamd roots praise in the heart, not only the tongue.",
    },
    {
        id: "akbar",
        title: "Allāhu akbar",
        arabic: "اللهُ أَكْبَرُ",
        transliteration: "Allāhu akbar",
        defaultTarget: 34,
        context: "post-salah",
        insight: "Closing the classic 33/33/34 cycle—takbīr scales Allah above every competing concern.",
    },
    {
        id: "istighfar",
        title: "Astaghfirullāh",
        arabic: "أَسْتَغْفِرُ اللهَ",
        transliteration: "Astaghfirullāh",
        defaultTarget: 100,
        context: "istighfar",
        insight: "Seeking forgiveness softens the ego; volume matters less than sincerity and consistency.",
    },
    {
        id: "hawqala",
        title: "Ḥawqalah",
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        transliteration: "Lā ḥawla wa lā quwwata illā billāh",
        defaultTarget: 100,
        context: "anytime",
        insight: "Acknowledges that movement and strength belong to Allah—useful when anxiety narrows the chest.",
    },
    {
        id: "tahlil",
        title: "Lā ilāha illallāh",
        arabic: "لَا إِلَهَ إِلَّا اللهُ",
        transliteration: "Lā ilāha illallāh",
        defaultTarget: 100,
        context: "anytime",
        insight: "The weightiest statement in existence; roots the heart in pure tawḥīd (oneness).",
    },
]

export const DHIKR_EDITORIAL = {
    lens: "Dhikr is not a pedometer for the soul—it is supervised presence: name → meaning → stillness. Let the counter serve discipline; let your intention serve maʿrifah (deep acquaintance with Allah).",
    mechanics:
        "Use one preset per sitting until completion, then move to the next phase or rest. Long sessions beat chaotic hopping.",
} as const

export const DHIKR_TARGET_QUICK = [33, 34, 100] as const

export const DHIKR_TEACHING_NOTE =
    "Quantities like 33/33/34 are sunnah frameworks—not magical tallies. Priority is humble, attentive repetition aligned with what reliable scholarship transmits for your madhhab context."

export const DHIKR_COMPANION_LINKS = [
    { href: "/supplications", label: "Supplication library", hint: "Duʿāʾ corpus" },
    { href: "/prayer", label: "Prayer rhythm", hint: "Windows & lattice" },
] as const
