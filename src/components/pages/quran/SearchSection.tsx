"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchSection = () => {
  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search verses, surahs, or keywords..."
              className="pl-10 h-12 bg-white border-emerald-100 focus-visible:ring-emerald-200"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchSection
