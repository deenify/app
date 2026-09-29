"use client"

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import type { TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { cn } from "@/lib/utils/clsx"

export type DashboardChartSeries = {
    dataKey: string
    label: string
    color: string
    gradientId: string
    strokeWidth?: number
    dashed?: boolean
}

type DashboardAreaChartProps = {
    data: Record<string, string | number>[]
    series: DashboardChartSeries[]
    xKey?: string
    height?: number
    className?: string
}

export function DashboardAreaChart({
    data,
    series,
    xKey = "name",
    height = 280,
    className,
}: DashboardAreaChartProps) {
    return (
        <div className={cn("w-full", className)} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <defs>
                        {series.map((s) => (
                            <linearGradient key={s.gradientId} id={s.gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={s.color} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={s.color} stopOpacity={0.01} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey={xKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
                        dy={8}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
                        width={37}
                    />
                    <Tooltip
                        content={(props) =>
                            <ChartTooltip {...props} series={series} />
                        }
                        wrapperClassName="pointer-events-none"
                        cursor={{ stroke: "#d1d5db", strokeWidth: 1, strokeDasharray: "4 4" }}
                    />
                    {series.map((s) => (
                        <Area
                            key={s.dataKey}
                            type="monotone"
                            dataKey={s.dataKey}
                            name={s.label}
                            stroke={s.color}
                            strokeWidth={s.strokeWidth ?? 2}
                            strokeDasharray={s.dashed ? "5 5" : undefined}
                            fillOpacity={1}
                            fill={`url(#${s.gradientId})`}
                            activeDot={{ r: 5, strokeWidth: 0, fill: s.color }}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}


type ChartTooltipProps = TooltipProps<ValueType, NameType> & {
    series: DashboardChartSeries[]
}

function ChartTooltip({ active, payload, label, series }: ChartTooltipProps) {
    if (!active || !payload?.length) return null

    const colorByKey = new Map(series.map((s) => [s.dataKey, s.color]))

    return (
        <div
            className={cn(
                "min-w-[130px] rounded-md px-2.5 py-2 pointer-events-none",
                "backdrop-blur-[6px] bg-white/40 select-none user-select-none",
                "border border-layout-separator shadow-sm"
            )}
        >
            <div className="pb-1 text-xs font-medium tracking-wide text-gray-400">
                {label}
            </div>

            <div className="space-y-1">
                {payload.map((item) => {
                    const key = String(item.dataKey ?? item.name)
                    const color = item.color ?? colorByKey.get(key) ?? "#94a3b8"

                    return (
                        <div
                            key={key}
                            className="flex items-center justify-between gap-2"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <span
                                    className="h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="truncate text-[11px] text-gray-600">
                                    {item.name}
                                </span>
                            </div>

                            <span className="text-[11px] font-medium text-gray-900 tabular-nums">
                                {typeof item.value === "number"
                                    ? item.value.toLocaleString()
                                    : item.value}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

