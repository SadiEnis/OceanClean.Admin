export type PlayerStatus = 'active' | 'inactive' | 'banned'

export type AdminPlayerListItem = {
    userId: number
    username: string
    displayName: string
    playerStatus: PlayerStatus

    totalPoints: number
    totalMatches: number
    softCurrency: number

    createdAt: string
    lastLogin: string | null
}

export type AdminPlayersListResponse = {
    success: boolean
    message: string

    page: number
    pageSize: number
    totalCount: number

    players: AdminPlayerListItem[]
}

export type AdminPlayersQueryParams = {
    page: number
    pageSize: number
    search?: string
    status?: PlayerStatus | ''
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}

export type AdminPlayerInventoryItem = {
    inventoryId: number
    shopItemId: number
    itemCode: string
    itemName: string
    itemType: string
    quantity: number
    acquiredAt: string
}

export type AdminPlayerRecentMatch = {
    matchId: number
    matchCode: string
    startedAt: string
    endedAt: string
    durationSeconds: number
    finalScore: number
    trashRecycledCount: number
    revivesDone: number
    timesFainted: number
    earnedCurrency: number
}

export type AdminPlayerRecentPurchase = {
    purchaseLogId: number
    shopItemId: number
    itemCode: string
    itemName: string
    itemType: string
    quantity: number
    unitPrice: number
    totalPrice: number
    currencyBefore: number
    currencyAfter: number
    purchasedAt: string
}

export type AdminPlayerRecentActionLog = {
    logId: number
    matchId: number
    matchCode: string
    actionType: string

    shopItemId: number | null
    itemCode: string | null
    itemName: string | null

    targetUserId: number | null
    targetUsername: string | null
    targetDisplayName: string | null

    trashTypeId: number | null
    trashTypeCode: string | null
    trashTypeName: string | null

    value: number | null
    posX: number | null
    posY: number | null

    createdAt: string
}

export type AdminPlayerDetail = {
    userId: number
    username: string
    displayName: string
    playerStatus: PlayerStatus

    createdAt: string
    lastLoginAt: string | null

    softCurrency: number
    totalScore: number
    totalMatchesPlayed: number
    totalMatchesWon: number
    totalTrashRecycled: number
    totalRevivesDone: number
    totalTimesFainted: number
    totalPlaytimeSeconds: number

    inventory: AdminPlayerInventoryItem[]
    recentMatches: AdminPlayerRecentMatch[]
    recentPurchases: AdminPlayerRecentPurchase[]
    recentActionLogs: AdminPlayerRecentActionLog[]
}

export type AdminPlayerDetailResponse = {
    success: boolean
    message: string
    player: AdminPlayerDetail | null
}

export type PlayerItemTimeseriesRange =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'sixMonths'
    | 'all'
    | 'custom'

export type PlayerItemTimeseriesPoint = {
    bucket: string

    shopItemId: number
    itemCode: string
    itemName: string
    itemType: string

    purchasedQuantity: number
    usedQuantity: number
}

export type PlayerItemTimeseriesResponse = {
    success: boolean
    message: string

    range: string
    bucketType: string

    from: string | null
    to: string | null

    points: PlayerItemTimeseriesPoint[]
}