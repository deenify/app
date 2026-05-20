"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { DashboardActivityRow } from "./content"

type DashboardRecentActivityProps = {
    items: DashboardActivityRow[]
}

export function DashboardRecentActivity({ items }: DashboardRecentActivityProps) {
    return (
        <Card className="border border-gray-200 shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-2 p-4">
                <CardTitle className="text-base font-medium sm:text-lg">Recent activity</CardTitle>
                <Button type="button" variant="ghost-emerald" size="sm" className="text-xs">
                    View history
                </Button>
            </CardHeader>
            <CardContent className="p-0 sm:p-0">
                {/* Mobile: stacked cards */}
                <ul className="divide-y divide-gray-100 md:hidden">
                    {items.map((item) => (
                        <li key={item.activity} className="space-y-2 px-4 py-3.5">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                                <span className="shrink-0 text-sm font-semibold text-emerald-600">
                                    {item.points}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="text-[10px]">
                                    {item.category}
                                </Badge>
                                <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Desktop: table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Activity
                                </th>
                                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Category
                                </th>
                                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Time
                                </th>
                                <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                                    Rewards
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr
                                    key={item.activity}
                                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                                >
                                    <td className="px-4 py-3.5 font-medium text-gray-900">{item.activity}</td>
                                    <td className="px-4 py-3.5">
                                        <Badge variant="outline" className="text-[10px]">
                                            {item.category}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3.5 text-xs text-gray-500">{item.time}</td>
                                    <td className="px-4 py-3.5 text-right font-semibold text-emerald-600">
                                        {item.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
