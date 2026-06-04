import { useQuery } from '@tanstack/react-query'

import { getAdminEvents } from '@/features/events/api/events-api'
import type { AdminEventsQueryParams } from '@/features/events/types'

export function useAdminEventsQuery(params: AdminEventsQueryParams) {
    return useQuery({
        queryKey: ['admin-events', params],
        queryFn: () => getAdminEvents(params),
    })
}