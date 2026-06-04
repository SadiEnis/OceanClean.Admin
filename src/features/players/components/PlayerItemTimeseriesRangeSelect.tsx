import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { PlayerItemTimeseriesRange } from '@/features/players/types'

type PlayerItemTimeseriesRangeSelectProps = {
    value: PlayerItemTimeseriesRange
    onChange: (value: PlayerItemTimeseriesRange) => void
}

export function PlayerItemTimeseriesRangeSelect({
                                                    value,
                                                    onChange,
                                                }: PlayerItemTimeseriesRangeSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(nextValue) =>
                onChange(nextValue as PlayerItemTimeseriesRange)
            }
        >
            <SelectTrigger className="w-40">
                <SelectValue placeholder="Select range" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="sixMonths">6 Months</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
        </Select>
    )
}