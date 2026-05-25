/** Revealed book associated with the prophet, when applicable */
export const PROPHETIC_SCRIPTURE: Partial<Record<string, string>> = {
    ibrahim: "Scrolls (Ṣuḥuf)",
    musa: "Torah (Tawrāt)",
    dawud: "Zabūr",
    isa: "Injīl",
    muhammad: "Qurʾān",
}

export function getProphetScripture(nodeId: string): string | null {
    return PROPHETIC_SCRIPTURE[nodeId] ?? null
}
