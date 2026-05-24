"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CreditCard, Lock, ShieldCheck, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BackButton from "@/components/shared/buttons/BackButton"
import { cn } from "@/lib/utils/clsx"
import { DONATE_TIERS, getDonateTierById } from "./content"

const PAYMENT_METHODS = [
    { id: "card", label: "Card", icon: CreditCard },
    { id: "wallet", label: "Apple / Google Pay", icon: Wallet },
] as const

export default function DonatePaymentContent() {
    const searchParams = useSearchParams()
    const planId = searchParams.get("plan") ?? "grow"
    const tier = useMemo(() => getDonateTierById(planId) ?? DONATE_TIERS[1], [planId])
    const [method, setMethod] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("card")

    return (
        <div className="min-h-[80dvh] bg-gray-50">
            <div className="container px-4 py-8 sm:px-6 sm:py-10">
                <div className="mx-auto max-w-4xl">
                    <BackButton
                        renderMobileVariant={false}
                        buttonProps={{ variant: "ghost-emerald", href: "/donate", shouldScale: false }}
                        label="Back to plans"
                        labelMbl="Back"
                    />

                    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-emerald-600" />
                                <h1 className="text-xl font-medium text-gray-900">Secure checkout</h1>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Demo UI — no real charge yet.</p>

                            <div className="mt-6 flex gap-2">
                                {PAYMENT_METHODS.map((m) => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setMethod(m.id)}
                                        className={cn(
                                            "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                                            method === m.id
                                                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        <m.icon className="h-4 w-4" />
                                        {m.label}
                                    </button>
                                ))}
                            </div>

                            {method === "card" && (
                                <div className="mt-6 space-y-4">
                                    <Input
                                        type="input"
                                        placeholder="Name on card"
                                        classNames={{ input: "h-10 rounded-md border-gray-200" }}
                                    />
                                    <Input
                                        type="input"
                                        placeholder="Card number"
                                        classNames={{ input: "h-10 rounded-md border-gray-200" }}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="input"
                                            placeholder="MM / YY"
                                            classNames={{ input: "h-10 rounded-md border-gray-200" }}
                                        />
                                        <Input
                                            type="input"
                                            placeholder="CVC"
                                            classNames={{ input: "h-10 rounded-md border-gray-200" }}
                                        />
                                    </div>
                                </div>
                            )}

                            {method === "wallet" && (
                                <p className="mt-6 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                                    Wallet pay will open here when we connect Stripe or a similar provider.
                                </p>
                            )}

                            <Button type="button" variant="default" className="mt-8 w-full" shouldScale disabled>
                                Pay {tier.amount} (demo)
                            </Button>
                        </div>

                        <aside className="h-fit rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 lg:sticky lg:top-24">
                            <Badge variant="emerald" className="text-xs">
                                Order summary
                            </Badge>
                            <p className="mt-3 text-lg font-medium text-gray-900">{tier.label}</p>
                            <p className="mt-1 flex items-baseline gap-1">
                                <span className="text-2xl font-medium text-emerald-700">{tier.amount}</span>
                                <span className="text-sm text-gray-500">{tier.period}</span>
                            </p>
                            <p className="mt-3 text-sm text-gray-600">{tier.impact}</p>
                            <ul className="mt-4 space-y-2 border-t border-emerald-100 pt-4">
                                {tier.features.map((f) => (
                                    <li key={f} className="text-sm text-gray-700">
                                        • {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5 flex items-center gap-2 text-xs text-emerald-800">
                                <ShieldCheck className="h-4 w-4" />
                                Encrypted connection (when live)
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}
