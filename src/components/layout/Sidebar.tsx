import {
    BarChart3,
    CircleDollarSign,
    ClipboardList,
    LayoutDashboard,
    UserCircle,
    Users,
} from 'lucide-react'

import { SidebarNavItem } from '@/components/layout/SidebarNavItem'
import { Separator } from '@/components/ui/separator'
import { appRoutes } from '@/lib/routes'

export function Sidebar() {
    return (
        <aside className="hidden min-h-screen w-64 flex-col border-r bg-card text-card-foreground md:flex">
            <div className="flex h-16 items-center border-b px-5">
                <div>
                    <h1 className="text-lg font-bold tracking-tight">OceanClean</h1>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-3">
                <SidebarNavItem
                    to={appRoutes.dashboard}
                    label="Dashboard"
                    icon={LayoutDashboard}
                />

                <SidebarNavItem
                    to={appRoutes.players}
                    label="Players"
                    icon={Users}
                />

                <SidebarNavItem
                    to={appRoutes.matches}
                    label="Matches"
                    icon={ClipboardList}
                />

                <SidebarNavItem
                    to={appRoutes.economy}
                    label="Economy"
                    icon={CircleDollarSign}
                />

                <SidebarNavItem
                    to={appRoutes.events}
                    label="Events"
                    icon={BarChart3}
                />

                <div className="mt-auto">
                    <Separator className="mb-3" />

                    <SidebarNavItem
                        to={appRoutes.profile}
                        label="Profile"
                        icon={UserCircle}
                    />
                </div>
            </nav>
        </aside>
    )
}