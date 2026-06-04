import { useQuery } from '@tanstack/react-query'

import {
    getAdminEvents,
    getAdminEventsAnalytics,
} from '@/features/events/api/events-api'
import type {
    AdminEventsQueryParams,
    EventsAnalyticsRange,
} from '@/features/events/types'

export function useAdminEventsQuery(params: AdminEventsQueryParams) {
    return useQuery({
        queryKey: ['admin-events', params],
        queryFn: () => getAdminEvents(params),
    })
}

export function useAdminEventsAnalyticsQuery(range: EventsAnalyticsRange) {
    return useQuery({
        queryKey: ['admin-events-analytics', range],
        queryFn: () => getAdminEventsAnalytics(range),
    })
}