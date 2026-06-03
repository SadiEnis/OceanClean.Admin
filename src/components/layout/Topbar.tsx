import { LogOut, UserCircle } from 'lucide-react'

import { MobileSidebar } from '@/components/layout/MobileSidebar'
import { Button } from '@/components/ui/button'
import { useCurrentAdmin } from '@/features/auth/hooks/use-current-admin'
import { useLogout } from '@/features/auth/hooks/use-logout'

export function Topbar() {
    const currentAdminQuery = useCurrentAdmin()
    const logoutMutation = useLogout()

    const admin = currentAdminQuery.data

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

            <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-sm sm:flex">
                    <UserCircle className="h-4 w-4 text-muted-foreground" />
                    <div className="leading-tight">
                        <p className="font-medium">
                            {admin?.username ?? 'Admin'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {admin?.role ?? 'loading'}
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                </Button>
            </div>
        </header>
    )
}