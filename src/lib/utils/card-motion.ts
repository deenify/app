/** Stagger pattern used on Hadith / Quran collection cards */
export const cardStagger = (index: number) => ({
    initial: { opacity: 0, y: 8, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.2, delay: index * 0.02, ease: "easeOut" as const },
})
