import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type { PlayerItemTimeseriesPoint } from '@/features/players/types'
import { chartSeries } from '@/lib/chart-config'

type PlayerItemTimeseriesChartProps = {
    points: PlayerItemTimeseriesPoint[]
    valueKey: 'purchasedQuantity' | 'usedQuantity'
}

const itemColorPalette = [
    '#2563eb',
    '#16a34a',
    '#9333ea',
    '#f97316',
    '#06b6d4',
    '#ef4444',
    '#eab308',
    '#64748b',
]

function buildChartRows(
    points: PlayerItemTimeseriesPoint[],
    valueKey: 'purchasedQuantity' | 'usedQuantity'
) {
    const rowsByBucket = new Map<string, Record<string, string | number>>()

    for (const point of points) {
        const existing = rowsByBucket.get(point.bucket) ?? {
            bucket: point.bucket,
        }

        existing[point.itemCode] = point[valueKey]
        rowsByBucket.set(point.bucket, existing)
    }

    return Array.from(rowsByBucket.values())
}

function getUniqueItems(points: PlayerItemTimeseriesPoint[]) {
    const items = new Map<string, { itemCode: string; itemName: string }>()

    for (const point of points) {
        if (!items.has(point.itemCode)) {
            items.set(point.itemCode, {
                itemCode: point.itemCode,
                itemName: point.itemName,
            })
        }
    }

    return Array.from(items.values())
}

export function PlayerItemTimeseriesChart({
                                              points,
                                              valueKey,
                                          }: PlayerItemTimeseriesChartProps) {
    if (points.length === 0) {
        return (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No item timeseries data available for this range.
            </div>
        )
    }

    const chartRows = buildChartRows(points, valueKey)
    const items = getUniqueItems(points)

    const fallbackColor =
        valueKey === 'purchasedQuantity'
            ? chartSeries.economy.purchasedQuantity.color
            : chartSeries.economy.usedQuantity.color

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartRows}>
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

                    {items.map((item, index) => (
                        <Line
                            key={item.itemCode}
                            type="monotone"
                            dataKey={item.itemCode}
                            name={item.itemName}
                            stroke={itemColorPalette[index % itemColorPalette.length] ?? fallbackColor}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}