import { cn } from '@/lib/utils/clsx'
import { Moon } from 'lucide-react'
import React from 'react'
import { clientEnv } from "@/env/client"

interface LogoProps {
    className?: string
    classNames?: {
        iconWrapper?: string
        icon?: string
        contentWrapper?: string
        titleWrapper?: string
        title?: string
        subtitle?: string
    }
    href?: string
    isContentAncored?: boolean
    title?: string
    subtitle?: string
}


const Logo = ({
    className,
    classNames,
    href = "/",
    isContentAncored = true,
    title = clientEnv.APP_NAME,
    subtitle = "Islamic Companion"
}: LogoProps) => {
    return (
        <div className={cn(
            "flex items-center gap-3 justify-start",
            className
        )}>
            <div className="flex-shrink-0">
                <a
                    href={href}
                    aria-label="Go to home page"
                    className={cn(
                        "w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0",
                        classNames?.iconWrapper
                    )}
                >
                    <Moon className={cn(
                        "h-6 w-6 text-white",
                        classNames?.icon
                    )} />
                </a>
            </div>
            <div className={cn(
                "flex-1 min-w-0 whitespace-nowrap overflow-hidden",
                classNames?.contentWrapper
            )}>
                {isContentAncored ? (
                    <a
                        href={href}
                        aria-label="Go to home page"
                        className={cn(
                            "w-max",
                            classNames?.titleWrapper
                        )}
                    >
                        <h2 className={cn(
                            "text-emerald-900 font-medium text-base leading-tight break-words",
                            classNames?.title
                        )}>
                            {title}
                        </h2>
                        <p className={cn(
                            "text-xs text-gray-500 leading-tight break-words",
                            classNames?.subtitle
                        )}>
                            {subtitle}
                        </p>
                    </a>
                ) : (
                    <div
                        className={cn(
                            "w-max",
                            classNames?.titleWrapper
                        )}
                    >
                        <h2 className={cn(
                            "text-emerald-900 font-medium text-base leading-tight break-words",
                            classNames?.title
                        )}>
                            {title}
                        </h2>
                        <p className={cn(
                            "text-xs text-gray-500 leading-tight break-words",
                            classNames?.subtitle
                        )}>
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Logo