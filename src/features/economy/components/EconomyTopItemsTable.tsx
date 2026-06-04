import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { EconomyItemSummaryItem } from '@/features/economy/types'
import { formatNumber } from '@/lib/format'

type EconomyTopItemsTableProps = {
    items: EconomyItemSummaryItem[]
    emptyMessage: string
}

export function EconomyTopItemsTable({
                                         items,
                                         emptyMessage,
                                     }: EconomyTopItemsTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Events</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="h-24 text-center text-muted-foreground"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}

                    {items.map((item) => (
                        <TableRow key={item.shopItemId}>
                            <TableCell>
                                <div className="font-medium">{item.itemName}</div>
                                <div className="text-xs text-muted-foreground">
                                    {item.itemCode}
                                </div>
                            </TableCell>

                            <TableCell>{item.itemType}</TableCell>

                            <TableCell className="text-right">
                                {formatNumber(item.totalQuantity)}
                            </TableCell>

                            <TableCell className="text-right">
                                {formatNumber(item.eventCount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}