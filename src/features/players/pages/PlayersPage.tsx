import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PlayerStatusBadge } from '@/features/players/components/PlayerStatusBadge'
import { useAdminPlayersQuery } from '@/features/players/api/players-queries'
import type {
    AdminPlayersQueryParams,
    PlayerStatus,
} from '@/features/players/types'
import { appRoutes } from '@/lib/routes'
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

const PAGE_SIZE = 10

function formatNumber(value: number) {
    return new Intl.NumberFormat('tr-TR').format(value)
}

function formatDate(value: string | null) {
    if (!value) {
        return '-'
    }

    return new Intl.DateTimeFormat('tr-TR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value))
}

type StatusFilter = PlayerStatus | 'all'

export function PlayersPage() {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<StatusFilter>('all')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

    const queryParams = useMemo<AdminPlayersQueryParams>(
        () => ({
            page,
            pageSize: PAGE_SIZE,
            search,
            status: status === 'all' ? '' : status,
            sortBy,
            sortDirection,
        }),
        [page, search, sortBy, sortDirection, status]
    )

    const playersQuery = useAdminPlayersQuery(queryParams)

    const totalCount = playersQuery.data?.totalCount ?? 0
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

    function applySearch() {
        setPage(1)
        setSearch(searchInput.trim())
    }

    function clearFilters() {
        setPage(1)
        setSearchInput('')
        setSearch('')
        setStatus('all')
        setSortBy('createdAt')
        setSortDirection('desc')
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Players</h1>
                <p className="mt-2 text-muted-foreground">
                    Search, filter and inspect OceanClean player accounts.
                </p>
            </div>

            <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
                <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_160px_auto]">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    applySearch()
                                }
                            }}
                            placeholder="Search username or display name..."
                            className="pl-9"
                        />
                    </div>

                    <Select
                        value={status}
                        onValueChange={(value) => {
                            setPage(1)
                            setStatus(value as StatusFilter)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="banned">Banned</SelectItem>
                        </SelectContent>
                    </Select>

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
                            <SelectItem value="lastLogin">Last Login</SelectItem>
                            <SelectItem value="username">Username</SelectItem>
                            <SelectItem value="displayName">Display Name</SelectItem>
                            <SelectItem value="totalPoints">Total Points</SelectItem>
                            <SelectItem value="totalMatches">Total Matches</SelectItem>
                            <SelectItem value="softCurrency">Soft Currency</SelectItem>
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
                        <Button onClick={applySearch}>Apply</Button>
                        <Button variant="outline" onClick={clearFilters}>
                            Clear
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                {playersQuery.isLoading && (
                    <div className="p-6 text-sm text-muted-foreground">
                        Loading players...
                    </div>
                )}

                {playersQuery.isError && (
                    <div className="p-6 text-sm text-destructive">
                        Failed to load players.
                    </div>
                )}

                {playersQuery.isSuccess && (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                        <TableHead className="text-right">Matches</TableHead>
                                        <TableHead className="text-right">Currency</TableHead>
                                        <TableHead>Last Login</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {playersQuery.data.players.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="h-24 text-center text-muted-foreground"
                                            >
                                                No players found.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {playersQuery.data.players.map((player) => (
                                        <TableRow
                                            key={player.userId}
                                            className="cursor-pointer transition-colors hover:bg-muted"
                                            onClick={() => navigate(appRoutes.playerDetail(player.userId))}
                                        >
                                            <TableCell>
                                                <div className="font-medium">{player.displayName}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    @{player.username}
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <PlayerStatusBadge status={player.playerStatus} />
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(player.totalPoints)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(player.totalMatches)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(player.softCurrency)}
                                            </TableCell>

                                            <TableCell>{formatDate(player.lastLogin)}</TableCell>
                                            <TableCell>{formatDate(player.createdAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing page {page} of {totalPages}. Total players:{' '}
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