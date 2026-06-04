import {
    CalendarClock,
    Fingerprint,
    History,
    Search,
    ShieldCheck,
    User,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { LoadingState } from '@/components/common/LoadingState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    useAdminAuditLogsQuery,
    useAdminMeQuery,
} from '@/features/auth/api/profile-queries'
import type { AdminAuditLogsQueryParams } from '@/features/auth/types'
import { formatDateTime, formatNumber } from '@/lib/format'

const PAGE_SIZE = 10

function formatNullable(value: string | number | null | undefined) {
    if (value === null || value === undefined || value === '') {
        return '-'
    }

    return String(value)
}

function canViewAuditLogs(role: string) {
    return role === 'super_admin' || role === 'admin'
}

export function ProfilePage() {
    const [page, setPage] = useState(1)

    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')

    const [actionTypeInput, setActionTypeInput] = useState('')
    const [targetTypeInput, setTargetTypeInput] = useState('')
    const [actionType, setActionType] = useState('')
    const [targetType, setTargetType] = useState('')

    const [sortBy, setSortBy] = useState('createdAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

    const meQuery = useAdminMeQuery()

    const queryParams = useMemo<AdminAuditLogsQueryParams>(
        () => ({
            page,
            pageSize: PAGE_SIZE,
            search,
            actionType,
            targetType,
            sortBy,
            sortDirection,
        }),
        [actionType, page, search, sortBy, sortDirection, targetType]
    )

    const auditLogsQuery = useAdminAuditLogsQuery(queryParams)

    const admin = meQuery.data
    const auditLogs = auditLogsQuery.data?.auditLogs ?? []
    const totalCount = auditLogsQuery.data?.totalCount ?? 0
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

    function applyFilters() {
        setPage(1)
        setSearch(searchInput.trim())
        setActionType(actionTypeInput.trim())
        setTargetType(targetTypeInput.trim())
    }

    function clearFilters() {
        setPage(1)
        setSearchInput('')
        setSearch('')
        setActionTypeInput('')
        setTargetTypeInput('')
        setActionType('')
        setTargetType('')
        setSortBy('createdAt')
        setSortDirection('desc')
    }

    if (meQuery.isLoading) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <LoadingState message="Loading profile..." />
            </div>
        )
    }

    if (meQuery.isError || !admin) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
                    Failed to load profile.
                </div>
            </div>
        )
    }

    const showAuditLogs = canViewAuditLogs(admin.role)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="mt-2 text-muted-foreground">
                    Review your admin account and recent administrative actions.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Username
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">{admin.username}</div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Admin ID: {admin.adminUserId}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Role
                        </CardTitle>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">{admin.role}</div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Authorization level
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Status
                        </CardTitle>
                        <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">{admin.adminStatus}</div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Account availability
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Last Login
                        </CardTitle>
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {admin.lastLogin ? formatDateTime(admin.lastLogin) : '-'}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Last successful login
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account Timestamps</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Creation and last update information for this admin account.
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-muted-foreground">Created At</p>
                            <p className="mt-1 font-medium">
                                {formatDateTime(admin.createdAt)}
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-muted-foreground">Updated At</p>
                            <p className="mt-1 font-medium">
                                {admin.updatedAt ? formatDateTime(admin.updatedAt) : '-'}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {showAuditLogs && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <History className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Audit Logs</CardTitle>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Review administrative actions recorded by the system.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid gap-3 xl:grid-cols-[1fr_180px_180px_170px_160px_auto]">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            applyFilters()
                                        }
                                    }}
                                    placeholder="Search audit logs..."
                                    className="pl-9"
                                />
                            </div>

                            <Input
                                value={actionTypeInput}
                                onChange={(event) => setActionTypeInput(event.target.value)}
                                placeholder="Action type"
                            />

                            <Input
                                value={targetTypeInput}
                                onChange={(event) => setTargetTypeInput(event.target.value)}
                                placeholder="Target type"
                            />

                            <Select
                                value={sortBy}
                                onValueChange={(value) => {
                                    setPage(1)
                                    setSortBy(value)
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="createdAt">Created At</SelectItem>
                                    <SelectItem value="adminUsername">Admin Username</SelectItem>
                                    <SelectItem value="adminRole">Admin Role</SelectItem>
                                    <SelectItem value="actionType">Action Type</SelectItem>
                                    <SelectItem value="targetType">Target Type</SelectItem>
                                    <SelectItem value="targetId">Target ID</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={sortDirection}
                                onValueChange={(value) => {
                                    setPage(1)
                                    setSortDirection(value as 'asc' | 'desc')
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Direction" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="desc">Descending</SelectItem>
                                    <SelectItem value="asc">Ascending</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-2">
                                <Button onClick={applyFilters}>Apply</Button>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-xl border">
                            {auditLogsQuery.isLoading && (
                                <div className="p-4">
                                    <LoadingState
                                        message="Loading audit logs..."
                                        className="min-h-40 border-0 shadow-none"
                                    />
                                </div>
                            )}

                            {auditLogsQuery.isError && (
                                <div className="p-6 text-sm text-destructive">
                                    Failed to load audit logs.
                                </div>
                            )}

                            {auditLogsQuery.isSuccess && (
                                <>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Admin</TableHead>
                                                    <TableHead>Action</TableHead>
                                                    <TableHead>Target</TableHead>
                                                    <TableHead>Old Value</TableHead>
                                                    <TableHead>New Value</TableHead>
                                                    <TableHead>IP</TableHead>
                                                    <TableHead>Time</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {auditLogs.length === 0 && (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={7}
                                                            className="h-24 text-center text-muted-foreground"
                                                        >
                                                            No audit logs found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}

                                                {auditLogs.map((log) => (
                                                    <TableRow key={log.auditLogId}>
                                                        <TableCell>
                                                            <div className="font-medium">
                                                                {log.adminUsername}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {log.adminRole}
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="font-medium">
                                                            {log.actionType}
                                                        </TableCell>

                                                        <TableCell>
                                                            <div className="font-medium">
                                                                {log.targetType}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                Target ID: {formatNullable(log.targetId)}
                                                            </div>
                                                        </TableCell>

                                                        <TableCell className="max-w-64 truncate text-sm text-muted-foreground">
                                                            {formatNullable(log.oldValue)}
                                                        </TableCell>

                                                        <TableCell className="max-w-64 truncate text-sm text-muted-foreground">
                                                            {formatNullable(log.newValue)}
                                                        </TableCell>

                                                        <TableCell className="text-sm text-muted-foreground">
                                                            {formatNullable(log.ipAddress)}
                                                        </TableCell>

                                                        <TableCell>
                                                            {formatDateTime(log.createdAt)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            Showing page {page} of {totalPages}. Total logs:{' '}
                                            {formatNumber(totalCount)}
                                        </p>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                disabled={page <= 1}
                                                onClick={() =>
                                                    setPage((current) => Math.max(1, current - 1))
                                                }
                                            >
                                                Previous
                                            </Button>

                                            <Button
                                                variant="outline"
                                                disabled={page >= totalPages}
                                                onClick={() =>
                                                    setPage((current) =>
                                                        Math.min(totalPages, current + 1)
                                                    )
                                                }
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {!showAuditLogs && (
                <Card>
                    <CardHeader>
                        <CardTitle>Audit Logs</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your current role does not have permission to view audit logs.
                        </p>
                    </CardHeader>
                </Card>
            )}
        </div>
    )
}