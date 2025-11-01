import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import * as React from "react"

interface InputProps extends React.ComponentProps<"input"> {
  showSearchIcon?: boolean
  className?: string
}

function Input({
  className,
  type = "text",
  showSearchIcon,
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center w-full max-w-[250px]">
      {showSearchIcon && (
        <Search
          className="absolute left-3 text-gray-400 pointer-events-none h-[16px] w-[16px]"
          style={{ top: "50%", transform: "translateY(-48%)" }}
        />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          // 🔹 Base style
          "flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-input-background px-3 py-1 text-sm leading-none text-black/80 font-system font-normal",
          "placeholder:text-gray-400 placeholder:text-sm duration-200 ease-in-out outline-none",
          // 🔹 Hover — subtle tint
          "hover:border-gray-300 hover:bg-accent/80",
          // 🔹 Focus — soft glow
          "focus-visible:border-gray-500 focus-visible:bg-accent/80 focus-visible:shadow-[0_0_6px_rgba(0,0,0,0.08)]",
          // 🔹 Disabled
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          // 🔹 Dark mode
          "dark:bg-input/30 dark:border-input dark:placeholder:text-muted-foreground",
          showSearchIcon && "pl-9",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
