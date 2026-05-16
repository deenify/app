import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { WhyChooseUsFeatureType, WhyChooseUsStatType } from './content'

interface WhyChooseUsSectionType {
    FEATURES: WhyChooseUsFeatureType[]
    STATS: WhyChooseUsStatType[]
}

const WhyChooseUsSection = ({ FEATURES, STATS }: WhyChooseUsSectionType) => {
    return (
        <section className="bg-gradient-to-br from-emerald-600 to-teal-600 py-20">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge variant="outline" className="mb-4 bg-white/20 text-white border-white/30">
                            Why Choose Us
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">The Most Complete Islamic App</h2>
                        <p className="text-emerald-50 mb-8">
                            Join millions of Muslims worldwide who trust our application for their daily Islamic needs. Built with care
                            and attention to Islamic principles.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {FEATURES.map((feature) => (
                                <div key={feature} className="flex items-center space-x-2 text-white">
                                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <span className="text-emerald-50">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {STATS.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <Card key={stat.title} className="bg-white/10 backdrop-blur border-white/20">
                                    <CardContent className="p-6 text-center">
                                        <Icon className="h-8 w-8 text-white mx-auto mb-3" />
                                        <h3 className="text-white mb-2 font-medium">{stat.title}</h3>
                                        <p className="text-sm text-emerald-50">{stat.desc}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUsSection