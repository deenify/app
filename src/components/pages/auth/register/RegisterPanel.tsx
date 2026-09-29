"use client"

import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import { clientEnv } from "@/env/client"
import RegisterForm from "./RegisterForm"

const RegisterPanel = () => {
    return (
        <div>
            <Animate variant="up" delay={0.18} duration={0.62}>
                <h2 className="pb-2 font-semibold tracking-tight text-gray-900 text-[26px] sm:text-3xl">
                    Create Account
                </h2>
            </Animate>
            <Animate variant="up" delay={0.28} duration={0.68}>
                <p className="max-w-md text-pretty text-sm leading-normal text-gray-600 sm:max-w-lg sm:text-[15px] hidden sm:block">
                    Join {clientEnv.APP_NAME} to sync Quran reading, Hadith study, and learning—with personalized tracking across your devices.
                </p>
                <p className="max-w-md text-pretty text-sm leading-normal text-gray-600 sm:max-w-lg sm:text-[15px] block sm:hidden">
                    Sync Quran, Hadith, and learning with personalized progress on every device.
                </p>
            </Animate>
            <Animate variant="up" delay={0.38} duration={0.72}>
                <RegisterForm className="mt-6 sm:mt-7" />
            </Animate>
            <Animate variant="up" delay={0.48} duration={0.72}>
                <p className="px-1 pt-4 text-center text-sm leading-snug text-gray-600 sm:px-0">
                    Already have an account?{" "}
                    <Button
                        href="/login"
                        variant="link"
                        size="max"
                        className="inline-flex text-sm font-semibold text-emerald-700"
                    >
                        Sign in
                    </Button>
                </p>
            </Animate>
        </div>
    )
}

export default RegisterPanel
