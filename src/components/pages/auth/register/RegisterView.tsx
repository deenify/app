"use client"

import AuthSplitCard from "@/components/pages/auth/AuthSplitCard"
import { REGISTER_HIGHLIGHTS } from "@/components/pages/auth/content"
import RegisterPanel from "@/components/pages/auth/register/RegisterPanel"

const RegisterView = () => {
    return (
        <AuthSplitCard
            sideTitle="Begin your path with clarity and consistency"
            sideDescription="Create a free account to track Quran, Hadith, and personal growth in one calm place."
            highlights={REGISTER_HIGHLIGHTS}
            sideTitleClassName="text-xl xs:text-[22px] sm:text-2xl"
        >
            <RegisterPanel />
        </AuthSplitCard>
    )
}

export default RegisterView
