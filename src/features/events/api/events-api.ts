import { apiClient } from '@/lib/api-client'
import type {
    AdminEventsListResponse,
    AdminEventsQueryParams,
} from '@/features/events/types'

export async function getAdminEvents(
    params: AdminEventsQueryParams
): Promise<AdminEventsListResponse> {
    const response = await apiClient.get<AdminEventsListResponse>(
        '/admin/events',
        {
            params: {
                Page: params.page,
                PageSize: params.pageSize,
                Search: params.search || undefined,
                ActionType: params.actionType || undefined,
                From: params.from || undefined,
                To: params.to || undefined,
                SortBy: params.sortBy ?? 'createdAt',
                SortDirection: params.sortDirection ?? 'desc',
            },
        }
    )

    return response.data
}