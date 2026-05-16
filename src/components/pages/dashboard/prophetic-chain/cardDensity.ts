/** How much fits on a chart card at the current viewport zoom */
export type CardDensity = "minimal" | "standard" | "rich"

export function getCardDensity(scale: number): CardDensity {
    if (scale < 0.82) return "minimal"
    if (scale < 1.04) return "standard"
    return "rich"
}
