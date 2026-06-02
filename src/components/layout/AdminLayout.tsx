import { Outlet } from 'react-router-dom'

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="flex min-h-screen">
                <aside className="hidden w-64 border-r bg-card p-4 md:block">
                    <div className="text-lg font-bold">OceanClean</div>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Admin Panel
                    </p>
                </aside>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}