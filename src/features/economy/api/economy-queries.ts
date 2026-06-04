import { useQuery } from '@tanstack/react-query'

import {
    getEconomyCurrencyFlow,
    getEconomyItemSummary,
    getEconomyItemTimeseries,
} from '@/features/economy/api/economy-api'
import type { EconomyRange } from '@/features/economy/types'

export function useEconomyItemSummaryQuery(range: EconomyRange) {
    return useQuery({
        queryKey: ['economy-item-summary', range],
        queryFn: () => getEconomyItemSummary({ range }),
    })
}

export function useEconomyItemTimeseriesQuery(range: EconomyRange) {
    return useQuery({
        queryKey: ['economy-item-timeseries', range],
        queryFn: () => getEconomyItemTimeseries({ range }),
    })
}

export function useEconomyCurrencyFlowQuery(range: EconomyRange) {
    return useQuery({
        queryKey: ['economy-currency-flow', range],
        queryFn: () => getEconomyCurrencyFlow({ range }),
    })
}