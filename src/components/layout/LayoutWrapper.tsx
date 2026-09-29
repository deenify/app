"use client"

import { ReactNode } from "react"

interface LayoutWrapperProps {
    readonly children: ReactNode
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    return <div className="layout">{children}</div>
}

export default LayoutWrapper
