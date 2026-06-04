import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PlayerDetailStatCardProps = {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
}

export function PlayerDetailStatCard({
                                         title,
                                         value,
                                         description,
                                         icon: Icon,
                                     }: PlayerDetailStatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                <div className="text-2xl font-bold">{value}</div>

                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}