import { useEffect, useState } from 'react'
import {
    ArrowLeft,
    BadgeDollarSign,
    Clock,
    Package,
    Recycle,
    RotateCcw,
    Skull,
    Star,
    Trophy,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
    useAdminPlayerDetailQuery,
    useAdminPlayerItemTimeseriesQuery,
} from '@/features/players/api/players-queries'
import { useUpdateAdminPlayerStatusMutation } from '@/features/players/api/players-mutations'
import { PlayerDetailStatCard } from '@/features/players/components/PlayerDetailStatCard'
import { PlayerItemTimeseriesChart } from '@/features/players/components/PlayerItemTimeseriesChart'
import { PlayerItemTimeseriesRangeSelect } from '@/features/players/components/PlayerItemTimeseriesRangeSelect'
import { PlayerStatusBadge } from '@/features/players/components/PlayerStatusBadge'
import type {
    PlayerItemTimeseriesRange,
    PlayerStatus,
} from '@/features/players/types'
import { formatDateTime, formatDuration, formatNumber } from '@/lib/format'
import { appRoutes } from '@/lib/routes'

export function PlayerDetailPage() {
    const { userId } = useParams()
    const navigate = useNavigate()

    const [selectedStatus, setSelectedStatus] = useState<PlayerStatus | ''>('')
    const [itemTimeseriesRange, setItemTimeseriesRange] =
        useState<PlayerItemTimeseriesRange>('weekly')

    const playerQuery = useAdminPlayerDetailQuery(userId)
    const itemTimeseriesQuery = useAdminPlayerItemTimeseriesQuery(
        userId,
        itemTimeseriesRange
    )

    const updateStatusMutation = useUpdateAdminPlayerStatusMutation({
        userId,
    })

    const playerStatus = playerQuery.data?.player?.playerStatus

    useEffect(() => {
        if (playerStatus) {
            setSelectedStatus(playerStatus)
        }
    }, [playerStatus])

    if (playerQuery.isLoading) {
        return (
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.players)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Players
                </Button>

                <p className="mt-4 text-sm text-muted-foreground">
                    Loading player detail...
                </p>
            </div>
        )
    }

    if (playerQuery.isError) {
        return (
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.players)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Players
                </Button>

                <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                    Failed to load player detail.
                </div>
            </div>
        )
    }

    const player = playerQuery.data?.player

    if (!player) {
        return (
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.players)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Players
                </Button>

                <div className="mt-4 rounded-lg border p-4 text-sm text-muted-foreground">
                    Player detail is not available.
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <Button variant="ghost" onClick={() => navigate(appRoutes.players)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Players
                </Button>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{player.displayName}</h1>
                            <PlayerStatusBadge status={player.playerStatus} />
                        </div>

                        <p className="mt-2 text-muted-foreground">
                            @{player.username} · User ID: {player.userId}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-card px-4 py-3 text-sm text-card-foreground">
                        <p>
                            <span className="text-muted-foreground">Created:</span>{' '}
                            {formatDateTime(player.createdAt)}
                        </p>
                        <p className="mt-1">
                            <span className="text-muted-foreground">Last login:</span>{' '}
                            {formatDateTime(player.lastLoginAt)}
                        </p>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Player Status Management</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update whether this player can actively use the game account.
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Select
                            value={selectedStatus}
                            onValueChange={(value) => setSelectedStatus(value as PlayerStatus)}
                            disabled={updateStatusMutation.isPending}
                        >
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="banned">Banned</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            disabled={
                                updateStatusMutation.isPending ||
                                !selectedStatus ||
                                selectedStatus === player.playerStatus
                            }
                            onClick={() => {
                                if (!selectedStatus) {
                                    return
                                }

                                updateStatusMutation.mutate({
                                    newStatus: selectedStatus,
                                })
                            }}
                        >
                            {updateStatusMutation.isPending ? 'Saving...' : 'Save Status'}
                        </Button>

                        {updateStatusMutation.isSuccess && (
                            <p className="text-sm text-muted-foreground">
                                Status updated successfully.
                            </p>
                        )}

                        {updateStatusMutation.isError && (
                            <p className="text-sm text-destructive">
                                Failed to update player status.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <PlayerDetailStatCard
                    title="Total Score"
                    value={formatNumber(player.totalScore)}
                    description="Lifetime score"
                    icon={Star}
                />

                <PlayerDetailStatCard
                    title="Matches Played"
                    value={formatNumber(player.totalMatchesPlayed)}
                    description={`${formatNumber(player.totalMatchesWon)} wins`}
                    icon={Trophy}
                />

                <PlayerDetailStatCard
                    title="Soft Currency"
                    value={formatNumber(player.softCurrency)}
                    description="Current balance"
                    icon={BadgeDollarSign}
                />

                <PlayerDetailStatCard
                    title="Trash Recycled"
                    value={formatNumber(player.totalTrashRecycled)}
                    description="Lifetime recycled trash"
                    icon={Recycle}
                />

                <PlayerDetailStatCard
                    title="Revives Done"
                    value={formatNumber(player.totalRevivesDone)}
                    description="Co-op support actions"
                    icon={RotateCcw}
                />

                <PlayerDetailStatCard
                    title="Times Fainted"
                    value={formatNumber(player.totalTimesFainted)}
                    description="Lifetime faint count"
                    icon={Skull}
                />

                <PlayerDetailStatCard
                    title="Playtime"
                    value={formatDuration(player.totalPlaytimeSeconds)}
                    description="Total playtime"
                    icon={Clock}
                />

                <PlayerDetailStatCard
                    title="Inventory Items"
                    value={formatNumber(player.inventory.length)}
                    description="Unique item records"
                    icon={Package}
                />
            </div>

            <Card>
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle>Item Activity</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Tracks player item purchases and item usage over time.
                        </p>
                    </div>

                    <PlayerItemTimeseriesRangeSelect
                        value={itemTimeseriesRange}
                        onChange={setItemTimeseriesRange}
                    />
                </CardHeader>

                <CardContent>
                    {itemTimeseriesQuery.isLoading && (
                        <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                            Loading item activity...
                        </div>
                    )}

                    {itemTimeseriesQuery.isError && (
                        <div className="flex h-72 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                            Failed to load item activity.
                        </div>
                    )}

                    {itemTimeseriesQuery.isSuccess && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                    Item Purchase Trend
                                </h3>

                                <PlayerItemTimeseriesChart
                                    points={itemTimeseriesQuery.data.points}
                                    valueKey="purchasedQuantity"
                                />
                            </div>

                            <div>
                                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                                    Item Usage Trend
                                </h3>

                                <PlayerItemTimeseriesChart
                                    points={itemTimeseriesQuery.data.points}
                                    valueKey="usedQuantity"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Inventory</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                        <TableHead>Acquired At</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {player.inventory.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-20 text-center text-muted-foreground"
                                            >
                                                No inventory records.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {player.inventory.map((item) => (
                                        <TableRow key={item.inventoryId}>
                                            <TableCell>
                                                <div className="font-medium">{item.itemName}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.itemCode}
                                                </div>
                                            </TableCell>

                                            <TableCell>{item.itemType}</TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(item.quantity)}
                                            </TableCell>

                                            <TableCell>{formatDateTime(item.acquiredAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Matches</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Match</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                        <TableHead className="text-right">Trash</TableHead>
                                        <TableHead className="text-right">Currency</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {player.recentMatches.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-20 text-center text-muted-foreground"
                                            >
                                                No recent matches.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {player.recentMatches.map((match) => (
                                        <TableRow
                                            key={match.matchId}
                                            className="cursor-pointer transition-colors hover:bg-muted"
                                            onClick={() => navigate(appRoutes.matchDetail(match.matchId))}
                                        >
                                            <TableCell>
                                                <div className="font-medium">{match.matchCode}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {formatDateTime(match.startedAt)}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.finalScore)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.trashRecycledCount)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(match.earnedCurrency)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Purchases</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-right">Qty</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead>Purchased At</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {player.recentPurchases.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-20 text-center text-muted-foreground"
                                            >
                                                No recent purchases.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {player.recentPurchases.map((purchase) => (
                                        <TableRow key={purchase.purchaseLogId}>
                                            <TableCell>
                                                <div className="font-medium">{purchase.itemName}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {purchase.itemCode}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(purchase.quantity)}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                {formatNumber(purchase.totalPrice)}
                                            </TableCell>

                                            <TableCell>
                                                {formatDateTime(purchase.purchasedAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Action Logs</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Match</TableHead>
                                        <TableHead>Detail</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {player.recentActionLogs.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-20 text-center text-muted-foreground"
                                            >
                                                No recent action logs.
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {player.recentActionLogs.map((log) => (
                                        <TableRow key={log.logId}>
                                            <TableCell className="font-medium">
                                                {log.actionType}
                                            </TableCell>

                                            <TableCell>{log.matchCode}</TableCell>

                                            <TableCell className="text-sm text-muted-foreground">
                                                {log.itemName ??
                                                    log.trashTypeName ??
                                                    log.targetDisplayName ??
                                                    '-'}
                                            </TableCell>

                                            <TableCell>{formatDateTime(log.createdAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}