"use client"

import React, { ReactNode } from "react"
import AuthHeader from "./header/AuthHeader"
import { useScrollReset } from "@/hooks/useViewportFix"

interface AuthLayoutWrapperProps {
    readonly children: ReactNode
}

const AUTH_SCROLL_ID = "auth-layout-wrapper-scroll-container"

const AuthLayoutWrapper = ({ children }: AuthLayoutWrapperProps) => {
    useScrollReset(AUTH_SCROLL_ID)

    return (
        <div
            id={AUTH_SCROLL_ID}
            data-app-scroll
            className="app-scroll scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
            <div className="sticky inset-x-0 top-0 z-50">
                <AuthHeader />
            </div>
            <main className="flex flex-1 flex-col items-center justify-center">
                {children}
            </main>
        </div>
    )
}

export default AuthLayoutWrapper
