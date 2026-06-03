import axios from 'axios'

import { getAccessToken } from '@/features/auth/auth-storage'

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5211/api'

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})