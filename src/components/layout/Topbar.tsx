import { UserCircle } from 'lucide-react'

import { MobileSidebar } from '@/components/layout/MobileSidebar'

export function Topbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="flex items-center gap-3">
                <MobileSidebar />

                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        OceanClean Admin
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Admin</span>
            </div>
        </header>
    )
}