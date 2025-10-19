import httpClient from '~/services/httpClient'
import type { LoginRequest, LoginResponse } from '~/types/auth/login'
import type { RegisterRequest, RegisterResponse } from '~/types/auth/register'

// AXIOS INSTANCE
export const authService = {
  register: (data: RegisterRequest): Promise<RegisterResponse> => {
    return httpClient.post('/Auth/register', data).then((res) => res.data)
  },
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return httpClient.post('/auth/login', data).then((res) => res.data)
  },
  logout: (): Promise<void> => {
    return httpClient.post('/auth/logout').then((res) => res.data)
  },
  refreshToken: (refreshToken: string): Promise<any> => {
    return httpClient.post('/auth/refresh-token').then((res) => res.data)
  },
  getProfile: (): Promise<any> => {
    return httpClient.get('/auth/profile').then((res) => res.data)
  }
}
