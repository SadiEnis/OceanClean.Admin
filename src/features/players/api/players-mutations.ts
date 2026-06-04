import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAdminPlayerStatus } from '@/features/players/api/players-api'
import type {
    AdminUpdatePlayerStatusRequest,
    AdminUpdatePlayerStatusResponse,
} from '@/features/players/types'

type UseUpdateAdminPlayerStatusMutationParams = {
    userId: string | undefined
}

export function useUpdateAdminPlayerStatusMutation({
                                                       userId,
                                                   }: UseUpdateAdminPlayerStatusMutationParams) {
    const queryClient = useQueryClient()

    return useMutation<
        AdminUpdatePlayerStatusResponse,
        Error,
        AdminUpdatePlayerStatusRequest
    >({
        mutationFn: (request) => updateAdminPlayerStatus(userId!, request),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['admin-player-detail', userId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['admin-players'],
                }),
            ])
        },
    })
}