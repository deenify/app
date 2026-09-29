"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils/clsx"
import { clientEnv } from "@/env/client"

interface LogoProps {
    className?: string
    href?: string
    title?: string
    prefix_src?: string
    prefix_alt?: string
    subtitle?: string
    classNames?: {
        wrapper?: string
        prefix?: string
        title?: string
        subtitle?: string
    }
}


const Logo = ({
    className,
    href = "/",
    prefix_src = "/images/generic/deenify-prefix-1.png",
    prefix_alt = clientEnv.APP_NAME,
    title = clientEnv.APP_NAME,
    subtitle,
    classNames
}: LogoProps) => {

    return (
        <Link
            href={href}
            className={cn(
                "relative flex w-max items-center justify-start overflow-hidden",
                className,
            )}
        >
            <div className={cn("flex items-center gap-2", classNames?.wrapper)}>
                <div
                    key="icon"
                    className="flex-shrink-0 inset-y-0"
                >
                    <Image
                        src={prefix_src}
                        alt={prefix_alt}
                        width={40}
                        height={40}
                        className={cn("h-9 w-auto object-contain", classNames?.prefix)}
                        priority
                    />
                </div>
                <div>
                    <span
                        key="wordmark"
                        className={cn("pt-2 inset-y-0 left-0 flex items-center font-moonwalk",
                            "text-2xl font-medium leading-none tracking-tight text-emerald-900",
                            classNames?.title
                        )}
                    >
                        {title}
                    </span>
                    {subtitle && (
                        <span className={cn(
                            "text-sm text-gray-500 block truncate",
                            classNames?.subtitle)}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default Logo
