import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { loginAdmin } from '@/features/auth/api/auth-api'
import {
    setAccessToken,
    setRefreshToken,
} from '@/features/auth/auth-storage'
import type { AdminLoginRequest, AdminLoginResponse } from '@/features/auth/types'
import { appRoutes } from '@/lib/routes'

function getLoginErrorMessage(error: unknown) {
    if (axios.isAxiosError<AdminLoginResponse>(error)) {
        return error.response?.data?.message ?? 'Login failed.'
    }

    if (error instanceof Error) {
        return error.message
    }

    return 'Login failed.'
}

export function useLogin() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (request: AdminLoginRequest) => loginAdmin(request),
        onSuccess: (response) => {
            if (!response.success || !response.accessToken || !response.refreshToken) {
                throw new Error(response.message || 'Login failed.')
            }

            setAccessToken(response.accessToken)
            setRefreshToken(response.refreshToken)

            navigate(appRoutes.dashboard)
        },
        meta: {
            getErrorMessage: getLoginErrorMessage,
        },
    })
}

export { getLoginErrorMessage }