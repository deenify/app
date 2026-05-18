import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import * as content from './content'
import type { TestimonialType } from './content'

const TestimonialSection = () => {
    const TESTIMONIALS = content.TESTIMONIALS as TestimonialType[]

    return (
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <Badge variant="solid" className="mb-4">
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">Loved by Muslims Worldwide</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join thousands of believers who have transformed their spiritual journey with our app.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-50 to-transparent pointer-events-none z-10" />

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                            <Card
                                key={testimonial.name}
                                className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-2xl transition-all duration-300 h-full border border-emerald-100/50 group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                <CardContent className="p-6 relative z-10">
                                    <div className="mb-4">
                                        <Quote className="h-10 w-10 text-emerald-300 mb-3" />
                                        <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                                    </div>
                                    <div className="flex items-center space-x-3 pt-4 border-t border-emerald-100">
                                        <Avatar className="h-12 w-12 ring-2 ring-emerald-200">
                                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                                                {testimonial.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h4 className="text-gray-900 font-medium">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                                        </div>
                                        <div className="flex">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                            <Card
                                key={testimonial.name}
                                className="relative overflow-hidden bg-gradient-to-br from-white to-teal-50/30 hover:shadow-2xl transition-all duration-300 h-full border border-teal-100/50 group"
                            >
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-teal-400/10 to-emerald-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                <CardContent className="p-6 relative z-10">
                                    <div className="mb-4">
                                        <Quote className="h-10 w-10 text-teal-300 mb-3" />
                                        <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                                    </div>
                                    <div className="flex items-center space-x-3 pt-4 border-t border-teal-100">
                                        <Avatar className="h-12 w-12 ring-2 ring-teal-200">
                                            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
                                                {testimonial.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h4 className="text-gray-900 font-medium">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                                        </div>
                                        <div className="flex">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection