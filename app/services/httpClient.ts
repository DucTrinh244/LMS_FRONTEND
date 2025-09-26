// setup fetch/axios chung.
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// interceptors : Automatically attach token to requests
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') // or however you store the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response intercepter ->  access token expired -> refresh token
httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Gọi API refresh (cookie HttpOnly tự gửi kèm)
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, { withCredentials: true })

        const newToken = res.data.accessToken
        localStorage.setItem('access_token', newToken)

        httpClient.defaults.headers.Authorization = `Bearer ${newToken}`
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return httpClient(originalRequest)
      } catch (err) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
export default httpClient
