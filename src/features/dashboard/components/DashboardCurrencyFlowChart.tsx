import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type { DashboardActivityPoint } from '@/features/dashboard/types'
import { chartSeries } from '@/lib/chart-config'

type DashboardCurrencyFlowChartProps = {
    points: DashboardActivityPoint[]
}

export function DashboardCurrencyFlowChart({
                                               points,
                                           }: DashboardCurrencyFlowChartProps) {
    if (points.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No currency data available for this range.
            </div>
        )
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={points}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="bucket"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        fontSize={12}
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        fontSize={12}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="currencyEarned"
                        name={chartSeries.dashboard.currencyEarned.label}
                        stroke={chartSeries.dashboard.currencyEarned.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="currencySpent"
                        name={chartSeries.dashboard.currencySpent.label}
                        stroke={chartSeries.dashboard.currencySpent.color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}