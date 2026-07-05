import Animate from "@/components/shared/motion/Animate"
import { cn } from "@/lib/utils/clsx"

type MarketingSectionHeadingProps = {
    lead: React.ReactNode | string
    accent: string
    subtitle?: string
    className?: string
    align?: "left" | "center"
}

const MarketingSectionHead = ({
    lead,
    accent,
    subtitle,
    className,
    align = "center",
}: MarketingSectionHeadingProps) => {
    return (
        <div className={cn(align === "center" && "text-center", className)}>
            <Animate
                variant="up"
                animate="while_in_view"
                delay={0.3}
                duration={0.88}
            >
                <h2
                    className={cn(
                        "font-heading marketing-section-heading",
                        align === "center" && "mx-auto"
                    )}
                >
                    {lead}{" "}
                    <span className="font-accent text-[1.05em] italic text-emerald-600">{accent}</span>
                </h2>
            </Animate>
            {subtitle && (
                <Animate
                    variant="up"
                    animate="while_in_view"
                    delay={0.4}
                    duration={0.92}
                >
                    <p
                        className={cn(
                            "mt-3 text-sm sm:leading-relaxed text-gray-600 sm:mt-4 sm:text-base",
                            align === "center" && "mx-auto max-w-2xl"
                        )}
                    >
                        {subtitle}
                    </p>
                </Animate>

            )}
        </div>
    )
}

export default MarketingSectionHead
