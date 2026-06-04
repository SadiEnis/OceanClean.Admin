import {
    CalendarClock,
    ClipboardList,
    Recycle,
    Search,
    Users,
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
import { useAdminMatchesQuery } from '@/features/matches/api/matches-queries'
import { MatchSummaryCard } from '@/features/matches/components/MatchSummaryCard'
import type { AdminMatchesQueryParams } from '@/features/matches/types'
import { formatDateTime, formatDuration, formatNumber } from '@/lib/format'
import { appRoutes } from '@/lib/routes'

const PAGE_SIZE = 10

export function MatchesPage() {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [fromInput, setFromInput] = useState('')
    const [toInput, setToInput] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [sortBy, setSortBy] = useState('startedAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

    const queryParams = useMemo<AdminMatchesQueryParams>(
        () => ({
            page,
            pageSize: PAGE_SIZE,
            search,
            from,
            to,
            sortBy,
            sortDirection,
        }),
        [from, page, search, sortBy, sortDirection, to]
    )

    const matchesQuery = useAdminMatchesQuery(queryParams)

    const matches = matchesQuery.data?.matches ?? []
    const totalCount = matchesQuery.data?.totalCount ?? 0
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

    const pagePlayerCount = matches.reduce(
        (sum, match) => sum + match.playerCount,
        0
    )

    const pageTrashRecycled = matches.reduce(
        (sum, match) => sum + match.totalTrashRecycled,
        0
    )

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
        setFromInput('')
        setToInput('')
        setFrom('')
        setTo('')
        setSortBy('startedAt')
        setSortDirection('desc')
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Matches</h1>
                <p className="mt-2 text-muted-foreground">
                    Review match history, participants, scores and in-match events.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MatchSummaryCard
                    title="Total Matches"
                    value={formatNumber(totalCount)}
                    description="All matched records in current filter"
                    icon={ClipboardList}
                />

                <MatchSummaryCard
                    title="Shown Matches"
                    value={formatNumber(matches.length)}
                    description={`Page ${page} of ${totalPages}`}
                    icon={CalendarClock}
                />

                <MatchSummaryCard
                    title="Players in Page"
                    value={formatNumber(pagePlayerCount)}
                    description="Total participants in listed matches"
                    icon={Users}
                />

                <MatchSummaryCard
                    title="Trash Recycled"
                    value={formatNumber(pageTrashRecycled)}
                    description="Total recycled trash in listed matches"
                    icon={Recycle}
                />
            </div>

            <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
                <div className="grid gap-3 xl:grid-cols-[1fr_160px_160px_180px_160px_auto]">
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
                            placeholder="Search match code..."
                            className="pl-9"
                        />
                    </div>

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
                            <SelectItem value="startedAt">Started At</SelectItem>
                            <SelectItem value="endedAt">Ended At</SelectItem>
                            <SelectItem value="durationSeconds">Duration</SelectItem>
                            <SelectItem value="totalTrashRecycled">
                                Trash Recycled
                            </SelectItem>
                            <SelectItem value="playerCount">Player Count</SelectItem>
                            <SelectItem value="totalScore">Total Score</SelectItem>
                            <SelectItem value="totalEarnedCurrency">
                                Earned Currency
                            </SelectItem>
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
                {matchesQuery.isLoading && (
                    <div className="p-6 text-sm text-muted-foreground">
                        Loading matches...
                    </div>
                )}

                {matchesQuery.isError && (
                    <div className="p-6 text-sm text-destructive">
                        Failed to load matches.
                    </div>
                )}

                {matchesQuery.isSuccess && (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Match</TableHead>
                                        <TableHead className="text-right">Players</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                        <TableHead className="text-right">Trash</TableHead>
                                        <TableHead className="text-right">Currency</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Started</TableHead>
                                        <TableHead>Ended</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {matches.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="h-24 text-center text-muted-foreground"
                                            >
                                                No matches found.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {matches.map((match) => (
                                        <TableRow
                                            key={match.matchId}
                                            className="cursor-pointer transition-colors hover:bg-muted"
                                            onClick={() => navigate(appRoutes.matchDetail(match.matchId))}
                                        >
                                            <TableCell>
                                                <div className="font-medium">{match.matchCode}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    Match ID: {match.matchId}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.playerCount)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.totalScore)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.totalTrashRecycled)} /{' '}
                                                {formatNumber(match.totalTrashSpawned)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.totalCurrencyEarned)}
                                            </TableCell>

                                            <TableCell>
                                                {formatDuration(match.durationSeconds)}
                                            </TableCell>

                                            <TableCell>{formatDateTime(match.startAt)}</TableCell>
                                            <TableCell>{formatDateTime(match.endAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing page {page} of {totalPages}. Total matches:{' '}
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