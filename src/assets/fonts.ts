// src/assets/fonts.ts

import {
  Instrument_Serif, Noto_Sans,
  Noto_Sans_Arabic, Red_Hat_Text
} from "next/font/google";
import localFont from "next/font/local";


// Marketing — Highlights  
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-accent",
  adjustFontFallback: false,
  fallback: ["Georgia", "Times New Roman", "serif"],
});


// Marketing / Dashboard — Headings  
export const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});


// Marketing / Dashboard — Body  
export const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "devanagari", "cyrillic", "greek", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto",
});


// Dashboard — Arabic (95+ Languages)
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-arabic",
});


// Moonwalk — Logo
export const moonwalk = localFont({
  src: "../../public/fonts/moon-walk/moonwalk.otf",
  variable: "--font-moonwalk",
  display: "swap",
}); 