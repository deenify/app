export type LearnSection = {
    number: number
    title: string
    content: string
    keyPoints: string[]
}

export type LearnCategory = { id: string; label: string }

export type LearnEditorial = {
    badge: string
    title: string
    lead: string
}

export type TopicExploreItem = {
    id: string
    title: string
    category: string
    excerpt: string
    readMinutes: number
    thumbnail?: string
    era?: string
}

/** @deprecated Use topic-specific types; kept for generic explore modal */
export type LearnTopic = {
    id: string
    title: string
    category: string
    excerpt: string
    body: string
    readMinutes: number
}
