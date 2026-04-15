"use client"

import { useState } from "react"
import { Key, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const ProfileSecurityPage = () => {
    const [twoFactor, setTwoFactor] = useState(false)
    const [biometric, setBiometric] = useState(true)
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
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-700 ring-1 ring-red-100">
                            <Shield className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Sign-in & devices
                    </CardTitle>
                    <CardDescription>Strong defaults, optional hardening.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="rounded-lg border border-red-200/90 bg-red-50/60 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-red-700 ring-1 ring-red-100">
                                        <Lock className="h-4 w-4" strokeWidth={2} />
                                    </div>
                                    <div className="min-w-0 space-y-1">
                                        <p className="text-sm font-medium text-red-950">Two-factor authentication</p>
                                        <p className="text-sm text-red-900/80">Require a second factor on new devices.</p>
                                    </div>
                                </div>
                                <Switch variant="red" checked={twoFactor} onCheckedChange={setTwoFactor} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 rounded-lg border border-red-200/90 bg-red-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-red-700 ring-1 ring-red-100">
                                    <Key className="h-4 w-4" strokeWidth={2} />
                                </div>
                                <div className="min-w-0 space-y-1">
                                    <p className="text-sm font-medium text-red-950">Biometric unlock</p>
                                    <p className="text-sm text-red-900/80">Use device biometrics when available.</p>
                                </div>
                            </div>
                            <Switch variant="red" checked={biometric} onCheckedChange={setBiometric} />
                        </div>
                    </div>

                    <div className="space-y-3 rounded-md border border-gray-200 bg-white p-4">
                        <p className="text-sm font-medium text-gray-900">Change password</p>
                        <Input className="rounded-md" type="password" placeholder="Current password" autoComplete="current-password" />
                        <Input className="rounded-md" type="password" placeholder="New password" autoComplete="new-password" />
                        <Input className="rounded-md" type="password" placeholder="Confirm new password" autoComplete="new-password" />
                        <Button type="button" variant="destructive" shouldScale className="w-full sm:w-auto">
                            Update password
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-5">
                        <Button type="button" variant="secondary" shouldScale>
                            Cancel
                        </Button>
                        <Button type="button" variant="default-red" shouldScale disabled={saving} onClick={handleSave}>
                            {saving ? "Saving…" : "Save security"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileSecurityPage
