"use client"

import { useCallback, useRef, type RefObject } from "react"

export type UseScrollIntoViewOptions = {
    /** Top inset inside the scroll container. Default 96. */
    offset?: number
    behavior?: ScrollBehavior
}

function findScrollContainer(el: HTMLElement): HTMLElement | null {
    let node = el.parentElement
    while (node) {
        const { overflowY } = getComputedStyle(node)
        if (
            (overflowY === "auto" || overflowY === "scroll") &&
            node.scrollHeight > node.clientHeight
        ) {
            return node
        }
        node = node.parentElement
    }
    return null
}

/**
 * Scrolls a target into view within the nearest scrollable ancestor
 * (e.g. dashboard main panel), not the window.
 */
export function useScrollIntoView<T extends HTMLElement = HTMLDivElement>(
    options?: UseScrollIntoViewOptions
): {
    ref: RefObject<T>
    scrollIntoView: (target?: T | null) => void
} {
    const ref = useRef<T>(null)
    const { offset = 96, behavior = "smooth" } = options ?? {}

    const scrollIntoView = useCallback(
        (target?: T | null) => {
            const el = target ?? ref.current
            if (!el) return

            const container = findScrollContainer(el)
            if (!container) {
                el.scrollIntoView({ behavior, block: "start" })
                return
            }

            const elTop = el.getBoundingClientRect().top
            const containerTop = container.getBoundingClientRect().top
            const nextTop = container.scrollTop + (elTop - containerTop) - offset
            container.scrollTo({ top: Math.max(0, nextTop), behavior })
        },
        [offset, behavior]
    )

    return { ref, scrollIntoView }
}
