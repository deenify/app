"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils/clsx"
import { DashboardGoalItem, GoalVariants } from "./content"

type DashboardDailyProgressProps = {
    goals: DashboardGoalItem[]
}

export function DashboardDailyProgress({ goals }: DashboardDailyProgressProps) {
    return (
        <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-base font-medium sm:text-lg">Daily progression</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-4">
                {goals.map((goal) => {
                    const tone = GoalVariants[goal.tone]
                    const Icon = goal.icon

                    return (
                        <div key={goal.label} className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-gray-600">
                                <span className="flex items-center gap-1.5">
                                    <Icon className={cn("h-3.5 w-3.5", tone.text)} />
                                    {goal.label}
                                </span>
                                <span className={tone.text}>{goal.value}%</span>
                            </div>
                            <Progress
                                value={goal.value}
                                className={cn("h-2", tone.track)}
                                classNames={{ indicator: tone.indicator }}
                            />
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
