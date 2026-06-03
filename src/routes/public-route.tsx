import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { getAccessToken } from '@/features/auth/auth-storage'
import { appRoutes } from '@/lib/routes'

type PublicRouteProps = {
    children: ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
    const accessToken = getAccessToken()

    if (accessToken) {
        return <Navigate to={appRoutes.dashboard} replace />
    }

    return children
}