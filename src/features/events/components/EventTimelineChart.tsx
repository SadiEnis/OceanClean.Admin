import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type { EventTimelinePoint } from '@/features/events/types'
import { chartSeries } from '@/lib/chart-config'

type EventTimelineChartProps = {
    points: EventTimelinePoint[]
}

export function EventTimelineChart({ points }: EventTimelineChartProps) {
    if (points.length === 0) {
        return (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No event timeline data available for this range.
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
                        dataKey="pickupTrash"
                        name={chartSeries.events.pickupTrash.label}
                        stroke={chartSeries.events.pickupTrash.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="recycleTrash"
                        name={chartSeries.events.recycleTrash.label}
                        stroke={chartSeries.events.recycleTrash.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="revivePlayer"
                        name={chartSeries.events.revivePlayer.label}
                        stroke={chartSeries.events.revivePlayer.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="playerFainted"
                        name={chartSeries.events.playerFainted.label}
                        stroke={chartSeries.events.playerFainted.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="useItem"
                        name={chartSeries.events.useItem.label}
                        stroke={chartSeries.events.useItem.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="rescueStarted"
                        name={chartSeries.events.rescueStarted.label}
                        stroke={chartSeries.events.rescueStarted.color}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        type="monotone"
                        dataKey="rescueCompleted"
                        name={chartSeries.events.rescueCompleted.label}
                        stroke={chartSeries.events.rescueCompleted.color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}