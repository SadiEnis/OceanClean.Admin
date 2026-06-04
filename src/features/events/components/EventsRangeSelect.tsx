import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { EventsAnalyticsRange } from '@/features/events/types'

type EventsRangeSelectProps = {
    value: EventsAnalyticsRange
    onChange: (value: EventsAnalyticsRange) => void
}

export function EventsRangeSelect({
                                      value,
                                      onChange,
                                  }: EventsRangeSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(nextValue) => onChange(nextValue as EventsAnalyticsRange)}
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