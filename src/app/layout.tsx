import type { Metadata } from "next";
import { cn } from "@/lib/utils/clsx";
import { ReactNode } from "react";
import { notoSans, notoSansArabic, poppins } from "@/config/fonts";
import { defaultMeta } from "@/config/meta";
import "@/assets/globals.css";

interface RootLayoutProptype { readonly children: ReactNode }

export const metadata: Metadata = defaultMeta;
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: "#0d9488",
};

export default function RootLayout({ children }: RootLayoutProptype) {
  return (
    <html
      lang="en"
      className={cn(notoSans.variable, notoSansArabic.variable, poppins.variable)}
    >
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
