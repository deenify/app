"use client"

import { Badge } from "@/components/ui/badge"
import { QuranHeroStatType } from "./content"

interface HeroSectionProps {
  STATS: QuranHeroStatType[]
}

const HeroSection = ({ STATS }: HeroSectionProps) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30" />

      <div className="container relative py-16 md:py-20">
        <div className="text-center mb-12">
          <Badge variant="emerald" className="mb-4">
            Holy Quran
          </Badge>
          <p
            className="text-4xl md:text-5xl text-emerald-700 mb-4"
            style={{ fontFamily: "serif" }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="text-sm md:text-base text-gray-600 italic mb-6">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <h1 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">
            The Noble Quran
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read, reflect, and connect with the divine words of Allah. Complete
            with translations, recitation, and tools to enhance your study.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-white/80 backdrop-blur rounded-lg shadow-sm border border-emerald-100"
            >
              <div className="text-xl font-semibold text-emerald-700">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
