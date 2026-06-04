import { apiClient } from '@/lib/api-client'
import type {
    AdminPlayerDetailResponse,
    AdminPlayersListResponse,
    AdminPlayersQueryParams,
    PlayerItemTimeseriesRange,
    PlayerItemTimeseriesResponse,
} from '@/features/players/types'

export async function getAdminPlayers(
    params: AdminPlayersQueryParams
): Promise<AdminPlayersListResponse> {
    const response = await apiClient.get<AdminPlayersListResponse>(
        '/admin/players',
        {
            params: {
                Page: params.page,
                PageSize: params.pageSize,
                Search: params.search || undefined,
                Status: params.status || undefined,
                SortBy: params.sortBy ?? 'createdAt',
                SortDirection: params.sortDirection ?? 'desc',
            },
        }
    )

    return response.data
}

export async function getAdminPlayerDetail(
    userId: string | number
): Promise<AdminPlayerDetailResponse> {
    const response = await apiClient.get<AdminPlayerDetailResponse>(
        `/admin/players/${userId}`
    )

    return response.data
}

export async function getAdminPlayerItemTimeseries(
    userId: string | number,
    range: PlayerItemTimeseriesRange
): Promise<PlayerItemTimeseriesResponse> {
    const response = await apiClient.get<PlayerItemTimeseriesResponse>(
        `/admin/players/${userId}/item-timeseries`,
        {
            params: {
                range,
            },
        }
    )

    return response.data
}