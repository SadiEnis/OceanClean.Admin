import { useQuery } from '@tanstack/react-query'

import {
    getAdminPlayerDetail,
    getAdminPlayerItemTimeseries,
    getAdminPlayers,
} from '@/features/players/api/players-api'
import type {
    AdminPlayersQueryParams,
    PlayerItemTimeseriesRange,
} from '@/features/players/types'

export function useAdminPlayersQuery(params: AdminPlayersQueryParams) {
    return useQuery({
        queryKey: ['admin-players', params],
        queryFn: () => getAdminPlayers(params),
    })
}

export function useAdminPlayerDetailQuery(userId: string | undefined) {
    return useQuery({
        queryKey: ['admin-player-detail', userId],
        queryFn: () => getAdminPlayerDetail(userId!),
        enabled: Boolean(userId),
    })
}

export function useAdminPlayerItemTimeseriesQuery(
    userId: string | undefined,
    range: PlayerItemTimeseriesRange
) {
    return useQuery({
        queryKey: ['admin-player-item-timeseries', userId, range],
        queryFn: () => getAdminPlayerItemTimeseries(userId!, range),
        enabled: Boolean(userId),
    })
}