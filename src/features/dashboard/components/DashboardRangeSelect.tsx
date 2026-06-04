import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { DashboardActivityRange } from '@/features/dashboard/types'

type DashboardRangeSelectProps = {
    value: DashboardActivityRange
    onChange: (value: DashboardActivityRange) => void
}

export function DashboardRangeSelect({
                                         value,
                                         onChange,
                                     }: DashboardRangeSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(nextValue) => onChange(nextValue as DashboardActivityRange)}
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