export type AdminEventActionType =
    | 'pickup_trash'
    | 'recycle_trash'
    | 'revive_player'
    | 'player_fainted'
    | 'use_item'
    | 'rescue_started'
    | 'rescue_completed'

export type AdminEventListItem = {
    logId: number

    userId: number
    username: string
    displayName: string

    matchId: number
    matchCode: string

    actionType: AdminEventActionType

    trashTypeId: number | null
    trashTypeCode: string | null
    trashTypeName: string | null

    targetUserId: number | null
    targetUsername: string | null
    targetDisplayName: string | null

    shopItemId: number | null
    itemCode: string | null
    itemName: string | null

    value: number | null
    posX: number | null
    posY: number | null

    createdAt: string
}

export type AdminEventsListResponse = {
    success: boolean
    message: string

    page: number
    pageSize: number
    totalCount: number

    events: AdminEventListItem[]
}

export type AdminEventsQueryParams = {
    page: number
    pageSize: number

    search?: string
    actionType?: AdminEventActionType | ''
    from?: string
    to?: string

    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}

export type EventsAnalyticsRange =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'sixMonths'
    | 'all'
    | 'custom'

export type EventActionTypeCount = {
    actionType: AdminEventActionType
    eventCount: number
}

export type EventTimelinePoint = {
    bucket: string

    pickupTrash: number
    recycleTrash: number
    revivePlayer: number
    playerFainted: number
    useItem: number
    rescueStarted: number
    rescueCompleted: number

    totalEvents: number
}

export type EventTopActor = {
    userId: number
    username: string
    displayName: string
    eventCount: number
}

export type EventsAnalyticsResponse = {
    success: boolean
    message: string

    range: string
    bucketType: string

    from: string | null
    to: string | null

    actionTypeCounts: EventActionTypeCount[]
    timeline: EventTimelinePoint[]
    topActors: EventTopActor[]
}