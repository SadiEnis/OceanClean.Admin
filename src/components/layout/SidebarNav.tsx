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

type SidebarNavProps = {
    onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
    return (
        <nav className="flex flex-1 flex-col gap-1 p-3">
            <SidebarNavItem
                to={appRoutes.dashboard}
                label="Dashboard"
                icon={LayoutDashboard}
                onClick={onNavigate}
            />

            <SidebarNavItem
                to={appRoutes.players}
                label="Players"
                icon={Users}
                onClick={onNavigate}
            />

            <SidebarNavItem
                to={appRoutes.matches}
                label="Matches"
                icon={ClipboardList}
                onClick={onNavigate}
            />

            <SidebarNavItem
                to={appRoutes.economy}
                label="Economy"
                icon={CircleDollarSign}
                onClick={onNavigate}
            />

            <SidebarNavItem
                to={appRoutes.events}
                label="Events"
                icon={BarChart3}
                onClick={onNavigate}
            />

            <div className="mt-auto">
                <Separator className="mb-3" />

                <SidebarNavItem
                    to={appRoutes.profile}
                    label="Profile"
                    icon={UserCircle}
                    onClick={onNavigate}
                />
            </div>
        </nav>
    )
}