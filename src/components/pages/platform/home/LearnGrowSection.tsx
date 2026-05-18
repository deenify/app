"use client";

import React from 'react'
import { cn } from '@/lib/utils/clsx'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import * as content from './content'
import type { LearnGrowPageType } from './content'

const LearnGrowSection = () => {
    const LearnGrowPages = content.LearnGrowPages as LearnGrowPageType[]
    const router = useRouter()

    return (
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <Badge variant="purple" className="mb-4">
                        Learn & Grow
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">Deepen Your Islamic Knowledge</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore comprehensive guides and resources to strengthen your understanding of Islam
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LearnGrowPages.slice(0, 3).map((page) => {
                        const Icon = page.icon
                        return (
                            <Card
                                key={page.slug}
                                className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                                onClick={() => router.push(`/${page.slug}`)}
                            >
                                <CardContent className="p-6">
                                    <div className={cn("inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4", page.bgColor)}>
                                        <Icon className={cn("h-6 w-6", page.iconColor)} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{page.title}</h3>
                                    <p className="text-sm text-gray-600">{page.desc}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {LearnGrowPages.slice(3, 5).map((page) => {
                        const Icon = page.icon
                        return (
                            <Card
                                key={page.slug}
                                className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                                onClick={() => router.push(`/${page.slug}`)}
                            >
                                <CardContent className="p-6">
                                    <div className={cn("inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4", page.bgColor)}>
                                        <Icon className={cn("h-6 w-6", page.iconColor)} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{page.title}</h3>
                                    <p className="text-sm text-gray-600">{page.desc}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default LearnGrowSection