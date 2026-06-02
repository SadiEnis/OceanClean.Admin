import { Navigate, createBrowserRouter } from 'react-router-dom'

import { AdminLayout } from '@/components/layout/AdminLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ProfilePage } from '@/features/auth/pages/ProfilePage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { EconomyPage } from '@/features/economy/pages/EconomyPage'
import { EventsPage } from '@/features/events/pages/EventsPage'
import { MatchDetailPage } from '@/features/matches/pages/MatchDetailPage'
import { MatchesPage } from '@/features/matches/pages/MatchesPage'
import { PlayerDetailPage } from '@/features/players/pages/PlayerDetailPage'
import { PlayersPage } from '@/features/players/pages/PlayersPage'
import { appRoutes } from '@/lib/routes'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={appRoutes.dashboard} replace />,
    },
    {
        path: appRoutes.login,
        element: <LoginPage />,
    },
    {
        element: <AdminLayout />,
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
        ],
    },
    {
        path: '*',
        element: <Navigate to={appRoutes.dashboard} replace />,
    },
])