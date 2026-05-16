"use client";

import LabelCheckbox from '@/components/shared/LabelCheckbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/clsx'
import React, { useState } from 'react'

interface RegisterFormProps {
    className?: string
}

const RegisterForm = ({ className }: RegisterFormProps) => {
    const [TermsAccepted, setTermsAccepted] = useState<boolean>(false)

    return (
        <form className={cn("space-y-4", className)}>
            <Input
                id="register-name"
                label="Full name"
                labelVariant="auth"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
            />
            <Input
                id="register-email"
                label="Email"
                labelVariant="auth"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
            />
            <Input
                id="register-password"
                label="Password"
                labelVariant="auth"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                required
                minLength={8}
            />
            <Input
                id="register-password-confirm"
                label="Confirm password"
                labelVariant="auth"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                required
                minLength={8}
            />

            <LabelCheckbox
                id="register-terms"
                name="terms"
                checked={TermsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                required
                variant="outline-emerald"
                size="sm"
            >
                I agree to the{" "}
                <Button
                    href="/terms"
                    variant="link"
                    size="max"
                    className="inline h-auto min-h-0 px-0 py-0 align-baseline text-sm font-semibold text-emerald-700"
                >
                    Terms
                </Button>{" "}
                and{" "}
                <Button
                    href="/privacy"
                    variant="link"
                    size="max"
                    className="inline h-auto min-h-0 px-0 py-0 align-baseline text-sm font-semibold text-emerald-700"
                >
                    Privacy Policy
                </Button>
                .
            </LabelCheckbox>

            <div className="pt-2">
                <Button type="submit" className="w-full" size="lg">
                    Create account
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm