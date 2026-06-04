export type AdminMatchListItem = {
    matchId: number
    lobbyId: number | null
    matchCode: string

    startedAt: string
    endedAt: string
    durationSeconds: number

    totalTrashSpawned: number
    totalTrashRecycled: number

    playerCount: number
    totalScore: number
    totalEarnedCurrency: number
    totalRevivesDone: number
    totalTimesFainted: number

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