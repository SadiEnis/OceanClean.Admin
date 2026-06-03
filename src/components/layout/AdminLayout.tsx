import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="flex min-h-screen">
                <Sidebar />

                <main className="flex min-w-0 flex-1 flex-col">
                    <Topbar />

                    <div className="w-full flex-1 p-4 md:p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}