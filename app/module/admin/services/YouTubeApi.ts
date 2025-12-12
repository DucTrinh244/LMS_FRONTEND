import httpClient from '~/services/httpClient'

export interface YouTubeAuthUrlResponse {
  isSuccess: boolean
  value: string | null
  error: {
    code: string
    message: string
  } | null
}

export interface YouTubeCallbackResponse {
  isSuccess: boolean
  value: boolean
  error: {
    code: string
    message: string
  } | null
}

export interface YouTubeStatusResponse {
  isSuccess: boolean
  value: boolean
  error: {
    code: string
    message: string
  } | null
}

/**
 * Lấy backend callback URL cho YouTube OAuth
 * Backend callback URL: http://localhost:7151/api/youtube/auth/callback
 */
const getBackendCallbackUrl = (): string => {
  let baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7151/api'

  // Đảm bảo sử dụng http cho localhost (không phải https)
  if (baseURL.includes('localhost') && baseURL.startsWith('https://')) {
    baseURL = baseURL.replace('https://', 'http://')
  }

  // Remove /api suffix if present, then add /youtube/auth/callback
  const cleanBaseURL = baseURL.replace(/\/api$/, '')
  return `${cleanBaseURL}/api/youtube/auth/callback`
}

/**
 * Lấy frontend redirect URL sau khi backend xử lý callback
 * Frontend sẽ nhận kết quả từ backend redirect
 */
const getFrontendRedirectUrl = (): string => {
  return `${window.location.origin}/admin/settings?tab=storage`
}

export const youtubeService = {
  /**
   * API 1: Lấy Authorization URL (Admin only)
   * GET /api/youtube/auth-url?redirectUri=...
   * redirectUri phải là backend callback URL
   */
  getAuthorizationUrl: (): Promise<YouTubeAuthUrlResponse> => {
    const redirectUri = getBackendCallbackUrl()
    return httpClient
      .get(`/youtube/auth-url?redirectUri=${encodeURIComponent(redirectUri)}`)
      .then((res) => res.data)
  },

  /**
   * API 2: Handle OAuth Callback (Admin only)
   * POST /api/youtube/auth/callback?code=...&redirectUri=...
   * redirectUri phải giống với redirectUri đã dùng trong getAuthorizationUrl
   */
  handleCallback: (code: string): Promise<YouTubeCallbackResponse> => {
    const redirectUri = getBackendCallbackUrl()
    return httpClient
      .post(
        `/youtube/auth/callback?code=${encodeURIComponent(code)}&redirectUri=${encodeURIComponent(redirectUri)}`
      )
      .then((res) => res.data)
  },

  /**
   * API: Kiểm tra trạng thái kết nối YouTube (Admin only)
   * GET /api/youtube/auth/status
   */
  checkConnectionStatus: (): Promise<YouTubeStatusResponse> => {
    return httpClient.get('/youtube/auth/status').then((res) => res.data)
  },

  /**
   * Helper: Lấy frontend redirect URL
   */
  getFrontendRedirectUrl
}

