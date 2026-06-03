import { useQuery } from '@tanstack/react-query'

import { getCurrentAdmin } from '@/features/auth/api/auth-api'
import { getAccessToken } from '@/features/auth/auth-storage'

export function useCurrentAdmin() {
    return useQuery({
        queryKey: ['current-admin'],
        queryFn: getCurrentAdmin,
        enabled: Boolean(getAccessToken()),
        retry: false,
        staleTime: 60_000,
    })
}