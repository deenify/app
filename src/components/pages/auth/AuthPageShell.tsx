type AuthPageShellProps = {
    children: React.ReactNode
    className?: string
}

/** Shared auth page backdrop + container. */
const AuthPageShell = ({ children, className }: AuthPageShellProps) => {
    return (
        <section
            className={
                className ??
                "relative flex w-full flex-1 flex-col items-center justify-center py-5 xs:py-6 sm:py-8 lg:py-10"
            }
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-8 top-4 h-48 w-48 rounded-full bg-emerald-100/80 blur-3xl xs:left-4 xs:h-56 xs:w-56 sm:left-10 sm:top-8 sm:h-72 sm:w-72" />
                <div className="absolute -right-16 top-1/4 h-64 w-64 rounded-full bg-teal-100/80 blur-3xl xs:-right-8 sm:right-0 sm:top-1/3 sm:h-96 sm:w-96" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/70" />
            </div>

            <div className="container">
                <main className="relative mx-auto w-full max-w-xl lg:max-w-5xl">{children}</main>
            </div>
        </section>
    )
}

export default AuthPageShell
