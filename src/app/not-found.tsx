"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';
import React from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useRouter } from 'next/navigation';

const Page = () => {
    const isMdDown = useBreakpoint("md", "down")
    const router = useRouter()

    return (
        <section className='w-full min-h-[100dvh] md:py-10 py-8 flex items-center'>
            <div className='container relative w-full h-max translate-y-[25%]'>

                {/* subtle 404 */}
                <div className="pointer-events-none absolute -top-[76%] left-1/2 -translate-x-1/2 w-max">
                    <span className="text-[12rem] font-semibold tracking-tight text-gray-200 select-none">
                        404
                    </span>
                </div>

                {/* content  */}
                <main className='w-full h-max md:max-w-lg max-w-md mx-auto flex flex-col items-center text-center relative z-10
                bg-gradient-to-b from-transparent via-white to-white'>
                    <Badge
                        variant="secondary"
                        className='mb-3 border border-gray-300 text-emerald-800 gap-1 py-[3px] px-3'
                    >
                        <span className='text-emerald-800 w-1.5 h-1.5 rounded-full bg-emerald-700' />
                        Page Not Found
                    </Badge>

                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        We can’t find that page
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                        {!isMdDown
                            ? `The page you are looking for may have been moved, deleted, or does not exist.
                               Please verify the URL or return to the dashboard.`
                            : `The page may have been moved or no longer exists.
                               Check the URL or return home.`}
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                        <Button
                            onClick={() => router.back()}
                            variant="outline"
                            className='gap-1 group'
                        >
                            <ChevronLeft
                                size={16}
                                strokeWidth={2}
                                className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform duration-200"
                            />
                            Go Back
                        </Button>
                        <Button
                            href="/"
                            onClick={() => router.push("/")}
                            className='gap-2'
                        >
                            <Home
                                size={16}
                                strokeWidth={2}
                                className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform duration-200"
                            />
                            Home
                        </Button>

                    </div>
                </main>
            </div>
        </section>
    )

}

export default Page