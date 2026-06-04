import { apiClient } from '@/lib/api-client'
import type {
    DashboardActivityRange,
    DashboardActivityResponse,
    DashboardSummaryResponse,
} from '@/features/dashboard/types'

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
    const response = await apiClient.get<DashboardSummaryResponse>(
        '/admin/dashboard/summary'
    )

    return response.data
}

type GetDashboardActivityParams = {
    range: DashboardActivityRange
}

export async function getDashboardActivity({
                                               range,
                                           }: GetDashboardActivityParams): Promise<DashboardActivityResponse> {
    const response = await apiClient.get<DashboardActivityResponse>(
        '/admin/dashboard/activity',
        {
            params: {
                range,
            },
        }
    )

    return response.data
}