export type MiracleSection = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export type MiracleCategory = { id: string; label: string }

export type MiracleTopic = {
    id: string
    title: string
    category: string
    excerpt: string
    readMinutes: number
    thumbnail: string
    videoUrl?: string
    quranRef?: string
    sections: MiracleSection[]
}

export const MIRACLES_EDITORIAL = {
    badge: "Islamic miracles",
    title: "Signs that strengthen faith",
    lead: "Miracles from the Quran, the prophets, and creation — explained simply, without hype.",
}

export const MIRACLES_CATEGORIES: MiracleCategory[] = [
    { id: "all", label: "All" },
    { id: "quran", label: "Quran" },
    { id: "prophets", label: "Prophets" },
    { id: "creation", label: "Creation" },
]

const section = (
    number: number,
    title: string,
    content: string,
    keyPoints: string[]
): MiracleSection => ({ number, title, content, keyPoints })

export const MIRACLES_TOPICS: MiracleTopic[] = [
    {
        id: "split-moon",
        title: "The splitting of the moon",
        category: "prophets",
        excerpt: "A sign shown to the Quraysh when they asked for proof.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1444703686981-a3edbc448375?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/2C8M7-hkiBc",
        quranRef: "Quran 54:1",
        sections: [
            section(1, "What happened", "The moon split into two parts as a sign. Companions saw it and later people reported the event.", ["Allah controls creation fully", "Signs invite reflection, not entertainment"]),
            section(2, "Faith response", "Believers saw proof of prophethood. Deniers made excuses. The lesson is honest hearts accept truth.", ["Do not mock signs", "Ask Allah for a sincere heart"]),
        ],
    },
    {
        id: "night-journey",
        title: "Al-Isra wal-Miʿraj",
        category: "prophets",
        excerpt: "The night journey from Makkah to Jerusalem and above the heavens.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/jn0f6f1R4tQ",
        quranRef: "Quran 17:1",
        sections: [
            section(1, "Isra — the earth journey", "The Prophet ﷺ traveled to Masjid al-Aqsa and led the prophets in prayer.", ["Leadership in worship unites the prophets", "Jerusalem has deep honor in Islam"]),
            section(2, "Miʿraj — the heavens", "He rose through the skies, met prophets, and received the five daily prayers.", ["Salah is a direct gift from Allah", "Time and space obey their Creator"]),
        ],
    },
    {
        id: "isa-birth",
        title: "The birth of ʿIsa (Jesus)",
        category: "prophets",
        excerpt: "Born without a father — a clear sign from Allah.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1519817915785-462f663f9f6e?w=800&q=80",
        quranRef: "Quran 19:16–21",
        sections: [
            section(1, "Maryam’s choice", "She devoted herself to Allah. Angels told her she would have a son by His command.", ["Chastity and trust in Allah", "Women of taqwa are honored in the Quran"]),
            section(2, "ʿIsa speaks", "Baby ʿIsa defended his mother from accusations. Creation without a father shows Allah’s power.", ["Do not confuse prophet with God", "Miracles point to the Creator"]),
        ],
    },
    {
        id: "musa-staff",
        title: "The staff of Musa",
        category: "prophets",
        excerpt: "A stick that became a snake before Pharaoh’s court.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        quranRef: "Quran 7:107",
        sections: [
            section(1, "Before Pharaoh", "Musa was told to throw his staff. It became a real snake, then returned to wood.", ["Truth beats stage magic", "Fear Allah more than tyrants"]),
            section(2, "Magicians submit", "When they saw real miracle, they fell in sujud. Pharaoh still chose arrogance.", ["Recognize truth quickly", "Pride blocks guidance"]),
        ],
    },
    {
        id: "quran-preservation",
        title: "Preservation of the Quran",
        category: "quran",
        excerpt: "The same words memorized and written for over 1,400 years.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1609599001995-17e2c321d92e?w=800&q=80",
        quranRef: "Quran 15:9",
        sections: [
            section(1, "Oral and written", "Companions memorized fully. Written copies were kept and cross-checked.", ["Millions still memorize today", "One Arabic text for the ummah"]),
            section(2, "Living miracle", "You can hear the same recitation worldwide. It is not hidden in a vault alone.", ["Recite daily", "Learn meaning step by step"]),
        ],
    },
    {
        id: "water-life",
        title: "Water and life",
        category: "creation",
        excerpt: "The Quran spoke about water before modern biology focused on it.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        quranRef: "Quran 21:30",
        sections: [
            section(1, "Revelation", "Allah says every living thing was made from water.", ["Gratitude for clean water", "Science can increase awe of Allah"]),
            section(2, "Balance", "We believe without needing labs. When facts align, faith grows — without worshipping science.", ["Stay humble", "Protect earth as amanah"]),
        ],
    },
    {
        id: "table-spread",
        title: "The table spread (Maʾidah)",
        category: "prophets",
        excerpt: "Food from heaven requested by the disciples of ʿIsa.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        quranRef: "Quran 5:112–115",
        sections: [
            section(1, "The request", "Disciples asked for a heavenly table to increase their certainty.", ["Ask Allah with respect", "Do not test Allah out of doubt"]),
            section(2, "Warning", "Allah warned of punishment if they disbelieved after seeing it. Miracles demand gratitude.", ["Thank Allah after every meal", "Share food with others"]),
        ],
    },
    {
        id: "bees",
        title: "Bees and honey",
        category: "creation",
        excerpt: "The Quran describes bees, homes, and healing honey.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
        quranRef: "Quran 16:68–69",
        sections: [
            section(1, "Inspired order", "Allah inspired the bee where to live and how to work.", ["Small creatures show great design", "Patience in teamwork"]),
            section(2, "Healing", "Honey has benefit for people. It reminds us to see blessings in nature.", ["Eat halal and wholesome", "Praise Allah for provision"]),
        ],
    },
    {
        id: "isa-healing",
        title: "ʿIsa heals by permission",
        category: "prophets",
        excerpt: "He cured the blind and lepers by Allah's leave.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        quranRef: "Quran 3:49",
        sections: [
            section(1, "By Allah's permission", "ʿIsa reminded people every cure is from Allah, not himself.", ["Do not worship the means", "Thank the Healer"]),
            section(2, "Sign for Bani Israil", "Miracles called them back to tawhid while they debated his birth.", ["Signs need honest hearts", "Reject superstition"]),
        ],
    },
    {
        id: "yunus-whale",
        title: "Yunus and the whale",
        category: "prophets",
        excerpt: "Alive in darkness until his dua was answered.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        quranRef: "Quran 21:87",
        sections: [
            section(1, "Three darknesses", "Whale belly, deep sea, and night — yet Allah heard.", ["Never despair of mercy", "Tawhid in crisis"]),
            section(2, "Returned to duty", "He went back to his people after rescue.", ["Repent and resume mission", "Allah forgives sincere callers"]),
        ],
    },
    {
        id: "iron-sent-down",
        title: "Iron sent down",
        category: "creation",
        excerpt: "The Quran describes iron as sent down for benefit.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
        quranRef: "Quran 57:25",
        sections: [
            section(1, "Material sign", "Iron enabled tools, building, and justice with strength.", ["Use strength for good", "Resources are amanah"]),
            section(2, "Hidden wisdom", "Scholars noted the phrase 'sent down' invites reflection on origin.", ["Science increases awe", "Stay humble before Allah"]),
        ],
    },
    {
        id: "mountains-pegs",
        title: "Mountains as stabilizers",
        category: "creation",
        excerpt: "Mountains anchor the earth in the Quranic description.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        quranRef: "Quran 16:15",
        sections: [
            section(1, "Stability", "Allah placed mountains so the earth does not shake with you.", ["See design in geography", "Travel and reflect"]),
            section(2, "Reminder", "Natural signs call us to remember the Creator daily.", ["Hike with dhikr", "Protect environment"]),
        ],
    },
    {
        id: "embryo-stages",
        title: "Stages of the embryo",
        category: "creation",
        excerpt: "The Quran outlines fetal development with precision.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1555252333-9f8e92a65df9?w=800&q=80",
        quranRef: "Quran 23:12–14",
        sections: [
            section(1, "From clay to life", "Allah describes stages from nutfah to fully formed human.", ["Life is sacred", "Reject harm to the unborn"]),
            section(2, "Humility", "Knowing our origin humbles pride.", ["Thank parents", "Value health"]),
        ],
    },
    {
        id: "solomon-wind",
        title: "Sulayman's wind",
        category: "prophets",
        excerpt: "A month journey became an evening by Allah's gift.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1534088568595-a066f41045c9?w=800&q=80",
        quranRef: "Quran 34:12",
        sections: [
            section(1, "Kingdom gifts", "Wind, jinn labor, and understanding of creatures were granted.", ["Power is a test", "Use gifts for justice"]),
            section(2, "Gratitude", "Sulayman thanked Allah and did not boast like Iblis.", ["Thank Allah for ease", "Lead with shukr"]),
        ],
    },
    {
        id: "ibrahim-birds",
        title: "Ibrahim and the birds",
        category: "prophets",
        excerpt: "Cut birds reunited to show resurrection is easy for Allah.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80",
        quranRef: "Quran 2:260",
        sections: [
            section(1, "Question of heart", "Ibrahim asked how Allah revives the dead and was shown a sign.", ["Ask to increase certainty", "Allah teaches gently"]),
            section(2, "Resurrection belief", "If parts reunite, full resurrection on Qiyamah is greater.", ["Prepare for akhirah", "Trust divine power"]),
        ],
    },
    {
        id: "zamzam-miracle",
        title: "Zamzam spring",
        category: "prophets",
        excerpt: "Water gushed for Hajar and baby Ismail in barren land.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        quranRef: "Linked to Ibrahim's family",
        sections: [
            section(1, "Mother's effort", "Hajar ran between Safa and Marwa seeking water.", ["Effort plus tawakkul", "Women of faith shape history"]),
            section(2, "Living sign", "Millions drink Zamzam until today.", ["Visit with gratitude", "Share water"]),
        ],
    },
    {
        id: "two-seas",
        title: "Two seas that meet",
        category: "creation",
        excerpt: "Fresh and salt water meet but remain separate.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
        quranRef: "Quran 55:19–20",
        sections: [
            section(1, "Barrier", "Allah placed a barzakh between waters that do not mix.", ["Observe creation", "Travel increases iman"]),
            section(2, "Parable", "Difference in creation points to Allah's will and wisdom.", ["Reflect while sailing", "Protect oceans"]),
        ],
    },
    {
        id: "expanding-universe",
        title: "Expanding heavens",
        category: "creation",
        excerpt: "The Quran speaks of the heaven being expanded.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1444703686981-a3edbc448375?w=800&q=80",
        quranRef: "Quran 51:47",
        sections: [
            section(1, "Revelation", "Allah says He built the heaven with power and expands it.", ["Modern science can increase awe", "Do not worship science"]),
            section(2, "Balance", "Believers accept revelation first and welcome discovery.", ["Stay humble", "Learn with adab"]),
        ],
    },
    {
        id: "speaking-ant",
        title: "The ant's speech",
        category: "creation",
        excerpt: "An ant warned its colony when Sulayman's army approached.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1530845680480-66449d808803?w=800&q=80",
        quranRef: "Quran 27:18",
        sections: [
            section(1, "Tiny wisdom", "Allah enabled communication beyond human hearing.", ["Respect small creatures", "Leadership needs care"]),
            section(2, "Sulayman's smile", "He thanked Allah for understanding creatures.", ["Gentle power", "Shukr for knowledge"]),
        ],
    },
    {
        id: "musa-hand",
        title: "The shining hand of Musa",
        category: "prophets",
        excerpt: "His hand glowed white without harm as a sign.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        quranRef: "Quran 28:32",
        sections: [
            section(1, "Second sign", "Alongside the staff, the bright hand convinced fearful Musa.", ["Allah equips His messengers", "Courage grows with signs"]),
            section(2, "Pharaoh's denial", "Tyrants explain away clear miracles.", ["Do not harden your heart", "Accept truth early"]),
        ],
    },
    {
        id: "quran-arabic",
        title: "Unique Arabic Quran",
        category: "quran",
        excerpt: "A literary challenge that remains unmatched.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1609599001995-17e2c321d92e?w=800&q=80",
        quranRef: "Quran 2:23",
        sections: [
            section(1, "The challenge", "Bring a surah like it if you doubt its divine origin.", ["Learn Arabic gradually", "Recite with tajweed"]),
            section(2, "Living proof", "Millions experience its impact without imitating it.", ["Memorize portions", "Reflect on meaning"]),
        ],
    },
    {
        id: "sleep-death",
        title: "Sleep as a minor death",
        category: "creation",
        excerpt: "Allah takes souls by night and returns some by day.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1511295749832-8f02f83a8d2c?w=800&q=80",
        quranRef: "Quran 39:42",
        sections: [
            section(1, "Daily reminder", "Sleep previews resurrection and Allah's control over souls.", ["Bedtime adhkar", "Thank Allah for waking"]),
            section(2, "Trust", "We surrender each night without guarantee of waking.", ["Live ready for akhirah", "Forgive before sleep"]),
        ],
    },
    {
        id: "she-camel-salih",
        title: "Salih's she-camel",
        category: "prophets",
        excerpt: "A miraculous camel as proof for Thamud.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&q=80",
        quranRef: "Quran 91:13–14",
        sections: [
            section(1, "Clear sign", "The camel drank on her day while the people drank on theirs.", ["Share fairly", "Do not harm signs"]),
            section(2, "Consequence", "Those who killed her faced swift punishment.", ["Heed warnings", "Reject mob violence"]),
        ],
    },
    {
        id: "idris-raised",
        title: "Idris raised in place",
        category: "prophets",
        excerpt: "Allah raised Idris to a high station.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1519817915785-462f663f9f6e?w=800&q=80",
        quranRef: "Quran 19:57",
        sections: [
            section(1, "Truthful prophet", "Idris was truthful and patient. Allah honored him.", ["Truthfulness elevates", "Patience in worship"]),
            section(2, "Mystery with purpose", "Details are few so we focus on lessons, not speculation.", ["Avoid idle tales", "Follow Quran and Sunnah"]),
        ],
    },
    {
        id: "food-dua",
        title: "Provision without measure",
        category: "prophets",
        excerpt: "ʿIsa asked Allah for a table from heaven as a sign.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        quranRef: "Quran 5:114",
        sections: [
            section(1, "Request with adab", "Disciples wanted certainty; Allah warned against ingratitude.", ["Ask with respect", "Fear unbelief after blessings"]),
            section(2, "Shared meals", "Food miracles teach gratitude and community.", ["Say bismillah", "Feed others"]),
        ],
    },
    {
        id: "wind-storms",
        title: "Winds that bring mercy",
        category: "creation",
        excerpt: "Allah sends winds as glad tidings before rain.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1534088568595-a066f41045c9?w=800&q=80",
        quranRef: "Quran 7:57",
        sections: [
            section(1, "Sign in weather", "Winds shift, clouds form, and land revives.", ["Rain is rahmah", "Farmers trust Allah"]),
            section(2, "Awe", "Storms remind us of power beyond human control.", ["Seek shelter and pray", "Help disaster victims"]),
        ],
    },
    {
        id: "noah-ark",
        title: "Nuh's ark",
        category: "prophets",
        excerpt: "A ship built by divine instruction saved believers.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        quranRef: "Quran 11:37",
        sections: [
            section(1, "Long dawah", "Nuh preached for centuries with few believers.", ["Persistence in calling", "Do not mock the lonely caller"]),
            section(2, "Salvation", "Believers boarded; deniers drowned. Obedience saved.", ["Follow divine commands", "Family can still choose wrong"]),
        ],
    },
    {
        id: "lightning-thunder",
        title: "Lightning and thunder",
        category: "creation",
        excerpt: "Angels glorify Allah amid thunder; lightning nearly blinds.",
        readMinutes: 3,
        thumbnail: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80",
        quranRef: "Quran 13:13",
        sections: [
            section(1, "Tasbih in storm", "Thunder praises Allah though humans fear it.", ["Say subhan Allah in storms", "Fear Allah more than weather"]),
            section(2, "Cycle of rain", "Lightning and rain revive earth after death.", ["See signs daily", "Thank Allah after fear"]),
        ],
    },
]

export function getMiracleById(id: string): MiracleTopic | undefined {
    return MIRACLES_TOPICS.find((t) => t.id === id)
}
