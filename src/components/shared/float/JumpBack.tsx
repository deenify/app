"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"

interface JumpBackProps {
    isVisible: boolean
    onClick: () => void
}

const JumpBack = ({ isVisible, onClick }: JumpBackProps) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            shouldScale
            aria-label="Scroll to top"
            className={cn(
                "pointer-events-auto relative flex h-[50px] w-[50px] items-center ease duration-500",
                "justify-center rounded-full border border-slate-200 bg-white p-3",
                "text-slate-900 shadow-[0_14px_40px_-18px_rgba(15,23,42,0.2)] transition-all",
                "hover:-translate-y-0.5 hover:bg-slate-50 opacity-0",
                isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
            )}
        >
            <ArrowUp size={18} />
        </Button>
    )
}


export default JumpBack