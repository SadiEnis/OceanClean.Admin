export type AdminUser = {
    adminUserId: number
    username: string
    role: string
}

export type AdminLoginRequest = {
    username: string
    password: string
}

export type AdminLoginResponse = {
    success: boolean
    message: string
    accessToken: string | null
    refreshToken: string | null
    admin: AdminUser | null
}

export type AdminRefreshTokenRequest = {
    refreshToken: string
}

export type AdminRefreshTokenResponse = {
    success: boolean
    message: string
    accessToken: string | null
    admin: AdminUser | null
}

export type AdminLogoutRequest = {
    refreshToken: string
}

export type AdminLogoutResponse = {
    success: boolean
    message: string
}

export type AdminMeResponse = {
    adminUserId: number
    username: string
    role: string
    adminStatus: string
    lastLogin: string | null
    createdAt: string
    updatedAt: string | null
}

export type AdminAuditLogListItem = {
    auditLogId: number

    adminUserId: number
    adminUsername: string
    adminRole: string

    actionType: string
    targetType: string
    targetId: number | null

    oldValue: string | null
    newValue: string | null

    ipAddress: string | null
    userAgent: string | null

    createdAt: string
}

export type AdminAuditLogsListResponse = {
    success: boolean
    message: string

    page: number
    pageSize: number
    totalCount: number

    auditLogs: AdminAuditLogListItem[]
}

export type AdminAuditLogsQueryParams = {
    page: number
    pageSize: number

    search?: string
    actionType?: string
    targetType?: string

    from?: string
    to?: string

    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}