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

export type AdminMeResponse = AdminUser