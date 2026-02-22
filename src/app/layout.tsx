import type { Metadata } from "next";
import { cn } from "@/lib/utils/clsx";
import { ReactNode } from "react";
import { notoSans, notoSansArabic, redHatText } from "@/assets/fonts";
import { defaultMeta } from "@/assets/meta";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import "@/assets/globals.css";

export const metadata: Metadata = defaultMeta;
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

interface RootLayoutProptype { readonly children: ReactNode }

export default function RootLayout({ children }: RootLayoutProptype) {
  return (
    <html
      lang="en"
      className={cn(notoSans.variable, notoSansArabic.variable, redHatText.variable)}
    >
      <body className={notoSans.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
