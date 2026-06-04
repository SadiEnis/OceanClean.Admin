import { Badge } from '@/components/ui/badge'
import type { AdminEventActionType } from '@/features/events/types'

type EventActionBadgeProps = {
    actionType: AdminEventActionType
}

function formatActionType(actionType: string) {
    return actionType
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

export function EventActionBadge({ actionType }: EventActionBadgeProps) {
    if (actionType === 'player_fainted') {
        return <Badge variant="destructive">{formatActionType(actionType)}</Badge>
    }

    if (actionType === 'revive_player' || actionType === 'rescue_completed') {
        return <Badge variant="default">{formatActionType(actionType)}</Badge>
    }

    if (actionType === 'use_item') {
        return <Badge variant="secondary">{formatActionType(actionType)}</Badge>
    }

    return <Badge variant="outline">{formatActionType(actionType)}</Badge>
}