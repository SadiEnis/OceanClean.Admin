import { apiClient } from '@/lib/api-client'
import type {
    EconomyCurrencyFlowResponse,
    EconomyItemSummaryResponse,
    EconomyItemTimeseriesResponse,
    EconomyRange,
} from '@/features/economy/types'

type EconomyRangeParams = {
    range: EconomyRange
}

export async function getEconomyItemSummary({
                                                range,
                                            }: EconomyRangeParams): Promise<EconomyItemSummaryResponse> {
    const response = await apiClient.get<EconomyItemSummaryResponse>(
        '/admin/economy/item-summary',
        {
            params: {
                range,
            },
        }
    )

    return response.data
}

export async function getEconomyItemTimeseries({
                                                   range,
                                               }: EconomyRangeParams): Promise<EconomyItemTimeseriesResponse> {
    const response = await apiClient.get<EconomyItemTimeseriesResponse>(
        '/admin/economy/item-timeseries',
        {
            params: {
                range,
            },
        }
    )

    return response.data
}

export async function getEconomyCurrencyFlow({
                                                 range,
                                             }: EconomyRangeParams): Promise<EconomyCurrencyFlowResponse> {
    const response = await apiClient.get<EconomyCurrencyFlowResponse>(
        '/admin/economy/currency-flow',
        {
            params: {
                range,
            },
        }
    )

    return response.data
}