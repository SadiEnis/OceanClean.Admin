export type EconomyRange =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'sixMonths'
    | 'all'
    | 'custom'

export type EconomyItemSummaryItem = {
    shopItemId: number
    itemCode: string
    itemName: string
    itemType: string

    totalQuantity: number
    eventCount: number
    totalCurrencyAmount: number
}

export type EconomyItemSummaryResponse = {
    success: boolean
    message: string

    range: string
    from: string | null
    to: string | null

    topPurchasedItems: EconomyItemSummaryItem[]
    topUsedItems: EconomyItemSummaryItem[]
}

export type EconomyItemTimeseriesPoint = {
    bucket: string

    shopItemId: number
    itemCode: string
    itemName: string
    itemType: string

    purchasedQuantity: number
    usedQuantity: number
}

export type EconomyItemTimeseriesResponse = {
    success: boolean
    message: string

    range: string
    bucketType: string

    from: string | null
    to: string | null

    points: EconomyItemTimeseriesPoint[]
}

export type EconomyCurrencyFlowPoint = {
    bucket: string

    earnedAmount: number
    spentAmount: number
    netAmount: number

    earnTransactionCount: number
    spendTransactionCount: number
}

export type EconomyCurrencyFlowResponse = {
    success: boolean
    message: string

    range: string
    bucketType: string

    from: string | null
    to: string | null

    points: EconomyCurrencyFlowPoint[]
}