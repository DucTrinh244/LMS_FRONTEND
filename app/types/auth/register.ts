import type { ApiError, AuthValue } from '~/types/auth/entities'

// API request/response
export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  gender: number
}

export interface RegisterResponse {
  isSuccess: boolean
  value: AuthValue | null
  error: ApiError | null
}

// Form state (UI)
export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthday: string
  gender: 'male' | 'female' | 'other' | ''
  password: string
  confirmPassword: string
  role: 'student' | 'instructor'
  agreeToTerms: boolean
  receiveUpdates: boolean
}
