import { LinkedinIcon } from "@/assets/svg/social/LinkedinIcon";
import { InstagramIcon } from "@/assets/svg/social/InstagramIcon";
import { FacebookIcon } from "@/assets/svg/social/FacebookIcon";
import { XIcon } from "@/assets/svg/social/XIcon";
import { clientEnv } from "@/env/client";

export type FooterLink = { label: string; href: string }


/** Scrolls the MarketingLayoutWrapperScrollContainer and DashboardLayoutWrapperScrollContainer 
 *  to the bottom - so that the input is not hidden by the keyboard ( viewport offset bug )  */
export const handleFocusIn = (isMobile: boolean) => {
    if (isMobile) {
        const MarketingLayoutWrapperScrollContainer =
            document.getElementById('marketing-layout-wrapper-scroll-container')
        const DashboardLayoutWrapperScrollContainer =
            document.getElementById('dashboard-layout-wrapper-scroll-container')

        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }, 100)

        if (MarketingLayoutWrapperScrollContainer) {
            setTimeout(() => {
                MarketingLayoutWrapperScrollContainer.scrollTo({
                    top: MarketingLayoutWrapperScrollContainer.scrollHeight, behavior: 'instant'
                })
            }, 100)
        }
        if (DashboardLayoutWrapperScrollContainer) {
            setTimeout(() => {
                DashboardLayoutWrapperScrollContainer.scrollTo({
                    top: DashboardLayoutWrapperScrollContainer.scrollHeight, behavior: 'instant'
                })
            }, 100)
        }
    }
}


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
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/#refund" },
]

// Social Links 
export const FOOTER_SOCIAL_LINKS = [
    { icon: XIcon, label: "X", href: clientEnv.APP_TWITTER },
    { icon: InstagramIcon, label: "Instagram", href: clientEnv.APP_INSTAGRAM },
    { icon: FacebookIcon, label: "Facebook", href: clientEnv.APP_FACEBOOK },
    { icon: LinkedinIcon, label: "Linkedin", href: clientEnv.APP_LINKEDIN },
]