import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ReciterType } from "./content"


interface ReciterStackProps {
    reciters: ReciterType[]
}

const ReciterStack = ({ reciters }: ReciterStackProps) => {
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

export default ReciterStack