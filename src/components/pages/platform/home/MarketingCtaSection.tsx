import MarketingCtaSection from "../generic/MarketingCtaSection"

/** Home prefooter — thin wrapper over the shared generic CTA. */
const HomeMarketingCtaSection = () => {
    return (
        <MarketingCtaSection
            lead={<>Ready to compose <br className="block xs:hidden" /> your daily</>}
            accent="deen?"
            subtitle="Step into a dashboard designed for Muslims who value clarity, craft, and continuity — from first prayer to lifelong learning."
            primaryCta={{ label: "Open Dashboard", href: "/dashboard" }}
        />
    )
}

export default HomeMarketingCtaSection
