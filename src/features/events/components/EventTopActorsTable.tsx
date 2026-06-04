import { useNavigate } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { EventTopActor } from '@/features/events/types'
import { formatNumber } from '@/lib/format'
import { appRoutes } from '@/lib/routes'

type EventTopActorsTableProps = {
    actors: EventTopActor[]
}

export function EventTopActorsTable({ actors }: EventTopActorsTableProps) {
    const navigate = useNavigate()

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-right">Events</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {actors.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={2}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No actor data available for this range.
                            </TableCell>
                        </TableRow>
                    )}

                    {actors.map((actor) => (
                        <TableRow
                            key={actor.userId}
                            className="cursor-pointer"
                            onClick={() => navigate(appRoutes.playerDetail(actor.userId))}
                        >
                            <TableCell>
                                <div className="font-medium">{actor.displayName}</div>
                                <div className="text-xs text-muted-foreground">
                                    @{actor.username}
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                {formatNumber(actor.eventCount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}