import type { ViewportOptions } from "framer-motion"
import type { RefObject } from "react"

/** Shared easing for Animate and Stagger transitions. */
export const motionEase = [0.22, 1, 0.36, 1] as const

/** Safe defaults for whileInView — trigger early, before content reaches mid-screen. */
export const defaultInViewViewport: ViewportOptions = {
    once: true,
    amount: 0.027,
    margin: "0px 0px 15% 0px",
}

/**
 * Merges section overrides with defaults and attaches the layout scroll root
 * so whileInView observes the correct container (not the browser window).
 */
export function resolveInViewViewport(
    overrides?: ViewportOptions,
    scrollRoot?: RefObject<Element | null> | null,
): ViewportOptions {
    return {
        ...defaultInViewViewport,
        ...overrides,
        ...(scrollRoot ? { root: scrollRoot } : {}),
    }
}
