import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export function AdminLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            <div className="min-h-screen md:pl-64">
                <Topbar />

                <main className="w-full p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}