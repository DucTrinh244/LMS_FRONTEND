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
  role: UserRole
}

export interface UserContext {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatarUrl: string | null
  phone: string | null
  gender: number
  emailVerified: boolean
  isActive: boolean
  roles: UserRole[]
}

export interface AuthValue {
  isActive: boolean
  emailVerified: boolean
  gender: number
  phone: string | null
  avatarUrl: string | null
  fullName: string
  lastName: string
  firstName: string
  email: string
  id: string
  roles: UserRole[]
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
  STUDENT = 'student',
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
