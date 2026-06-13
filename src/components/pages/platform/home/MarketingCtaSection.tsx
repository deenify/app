import { Button } from "@/components/ui/button"
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
                        <Button
                            variant="default"
                            size="sm"
                            href="/dashboard"
                            className="mx-auto mt-6 h-9 w-full max-w-xs rounded-md px-4 text-xs 
                            font-medium sm:mt-8 sm:h-12 sm:w-auto sm:max-w-none sm:rounded-full 
                            sm:px-10 sm:text-base"
                        >
                            Open Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingCtaSection
