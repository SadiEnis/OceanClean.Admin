import { useQuery } from '@tanstack/react-query'

import {
    getDashboardActivity,
    getDashboardSummary,
} from '@/features/dashboard/api/dashboard-api'
import type { DashboardActivityRange } from '@/features/dashboard/types'

export function useDashboardSummaryQuery() {
    return useQuery({
        queryKey: ['dashboard-summary'],
        queryFn: getDashboardSummary,
    })
}

export function useDashboardActivityQuery(range: DashboardActivityRange) {
    return useQuery({
        queryKey: ['dashboard-activity', range],
        queryFn: () => getDashboardActivity({ range }),
    })
}