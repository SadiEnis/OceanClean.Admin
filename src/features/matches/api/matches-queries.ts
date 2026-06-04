import { useQuery } from '@tanstack/react-query'

import {
    getAdminMatchDetail,
    getAdminMatches,
} from '@/features/matches/api/matches-api'
import type { AdminMatchesQueryParams } from '@/features/matches/types'

export function useAdminMatchesQuery(params: AdminMatchesQueryParams) {
    return useQuery({
        queryKey: ['admin-matches', params],
        queryFn: () => getAdminMatches(params),
    })
}

export function useAdminMatchDetailQuery(matchId: string | undefined) {
    return useQuery({
        queryKey: ['admin-match-detail', matchId],
        queryFn: () => getAdminMatchDetail(matchId!),
        enabled: Boolean(matchId),
    })
}