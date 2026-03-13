"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Headphones, Play, User } from "lucide-react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import {
    MockReciters,
    SurahRecitersMap,
    type QuranSurahType,
    type ReciterType,
} from "./content"

interface ListenTabSectionProps {
    surahs: QuranSurahType[]
}

function getRecitersForSurah(surahNumber: number): ReciterType[] {
    const ids = SurahRecitersMap[surahNumber] ?? []
    return ids.map((id) => MockReciters.find((r) => r.id === id)!).filter(Boolean)
}

function ReciterStack({ reciters }: { reciters: ReciterType[] }) {
    if (reciters.length === 0) return null
    const [first, second, rest] = [reciters[0], reciters[1], reciters.slice(2)]
    const restCount = rest.length

    return (
        <div className="flex items-center gap-2 min-w-0">
            <div className="flex -space-x-2">
                {[first, second].filter(Boolean).map((r) => (
                    <Avatar
                        key={r.id}
                        className="h-7 w-7 border-2 border-white ring-1 ring-gray-100"
                    >
                        <AvatarFallback className="bg-emerald-100 text-emerald-800 text-[10px] font-medium">
                            {r.shortName.split(" ").map((s) => s[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                ))}
                {restCount > 0 && (
                    <Avatar className="h-7 w-7 border-2 border-white ring-1 ring-gray-100">
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-[10px] font-medium">
                            +{restCount}
                        </AvatarFallback>
                    </Avatar>
                )}
            </div>
            <span className="truncate text-xs font-medium text-gray-600">
                {restCount > 0
                    ? `${first.name} and ${restCount} other${restCount === 1 ? "" : "s"}`
                    : reciters.length === 2
                        ? `${first.shortName} & ${second!.shortName}`
                        : first.name}
            </span>
        </div>
    )
}

export default function ListenTabSection({ surahs }: ListenTabSectionProps) {
    const router = useRouter()
    const [reciterId, setReciterId] = useState<number | "all">("all")

    const filteredSurahs = useMemo(() => {
        if (reciterId === "all") return surahs
        return surahs.filter((s) =>
            (SurahRecitersMap[s.number] ?? []).includes(reciterId)
        )
    }, [surahs, reciterId])

    const reciterLabel =
        reciterId === "all"
            ? "All reciters"
            : MockReciters.find((r) => r.id === reciterId)?.name ?? "All reciters"

    if (surahs.length === 0) {
        return (
            <section className="relative border-t border-gray-100 bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)] py-12 sm:py-16">
                <div className="container px-4 sm:px-6">
                    <div className="mx-auto max-w-lg text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-emerald-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                            <Headphones className="h-7 w-7" strokeWidth={1.5} />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
                            No surahs match your search
                        </h2>
                        <p className="mt-1.5 text-sm text-gray-500">
                            Try a different term or clear the search to see all surahs.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="relative border-t border-gray-100 bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)] py-8 sm:py-10">
            <div className="container px-4 sm:px-6">
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700/80">
                            Recitation
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Listen by surah
                        </h2>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-9 shrink-0 justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:w-[200px]"
                            >
                                <span className="flex items-center gap-1.5 truncate">
                                    <User className="h-3.5 w-3.5 shrink-0 text-gray-500" />
                                    {reciterLabel}
                                </span>
                                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] border-gray-200 p-1">
                            <DropdownMenuItem
                                onClick={() => setReciterId("all")}
                                className={cn(
                                    "flex items-center justify-between rounded-sm px-2 py-2 text-xs",
                                    reciterId === "all"
                                        ? "bg-emerald-50 text-emerald-900"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                All reciters
                                {reciterId === "all" && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                            </DropdownMenuItem>
                            {MockReciters.map((r) => (
                                <DropdownMenuItem
                                    key={r.id}
                                    onClick={() => setReciterId(r.id)}
                                    className={cn(
                                        "flex items-center justify-between rounded-sm px-2 py-2 text-xs",
                                        reciterId === r.id
                                            ? "bg-emerald-50 text-emerald-900"
                                            : "text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    {r.name}
                                    {reciterId === r.id && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {filteredSurahs.length === 0 ? (
                    <p className="rounded-xl border border-gray-100 bg-white py-8 text-center text-sm text-gray-500">
                        No surahs available for this reciter. Select another or All reciters.
                    </p>
                ) : (
                    <>
                        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredSurahs.map((surah) => {
                                const reciters = getRecitersForSurah(surah.number)
                                return (
                                    <button
                                        key={surah.number}
                                        type="button"
                                        onClick={() => router.push(`/quran/${surah.number}`)}
                                        className="group flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] hover:border-emerald-300 hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold tabular-nums text-emerald-800">
                                                {surah.number}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-semibold text-gray-900">
                                                    {surah.nameEnglish}
                                                </p>
                                                <p
                                                    className="truncate text-base font-arabic font-medium text-emerald-800/90"
                                                    dir="rtl"
                                                >
                                                    {surah.nameArabic}
                                                </p>
                                                <p className="mt-0.5 text-xs text-gray-500">
                                                    {surah.verses} verses
                                                </p>
                                            </div>
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-200">
                                                <Play className="h-4 w-4 ml-0.5" strokeWidth={2.5} />
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-50 pt-2">
                                            <ReciterStack reciters={reciters} />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
