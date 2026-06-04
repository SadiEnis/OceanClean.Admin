export type DashboardSummary = {
    totalPlayers: number
    activePlayers: number
    bannedPlayers: number
    inactivePlayers: number

    totalMatches: number
    totalGameplayEvents: number

    totalCurrencyEarned: number
    totalCurrencySpent: number
    netCurrency: number

    totalItemPurchases: number
    totalPurchasedQuantity: number
}

export type DashboardSummaryResponse = {
    success: boolean
    message: string
    summary: DashboardSummary
}

export type DashboardActivityRange =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'sixMonths'
    | 'all'
    | 'custom'

export type DashboardActivityPoint = {
    bucket: string

    newPlayers: number
    totalPlayers: number
    playerLogins: number
    matchesPlayed: number
    itemPurchases: number
    gameplayEvents: number

    currencyEarned: number
    currencySpent: number
}

export type DashboardActivityResponse = {
    success: boolean
    message: string

    range: string
    bucketType: string

    from: string | null
    to: string | null

    points: DashboardActivityPoint[]
}