import { cn } from "@/lib/utils/clsx";
import { ReactNode } from "react";

type InfiniteMarqueeProps = {
    className?: string;
    disableOnInteraction?: boolean;
    direction?: "left" | "right";
    speedInSecond?: number;
    itemInteractionEffect?: boolean;
    content: ReactNode[];
};

const InfiniteMarquee = ({
    className,
    disableOnInteraction = false,
    direction = "left",
    speedInSecond = 120,
    itemInteractionEffect = true,
    content = [],
}: InfiniteMarqueeProps) => {
    if (!content.length) return null;

    const items = [...content, ...content];
    const effectiveSpeed = speedInSecond <= 0 ? 0 : speedInSecond;
    const animationDirectionClass =
        direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right";

    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <div
                style={{ animationDuration: `${effectiveSpeed}s` }}
                className={cn(
                    "marquee-track flex w-max items-center gap-3 ease-linear sm:gap-4",
                    effectiveSpeed > 0 && animationDirectionClass,
                    disableOnInteraction && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex shrink-0 justify-center",
                            itemInteractionEffect &&
                            "grayscale hover:grayscale-0 transition-all duration-200"
                        )}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;
