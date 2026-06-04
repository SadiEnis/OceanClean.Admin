import { SidebarNav } from '@/components/layout/SidebarNav'

export function Sidebar() {
    return (
        <aside className="hidden h-screen w-64 flex-col border-r bg-card text-card-foreground md:fixed md:inset-y-0 md:left-0 md:flex">
            <div className="flex h-16 shrink-0 items-center border-b px-5">
                <div>
                    <h1 className="text-lg font-bold tracking-tight">OceanClean</h1>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
            </div>

            <SidebarNav />
        </aside>
    )
}