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
export interface AuthValue {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: string
}

export interface ApiError {
  statusCode: number
  message: string
}
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  avatarUrl: string
  dateOfBirth: string
  gender: number
  address: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  fullName: string
}
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
