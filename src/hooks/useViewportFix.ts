"use client"

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react"
import { usePathname } from "next/navigation"

const SCROLL_PANEL = "[data-app-scroll]"
const BOTTOM_SAFE_PADDING = 24
const TOP_SAFE_PADDING = 24
const FOCUS_SETTLE_MS = 250

// ——— Document lock state (genuine lock, like a modal — not overflow toggling) ———

let docLocked = false
let lockedScrollY = 0
let blockTouch: ((e: TouchEvent) => void) | null = null

function lockDocumentScroll(panel: HTMLElement | null) {
    if (docLocked) return
    docLocked = true

    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0

    const html = document.documentElement
    const body = document.body

    html.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${lockedScrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"

    // Allow touch scrolling inside the panel (and inside the focused field
    // itself, e.g. a multiline textarea), block it everywhere else — this is
    // the "modal is open, background can't scroll" behaviour you want.
    blockTouch = (e: TouchEvent) => {
        const target = e.target as Node | null
        if (panel && target && panel.contains(target)) return
        e.preventDefault()
    }
    document.addEventListener("touchmove", blockTouch, { passive: false })
}

function unlockDocumentScroll() {
    if (!docLocked) return
    docLocked = false

    const html = document.documentElement
    const body = document.body

    body.style.position = ""
    body.style.top = ""
    body.style.left = ""
    body.style.right = ""
    body.style.width = ""
    html.style.overflow = ""

    if (blockTouch) {
        document.removeEventListener("touchmove", blockTouch)
        blockTouch = null
    }

    // Restore exactly where we were — should always be 0 in this app since
    // html/body never scroll at rest, but this stays correct either way.
    window.scrollTo(0, lockedScrollY)
}

// ——— Scroll panel lookup ———

export function findScrollContainer(from?: HTMLElement | null): HTMLElement | null {
    if (from) {
        const el = from.closest(SCROLL_PANEL)
        if (el instanceof HTMLElement) return el
    }
    return document.querySelector(SCROLL_PANEL)
}

function resetDocumentScroll() {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

export function resetPageScroll(container?: HTMLElement | null) {
    resetDocumentScroll()
    const panel = container ?? findScrollContainer()
    if (panel) {
        panel.scrollTop = 0
        panel.scrollLeft = 0
    }
}

function getMaxScrollTop(panel: HTMLElement) {
    return Math.max(0, panel.scrollHeight - panel.clientHeight)
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

/** Target scrollTop so `field` sits fully inside the visible viewport, or null if already visible. */
function computeTargetScrollTop(field: HTMLElement, panel: HTMLElement): number | null {
    const vv = window.visualViewport
    const viewportHeight = vv ? vv.height : window.innerHeight

    const panelRect = panel.getBoundingClientRect()
    const fieldRect = field.getBoundingClientRect()

    const visibleTop = Math.max(panelRect.top, 0)
    const visibleBottom = Math.min(panelRect.bottom, viewportHeight)

    const overflowBelow = fieldRect.bottom + BOTTOM_SAFE_PADDING - visibleBottom
    const overflowAbove = visibleTop + TOP_SAFE_PADDING - fieldRect.top

    let delta = 0
    if (overflowBelow > 0) delta = overflowBelow
    else if (overflowAbove > 0) delta = -overflowAbove

    if (delta === 0) return null

    return clamp(panel.scrollTop + delta, 0, getMaxScrollTop(panel))
}

function scrollPanelToField(field: HTMLElement, panel: HTMLElement) {
    if (!panel.contains(field)) return
    const target = computeTargetScrollTop(field, panel)
    if (target === null) return
    panel.scrollTo({ top: target, behavior: "smooth" })
}

// ——— Active focus state ———

let activeField: HTMLElement | null = null
let activePanel: HTMLElement | null = null
let vvResizeHandler: (() => void) | null = null
let settleTimer: ReturnType<typeof setTimeout> | null = null

function cleanupFocusState() {
    if (window.visualViewport && vvResizeHandler) {
        window.visualViewport.removeEventListener("resize", vvResizeHandler)
    }
    vvResizeHandler = null

    if (settleTimer !== null) {
        clearTimeout(settleTimer)
        settleTimer = null
    }

    unlockDocumentScroll()

    // Fixes the "white space at bottom after unfocus" bug: content height
    // shrinks back once the keyboard closes, so re-clamp scrollTop to the
    // new (smaller) max instead of leaving it wherever the keyboard left it.
    const panel = activePanel ?? findScrollContainer()
    if (panel) {
        const maxScrollTop = getMaxScrollTop(panel)
        if (panel.scrollTop > maxScrollTop) {
            panel.scrollTo({ top: maxScrollTop, behavior: "auto" })
        }
    }

    activeField = null
    activePanel = null
}

export function onInputFocus(field: HTMLElement) {
    cleanupFocusState()

    const panel = findScrollContainer(field)

    activeField = field
    activePanel = panel

    // Genuine lock — background (html/body) truly cannot move, same as a
    // modal being open. The panel itself stays scrollable.
    lockDocumentScroll(panel)

    if (!panel) return

    // Run once immediately — covers switching focus between two fields
    // while the keyboard is already open (no resize event fires then).
    scrollPanelToField(field, panel)

    // Re-run only when the keyboard actually finishes opening/closing —
    // visualViewport 'resize' does NOT fire from scrolling the panel, so
    // this never fights the user manually scrolling.
    const handleResize = () => {
        if (activeField === field && activePanel === panel) {
            scrollPanelToField(field, panel)
        }
    }
    vvResizeHandler = handleResize
    window.visualViewport?.addEventListener("resize", handleResize)

    // One fallback pass for slow keyboard animations, then done. No polling.
    settleTimer = setTimeout(() => {
        if (activeField === field && activePanel === panel) {
            scrollPanelToField(field, panel)
        }
    }, FOCUS_SETTLE_MS)
}

export function onInputBlur() {
    cleanupFocusState()
}

// ——— Hooks (unchanged) ———

export function useScrollReset(containerId?: string) {
    const pathname = usePathname()

    useLayoutEffect(() => {
        const panel = containerId
            ? document.getElementById(containerId)
            : null

        panel?.scrollTo({ top: 0, behavior: "instant" })
        resetPageScroll(panel)
    }, [pathname, containerId])
}

export function useScrollContainer(): RefObject<Element | null> {
    const ref = useRef<Element | null>(null)
    useEffect(() => {
        ref.current = findScrollContainer()
    }, [])
    return ref
}

export function useScrollLock(active: boolean) {
    useEffect(() => {
        if (!active) return

        const panel = findScrollContainer()
        if (!panel) return

        const prev = { overflow: panel.style.overflow, touchAction: panel.style.touchAction }
        panel.style.overflow = "hidden"
        panel.style.touchAction = "none"

        return () => {
            panel.style.overflow = prev.overflow
            panel.style.touchAction = prev.touchAction
        }
    }, [active])
}