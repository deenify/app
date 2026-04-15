"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

type RowProps = {
    id: string
    title: string
    description: string
    checked: boolean
    onCheckedChange: (v: boolean) => void
}

const PrivacyRow = ({ id, title, description, checked, onCheckedChange }: RowProps) => (
    <div className="flex flex-col gap-3 rounded-md border border-purple-200/80 bg-purple-50/50 p-4 
    sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
            <p id={`${id}-label`} className="text-sm font-medium text-purple-950">
                {title}
            </p>
            <p className="text-sm text-purple-900/80">{description}</p>
        </div>
        <Switch
            variant="purple"
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-labelledby={`${id}-label`}
        />
    </div>
)

const ProfilePrivacyPage = () => {
    const [state, setState] = useState({
        profileVisibility: true,
        showPrayerStats: true,
        showReadingProgress: false,
        allowMessages: true,
    })
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        setSaving(true)
        window.setTimeout(() => setSaving(false), 650)
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                <Card className="border-layout-separator">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700 ring-1 ring-purple-100">
                            <Eye className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Visibility
                    </CardTitle>
                    <CardDescription>Who sees your profile signals and progress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <PrivacyRow
                        id="profile-visibility"
                        title="Profile visibility"
                        description="Allow other members to view your public profile card."
                        checked={state.profileVisibility}
                        onCheckedChange={(v) => setState((s) => ({ ...s, profileVisibility: v }))}
                    />
                    <PrivacyRow
                        id="prayer-stats"
                        title="Prayer statistics"
                        description="Show aggregate prayer consistency on your profile."
                        checked={state.showPrayerStats}
                        onCheckedChange={(v) => setState((s) => ({ ...s, showPrayerStats: v }))}
                    />
                    <PrivacyRow
                        id="reading-progress"
                        title="Reading progress"
                        description="Share Quran reading milestones with trusted circles."
                        checked={state.showReadingProgress}
                        onCheckedChange={(v) => setState((s) => ({ ...s, showReadingProgress: v }))}
                    />
                    <PrivacyRow
                        id="allow-messages"
                        title="Direct messages"
                        description="Let people reach you inside the product."
                        checked={state.allowMessages}
                        onCheckedChange={(v) => setState((s) => ({ ...s, allowMessages: v }))}
                    />

                    <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-5">
                        <Button type="button" variant="secondary" shouldScale>
                            Reset
                        </Button>
                        <Button type="button" variant="default-purple" shouldScale disabled={saving} onClick={handleSave}>
                            {saving ? "Saving…" : "Save privacy"}
                        </Button>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default ProfilePrivacyPage
