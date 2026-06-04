import { useState } from 'react'
import {
    Activity,
    Ban,
    CircleDollarSign,
    ClipboardList,
    MousePointerClick,
    ShoppingCart,
    UserCheck,
    Users,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    useDashboardActivityQuery,
    useDashboardSummaryQuery,
} from '@/features/dashboard/api/dashboard-queries'
import { DashboardActivityChart } from '@/features/dashboard/components/DashboardActivityChart'
import { DashboardRangeSelect } from '@/features/dashboard/components/DashboardRangeSelect'
import { DashboardSummaryCard } from '@/features/dashboard/components/DashboardSummaryCard'
import type { DashboardActivityRange } from '@/features/dashboard/types'

function formatNumber(value: number) {
    return new Intl.NumberFormat('tr-TR').format(value)
}

export function DashboardPage() {
    const [activityRange, setActivityRange] =
        useState<DashboardActivityRange>('weekly')

    const summaryQuery = useDashboardSummaryQuery()
    const activityQuery = useDashboardActivityQuery(activityRange)

    if (summaryQuery.isLoading) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                    Loading dashboard summary...
                </p>
            </div>
        )
    }

    if (summaryQuery.isError) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                    Failed to load dashboard summary.
                </div>
            </div>
        )
    }

    const summary = summaryQuery.data?.summary

    if (!summary) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="mt-4 rounded-lg border p-4 text-sm text-muted-foreground">
                    Dashboard summary data is not available.
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                    Overview of OceanClean admin metrics.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardSummaryCard
                    title="Total Players"
                    value={formatNumber(summary.totalPlayers)}
                    description={`${formatNumber(summary.activePlayers)} active players`}
                    icon={Users}
                />

                <DashboardSummaryCard
                    title="Active Players"
                    value={formatNumber(summary.activePlayers)}
                    description={`${formatNumber(summary.bannedPlayers)} banned, ${formatNumber(
                        summary.inactivePlayers
                    )} inactive`}
                    icon={UserCheck}
                />

                <DashboardSummaryCard
                    title="Banned Players"
                    value={formatNumber(summary.bannedPlayers)}
                    description="Players currently restricted"
                    icon={Ban}
                />

                <DashboardSummaryCard
                    title="Total Matches"
                    value={formatNumber(summary.totalMatches)}
                    description="Completed match records"
                    icon={ClipboardList}
                />

                <DashboardSummaryCard
                    title="Gameplay Events"
                    value={formatNumber(summary.totalGameplayEvents)}
                    description="Recorded player action logs"
                    icon={Activity}
                />

                <DashboardSummaryCard
                    title="Currency Earned"
                    value={formatNumber(summary.totalCurrencyEarned)}
                    description={`Net: ${formatNumber(summary.netCurrency)}`}
                    icon={CircleDollarSign}
                />

                <DashboardSummaryCard
                    title="Currency Spent"
                    value={formatNumber(summary.totalCurrencySpent)}
                    description="Total soft currency spent"
                    icon={MousePointerClick}
                />

                <DashboardSummaryCard
                    title="Item Purchases"
                    value={formatNumber(summary.totalItemPurchases)}
                    description={`${formatNumber(
                        summary.totalPurchasedQuantity
                    )} items purchased`}
                    icon={ShoppingCart}
                />
            </div>

            <Card>
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle>Activity Overview</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Tracks players, matches, item purchases, currency and gameplay
                            events.
                        </p>
                    </div>

                    <DashboardRangeSelect
                        value={activityRange}
                        onChange={setActivityRange}
                    />
                </CardHeader>

                <CardContent>
                    {activityQuery.isLoading && (
                        <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">
                            Loading activity data...
                        </div>
                    )}

                    {activityQuery.isError && (
                        <div className="flex h-80 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                            Failed to load activity data.
                        </div>
                    )}

                    {activityQuery.isSuccess && (
                        <DashboardActivityChart points={activityQuery.data.points} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}