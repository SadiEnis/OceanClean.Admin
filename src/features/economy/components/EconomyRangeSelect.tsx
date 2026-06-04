import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { EconomyRange } from '@/features/economy/types'

type EconomyRangeSelectProps = {
    value: EconomyRange
    onChange: (value: EconomyRange) => void
}

export function EconomyRangeSelect({
                                       value,
                                       onChange,
                                   }: EconomyRangeSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(nextValue) => onChange(nextValue as EconomyRange)}
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