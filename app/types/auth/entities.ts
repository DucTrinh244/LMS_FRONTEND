export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  // role: UserRole
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

export enum UserRole {
  USER = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}
export interface AuthState {
  user: User | null
  tokens: AuthValue | null
  isAuthenticated: boolean
  isLoading: boolean
}
