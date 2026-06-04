import { useQuery } from '@tanstack/react-query'

import {
    getAdminAuditLogs,
    getAdminMe,
} from '@/features/auth/api/profile-api'
import type { AdminAuditLogsQueryParams } from '@/features/auth/types'

export function useAdminMeQuery() {
    return useQuery({
        queryKey: ['admin-me'],
        queryFn: getAdminMe,
    })
}

export function useAdminAuditLogsQuery(params: AdminAuditLogsQueryParams) {
    return useQuery({
        queryKey: ['admin-audit-logs', params],
        queryFn: () => getAdminAuditLogs(params),
    })
}