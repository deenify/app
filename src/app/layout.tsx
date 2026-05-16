import type { Metadata } from "next";
import { cn } from "@/lib/utils/clsx";
import { ReactNode } from "react";
import { notoSans, notoSansArabic, poppins } from "@/config/fonts";
import { defaultMeta } from "@/config/meta";
import "@/assets/globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

interface RootLayoutProptype { readonly children: ReactNode }

export const metadata: Metadata = defaultMeta;
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: RootLayoutProptype) {
  return (
    <html
      lang="en"
      className={cn(notoSans.variable, notoSansArabic.variable, poppins.variable)}
    >
      <body className={notoSans.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
