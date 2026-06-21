import { Instrument_Serif, Noto_Sans, Noto_Sans_Arabic, Red_Hat_Text } from "next/font/google";


// marketing accent — highlights  
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-accent",
});


// heading — Marketing & Dashboard
export const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});


// body — 95+ languages including Latin, Cyrillic, Greek, Devanagari, Vietnamese etc
export const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "devanagari", "cyrillic", "greek", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto",
});


// arabic — Arabic text e.g: Quran verses
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-arabic",
});