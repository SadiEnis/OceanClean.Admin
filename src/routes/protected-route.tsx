import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { getAccessToken } from '@/features/auth/auth-storage'
import { appRoutes } from '@/lib/routes'

type ProtectedRouteProps = {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation()
    const accessToken = getAccessToken()

    if (!accessToken) {
        return (
            <Navigate
                to={appRoutes.login}
                replace
                state={{ from: location }}
            />
        )
    }

    return children
}