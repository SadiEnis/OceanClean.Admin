import {
    ArrowLeft,
    BadgeDollarSign,
    Clock,
    Package,
    RotateCcw,
    Skull,
    Trash2,
    Trophy,
    Users,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useAdminMatchDetailQuery } from '@/features/matches/api/matches-queries'
import { MatchSummaryCard } from '@/features/matches/components/MatchSummaryCard'
import { formatDateTime, formatDuration, formatNumber } from '@/lib/format'
import { appRoutes } from '@/lib/routes'

function formatPosition(posX: number | null, posY: number | null) {
    if (posX === null || posY === null) {
        return '-'
    }

    return `${posX.toFixed(1)}, ${posY.toFixed(1)}`
}

function formatActionType(actionType: string) {
    return actionType
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

export function MatchDetailPage() {
    const { matchId } = useParams()
    const navigate = useNavigate()

    const matchQuery = useAdminMatchDetailQuery(matchId)

    if (matchQuery.isLoading) {
        return (
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.matches)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Matches
                </Button>

                <p className="mt-4 text-sm text-muted-foreground">
                    Loading match detail...
                </p>
            </div>
        )
    }

    if (matchQuery.isError) {
        return (
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.matches)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Matches
                </Button>

                <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                    Failed to load match detail.
                </div>
            </div>
        )
    }

    const match = matchQuery.data?.match

    if (!match) {
        return (
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.matches)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Matches
                </Button>

                <div className="mt-4 rounded-lg border p-4 text-sm text-muted-foreground">
                    Match detail is not available.
                </div>
            </div>
        )
    }

    const totalScore = match.players.reduce(
        (sum, player) => sum + player.finalScore,
        0
    )

    const totalEarnedCurrency = match.players.reduce(
        (sum, player) => sum + player.earnedCurrency,
        0
    )

    const totalRevives = match.players.reduce(
        (sum, player) => sum + player.revivesDone,
        0
    )

    const totalFaints = match.players.reduce(
        (sum, player) => sum + player.timesFainted,
        0
    )

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.matches)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Matches
                </Button>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{match.matchCode}</h1>
                        <p className="mt-2 text-muted-foreground">
                            Match ID: {match.matchId}
                            {match.lobbyId ? ` · Lobby ID: ${match.lobbyId}` : ''}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-card px-4 py-3 text-sm text-card-foreground">
                        <p>
                            <span className="text-muted-foreground">Started:</span>{' '}
                            {formatDateTime(match.startedAt)}
                        </p>
                        <p className="mt-1">
                            <span className="text-muted-foreground">Ended:</span>{' '}
                            {formatDateTime(match.endedAt)}
                        </p>
                        <p className="mt-1">
                            <span className="text-muted-foreground">Created:</span>{' '}
                            {formatDateTime(match.createdAt)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MatchSummaryCard
                    title="Players"
                    value={formatNumber(match.players.length)}
                    description="Participants in this match"
                    icon={Users}
                />

                <MatchSummaryCard
                    title="Duration"
                    value={formatDuration(match.durationSeconds)}
                    description="Total match duration"
                    icon={Clock}
                />

                <MatchSummaryCard
                    title="Total Score"
                    value={formatNumber(totalScore)}
                    description="Combined player score"
                    icon={Trophy}
                />

                <MatchSummaryCard
                    title="Currency Earned"
                    value={formatNumber(totalEarnedCurrency)}
                    description="Combined earned currency"
                    icon={BadgeDollarSign}
                />

                <MatchSummaryCard
                    title="Trash Recycled"
                    value={`${formatNumber(match.totalTrashRecycled)} / ${formatNumber(
                        match.totalTrashSpawned
                    )}`}
                    description="Recycled / spawned trash"
                    icon={Trash2}
                />

                <MatchSummaryCard
                    title="Rescue Events"
                    value={formatNumber(match.rescueEvents.length)}
                    description={`${formatNumber(totalRevives)} player revives`}
                    icon={RotateCcw}
                />

                <MatchSummaryCard
                    title="Faints"
                    value={formatNumber(totalFaints)}
                    description="Total faint count"
                    icon={Skull}
                />

                <MatchSummaryCard
                    title="Used Items"
                    value={formatNumber(match.usedItems.length)}
                    description="Item usage logs"
                    icon={Package}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Players and Scores</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Player</TableHead>
                                    <TableHead className="text-right">Score</TableHead>
                                    <TableHead className="text-right">Trash</TableHead>
                                    <TableHead className="text-right">Revives</TableHead>
                                    <TableHead className="text-right">Faints</TableHead>
                                    <TableHead className="text-right">Currency</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {match.players.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="h-20 text-center text-muted-foreground"
                                        >
                                            No player records.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {match.players.map((player) => (
                                    <TableRow
                                        key={player.userId}
                                        className="cursor-pointer"
                                        onClick={() => navigate(appRoutes.playerDetail(player.userId))}
                                    >
                                        <TableCell>
                                            <div className="font-medium">{player.displayName}</div>
                                            <div className="text-xs text-muted-foreground">
                                                @{player.username}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {formatNumber(player.finalScore)}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {formatNumber(player.trashRecycledCount)}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {formatNumber(player.revivesDone)}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {formatNumber(player.timesFainted)}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            {formatNumber(player.earnedCurrency)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Used Items</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {match.usedItems.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-20 text-center text-muted-foreground"
                                            >
                                                No used item records.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {match.usedItems.map((item) => (
                                        <TableRow key={item.logId}>
                                            <TableCell>
                                                <div className="font-medium">{item.displayName}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    @{item.username}
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="font-medium">
                                                    {item.itemName ?? '-'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.itemCode ?? item.itemType ?? '-'}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {item.quantity === null
                                                    ? '-'
                                                    : formatNumber(item.quantity)}
                                            </TableCell>

                                            <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rescue Events</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Player</TableHead>
                                        <TableHead className="text-right">Reward</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {match.rescueEvents.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-20 text-center text-muted-foreground"
                                            >
                                                No rescue records.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {match.rescueEvents.map((event) => (
                                        <TableRow key={event.logId}>
                                            <TableCell>
                                                <div className="font-medium">{event.displayName}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    @{event.username}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {event.scoreReward === null
                                                    ? '-'
                                                    : formatNumber(event.scoreReward)}
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
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Faint / Revive Events</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Actor</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead className="text-right">Value</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {match.faintReviveEvents.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="h-20 text-center text-muted-foreground"
                                        >
                                            No faint or revive records.
                                        </TableCell>
                                    </TableRow>
                                )}

                                {match.faintReviveEvents.map((event) => (
                                    <TableRow key={event.logId}>
                                        <TableCell className="font-medium">
                                            {formatActionType(event.actionType)}
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-medium">{event.displayName}</div>
                                            <div className="text-xs text-muted-foreground">
                                                @{event.username}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {event.targetDisplayName ? (
                                                <>
                                                    <div className="font-medium">
                                                        {event.targetDisplayName}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        @{event.targetUsername}
                                                    </div>
                                                </>
                                            ) : (
                                                '-'
                                            )}
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
                </CardContent>
            </Card>
        </div>
    )
}