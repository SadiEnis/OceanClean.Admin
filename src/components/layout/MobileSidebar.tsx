import { Menu } from 'lucide-react'
import { useState } from 'react'

import { SidebarNav } from '@/components/layout/SidebarNav'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

export function MobileSidebar() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open navigation menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex w-72 flex-col p-0">
                <SheetHeader className="border-b px-5 py-4 text-left">
                    <SheetTitle>OceanClean</SheetTitle>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                </SheetHeader>

                <SidebarNav onNavigate={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    )
}