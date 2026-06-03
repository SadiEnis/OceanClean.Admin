import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { logoutAdmin } from '@/features/auth/api/auth-api'
import {
    clearAuthTokens,
    getRefreshToken,
} from '@/features/auth/auth-storage'
import { appRoutes } from '@/lib/routes'

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const refreshToken = getRefreshToken()

            if (!refreshToken) {
                return null
            }

            return logoutAdmin({ refreshToken })
        },
        onSettled: () => {
            clearAuthTokens()
            queryClient.clear()
            navigate(appRoutes.login, { replace: true })
        },
    })
}