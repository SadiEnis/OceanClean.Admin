import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type { EconomyCurrencyFlowPoint } from '@/features/economy/types'
import { chartSeries } from '@/lib/chart-config'

type EconomyCurrencyFlowChartProps = {
    points: EconomyCurrencyFlowPoint[]
}

export function EconomyCurrencyFlowChart({
                                             points,
                                         }: EconomyCurrencyFlowChartProps) {
    if (points.length === 0) {
        return (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No currency flow data available for this range.
            </div>
        )
    }

    return (
        <div className="h-72 w-full">
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
                        dataKey="earnedAmount"
                        name={chartSeries.economy.currencyEarned.label}
                        stroke={chartSeries.economy.currencyEarned.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="spentAmount"
                        name={chartSeries.economy.currencySpent.label}
                        stroke={chartSeries.economy.currencySpent.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="netAmount"
                        name={chartSeries.economy.netCurrency.label}
                        stroke={chartSeries.economy.netCurrency.color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}