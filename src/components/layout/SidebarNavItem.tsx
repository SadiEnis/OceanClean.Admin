import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

type SidebarNavItemProps = {
    to: string
    label: string
    icon: LucideIcon
    end?: boolean
}

export function SidebarNavItem({
                                   to,
                                   label,
                                   icon: Icon,
                                   end = false,
                               }: SidebarNavItemProps) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent text-accent-foreground'
                )
            }
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </NavLink>
    )
}