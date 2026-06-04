type ChartLegendItem = {
    label: string
    color: string
}

type ChartLegendProps = {
    items: ChartLegendItem[]
}

export function ChartLegend({ items }: ChartLegendProps) {
    return (
        <div className="mt-3 w-full overflow-x-auto pb-1">
            <div className="flex w-max items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:w-full sm:flex-wrap sm:justify-center">
                {items.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 whitespace-nowrap">
            <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
            />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}