export const appRoutes = {
    login: '/login',
    dashboard: '/dashboard',
    players: '/players',
    playerDetail: (userId: string | number) => `/players/${userId}`,
    matches: '/matches',
    matchDetail: (matchId: string | number) => `/matches/${matchId}`,
    economy: '/economy',
    events: '/events',
    profile: '/profile',
} as const