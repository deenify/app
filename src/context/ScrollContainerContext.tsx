"use client"

import {
    createContext,
    useContext,
    type ReactNode,
    type RefObject,
} from "react"

const ScrollContainerContext = createContext<RefObject<Element | null> | null>(null)

type ScrollContainerProviderProps = {
    containerRef: RefObject<Element | null>
    children: ReactNode
}

export function ScrollContainerProvider({
    containerRef,
    children,
}: ScrollContainerProviderProps) {
    return (
        <ScrollContainerContext.Provider value={containerRef}>
            {children}
        </ScrollContainerContext.Provider>
    )
}

export function useScrollContainer() {
    return useContext(ScrollContainerContext)
}
