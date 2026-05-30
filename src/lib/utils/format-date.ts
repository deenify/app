/**
 * Formats a date to English format: "Saturday, May 30"
 * @param date - Date object, string, or number
 * @returns Formatted date string
 */
export function englishDate(date: Date | string | number = new Date()) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Formats a date to Islamic (Hijri) format: "Dhuʻl-Hijjah 14 1447 AH"
 * @param date - Date object, string, or number
 * @returns Formatted Hijri date string
 */
export function islamicDate(date: Date | string | number = new Date()) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-GB-u-ca-islamic", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}
