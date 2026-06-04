import { useState } from 'react'
import {
    CircleDollarSign,
    PackageCheck,
    ShoppingCart,
    TrendingDown,
    TrendingUp,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    useEconomyCurrencyFlowQuery,
    useEconomyItemSummaryQuery,
    useEconomyItemTimeseriesQuery,
} from '@/features/economy/api/economy-queries'
import { EconomyCurrencyFlowChart } from '@/features/economy/components/EconomyCurrencyFlowChart'
import { EconomyItemTimeseriesChart } from '@/features/economy/components/EconomyItemTimeseriesChart'
import { EconomyRangeSelect } from '@/features/economy/components/EconomyRangeSelect'
import { EconomySingleCurrencyChart } from '@/features/economy/components/EconomySingleCurrencyChart'
import { EconomyTopItemsTable } from '@/features/economy/components/EconomyTopItemsTable'
import type { EconomyRange } from '@/features/economy/types'
import { chartSeries } from '@/lib/chart-config'

export function EconomyPage() {
    const [range, setRange] = useState<EconomyRange>('weekly')

    const itemSummaryQuery = useEconomyItemSummaryQuery(range)
    const itemTimeseriesQuery = useEconomyItemTimeseriesQuery(range)
    const currencyFlowQuery = useEconomyCurrencyFlowQuery(range)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Economy</h1>
                    <p className="mt-2 text-muted-foreground">
                        Analyze item purchases, item usage and currency flow.
                    </p>
                </div>

                <EconomyRangeSelect value={range} onChange={setRange} />
            </div>

            {itemSummaryQuery.isLoading && (
                <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
                    Loading economy summary...
                </div>
            )}

            {itemSummaryQuery.isError && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                    Failed to load economy summary.
                </div>
            )}

            {itemSummaryQuery.isSuccess && (
                <div className="grid gap-6 xl:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Top Purchased Items</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Most purchased shop items in the selected range.
                                </p>
                            </div>

                            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <EconomyTopItemsTable
                                items={itemSummaryQuery.data.topPurchasedItems}
                                emptyMessage="No purchased item records for this range."
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Top Used Items</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Most used shop items in the selected range.
                                </p>
                            </div>

                            <PackageCheck className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <EconomyTopItemsTable
                                items={itemSummaryQuery.data.topUsedItems}
                                emptyMessage="No used item records for this range."
                            />
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Item Purchase Trend</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Item purchase quantities grouped by the selected time range.
                        </p>
                    </CardHeader>

                    <CardContent>
                        {itemTimeseriesQuery.isLoading && (
                            <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                Loading item purchase trend...
                            </div>
                        )}

                        {itemTimeseriesQuery.isError && (
                            <div className="flex h-72 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                                Failed to load item purchase trend.
                            </div>
                        )}

                        {itemTimeseriesQuery.isSuccess && (
                            <EconomyItemTimeseriesChart
                                points={itemTimeseriesQuery.data.points}
                                valueKey="purchasedQuantity"
                            />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Item Usage Trend</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Item usage quantities grouped by the selected time range.
                        </p>
                    </CardHeader>

                    <CardContent>
                        {itemTimeseriesQuery.isLoading && (
                            <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                Loading item usage trend...
                            </div>
                        )}

                        {itemTimeseriesQuery.isError && (
                            <div className="flex h-72 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                                Failed to load item usage trend.
                            </div>
                        )}

                        {itemTimeseriesQuery.isSuccess && (
                            <EconomyItemTimeseriesChart
                                points={itemTimeseriesQuery.data.points}
                                valueKey="usedQuantity"
                            />
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Currency Flow</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Currency earned, spent and net amount over time.
                        </p>
                    </div>

                    <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                    {currencyFlowQuery.isLoading && (
                        <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                            Loading currency flow...
                        </div>
                    )}

                    {currencyFlowQuery.isError && (
                        <div className="flex h-72 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                            Failed to load currency flow.
                        </div>
                    )}

                    {currencyFlowQuery.isSuccess && (
                        <EconomyCurrencyFlowChart points={currencyFlowQuery.data.points} />
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Currency Earned</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Earned currency amount over the selected range.
                            </p>
                        </div>

                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        {currencyFlowQuery.isLoading && (
                            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                                Loading earned currency...
                            </div>
                        )}

                        {currencyFlowQuery.isError && (
                            <div className="flex h-64 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                                Failed to load earned currency.
                            </div>
                        )}

                        {currencyFlowQuery.isSuccess && (
                            <EconomySingleCurrencyChart
                                points={currencyFlowQuery.data.points}
                                dataKey="earnedAmount"
                                label={chartSeries.economy.currencyEarned.label}
                                color={chartSeries.economy.currencyEarned.color}
                                emptyMessage="No earned currency data available for this range."
                            />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Currency Spent</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Spent currency amount over the selected range.
                            </p>
                        </div>

                        <TrendingDown className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        {currencyFlowQuery.isLoading && (
                            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                                Loading spent currency...
                            </div>
                        )}

                        {currencyFlowQuery.isError && (
                            <div className="flex h-64 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10 text-sm text-destructive">
                                Failed to load spent currency.
                            </div>
                        )}

                        {currencyFlowQuery.isSuccess && (
                            <EconomySingleCurrencyChart
                                points={currencyFlowQuery.data.points}
                                dataKey="spentAmount"
                                label={chartSeries.economy.currencySpent.label}
                                color={chartSeries.economy.currencySpent.color}
                                emptyMessage="No spent currency data available for this range."
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}