import { Home, SearchX } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/routes'

export function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="max-w-md rounded-xl border bg-card p-8 text-center text-card-foreground shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <SearchX className="h-6 w-6 text-muted-foreground" />
                </div>

                <h1 className="mt-5 text-2xl font-bold">Page not found</h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    The page you are looking for does not exist or may have been moved.
                </p>

                <Button
                    className="mt-6"
                    onClick={() => navigate(appRoutes.dashboard)}
                >
                    <Home className="mr-2 h-4 w-4" />
                    Go to Dashboard
                </Button>
            </div>
        </div>
    )
}