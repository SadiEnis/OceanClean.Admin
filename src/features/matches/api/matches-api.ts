import { apiClient } from '@/lib/api-client'
import type {
    AdminMatchDetailResponse,
    AdminMatchesListResponse,
    AdminMatchesQueryParams,
} from '@/features/matches/types'

export async function getAdminMatches(
    params: AdminMatchesQueryParams
): Promise<AdminMatchesListResponse> {
    const response = await apiClient.get<AdminMatchesListResponse>(
        '/admin/matches',
        {
            params: {
                Page: params.page,
                PageSize: params.pageSize,
                Search: params.search || undefined,
                From: params.from || undefined,
                To: params.to || undefined,
                SortBy: params.sortBy ?? 'startedAt',
                SortDirection: params.sortDirection ?? 'desc',
            },
        }
    )

    return response.data
}

export async function getAdminMatchDetail(
    matchId: string | number
): Promise<AdminMatchDetailResponse> {
    const response = await apiClient.get<AdminMatchDetailResponse>(
        `/admin/matches/${matchId}`
    )

    return response.data
}