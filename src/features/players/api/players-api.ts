import { apiClient } from '@/lib/api-client'
import type {
    AdminPlayersListResponse,
    AdminPlayersQueryParams,
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