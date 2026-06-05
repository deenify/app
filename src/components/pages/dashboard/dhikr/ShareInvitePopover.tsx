import { Popover } from "@/components/ui/popover"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Link2 } from "lucide-react"
import { Check } from "lucide-react"
import { Copy } from "lucide-react"
import { UserPlus } from "lucide-react"
import { PopoverContent } from "@/components/ui/popover"
import { DhikrPreset } from "./content"

const ShareInvitePopover = ({ preset }: { preset: DhikrPreset }) => {
    const [copied, setCopied] = useState(false)
    const [inviteId, setInviteId] = useState("")

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(`https://deenify.com/adhkar/${preset.id}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    asChild
                    variant="ghost"
                    size="max"
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-emerald-50 
                    hover:text-emerald-600 shrink-0 border border-gray-200 bg-white
                    hover:border-emerald-200 shadow-sm"
                >
                    <Share2 className="h-3.5 w-3.5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72 p-4 z-[110] rounded-lg shadow-xl border-gray-200"
                side="top"
                align="end"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900">Share & Invite</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed">Copy link to share or invite someone by their Deenify ID to count with you.</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                <Input
                                    readOnly
                                    value={`deenify.com/adhkar/${preset.id}`}
                                    className="h-9 pl-8 pr-2 text-[11px] bg-gray-50 border-gray-100 rounded-xl"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCopy}
                                className="h-9 w-9 shrink-0 rounded-xl bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:text-emerald-600"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                                <span className="bg-white px-2 text-gray-400">Or Invite</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter Deenify ID..."
                                value={inviteId}
                                onChange={(e) => setInviteId(e.target.value)}
                                className="h-10 text-xs bg-gray-50 border-gray-100 rounded-xl focus:bg-white"
                            />
                            <Button
                                variant="default"
                                size="icon"
                                className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-emerald-100"
                                disabled={!inviteId}
                            >
                                <UserPlus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ShareInvitePopover