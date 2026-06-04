import { Loader2 } from 'lucide-react'

type LoadingStateProps = {
    message?: string
    className?: string
}

export function LoadingState({
                                 message = 'Loading...',
                                 className = '',
                             }: LoadingStateProps) {
    return (
        <div
            className={`flex min-h-32 items-center justify-center rounded-xl border bg-card p-6 text-card-foreground shadow-sm ${className}`}
        >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{message}</span>
            </div>
        </div>
    )
}