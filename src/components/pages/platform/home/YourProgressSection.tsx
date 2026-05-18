"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils/clsx'
import { Target } from 'lucide-react'
import { BarChart3 } from 'lucide-react'
import { Bar, Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { BarChart } from 'recharts'
import { CartesianGrid } from 'recharts'
import { XAxis } from 'recharts'
import { YAxis } from 'recharts'
import { Tooltip } from 'recharts'
import { Progress } from '@/components/ui/progress'
import {
    YourProgressTrackingPointStats,
    YourProgressTodayGoals,
    YourProgressActivityDistribution,
    YourProgressWeeklyActivity
} from './content'


const YourProgressSection = () => {
    const TrackingPointStats = YourProgressTrackingPointStats
    const WeeklyActivity = YourProgressWeeklyActivity
    const ActivityDistribution = YourProgressActivityDistribution
    const TodayGoals = YourProgressTodayGoals

    return (
        <section className="py-20 bg-white">
            <div className="container space-y-8">
                <div className="text-center mb-8">
                    <Badge variant="blue" className="mb-4">
                        Your Progress
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">Track Your Spiritual Journey</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Monitor your daily Islamic activities and see your progress over time
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TrackingPointStats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.label}>
                                <CardContent className="p-6">
                                    <div className={cn("inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3", stat.bgColor)}>
                                        <Icon className={cn("h-5 w-5", stat.iconColor)} />
                                    </div>
                                    <div className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BarChart3 className="h-5 w-5 text-emerald-600" />
                                <span>Weekly Activity</span>
                            </CardTitle>
                            <CardDescription>Your activities over the past week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={WeeklyActivity}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="prayers" fill="#10b981" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="quran" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Target className="h-5 w-5 text-purple-600" />
                                <span>Activity Distribution</span>
                            </CardTitle>
                            <CardDescription>Breakdown of your Islamic practices</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={ActivityDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: { name: string; percent: number }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {ActivityDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Today's Goals</CardTitle>
                        <CardDescription>Track your daily Islamic practices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {TodayGoals.map((goal) => (
                            <div key={goal.label} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{goal.label}</span>
                                    <span className="text-gray-900 font-medium">
                                        {goal.current}/{goal.total}
                                    </span>
                                </div>
                                <Progress value={goal.value} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default YourProgressSection