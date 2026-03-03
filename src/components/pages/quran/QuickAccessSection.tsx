"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { QuranQuickAccessType } from "./content"

interface QuickAccessSectionProps {
  ITEMS: QuranQuickAccessType[]
}

const QuickAccessSection = ({ ITEMS }: QuickAccessSectionProps) => {
  const router = useRouter()

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Access
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Card
                key={item.title}
                className="cursor-pointer hover:shadow-md transition-shadow border-emerald-100"
                onClick={() => router.push(item.href)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                      item.bgColor
                    )}
                  >
                    <Icon className={cn("h-6 w-6", item.iconColor)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default QuickAccessSection
