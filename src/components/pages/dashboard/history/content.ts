export type HistorySection = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export type HistoryCategory = { id: string; label: string }

export type HistoryTopic = {
    id: string
    title: string
    category: string
    excerpt: string
    readMinutes: number
    era: string
    thumbnail?: string
    videoUrl?: string
    sections: HistorySection[]
}

export const HISTORY_EDITORIAL = {
    badge: "Islamic history",
    title: "Key moments in our past",
    lead: "Short reads on people, places, and events that shaped the Muslim world — written in plain language.",
}

export const HISTORY_CATEGORIES: HistoryCategory[] = [
    { id: "all", label: "All" },
    { id: "early", label: "Early Islam" },
    { id: "empires", label: "Empires" },
    { id: "scholars", label: "Scholars" },
    { id: "modern", label: "Modern era" },
]

const section = (
    number: number,
    title: string,
    content: string,
    keyPoints: string[]
): HistorySection => ({ number, title, content, keyPoints })

export const HISTORY_TOPICS: HistoryTopic[] = [
    {
        id: "hijrah",
        title: "The Hijrah to Madinah",
        category: "early",
        era: "622 CE",
        excerpt: "When the Muslims moved to Madinah and built a new community.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4f9f0ee?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/2C8M7-hkiBc",
        sections: [
            section(1, "Why they left Makkah", "The Muslims faced harm and boycott. Allah allowed migration for those who could not worship freely.", ["Migration is allowed when faith is at risk", "The Prophet ﷺ planned with care"]),
            section(2, "Building Madinah", "In Madinah, Muslims became one community with the Ansar and Muhajirun. Masjid an-Nabawi became the heart of the city.", ["Brotherhood between migrants and locals", "A constitution for peace with tribes"]),
        ],
    },
    {
        id: "khulafa",
        title: "The Rightly Guided Caliphs",
        category: "early",
        era: "632–661 CE",
        excerpt: "The four leaders who ruled after the Prophet ﷺ passed away.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b02a88df0?w=800&q=80",
        sections: [
            section(1, "Abu Bakr and unity", "He kept the ummah together when the Prophet ﷺ passed away and began compiling the Quran.", ["Short rule focused on stability", "Fought those who refused zakah falsely"]),
            section(2, "Expansion with justice", "Umar and Uthman spread Islam with fairness. Ali faced trials but stayed firm on the Quran and Sunnah.", ["Judges were held accountable", "Public treasury was not private wealth"]),
        ],
    },
    {
        id: "badr",
        title: "The Battle of Badr",
        category: "early",
        era: "624 CE",
        excerpt: "A small Muslim army won against a larger force — with Allah’s help.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        sections: [
            section(1, "Before the fight", "Muslims wanted their goods back from a trade caravan. They met the Quraysh army instead.", ["Numbers were not on the Muslim side", "Prayer and dua came first"]),
            section(2, "Victory and lesson", "Allah gave victory. It raised hope but also taught reliance on Him, not pride.", ["Captives were treated with dignity", "Faith matters more than weapons"]),
        ],
    },
    {
        id: "andalus",
        title: "Al-Andalus",
        category: "empires",
        era: "711–1492 CE",
        excerpt: "Muslim Spain and its schools, art, and trade.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        videoUrl: "https://www.youtube.com/embed/IVYC0Dd2Zng",
        sections: [
            section(1, "Cities of light", "Cordoba and Granada had libraries, baths, and markets. Learning was valued.", ["Muslims, Christians, and Jews often traded ideas", "Architecture still inspires today"]),
            section(2, "Decline and memory", "Political splits weakened the region over time. Still, Andalus left a mark on science and culture.", ["Unity matters for strength", "Knowledge should be shared, not locked away"]),
        ],
    },
    {
        id: "ottoman",
        title: "The Ottoman era",
        category: "empires",
        era: "1299–1922 CE",
        excerpt: "A long empire that guarded holy sites and trade routes.",
        readMinutes: 6,
        thumbnail: "https://images.unsplash.com/photo-1527834287169-4aab2b5c0c0c?w=800&q=80",
        sections: [
            section(1, "Role of the caliphate", "Ottoman sultans later held the title of caliph. They protected Makkah and Madinah routes.", ["Hajj caravans were organized", "Awqaf supported schools and hospitals"]),
            section(2, "Reform and end", "The empire faced modern wars and internal change. It ended, but Muslim lands kept seeking renewal.", ["Strength needs internal reform", "History teaches humility"]),
        ],
    },
    {
        id: "ibn-sina",
        title: "Ibn Sina and medicine",
        category: "scholars",
        era: "980–1037 CE",
        excerpt: "A scholar whose books were used in Europe for hundreds of years.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1576086213369-97f3c81b6b7?w=800&q=80",
        sections: [
            section(1, "Canon of medicine", "His book organized healing, herbs, and the body. It was a standard text for centuries.", ["Faith and science can work together", "Writing preserves knowledge for the ummah"]),
            section(2, "Legacy", "Muslim lands built hospitals and libraries. Seeking knowledge is worship when done for Allah.", ["Study with teachers", "Share what you learn simply"]),
        ],
    },
    {
        id: "printing",
        title: "Books and the printing press",
        category: "modern",
        era: "1800s–1900s",
        excerpt: "How knowledge spread faster in the modern age.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        sections: [
            section(1, "More readers", "Printing made Quran copies, newspapers, and school books cheaper.", ["Literacy became a community goal", "Ideas traveled faster — good and bad"]),
            section(2, "Revival movements", "Scholars called Muslims back to the Quran and Sunnah while facing colonial pressure.", ["Know your sources", "Reform with wisdom, not rage"]),
        ],
    },
    {
        id: "saladin",
        title: "Salah al-Din and Jerusalem",
        category: "empires",
        era: "1187 CE",
        excerpt: "He took Jerusalem back with mercy after years of crusader rule.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        sections: [
            section(1, "Unity before battle", "He united Muslim rulers enough to face a strong enemy.", ["Politics needs patience", "Purpose should be Allah’s pleasure"]),
            section(2, "Mercy at victory", "When Jerusalem opened, he did not repeat the mass killings of the crusaders.", ["Chivalry is part of Islam", "Power must be restrained"]),
        ],
    },
    {
        id: "conquest-makkah",
        title: "Conquest of Makkah",
        category: "early",
        era: "630 CE",
        excerpt: "The Prophet ﷺ entered his homeland with forgiveness, not revenge.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4f9f0ee?w=800&q=80",
        sections: [
            section(1, "Prepared entry", "Muslims marched with discipline. The Prophet ﷺ honored the sanctity of the city.", ["Plan with mercy", "Strength without cruelty"]),
            section(2, "General amnesty", "He asked Quraysh what they expected. Most were forgiven.", ["Forgiveness wins hearts", "Tawbah is always open"]),
        ],
    },
    {
        id: "uhud",
        title: "The Battle of Uhud",
        category: "early",
        era: "625 CE",
        excerpt: "A hard lesson when archers left their post.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        sections: [
            section(1, "Early success", "Muslims fought bravely until a tactical mistake shifted the battle.", ["Obey command in jihad", "Discipline protects lives"]),
            section(2, "Patience after loss", "The Prophet ﷺ stayed firm and taught lessons instead of despair.", ["Learn from setbacks", "Martyrdom has honor"]),
        ],
    },
    {
        id: "khandaq",
        title: "The Trench (Khandaq)",
        category: "early",
        era: "627 CE",
        excerpt: "Madinah dug a trench and weathered a coalition siege.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b02a88df0?w=800&q=80",
        sections: [
            section(1, "Salman's idea", "The trench was new to Arabia but saved the city.", ["Use wisdom from any source", "Unity under leadership"]),
            section(2, "Wind and angels", "Allah sent hardship on the enemy camp. The siege failed.", ["Trust Allah after effort", "Betrayal weakens coalitions"]),
        ],
    },
    {
        id: "hudaybiyyah",
        title: "Treaty of Hudaybiyyah",
        category: "early",
        era: "628 CE",
        excerpt: "A peace deal that looked like loss but opened doors to victory.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        sections: [
            section(1, "Difficult terms", "Companions struggled with some conditions. The Prophet ﷺ accepted for long-term gain.", ["Strategy is sunnah", "Patience with leadership"]),
            section(2, "Fath soon after", "Quraysh broke terms and Muslims marched to Makkah stronger.", ["Allah plans beyond sight", "Diplomacy can precede triumph"]),
        ],
    },
    {
        id: "baghdad-house",
        title: "Bayt al-Hikmah",
        category: "empires",
        era: "800s CE",
        excerpt: "Baghdad's House of Wisdom gathered scholars and translations.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1576086213369-97f3c81b6b7?w=800&q=80",
        sections: [
            section(1, "Translation movement", "Greek, Persian, and Indian works entered Arabic with Muslim commentary.", ["Knowledge is communal", "Filter ideas through Quran"]),
            section(2, "Public hospitals", "Cities linked libraries with clinics and observatories.", ["Serve people with science", "Awqaf fund learning"]),
        ],
    },
    {
        id: "cordoba-caliphate",
        title: "Cordoba's golden age",
        category: "empires",
        era: "900s CE",
        excerpt: "Libraries, lamps, and scholars lit Muslim Spain.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        sections: [
            section(1, "Urban life", "Markets, baths, and schools thrived under stable rule.", ["Cities need justice", "Trade needs trust"]),
            section(2, "Fragile unity", "Later divisions weakened defense.", ["Political unity matters", "Invest in education"]),
        ],
    },
    {
        id: "mongol-sack",
        title: "Fall of Baghdad (1258)",
        category: "empires",
        era: "1258 CE",
        excerpt: "A catastrophe that scattered scholars and books.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1527834287169-4aab2b5c0c0c?w=800&q=80",
        sections: [
            section(1, "Shock", "The Abbasid capital fell after centuries of centrality.", ["Never assume permanence", "Prepare defenses"]),
            section(2, "Renewal elsewhere", "Cairo, Delhi, and Istanbul carried the ummah forward.", ["Knowledge survives people", "Rebuild with tawakkul"]),
        ],
    },
    {
        id: "ibn-rushd",
        title: "Ibn Rushd (Averroes)",
        category: "scholars",
        era: "1126–1198 CE",
        excerpt: "Philosopher-judge who commented on Aristotle and Islamic law.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        sections: [
            section(1, "Double training", "He served as qadi while writing on philosophy.", ["Balance reason and revelation", "Seek qualified teachers"]),
            section(2, "Debate legacy", "His works sparked discussion in East and West.", ["Disagree with adab", "Read primary sources"]),
        ],
    },
    {
        id: "malacca",
        title: "Malacca Sultanate",
        category: "empires",
        era: "1400s CE",
        excerpt: "A trade hub that spread Islam across Southeast Asia.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        sections: [
            section(1, "Merchants and scholars", "Islam spread through trade ethics and schools.", ["Business can be dawah", "Learn local languages"]),
            section(2, "Strategic port", "Location made it a meeting point of cultures.", ["Geography shapes history", "Protect trade routes"]),
        ],
    },
    {
        id: "sokoto",
        title: "Sokoto Caliphate",
        category: "empires",
        era: "1804–1903 CE",
        excerpt: "A West African revival state rooted in scholarship.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1564760055775-d63b02a88df0?w=800&q=80",
        sections: [
            section(1, "Usman dan Fodio", "Scholars called for reform against injustice and syncretism.", ["Scholars lead renewal", "Justice is political"]),
            section(2, "Administration", "Written law and education spread across Hausa lands.", ["Document governance", "Teach the youth"]),
        ],
    },
    {
        id: "colonial-era",
        title: "Colonial partitions",
        category: "modern",
        era: "1800s–1900s CE",
        excerpt: "European powers divided Muslim lands and drew new borders.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        sections: [
            section(1, "New maps", "Lines on paper split tribes and trade routes.", ["Know your history", "Unity needs vision"]),
            section(2, "Reform responses", "Movements rose calling back to Quran and independence.", ["Reform with knowledge", "Avoid despair"]),
        ],
    },
    {
        id: "ottoman-print",
        title: "Ottoman Tanzimat reforms",
        category: "modern",
        era: "1839–1876 CE",
        excerpt: "Legal and administrative modernization in the empire.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1527834287169-4aab2b5c0c0c?w=800&q=80",
        sections: [
            section(1, "New laws", "Equality before law and military updates were attempted.", ["Reform needs sincerity", "Protect sharia principles"]),
            section(2, "Debt and pressure", "Loans and wars strained the state.", ["Economic independence matters", "Plan long term"]),
        ],
    },
    {
        id: "al-azhar",
        title: "Al-Azhar University",
        category: "scholars",
        era: "970 CE–today",
        excerpt: "Cairo's enduring center of Islamic learning.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        sections: [
            section(1, "Fatimid origins", "Founded as a mosque-university, later Sunni scholarship hub.", ["Institutions preserve deen", "Endowments sustain schools"]),
            section(2, "Modern role", "Still graduates scholars across the Muslim world.", ["Support seminaries", "Study with chains"]),
        ],
    },
    {
        id: "granada-fall",
        title: "Fall of Granada",
        category: "empires",
        era: "1492 CE",
        excerpt: "The last Muslim polity in Iberia ended after centuries.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        sections: [
            section(1, "Internal weakness", "Rivalries and treaties eroded defense over generations.", ["Unity prevents loss", "Do not rely on enemies"]),
            section(2, "Cultural exile", "Muslims and Jews faced forced conversion or exile.", ["Memory preserves identity", "Learn from loss"]),
        ],
    },
    {
        id: "indian-ocean",
        title: "Indian Ocean trade",
        category: "empires",
        era: "700s–1500s CE",
        excerpt: "Muslim merchants linked Africa, Arabia, and Asia by sea.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
        sections: [
            section(1, "Halal commerce", "Trust and contracts spread Islam peacefully.", ["Honest trade is dawah", "Learn navigation skills"]),
            section(2, "Shared culture", "Food, dress, and law blended across ports.", ["Respect local custom", "Keep core beliefs"]),
        ],
    },
    {
        id: "women-scholars",
        title: "Women scholars of Hadith",
        category: "scholars",
        era: "800s–1900s CE",
        excerpt: "Female muhaddithat taught in mosques and homes for centuries.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1576086213369-97f3c81b6b7?w=800&q=80",
        sections: [
            section(1, "Chains of narration", "Women held ijazah and taught male and female students.", ["Seek knowledge regardless of gender", "Document teachers"]),
            section(2, "Modern forgetfulness", "Later patriarchy hid their stories. Recovery is ongoing.", ["Read women's scholarship", "Support girls' education"]),
        ],
    },
    {
        id: "petroleum-era",
        title: "Gulf and petroleum",
        category: "modern",
        era: "1900s CE",
        excerpt: "Oil wealth reshaped economies and pilgrimage infrastructure.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
        sections: [
            section(1, "Rapid change", "Desert towns became global cities within decades.", ["Wealth is a test", "Invest in people"]),
            section(2, "Hajj expansion", "New roads and services helped millions perform pilgrimage.", ["Serve guests of Rahman", "Avoid extravagance"]),
        ],
    },
    {
        id: "nationalism",
        title: "Rise of nation-states",
        category: "modern",
        era: "1900s CE",
        excerpt: "Independence movements replaced empires with modern republics.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        sections: [
            section(1, "New flags", "Leaders mixed Islam, ethnicity, and socialism in different ways.", ["Judge ideas by Quran", "Avoid blind loyalty"]),
            section(2, "Ongoing debate", "Muslims still discuss unity, borders, and governance.", ["Study civics", "Engage peacefully"]),
        ],
    },
    {
        id: "digital-age",
        title: "Islam in the digital age",
        category: "modern",
        era: "2000s CE",
        excerpt: "Fatwas, Quran apps, and global lectures reached billions.",
        readMinutes: 4,
        thumbnail: "https://images.unsplash.com/photo-1511295749832-8f02f83a8d2c?w=800&q=80",
        sections: [
            section(1, "Access", "A villager can hear scholars oceans away.", ["Verify sources", "Benefit from technology"]),
            section(2, "Noise", "Misinformation spreads too. Critical thinking is fard.", ["Learn usul", "Unplug for dhikr"]),
        ],
    },
    {
        id: "jerusalem-aqsa",
        title: "Masjid al-Aqsa through time",
        category: "early",
        era: "636 CE–today",
        excerpt: "The third holiest site under Muslim care for most centuries.",
        readMinutes: 5,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c0a127?w=800&q=80",
        sections: [
            section(1, "Early Islam", "Umar accepted the city's surrender and protected churches.", ["Protect places of worship", "Just treaties"]),
            section(2, "Modern struggle", "Occupation and conflict continue. Muslims remember it in prayer.", ["Pray for liberation", "Support with wisdom"]),
        ],
    },
]

export function getHistoryById(id: string): HistoryTopic | undefined {
    return HISTORY_TOPICS.find((t) => t.id === id)
}
