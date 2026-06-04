export type ChartSeriesConfig = {
    label: string
    color: string
}

export const chartSeries = {
    dashboard: {
        newPlayers: {
            label: 'New Players',
            color: '#2563eb',
        },
        playerLogins: {
            label: 'Player Logins',
            color: '#16a34a',
        },
        matchesPlayed: {
            label: 'Matches Played',
            color: '#9333ea',
        },
        itemPurchases: {
            label: 'Item Purchases',
            color: '#f97316',
        },
        gameplayEvents: {
            label: 'Gameplay Events',
            color: '#64748b',
        },
        currencyEarned: {
            label: 'Currency Earned',
            color: '#22c55e',
        },
        currencySpent: {
            label: 'Currency Spent',
            color: '#ef4444',
        },
    },

    economy: {
        purchasedQuantity: {
            label: 'Purchased Quantity',
            color: '#f97316',
        },
        usedQuantity: {
            label: 'Used Quantity',
            color: '#06b6d4',
        },
        currencyEarned: {
            label: 'Currency Earned',
            color: '#22c55e',
        },
        currencySpent: {
            label: 'Currency Spent',
            color: '#ef4444',
        },
        netCurrency: {
            label: 'Net Currency',
            color: '#2563eb',
        },
    },

    players: {
        totalPlayers: {
            label: 'Total Players',
            color: '#2563eb',
        },
        activePlayers: {
            label: 'Active Players',
            color: '#16a34a',
        },
        bannedPlayers: {
            label: 'Banned Players',
            color: '#ef4444',
        },
        inactivePlayers: {
            label: 'Inactive Players',
            color: '#64748b',
        },
    },

    matches: {
        totalMatches: {
            label: 'Total Matches',
            color: '#9333ea',
        },
        totalScore: {
            label: 'Total Score',
            color: '#2563eb',
        },
        totalCurrencyEarned: {
            label: 'Total Currency Earned',
            color: '#22c55e',
        },
        totalTrashRecycled: {
            label: 'Total Trash Recycled',
            color: '#06b6d4',
        },
    },

    events: {
        pickupTrash: {
            label: 'Pickup Trash',
            color: '#06b6d4',
        },
        recycleTrash: {
            label: 'Recycle Trash',
            color: '#22c55e',
        },
        revivePlayer: {
            label: 'Revive Player',
            color: '#a855f7',
        },
        playerFainted: {
            label: 'Player Fainted',
            color: '#ef4444',
        },
        useItem: {
            label: 'Use Item',
            color: '#f97316',
        },
        rescueStarted: {
            label: 'Rescue Started',
            color: '#eab308',
        },
        rescueCompleted: {
            label: 'Rescue Completed',
            color: '#16a34a',
        },
    },
} as const