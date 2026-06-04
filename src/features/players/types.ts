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