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
                        width={28}
                    />
                    <Tooltip
                        content={(props) => <ChartTooltip {...props} series={series} />}
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
                "min-w-[168px] overflow-hidden rounded-md border border-gray-200",
                "bg-white/95 shadow-lg backdrop-blur-sm"
            )}
        >
            <div className="border-b border-layout-separator bg-emerald-50 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Day
                </p>
                <p className="text-sm font-medium text-foreground">{label}</p>
            </div>

            <ul className="space-y-0 divide-y divide-gray-50 px-1 py-1">
                {payload.map((item) => {
                    const key = String(item.dataKey ?? item.name)
                    const color =
                        item.color ??
                        colorByKey.get(key) ??
                        (typeof item.payload === "object" && item.payload && "fill" in item.payload
                            ? String(item.payload.fill)
                            : "#059669")

                    return (
                        <li
                            key={key}
                            className="flex items-center justify-between gap-4 rounded-md px-2 py-2"
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <span
                                    className="h-2 w-2 shrink-0 rounded-full ring-2 ring-white"
                                    style={{ backgroundColor: color }}
                                    aria-hidden
                                />
                                <span className="truncate text-xs text-gray-600">{item.name}</span>
                            </span>
                            <span className="shrink-0 text-xs font-semibold tabular-nums text-gray-900">
                                {(item.value as number).toLocaleString()}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

