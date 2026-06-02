import { useParams } from 'react-router-dom'

export function MatchDetailPage() {
    const { matchId } = useParams()

    return (
        <div>
            <h1 className="text-2xl font-bold">Match Detail</h1>
            <p className="mt-2 text-muted-foreground">
                Match ID: {matchId}
            </p>
        </div>
    )
}