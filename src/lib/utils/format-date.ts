export type IslamicDateOptions = {
    day?: boolean
    month?: boolean
    year?: boolean
    /** When year is included, append " AH" (default true). */
    ahSuffix?: boolean
}

/**
 * Formats a date to English format: "Saturday, May 30"
 */
export function englishDate(date: Date | string | number = new Date()) {
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Invalid Date"

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(d)
}

/**
 * Formats a date to Islamic (Hijri) calendar text.
 * @example islamicDate() → "14 Dhuʻl-Hijjah 1447"
 * @example islamicDate(Date.now(), { day: false, month: false, year: true }) → "1447 AH"
 */
export function islamicDate(
    date: Date | string | number = new Date(),
    options?: IslamicDateOptions
) {
    const d = new Date(date)
    if (isNaN(d.getTime())) return "Invalid Date"

    const showDay = options?.day ?? true
    const showMonth = options?.month ?? true
    const showYear = options?.year ?? true
    const ahSuffix = options?.ahSuffix ?? true

    const fmtOptions: Intl.DateTimeFormatOptions = {}
    if (showDay) fmtOptions.day = "numeric"
    if (showMonth) fmtOptions.month = "long"
    if (showYear) fmtOptions.year = "numeric"

    const formatted = new Intl.DateTimeFormat("en-GB-u-ca-islamic", fmtOptions).format(d)

    if (showYear && ahSuffix) {
        const trimmed = formatted.trim()
        if (/\bAH\b/i.test(trimmed)) return trimmed
        return `${trimmed} AH`
    }

    return formatted
}
