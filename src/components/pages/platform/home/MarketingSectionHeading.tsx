import { cn } from "@/lib/utils/clsx"

type MarketingSectionHeadingProps = {
    lead: string
    accent: string
    subtitle?: string
    className?: string
    align?: "left" | "center"
}

const MarketingSectionHeading = ({
    lead,
    accent,
    subtitle,
    className,
    align = "center",
}: MarketingSectionHeadingProps) => {
    return (
        <div className={cn(align === "center" && "text-center", className)}>
            <h2
                className={cn(
                    "font-heading text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.65rem]",
                    align === "center" && "mx-auto"
                )}
            >
                {lead}{" "}
                <span className="font-accent text-[1.05em] italic text-emerald-600">{accent}</span>
            </h2>
            {subtitle && (
                <p
                    className={cn(
                        "mt-4 text-base leading-relaxed text-gray-600",
                        align === "center" && "mx-auto max-w-2xl"
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default MarketingSectionHeading
