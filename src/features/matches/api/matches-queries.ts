import { useQuery } from '@tanstack/react-query'

import { getAdminMatches } from '@/features/matches/api/matches-api'
import type { AdminMatchesQueryParams } from '@/features/matches/types'

export function useAdminMatchesQuery(params: AdminMatchesQueryParams) {
    return useQuery({
        queryKey: ['admin-matches', params],
        queryFn: () => getAdminMatches(params),
    })
}