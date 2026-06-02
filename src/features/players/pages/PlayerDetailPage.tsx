import { useParams } from 'react-router-dom'

export function PlayerDetailPage() {
    const { userId } = useParams()

    return (
        <div>
            <h1 className="text-2xl font-bold">Player Detail</h1>
            <p className="mt-2 text-muted-foreground">
                Player ID: {userId}
            </p>
        </div>
    )
}