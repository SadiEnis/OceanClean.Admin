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

type DashboardMetricChartProps = {
    points: DashboardActivityPoint[]
    dataKey: keyof DashboardActivityPoint
    label: string
    color: string
}

export function DashboardMetricChart({
                                         points,
                                         dataKey,
                                         label,
                                         color,
                                     }: DashboardMetricChartProps) {
    if (points.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No data available for this range.
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
                        dataKey={dataKey}
                        name={label}
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}