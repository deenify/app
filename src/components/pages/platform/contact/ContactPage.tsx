"use client"

import { useRef } from "react"
import { Mail } from "lucide-react"
import MarketingPageHero from "../generic/MarketingPageHero"
import ContactChannelsSection from "./ContactChannelsSection"
import ContactFormSection from "./ContactFormSection"
import { useScrollIntoView } from "@/hooks/useScrollIntoView"
import { clientEnv } from "@/env/client"

const ContactPage = () => {
    const formRef = useRef<HTMLDivElement>(null)
    const { scrollIntoView } = useScrollIntoView({ offset: 96, behavior: "smooth" })

    return (
        <div className="bg-white">
            <MarketingPageHero
                badge={{
                    icon: Mail,
                    label: "We read every message — no ticket black holes",
                    labelMobile: "We read every message",
                }}
                lead="Let's start a"
                accent="conversation"
                subtitle={`Whether you need support, want to suggest a feature, or have a partnership inquiry — the ${clientEnv.APP_NAME} team responds with the same clarity we aim for in the product.`}
                subtitleMobile="Support, feedback, or partnership — we respond with clarity."
                image="/images/pages/marketing/home/mobile-overview.webp"
                imageAlt="Reach the Deenify team"
                primaryCta={{
                    label: "Jump to form",
                    onClick: () => scrollIntoView(formRef.current),
                }}
                secondaryCta={{ label: "Read FAQs", href: "/faqs" }}
            />
            <div id="contact-form" ref={formRef}>
                <ContactFormSection />
            </div>
            <ContactChannelsSection />
        </div>
    )
}

export default ContactPage
