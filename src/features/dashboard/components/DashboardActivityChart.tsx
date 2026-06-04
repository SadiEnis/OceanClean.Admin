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
import { ChartLegend } from '@/components/charts/ChartLegend'
import { chartSeries } from '@/lib/chart-config'

type DashboardActivityChartProps = {
    points: DashboardActivityPoint[]
}

export function DashboardActivityChart({ points }: DashboardActivityChartProps) {
    if (points.length === 0) {
        return (
            <div className="flex h-80 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No activity data available for this range.
            </div>
        )
    }

    return (
        <div className="h-80 w-full">
            <ChartLegend
                items={[
                    chartSeries.dashboard.currencyEarned,
                    chartSeries.dashboard.currencySpent,
                    chartSeries.dashboard.gameplayEvents,
                    chartSeries.dashboard.itemPurchases,
                    chartSeries.dashboard.matchesPlayed,
                    chartSeries.dashboard.newPlayers,
                    chartSeries.dashboard.playerLogins,
                ]}
            />
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
                        dataKey="newPlayers"
                        name={chartSeries.dashboard.newPlayers.label}
                        stroke={chartSeries.dashboard.newPlayers.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="playerLogins"
                        name={chartSeries.dashboard.playerLogins.label}
                        stroke={chartSeries.dashboard.playerLogins.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="matchesPlayed"
                        name={chartSeries.dashboard.matchesPlayed.label}
                        stroke={chartSeries.dashboard.matchesPlayed.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="itemPurchases"
                        name={chartSeries.dashboard.itemPurchases.label}
                        stroke={chartSeries.dashboard.itemPurchases.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="gameplayEvents"
                        name={chartSeries.dashboard.gameplayEvents.label}
                        stroke={chartSeries.dashboard.gameplayEvents.color}
                        strokeWidth={2}
                        dot={false}
                    />

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