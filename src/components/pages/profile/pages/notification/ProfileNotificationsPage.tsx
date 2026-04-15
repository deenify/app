"use client"

import { useState, type ReactNode } from "react"
import { Bell, Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils/clsx"

type RowProps = {
    title: string
    description: string
    checked: boolean
    onCheckedChange: (v: boolean) => void
    tone?: "amber" | "gray"
    icon?: ReactNode
}

const NotificationBox = ({
    title,
    description,
    checked,
    onCheckedChange,
    tone = "amber",
    icon,
}: RowProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between",
                tone === "amber"
                    ? "border-amber-200/90 bg-amber-50/60"
                    : "border-gray-200 bg-gray-50/70"
            )}
        >
            <div className="flex min-w-0 gap-3">
                {icon ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white 
                    text-gray-700 ring-1 ring-gray-200/80">
                        {icon}
                    </div>
                ) : null}
                <div className="min-w-0 space-y-1">
                    <p className={cn("text-sm font-medium", tone === "amber" ? "text-amber-950" : "text-gray-900")}>{title}</p>
                    <p className={cn("text-sm", tone === "amber" ? "text-amber-900/85" : "text-gray-600")}>{description}</p>
                </div>
            </div>
            <Switch variant={tone === "amber" ? "amber" : "gray"} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    )
}

const ProfileNotificationsPage = () => {
    const [state, setState] = useState({
        prayerReminders: true,
        dhikrReminders: true,
        quranGoals: true,
        email: false,
        push: true,
    })
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        setSaving(true)
        window.setTimeout(() => setSaving(false), 650)
    }

    return (
        <div className="space-y-6">
            <Card className="border-layout-separator">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 
                        text-amber-800 ring-1 ring-amber-100">
                            <Bell className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Channels & reminders
                    </CardTitle>
                    <CardDescription>App nudges first, then email and push.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <NotificationBox
                        title="Prayer time reminders"
                        description="Soft prompts before each salāh window."
                        checked={state.prayerReminders}
                        onCheckedChange={(v) => setState((s) => ({ ...s, prayerReminders: v }))}
                    />
                    <NotificationBox
                        title="Dhikr reminders"
                        description="Morning and evening adhkār checkpoints."
                        checked={state.dhikrReminders}
                        onCheckedChange={(v) => setState((s) => ({ ...s, dhikrReminders: v }))}
                    />
                    <NotificationBox
                        title="Qur’an reading goals"
                        description="Daily progress toward your chosen pace."
                        checked={state.quranGoals}
                        onCheckedChange={(v) => setState((s) => ({ ...s, quranGoals: v }))}
                    />

                    <div className="space-y-3 border-t border-gray-100 pt-5">
                        <p className="text-sm font-medium text-gray-900">Delivery</p>
                        <NotificationBox
                            tone="gray"
                            icon={<Mail className="h-4 w-4" strokeWidth={2} />}
                            title="Email updates"
                            description="Weekly summaries and product news."
                            checked={state.email}
                            onCheckedChange={(v) => setState((s) => ({ ...s, email: v }))}
                        />
                        <NotificationBox
                            tone="gray"
                            icon={<Smartphone className="h-4 w-4" strokeWidth={2} />}
                            title="Push notifications"
                            description="On-device alerts when enabled in the OS."
                            checked={state.push}
                            onCheckedChange={(v) => setState((s) => ({ ...s, push: v }))}
                        />
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-5">
                        <Button type="button" variant="secondary" shouldScale>
                            Mute all
                        </Button>
                        <Button
                            type="button"
                            variant="default-amber"
                            shouldScale
                            disabled={saving}
                            onClick={handleSave}
                        >
                            {saving ? "Saving…" : "Save notifications"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileNotificationsPage
