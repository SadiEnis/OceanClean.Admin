import {
    Activity,
    CalendarClock,
    ClipboardList,
    Crosshair,
    Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useAdminEventsQuery } from '@/features/events/api/events-queries'
import { EventActionBadge } from '@/features/events/components/EventActionBadge'
import { EventSummaryCard } from '@/features/events/components/EventSummaryCard'
import type {
    AdminEventActionType,
    AdminEventsQueryParams,
} from '@/features/events/types'
import { formatDateTime, formatNumber } from '@/lib/format'
import { appRoutes } from '@/lib/routes'

const PAGE_SIZE = 10

type ActionTypeFilter = AdminEventActionType | 'all'

function formatPosition(posX: number | null, posY: number | null) {
    if (posX === null || posY === null) {
        return '-'
    }

    return `${posX.toFixed(1)}, ${posY.toFixed(1)}`
}

function getEventDetailText(event: {
    itemName: string | null
    trashTypeName: string | null
    targetDisplayName: string | null
    value: number | null
}) {
    if (event.itemName) {
        return event.itemName
    }

    if (event.trashTypeName) {
        return event.trashTypeName
    }

    if (event.targetDisplayName) {
        return event.targetDisplayName
    }

    if (event.value !== null) {
        return `Value: ${event.value}`
    }

    return '-'
}

export function EventsPage() {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [actionType, setActionType] = useState<ActionTypeFilter>('all')
    const [fromInput, setFromInput] = useState('')
    const [toInput, setToInput] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

    const queryParams = useMemo<AdminEventsQueryParams>(
        () => ({
            page,
            pageSize: PAGE_SIZE,
            search,
            actionType: actionType === 'all' ? '' : actionType,
            from,
            to,
            sortBy,
            sortDirection,
        }),
        [actionType, from, page, search, sortBy, sortDirection, to]
    )

    const eventsQuery = useAdminEventsQuery(queryParams)

    const events = eventsQuery.data?.events ?? []
    const totalCount = eventsQuery.data?.totalCount ?? 0
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

    const uniquePlayersInPage = new Set(events.map((event) => event.userId)).size
    const uniqueMatchesInPage = new Set(events.map((event) => event.matchId)).size

    function applyFilters() {
        setPage(1)
        setSearch(searchInput.trim())
        setFrom(fromInput)
        setTo(toInput)
    }

    function clearFilters() {
        setPage(1)
        setSearchInput('')
        setSearch('')
        setActionType('all')
        setFromInput('')
        setToInput('')
        setFrom('')
        setTo('')
        setSortBy('createdAt')
        setSortDirection('desc')
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Events</h1>
                <p className="mt-2 text-muted-foreground">
                    Inspect gameplay action logs, player actions and match activity.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <EventSummaryCard
                    title="Total Events"
                    value={formatNumber(totalCount)}
                    description="All action logs in current filter"
                    icon={Activity}
                />

                <EventSummaryCard
                    title="Shown Events"
                    value={formatNumber(events.length)}
                    description={`Page ${page} of ${totalPages}`}
                    icon={ClipboardList}
                />

                <EventSummaryCard
                    title="Players in Page"
                    value={formatNumber(uniquePlayersInPage)}
                    description="Unique actors in listed events"
                    icon={Crosshair}
                />

                <EventSummaryCard
                    title="Matches in Page"
                    value={formatNumber(uniqueMatchesInPage)}
                    description="Unique matches in listed events"
                    icon={CalendarClock}
                />
            </div>

            <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
                <div className="grid gap-3 xl:grid-cols-[1fr_190px_160px_160px_180px_160px_auto]">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    applyFilters()
                                }
                            }}
                            placeholder="Search player, match, item or trash..."
                            className="pl-9"
                        />
                    </div>

                    <Select
                        value={actionType}
                        onValueChange={(value) => {
                            setPage(1)
                            setActionType(value as ActionTypeFilter)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Action type" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All actions</SelectItem>
                            <SelectItem value="pickup_trash">Pickup Trash</SelectItem>
                            <SelectItem value="recycle_trash">Recycle Trash</SelectItem>
                            <SelectItem value="revive_player">Revive Player</SelectItem>
                            <SelectItem value="player_fainted">Player Fainted</SelectItem>
                            <SelectItem value="use_item">Use Item</SelectItem>
                            <SelectItem value="rescue_started">Rescue Started</SelectItem>
                            <SelectItem value="rescue_completed">Rescue Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        type="date"
                        value={fromInput}
                        onChange={(event) => setFromInput(event.target.value)}
                    />

                    <Input
                        type="date"
                        value={toInput}
                        onChange={(event) => setToInput(event.target.value)}
                    />

                    <Select
                        value={sortBy}
                        onValueChange={(value) => {
                            setPage(1)
                            setSortBy(value)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="createdAt">Created At</SelectItem>
                            <SelectItem value="actionType">Action Type</SelectItem>
                            <SelectItem value="username">Username</SelectItem>
                            <SelectItem value="matchCode">Match Code</SelectItem>
                            <SelectItem value="value">Value</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={sortDirection}
                        onValueChange={(value) => {
                            setPage(1)
                            setSortDirection(value as 'asc' | 'desc')
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Direction" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="desc">Descending</SelectItem>
                            <SelectItem value="asc">Ascending</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                        <Button onClick={applyFilters}>Apply</Button>
                        <Button variant="outline" onClick={clearFilters}>
                            Clear
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                {eventsQuery.isLoading && (
                    <div className="p-6 text-sm text-muted-foreground">
                        Loading events...
                    </div>
                )}

                {eventsQuery.isError && (
                    <div className="p-6 text-sm text-destructive">
                        Failed to load events.
                    </div>
                )}

                {eventsQuery.isSuccess && (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Player</TableHead>
                                        <TableHead>Match</TableHead>
                                        <TableHead>Detail</TableHead>
                                        <TableHead className="text-right">Value</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {events.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="h-24 text-center text-muted-foreground"
                                            >
                                                No events found.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {events.map((event) => (
                                        <TableRow key={event.logId}>
                                            <TableCell>
                                                <EventActionBadge actionType={event.actionType} />
                                            </TableCell>

                                            <TableCell
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    navigate(appRoutes.playerDetail(event.userId))
                                                }
                                            >
                                                <div className="font-medium">{event.displayName}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    @{event.username}
                                                </div>
                                            </TableCell>

                                            <TableCell
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    navigate(appRoutes.matchDetail(event.matchId))
                                                }
                                            >
                                                <div className="font-medium">{event.matchCode}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    Match ID: {event.matchId}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-sm text-muted-foreground">
                                                {getEventDetailText(event)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {event.value === null ? '-' : formatNumber(event.value)}
                                            </TableCell>

                                            <TableCell>
                                                {formatPosition(event.posX, event.posY)}
                                            </TableCell>

                                            <TableCell>{formatDateTime(event.createdAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing page {page} of {totalPages}. Total events:{' '}
                                {formatNumber(totalCount)}
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    disabled={page <= 1}
                                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                                >
                                    Previous
                                </Button>

                                <Button
                                    variant="outline"
                                    disabled={page >= totalPages}
                                    onClick={() =>
                                        setPage((current) => Math.min(totalPages, current + 1))
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}