import { cn } from "@/lib/utils/clsx"

type MarketingSectionHeadingProps = {
    lead: React.ReactNode | string
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
                    "font-heading text-[1.65rem] font-semibold leading-tight tracking-tight text-gray-900 xs:text-3xl sm:text-4xl lg:text-[2.65rem]",
                    align === "center" && "mx-auto"
                )}
            >
                {lead}{" "}
                <span className="font-accent text-[1.05em] italic text-emerald-600">{accent}</span>
            </h2>
            {subtitle && (
                <p
                    className={cn(
                        "mt-3 text-sm leading-relaxed text-gray-600 sm:mt-4 sm:text-base",
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
