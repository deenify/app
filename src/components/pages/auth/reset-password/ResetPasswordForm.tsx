"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, KeyRound } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/clsx"

interface ResetPasswordFormProps {
    className?: string
}

const panelTransition = {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1] as const,
}

const ResetPasswordForm = ({ className }: ResetPasswordFormProps) => {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className={cn("relative", className)}>
            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={panelTransition}
                        className="flex min-h-[280px] flex-col items-center justify-center text-center sm:min-h-[320px]"
                    >
                        <Animate variant="up" delay={0.05} duration={0.55}>
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-7 w-7" />
                            </span>
                        </Animate>
                        <Animate variant="up" delay={0.14} duration={0.6}>
                            <h2 className="mt-5 font-semibold tracking-tight text-gray-900 text-[26px] sm:text-3xl">
                                Password updated
                            </h2>
                        </Animate>
                        <Animate variant="up" delay={0.24} duration={0.65}>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                                Your new password is saved. Sign in to continue your journey where you left off.
                            </p>
                        </Animate>
                        <Animate variant="up" delay={0.34} duration={0.7}>
                            <Button href="/login" className="mt-6 w-full max-w-xs" size="lg">
                                Back to sign in
                            </Button>
                        </Animate>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={panelTransition}
                    >
                        <Animate variant="up" delay={0.18} duration={0.62}>
                            <h2 className="pb-2 font-semibold tracking-tight text-gray-900 text-[26px] sm:text-3xl">
                                Reset password
                            </h2>
                        </Animate>
                        <Animate variant="up" delay={0.28} duration={0.68}>
                            <p className="max-w-md text-pretty text-sm leading-normal text-gray-600 sm:max-w-lg sm:text-[15px] hidden sm:block">
                                Enter your new password twice to confirm. Then sign in with the updated credentials.
                            </p>
                            <p className="max-w-md text-pretty text-sm leading-normal text-gray-600 sm:max-w-lg sm:text-[15px] block sm:hidden">
                                Enter and confirm a new password, then sign in again.
                            </p>
                        </Animate>
                        <Animate variant="up" delay={0.38} duration={0.72}>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-7">
                                <Input
                                    id="reset-password"
                                    label="New password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    labelVariant="auth"
                                    required
                                    minLength={8}
                                />
                                <Input
                                    id="reset-password-confirm"
                                    label="Confirm password"
                                    name="passwordConfirm"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    labelVariant="auth"
                                    required
                                    minLength={8}
                                />
                                <p className="text-xs leading-relaxed text-gray-500">
                                    Use at least 8 characters. Prefer a mix of letters, numbers, and symbols.
                                </p>
                                <div className="pt-2">
                                    <Button type="submit" className="w-full" size="lg">
                                        <KeyRound className="mr-1 h-4 w-4" />
                                        Save new password
                                    </Button>
                                </div>
                            </form>
                        </Animate>
                        <Animate variant="up" delay={0.48} duration={0.72}>
                            <p className="px-1 pt-4 text-center text-sm leading-snug text-gray-600 sm:px-0">
                                Need a new link?{" "}
                                <Button
                                    href="/forgot-password"
                                    variant="link"
                                    size="max"
                                    className="inline-flex text-sm font-semibold text-emerald-700"
                                >
                                    Request again
                                </Button>
                            </p>
                        </Animate>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ResetPasswordForm
