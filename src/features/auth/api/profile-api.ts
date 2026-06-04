import { apiClient } from '@/lib/api-client'
import type {
    AdminAuditLogsListResponse,
    AdminAuditLogsQueryParams,
    AdminMeResponse,
} from '@/features/auth/types'

export async function getAdminMe(): Promise<AdminMeResponse> {
    const response = await apiClient.get<AdminMeResponse>('/admin/auth/me')

    return response.data
}

export async function getAdminAuditLogs(
    params: AdminAuditLogsQueryParams
): Promise<AdminAuditLogsListResponse> {
    const response = await apiClient.get<AdminAuditLogsListResponse>(
        '/admin/audit-logs',
        {
            params: {
                Page: params.page,
                PageSize: params.pageSize,
                Search: params.search || undefined,
                ActionType: params.actionType || undefined,
                TargetType: params.targetType || undefined,
                From: params.from || undefined,
                To: params.to || undefined,
                SortBy: params.sortBy ?? 'createdAt',
                SortDirection: params.sortDirection ?? 'desc',
            },
        }
    )

    return response.data
}