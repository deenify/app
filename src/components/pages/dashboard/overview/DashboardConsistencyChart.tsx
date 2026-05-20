"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardAreaChart } from "@/components/shared/charts/DashboardAreaChart"
import type { DashboardChartSeries } from "@/components/shared/charts/DashboardAreaChart"

type DashboardConsistencyChartProps = {
    title: string
    description: string
    data: Record<string, string | number>[]
    series: DashboardChartSeries[]
}

export function DashboardConsistencyChart({
    title,
    description,
    data,
    series,
}: DashboardConsistencyChartProps) {
    return (
        <Card className="border border-gray-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <CardHeader className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-start sm:justify-between p-4">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium sm:text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer text-[10px]">
                        7 days
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer text-[10px] text-gray-400">
                        30 days
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="px-2 pb-4 sm:px-4 sm:pb-6">
                <DashboardAreaChart
                    data={data}
                    series={series}
                    className="h-[240px] sm:h-[300px]"
                />
            </CardContent>
        </Card>
    )
}
