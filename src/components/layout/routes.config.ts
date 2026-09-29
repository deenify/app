// components/layout/marketing/content.ts

/** Public marketing site routes (route group: (marketing)). */
export const MARKETING_ROUTES = [
    "/",
    "/about",
    "/features",
    "/pricing",
    "/faqs",
    "/contact",
    "/blog",
    "/terms",
    "/privacy",
] as const


/** Authenticated app shell routes (route groups: (dashboard) + profile). */
export const DASHBOARD_ROUTES = [
    "/dashboard",
    "/calendar",
    "/dhikr",
    "/donate",
    "/guides",
    "/hadith",
    "/history",
    "/miracles",
    "/pillars",
    "/prayer",
    "/prophets",
    "/qibla",
    "/quran",
    "/revert",
    "/stories",
    "/supplications",
    "/support",
    "/profile",
] as const


/** Auth route group: (auth) */
export const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"] as const


/** Route types */
export type MarketingRoute = (typeof MARKETING_ROUTES)[number]
export type DashboardRoute = (typeof DASHBOARD_ROUTES)[number]
export type AuthRoute = (typeof AUTH_ROUTES)[number]


// Helpers
export const isRouteMatch = (pathname: string, route: string): boolean => {
    if (route === "/") return pathname === "/"
    return pathname === route || pathname.startsWith(`${route}/`)
}


export const matchesAnyRoute = (
    pathname: string,
    routes: readonly string[]
): boolean => routes.some((route) => isRouteMatch(pathname, route))


export const isMarketingRoute = (pathname: string): boolean =>
    matchesAnyRoute(pathname, MARKETING_ROUTES)


export const isDashboardRoute = (pathname: string): boolean =>
    matchesAnyRoute(pathname, DASHBOARD_ROUTES)


export const isAuthRoute = (pathname: string): boolean =>
    matchesAnyRoute(pathname, AUTH_ROUTES)
