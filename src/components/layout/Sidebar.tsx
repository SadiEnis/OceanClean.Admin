import { SidebarNav } from '@/components/layout/SidebarNav'

export function Sidebar() {
    return (
        <aside className="hidden min-h-screen w-64 flex-col border-r bg-card text-card-foreground md:flex">
            <div className="flex h-16 items-center border-b px-5">
                <div>
                    <h1 className="text-lg font-bold tracking-tight">OceanClean</h1>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
            </div>

            <SidebarNav />
        </aside>
    )
}