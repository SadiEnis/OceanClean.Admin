import { apiClient } from '@/lib/api-client'
import type {
    AdminLoginRequest,
    AdminLoginResponse,
    AdminLogoutRequest,
    AdminLogoutResponse,
    AdminMeResponse,
    AdminRefreshTokenRequest,
    AdminRefreshTokenResponse,
} from '@/features/auth/types'

export async function loginAdmin(
    request: AdminLoginRequest
): Promise<AdminLoginResponse> {
    const response = await apiClient.post<AdminLoginResponse>(
        '/admin/auth/login',
        request
    )

    return response.data
}

export async function refreshAdminToken(
    request: AdminRefreshTokenRequest
): Promise<AdminRefreshTokenResponse> {
    const response = await apiClient.post<AdminRefreshTokenResponse>(
        '/admin/auth/refresh',
        request
    )

    return response.data
}

export async function logoutAdmin(
    request: AdminLogoutRequest
): Promise<AdminLogoutResponse> {
    const response = await apiClient.post<AdminLogoutResponse>(
        '/admin/auth/logout',
        request
    )

    return response.data
}

export async function getCurrentAdmin(): Promise<AdminMeResponse> {
    const response = await apiClient.get<AdminMeResponse>('/admin/auth/me')
    return response.data
}