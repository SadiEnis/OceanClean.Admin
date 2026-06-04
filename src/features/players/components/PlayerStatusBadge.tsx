import { Badge } from '@/components/ui/badge'
import type { PlayerStatus } from '@/features/players/types'

type PlayerStatusBadgeProps = {
    status: PlayerStatus
}

export function PlayerStatusBadge({ status }: PlayerStatusBadgeProps) {
    if (status === 'active') {
        return <Badge variant="default">Active</Badge>
    }

    if (status === 'banned') {
        return <Badge variant="destructive">Banned</Badge>
    }

    return <Badge variant="secondary">Inactive</Badge>
}