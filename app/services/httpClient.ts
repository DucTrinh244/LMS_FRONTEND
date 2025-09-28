import axios from 'axios'
import { authService } from '~/services/auth/auth'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7151/api',
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
