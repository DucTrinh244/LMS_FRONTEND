import axios from 'axios'
import { authService } from '~/module/auth/services/auth'

/**
 * Lấy baseURL cho API, đảm bảo dùng http cho localhost
 */
export const getApiBaseURL = (): string => {
  let baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7151/api'

  // Đảm bảo sử dụng http cho localhost (không phải https)
  if (baseURL.includes('localhost') && baseURL.startsWith('https://')) {
    baseURL = baseURL.replace('https://', 'http://')
  }

  // Đảm bảo có /api suffix
  if (!baseURL.endsWith('/api')) {
    baseURL = baseURL.endsWith('/') ? `${baseURL}api` : `${baseURL}/api`
  }

  return baseURL
}

const httpClient = axios.create({
  baseURL: getApiBaseURL(),
  headers: { 'Content-Type': 'application/json' }
})

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        const data = await authService.refreshToken(refreshToken)
        localStorage.setItem('accessToken', data.accessToken)
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
        return axios(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient
