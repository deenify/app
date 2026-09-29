import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/clsx'
import React from 'react'

interface LoginFormProps {
    className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
    return (
        <form className={cn("space-y-4", className)}>
            <Input
                id="login-email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                labelVariant="auth"
                required
            />
            <Input
                id="login-password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                labelVariant="auth"
                required
            />
            <div className="flex justify-end pt-0.5">
                <Button
                    href="/forgot-password"
                    variant="ghost"
                    size="max"
                    className="text-xs font-normal text-gray-500 hover:bg-transparent hover:text-emerald-700"
                >
                    Forgot password?
                </Button>
            </div>
            <div className="pt-2">
                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                >
                    Sign in
                </Button>
            </div>
        </form>
    )
}

export default LoginForm