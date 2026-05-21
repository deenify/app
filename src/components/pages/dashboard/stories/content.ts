import type { LearnCategory, LearnEditorial } from "@/components/shared/learn/types"

export type StoryTopic = {
    id: string
    title: string
    category: string
    excerpt: string
    readMinutes: number
    prophet: string
    lesson: string
    body: string
    moralPoints: string[]
    quote?: { text: string; source: string }
    /** Tailwind gradient for card + modal header */
    theme: "emerald" | "amber" | "sky" | "rose" | "violet"
}

export const STORIES_EDITORIAL: LearnEditorial = {
    badge: "Prophetic stories",
    title: "Lessons from the prophets",
    lead: "Real stories from the Quran and Sunnah that teach patience, trust, and good character.",
}

export const STORIES_CATEGORIES: LearnCategory[] = [
    { id: "all", label: "All" },
    { id: "patience", label: "Patience" },
    { id: "trust", label: "Trust in Allah" },
    { id: "family", label: "Family" },
    { id: "courage", label: "Courage" },
]

export const STORY_THEME_STYLES: Record<
    StoryTopic["theme"],
    { card: string; modal: string; pill: string; accent: string }
> = {
    emerald: {
        card: "border-emerald-100 hover:border-emerald-300 from-emerald-50/80",
        modal: "from-emerald-600/90 via-emerald-700/80 to-emerald-900/90",
        pill: "bg-emerald-100 text-emerald-800 ring-emerald-200",
        accent: "text-emerald-600",
    },
    amber: {
        card: "border-amber-100 hover:border-amber-300 from-amber-50/80",
        modal: "from-amber-500/90 via-amber-600/80 to-amber-900/90",
        pill: "bg-amber-100 text-amber-900 ring-amber-200",
        accent: "text-amber-600",
    },
    sky: {
        card: "border-sky-100 hover:border-sky-300 from-sky-50/80",
        modal: "from-sky-500/90 via-sky-600/80 to-sky-900/90",
        pill: "bg-sky-100 text-sky-900 ring-sky-200",
        accent: "text-sky-600",
    },
    rose: {
        card: "border-rose-100 hover:border-rose-300 from-rose-50/80",
        modal: "from-rose-500/90 via-rose-600/80 to-rose-900/90",
        pill: "bg-rose-100 text-rose-900 ring-rose-200",
        accent: "text-rose-600",
    },
    violet: {
        card: "border-violet-100 hover:border-violet-300 from-violet-50/80",
        modal: "from-violet-500/90 via-violet-600/80 to-violet-900/90",
        pill: "bg-violet-100 text-violet-900 ring-violet-200",
        accent: "text-violet-600",
    },
}

export const STORIES_TOPICS: StoryTopic[] = [
    {
        id: "yusuf",
        title: "Yusuf and his brothers",
        category: "patience",
        prophet: "Yusuf عليه السلام",
        excerpt: "Betrayed by family, yet he forgave and rose with honor.",
        lesson: "Honesty and patience can turn deep harm into honor.",
        body: "Yusuf was thrown in a well and sold as a slave. Years later he became a leader in Egypt. When his brothers came hungry, he forgave them. His story teaches that harm is not the end when you stay honest and patient with Allah.",
        moralPoints: ["Forgive when you have power", "Do not boast in victory", "Dreams from Allah need time"],
        quote: { text: "Indeed, he who fears Allah and is patient — then indeed, Allah does not allow to be lost the reward of those who do good.", source: "Quran 12:90" },
        readMinutes: 6,
        theme: "amber",
    },
    {
        id: "ayub",
        title: "Ayub and illness",
        category: "patience",
        prophet: "Ayub عليه السلام",
        excerpt: "Wealth and health left, but his love for Allah stayed.",
        lesson: "Pain can purify the heart when we complain only to Allah.",
        body: "Ayub lost property and suffered for many years. He never cursed Allah. When he was healed, his family returned. The lesson: hardship can purify the heart if we keep doing good.",
        moralPoints: ["Never blame Allah for tests", "Keep worship in pain", "Relief comes by His timing"],
        readMinutes: 4,
        theme: "emerald",
    },
    {
        id: "hajar",
        title: "Hajar and Zamzam",
        category: "trust",
        prophet: "Hajar",
        excerpt: "A mother’s run between two hills became an act of worship.",
        lesson: "Trust Allah after you do your part.",
        body: "Ibrahim left Hajar and baby Ismail in a dry valley by Allah’s command. She searched for water until Zamzam flowed. Today millions walk her path during Hajj. Trust means effort plus tawakkul.",
        moralPoints: ["Effort and trust go together", "Women of faith shape history", "Sabr in loneliness"],
        readMinutes: 4,
        theme: "sky",
    },
    {
        id: "nuh",
        title: "Nuh and the ark",
        category: "courage",
        prophet: "Nuh عليه السلام",
        excerpt: "He called his people for centuries and never gave up.",
        lesson: "Keep calling to good even when results are slow.",
        body: "Nuh preached for hundreds of years. Only a few believed. Allah saved him and the believers in the ark. Mockery did not stop his duty.",
        moralPoints: ["Dawah needs patience", "Stay firm on truth", "Small groups can be saved"],
        readMinutes: 5,
        theme: "violet",
    },
    {
        id: "lut",
        title: "Lut and his guest",
        category: "courage",
        prophet: "Lut عليه السلام",
        excerpt: "He protected strangers when his people chose evil.",
        lesson: "Stand for truth even under pressure.",
        body: "Angels came as guests. His people demanded evil. Lut offered lawful alternatives. Allah destroyed the wicked city. The story warns against shamelessness.",
        moralPoints: ["Protect guests and the weak", "Do not follow the crowd", "Evil societies fall"],
        readMinutes: 5,
        theme: "rose",
    },
    {
        id: "maryam",
        title: "Maryam and her son",
        category: "family",
        prophet: "Maryam & ʿIsa عليهما السلام",
        excerpt: "Chosen for purity and honored in the Quran by name.",
        lesson: "Dignity comes from taqwa, not people’s whispers.",
        body: "Maryam dedicated herself to worship. She bore ʿIsa by Allah’s will. People accused her, but Allah defended her in the Quran.",
        moralPoints: ["Chastity is strength", "Allah defends the truthful", "Trust Him in scandal"],
        quote: { text: "And We made the son of Maryam and his mother a sign.", source: "Quran 23:50" },
        readMinutes: 4,
        theme: "sky",
    },
    {
        id: "ibrahim",
        title: "Ibrahim and the fire",
        category: "trust",
        prophet: "Ibrahim عليه السلام",
        excerpt: "Thrown into fire — Allah said: O fire, be cool and safe.",
        lesson: "When you choose Allah, He chooses your outcome.",
        body: "The tyrant lit a huge fire to burn Ibrahim. Allah cooled it for him. Ibrahim left unharmed. It shows that no plan against Allah’s allies succeeds.",
        moralPoints: ["Tawhid before comfort", "Fear Allah alone", "Tests reveal faith"],
        readMinutes: 4,
        theme: "amber",
    },
    {
        id: "musa-sea",
        title: "Musa and the sea",
        category: "courage",
        prophet: "Musa عليه السلام",
        excerpt: "Pharaoh’s army behind, the sea ahead — then a path opened.",
        lesson: "When there is no way, Allah makes one.",
        body: "Musa and Bani Israil reached the sea with Pharaoh chasing. Allah split the sea. They crossed; Pharaoh drowned. Fear turned to awe of Allah’s power.",
        moralPoints: ["Do not panic at dead ends", "Follow the prophet’s lead", "Arrogance drowns"],
        readMinutes: 5,
        theme: "emerald",
    },
]

export function getStoryById(id: string): StoryTopic | undefined {
    return STORIES_TOPICS.find((s) => s.id === id)
}
