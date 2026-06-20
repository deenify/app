import { Button } from "@/components/ui/button"
import Animate from "@/components/shared/motion/Animate"
import MarketingSectionHeading from "./MarketingSectionHeading"

const MarketingCtaSection = () => {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="container">
                <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 
                bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 px-6 py-14 
                text-center sm:px-12 sm:py-16">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.35]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.1), transparent 35%)",
                        }}
                    />
                    <div className="relative">
                        <div className="mx-auto max-w-2xl">
                            <MarketingSectionHeading
                                lead={<>Ready to compose <br className='block xs:hidden' /> your daily</>}
                                accent="deen?"
                                subtitle="Step into a dashboard designed for Muslims who value 
                                clarity, craft, and continuity — from first prayer to lifelong learning."
                            />
                        </div>

                        <Animate
                            variant="up"
                            animate="while_in_view"
                            delay={0.55}
                            duration={0.9}
                        >
                            <Button
                                variant="default"
                                href="/dashboard"
                                className="w-max h-10 sm:h-12 text-sm sm:text-base px-8 sm:px-12
                            font-medium mt-6 xs:mt-8 rounded-full"
                            >
                                Open Dashboard
                            </Button>
                        </Animate>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingCtaSection
