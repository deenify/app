import { LinkedinIcon } from "@/assets/svg/LinkedinIcon";
import { InstagramIcon } from "@/assets/svg/InstagramIcon";
import { FacebookIcon } from "@/assets/svg/FacebookIcon";
import { XIcon } from "@/assets/svg/XIcon";

export type FooterLink = { label: string; href: string }


export const FOOTER_PRODUCT: FooterLink[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Prayer times", href: "/prayer" },
    { label: "Quran", href: "/quran" },
    { label: "Hadith", href: "/hadith" },
    { label: "Dhikr", href: "/dhikr" },
]
export const FOOTER_LEARN: FooterLink[] = [
    { label: "Supplications", href: "/supplications" },
    { label: "Guides", href: "/guides" },
    { label: "History", href: "/history" },
    { label: "Miracles", href: "/miracles" },
    { label: "Stories", href: "/stories" },
]
export const FOOTER_COMPANY: FooterLink[] = [
    { label: "About", href: "/#about" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Support", href: "/support" },
    { label: "Donate", href: "/donate" },
]



// Quick Navigation Links 
export const FOOTER_LINK_SECTIONS = [
    {
        title: "Product",
        links: [...FOOTER_PRODUCT]
    },
    {
        title: "Learn",
        links: [...FOOTER_LEARN]
    },
    {
        title: "Company",
        links: [...FOOTER_COMPANY]
    },
]

// Copyright Links 
export const FOOTER_LEGAL: FooterLink[] = [
    { label: "Terms & Conditions", href: "/#terms" },
    { label: "Privacy Policy", href: "/#privacy" },
    { label: "Refund Policy", href: "/#refund" },
]

// Social Links 
export const FOOTER_SOCIAL_LINKS = [
    { icon: XIcon, label: "X", href: "https://x.com" },
    { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
    { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
    { icon: LinkedinIcon, label: "Linkedin", href: "https://linkedin.com" },
]