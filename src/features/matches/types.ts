export type AdminMatchListItem = {
    matchId: number
    matchCode: string

    startAt: string
    endAt: string
    durationSeconds: number

    totalTrashSpawned: number
    totalTrashRecycled: number

    playerCount: number
    totalScore: number
    totalCurrencyEarned: number

    createdAt: string
}

export type AdminMatchesListResponse = {
    success: boolean
    message: string

    page: number
    pageSize: number
    totalCount: number

    matches: AdminMatchListItem[]
}

export type AdminMatchesQueryParams = {
    page: number
    pageSize: number

    search?: string
    from?: string
    to?: string

    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}

export type AdminMatchDetailPlayer = {
    userId: number
    username: string
    displayName: string

    finalScore: number
    trashRecycledCount: number
    revivesDone: number
    timesFainted: number
    earnedCurrency: number
}

export type AdminMatchUsedItem = {
    logId: number

    userId: number
    username: string
    displayName: string

    shopItemId: number | null
    itemCode: string | null
    itemName: string | null
    itemType: string | null

    quantity: number | null

    createdAt: string
}

export type AdminMatchRescueEvent = {
    logId: number

    userId: number
    username: string
    displayName: string

    scoreReward: number | null

    posX: number | null
    posY: number | null

    createdAt: string
}

export type AdminMatchFaintReviveEvent = {
    logId: number
    actionType: string

    userId: number
    username: string
    displayName: string

    targetUserId: number | null
    targetUsername: string | null
    targetDisplayName: string | null

    value: number | null

    posX: number | null
    posY: number | null

    createdAt: string
}

export type AdminMatchDetail = {
    matchId: number
    lobbyId: number | null
    matchCode: string

    startedAt: string
    endedAt: string
    durationSeconds: number

    totalTrashSpawned: number
    totalTrashRecycled: number
    createdAt: string

    players: AdminMatchDetailPlayer[]
    usedItems: AdminMatchUsedItem[]
    rescueEvents: AdminMatchRescueEvent[]
    faintReviveEvents: AdminMatchFaintReviveEvent[]
}

export type AdminMatchDetailResponse = {
    success: boolean
    message: string
    match: AdminMatchDetail | null
}