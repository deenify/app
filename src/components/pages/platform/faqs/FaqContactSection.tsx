"use client"

import { Mail } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import { clientEnv } from "@/env/client"

const FaqContactSection = () => {
    return (
        <section className="bg-white py-14 sm:py-20">
            <div className="container">
                <div className="mx-auto max-w-3xl rounded-md border border-emerald-100 bg-gradient-to-br 
                from-emerald-50/80 via-white to-white px-6 py-10 text-center sm:rounded-2xl sm:px-10 sm:py-12">
                    <Animate variant="up" animate="while_in_view" delay={0.3} duration={0.88}>
                        <Mail className="mx-auto h-6 w-6 text-emerald-600" />
                        <h2 className="mt-4 font-heading text-2xl font-semibold text-gray-900 sm:text-3xl">
                            Still have a question?
                        </h2>
                        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
                            Our support team responds with the same clarity we aim for in the product —
                            reach out or visit the contact page for longer inquiries.
                        </p>
                        <div className="mt-6 flex flex-col items-center justify-center gap-3 xs:flex-row">
                            <Button
                                variant="default"
                                href="/contact"
                                className="h-10 w-full rounded-md px-8 text-sm font-medium sm:h-11 sm:rounded-full xs:w-auto"
                            >
                                Contact us
                            </Button>
                            <Button
                                variant="outline-emerald"
                                href={`mailto:${clientEnv.APP_SUPPORT_EMAIL}`}
                                className="h-10 w-full rounded-md px-8 text-sm font-medium sm:h-11 sm:rounded-full xs:w-auto"
                            >
                                Email support
                            </Button>
                        </div>
                    </Animate>
                </div>
            </div>
        </section>
    )
}

export default FaqContactSection
