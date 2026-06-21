import { CheckCircle2, Sparkles } from "lucide-react"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { Badge } from "@/components/ui/badge"
import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import { clientEnv } from "@/env/client"

const POINTS = [
    "Scholar-aware catalogs with filters, bookmarks, and detail pages",
    "Prayer presence panels tuned for mobile and desktop",
    "Typography and spacing designed for long reading sessions",
    "A single account across worship, study, and remembrance",
]

const STATS = [
    { value: "14+", label: "Core modules" },
    { value: "6", label: "Curated catalogs" },
    { value: "40+", label: "Countries reached" },
    { value: "24/7", label: "Prayer awareness" },
]

const POINTS_BASE_DELAY = 0.55
const STAGGER_STEP = 0.12

const MarketingAboutSection = () => {
    return (
        <section id="about" className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <Animate
                            variant="up"
                            animate="while_in_view"
                            duration={0.85}
                        >
                            <Badge variant="emerald" className="mb-2 gap-1.5">
                                <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                                About {clientEnv.APP_NAME}
                            </Badge>
                        </Animate>

                        <MarketingSectionHeading
                            lead={<>Software with the gravity <br className="block xs:hidden" /> your practice</>}
                            accent="deserves"
                            subtitle={`We built ${clientEnv.APP_NAME} because most Islamic apps feel assembled, not 
                            authored. Our dashboard treats prayer, Quran, and learning as interconnected 
                            disciplines — with the visual discipline of a premium product studio.`}
                            align="left"
                        />

                        <ul className="mt-8 space-y-3">
                            {POINTS.map((point, index) => (
                                <Stagger
                                    key={point}
                                    index={index}
                                    animation="while_in_view"
                                    variant="up"
                                    baseDelay={POINTS_BASE_DELAY}
                                    delay={STAGGER_STEP}
                                    duration={0.85}
                                >
                                    <li className="flex items-start gap-3 text-sm text-gray-700">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        {point}
                                    </li>
                                </Stagger>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        {STATS.map((stat, index) => (
                            <Stagger
                                key={stat.label}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                delay={0.07}
                                duration={0.5}
                            >
                                <div className="rounded-md border border-gray-100 bg-white p-3.5 text-center shadow-sm sm:rounded-2xl sm:p-6">
                                    <p className="font-heading text-3xl font-semibold text-emerald-700">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </Stagger>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MarketingAboutSection
