import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FeaturesSectionFeatureType } from './content'

const FeatureSection = ({ FEATURES }: { FEATURES: FeaturesSectionFeatureType[] }) => {
    return (
        <section className="bg-gradient-to-br from-gray-50 to-emerald-50/30 py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <Badge variant="emerald" className="mb-4">
                        Features
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">
                        Everything You Need for Your Islamic Journey
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive tools and resources designed to help you practice and strengthen your faith daily.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <Card key={feature.title} className="hover:shadow-lg transition-shadow border-emerald-100 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-emerald-700" />
                                    </div>
                                    <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeatureSection