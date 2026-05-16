import { Noto_Sans, Noto_Sans_Arabic, Poppins } from "next/font/google";

// heading
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

// description 
export const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "devanagari", "cyrillic", "greek", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto",
});

// arabic 
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-arabic",
});