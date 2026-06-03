import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { clearAuthTokens, getAccessToken } from '@/features/auth/auth-storage'
import { useCurrentAdmin } from '@/features/auth/hooks/use-current-admin'
import { appRoutes } from '@/lib/routes'

type ProtectedRouteProps = {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation()
    const accessToken = getAccessToken()
    const currentAdminQuery = useCurrentAdmin()

    if (!accessToken) {
        return (
            <Navigate
                to={appRoutes.login}
                replace
                state={{ from: location }}
            />
        )
    }

    if (currentAdminQuery.isLoading || currentAdminQuery.isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <div className="text-sm text-muted-foreground">
                    Checking admin session...
                </div>
            </div>
        )
    }

    if (currentAdminQuery.isError) {
        clearAuthTokens()

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