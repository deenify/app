"use client"

import { cn } from "@/lib/utils"
import { Search, LucideIcon } from "lucide-react"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export type SearchItem = {
  type: string
  name: string
  icon: LucideIcon
  page?: string
  data?: Record<string, unknown>
}

interface InputProps extends React.ComponentProps<"input"> {
  search?: boolean
  filteredItems?: SearchItem[]
  onItemSelect?: (item: SearchItem) => void
  className?: string
}

function Input({
  className,
  type = "text",
  search = false,
  filteredItems = [],
  onItemSelect,
  ...props
}: InputProps) {
  const [showDropdown, setShowDropdown] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  const handleItemSelect = (item: SearchItem) => {
    onItemSelect?.(item)
    setShowDropdown(false)
  }

  return (
    <div className="relative flex items-center w-full" ref={containerRef}>
      {search && (
        <Search
          className="absolute left-3 text-gray-400 pointer-events-none h-4 w-4 z-10"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          // 🔹 Base style
          "flex h-10 w-full min-w-0 rounded-md border border-gray-300 bg-gray-50/50 px-3 py-2 text-sm leading-none text-black/80 font-system font-normal placeholder:truncate",
          "placeholder:text-gray-400 placeholder:text-sm placeholder:truncate duration-200 ease-in-out outline-none",
          // 🔹 Hover — subtle tint
          "hover:border-gray-300 hover:bg-gray-50",
          // 🔹 Focus — emerald glow (soothing light bg)
          "focus-visible:border-emerald-500 focus-visible:bg-gray-50/50 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:shadow-[0_0_0_3px_var(--color-emerald-100)]",
          // 🔹 Focus — gray border (commented alternative)
          // "focus-visible:border-gray-500 focus-visible:bg-accent/80 focus-visible:shadow-[0_0_6px_rgba(0,0,0,0.08)]",
          // 🔹 Disabled
          "disabled:pointer-events-none disabled:cursor-default disabled:opacity-50",
          // 🔹 Dark mode
          "dark:bg-input/30 dark:border-input dark:placeholder:text-muted-foreground",
          search && "pl-9",
          className
        )} 
        onFocus={() => search && filteredItems.length > 0 && setShowDropdown(true)}
        {...props}
      />

      <AnimatePresence>
        {search && showDropdown && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-sm shadow-lg z-[100] overflow-hidden"
          >
            <div className="max-h-[320px] overflow-y-auto overflow-x-hidden scrollbar-thin p-[6px] pr-1">
              {filteredItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.button
                    key={`${item.type}-${item.name}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.15,
                      delay: index * 0.03,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className={cn(
                      "w-full px-4 py-3 flex items-center gap-3 border border-gray-100 last:border-b-0 group rounded-sm mb-1 last:mb-0",
                      "transition-[background-color,background-image,border-color] duration-150",
                      "ring-1 ring-emerald-50 hover:ring-emerald-200",

                      // 🔹 Gradient background
                      "bg-[linear-gradient(to_right,oklch(0.979_0.021_166.113_/_0.6),oklch(0.979_0.021_166.113_/_0.3),transparent)]",
                      "hover:bg-[linear-gradient(to_right,oklch(0.979_0.021_166.113_/_0.85),oklch(0.979_0.021_166.113_/_1.5),transparent)]"
                    )}
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <Icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate font-medium font-heading mb-0.5">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {item.type}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export { Input }
export type { InputProps }
