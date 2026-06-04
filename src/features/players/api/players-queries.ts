import { useQuery } from '@tanstack/react-query'

import { getAdminPlayers } from '@/features/players/api/players-api'
import type { AdminPlayersQueryParams } from '@/features/players/types'

export function useAdminPlayersQuery(params: AdminPlayersQueryParams) {
    return useQuery({
        queryKey: ['admin-players', params],
        queryFn: () => getAdminPlayers(params),
    })
}