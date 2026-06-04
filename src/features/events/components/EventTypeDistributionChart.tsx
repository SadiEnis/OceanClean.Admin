import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type { EventActionTypeCount } from '@/features/events/types'
import { chartSeries } from '@/lib/chart-config'

type EventTypeDistributionChartProps = {
    data: EventActionTypeCount[]
}

function getLabel(actionType: string) {
    switch (actionType) {
        case 'pickup_trash':
            return chartSeries.events.pickupTrash.label
        case 'recycle_trash':
            return chartSeries.events.recycleTrash.label
        case 'revive_player':
            return chartSeries.events.revivePlayer.label
        case 'player_fainted':
            return chartSeries.events.playerFainted.label
        case 'use_item':
            return chartSeries.events.useItem.label
        case 'rescue_started':
            return chartSeries.events.rescueStarted.label
        case 'rescue_completed':
            return chartSeries.events.rescueCompleted.label
        default:
            return actionType
    }
}

function buildRows(data: EventActionTypeCount[]) {
    return data.map((item) => ({
        actionType: getLabel(item.actionType),
        eventCount: item.eventCount,
    }))
}

export function EventTypeDistributionChart({
                                               data,
                                           }: EventTypeDistributionChartProps) {
    if (data.length === 0) {
        return (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No event distribution data available for this range.
            </div>
        )
    }

    const rows = buildRows(data)

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rows} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />

                    <YAxis
                        type="category"
                        dataKey="actionType"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        fontSize={12}
                        width={130}
                    />

                    <Tooltip />

                    <Bar dataKey="eventCount" name="Events" radius={[0, 6, 6, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}