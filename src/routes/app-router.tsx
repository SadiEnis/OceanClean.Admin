import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AdminLayout } from '@/components/layout/AdminLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ProfilePage } from '@/features/auth/pages/ProfilePage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { EconomyPage } from '@/features/economy/pages/EconomyPage'
import { EventsPage } from '@/features/events/pages/EventsPage'
import { MatchesPage } from '@/features/matches/pages/MatchesPage'
import { MatchDetailPage } from '@/features/matches/pages/MatchDetailPage'
import { NotFoundPage } from '@/features/misc/pages/NotFoundPage'
import { PlayersPage } from '@/features/players/pages/PlayersPage'
import { PlayerDetailPage } from '@/features/players/pages/PlayerDetailPage'
import { appRoutes } from '@/lib/routes'
import { ProtectedRoute } from '@/routes/protected-route'
import { PublicRoute } from '@/routes/public-route'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={appRoutes.dashboard} replace />,
    },
    {
        path: appRoutes.login,
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: appRoutes.dashboard,
                element: <DashboardPage />,
            },
            {
                path: appRoutes.players,
                element: <PlayersPage />,
            },
            {
                path: '/players/:userId',
                element: <PlayerDetailPage />,
            },
            {
                path: appRoutes.matches,
                element: <MatchesPage />,
            },
            {
                path: '/matches/:matchId',
                element: <MatchDetailPage />,
            },
            {
                path: appRoutes.economy,
                element: <EconomyPage />,
            },
            {
                path: appRoutes.events,
                element: <EventsPage />,
            },
            {
                path: appRoutes.profile,
                element: <ProfilePage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={appRoutes.dashboard} replace />,
    },
])