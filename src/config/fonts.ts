import { Noto_Sans, Noto_Sans_Arabic, Red_Hat_Text } from "next/font/google";

// heading - professional and stylish
export const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

// body - supports 95+ languages including Latin, Cyrillic, Greek, Devanagari, Vietnamese, and more
// Excellent for Quran translations in multiple languages with diacritical marks
export const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "devanagari", "cyrillic", "greek", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto",
});

// arabic - for Arabic text and Quran verses
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-arabic",
});