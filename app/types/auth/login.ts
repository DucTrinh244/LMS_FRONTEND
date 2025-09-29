import type { ApiError, AuthValue } from '~/types/auth/entities'

// API request/response
export interface LoginRequest {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginResponse {
  isSuccess: boolean
  value: AuthValue | null
  error: ApiError | null
}

// Form state (UI) login form
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}
