import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '~/module/auth/services/auth'
import type { UserContext } from '~/types/auth/entities'
import type { LoginRequest } from '~/types/auth/login'
import type { RegisterRequest } from '~/types/auth/register'

interface AuthContextType {
  user: UserContext | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 🔹 Khi app khởi động, kiểm tra token và lấy profile
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    console.log('🔑 Token from localStorage:', accessToken)

    if (accessToken) {
      authService.getProfile()
        .then(res => {
          console.log('✅ getProfile success:', res)

          const userContext: UserContext = {
            id: res.value.id,
            email: res.value.email,
            firstName: res.value.firstName,
            lastName: res.value.lastName,
            fullName: res.value.fullName,
            avatarUrl: res.value.avatarUrl,
            phone: res.value.phone,
            gender: res.value.gender,
            emailVerified: res.value.emailVerified,
            isActive: res.value.isActive,
            roles: res.value.roles
          }

          setUser(userContext)
          console.log('👤 User context set:', userContext)
        })
        .catch((error) => {
          console.error('❌ getProfile failed:', error)
          logout()
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  // 🔹 Login
  const login = async (data: LoginRequest) => {
    const res = await authService.login(data)
    if (res.isSuccess && res.value) {
      localStorage.setItem('accessToken', res.value.accessToken)
      localStorage.setItem('refreshToken', res.value.refreshToken)

      // Set user từ login response trước (để có thông tin cơ bản ngay lập tức)
      const userContext: UserContext = {
        id: res.value.id,
        email: res.value.email,
        firstName: res.value.firstName,
        lastName: res.value.lastName,
        fullName: res.value.fullName,
        avatarUrl: res.value.avatarUrl,
        phone: res.value.phone,
        gender: res.value.gender,
        emailVerified: res.value.emailVerified,
        isActive: res.value.isActive,
        roles: res.value.roles
      }

      setUser(userContext)

      // Sau đó gọi getProfile để cập nhật thông tin đầy đủ và mới nhất
      try {
        const profileRes = await authService.getProfile()
        if (profileRes && profileRes.value) {
          const updatedUserContext: UserContext = {
            id: profileRes.value.id,
            email: profileRes.value.email,
            firstName: profileRes.value.firstName,
            lastName: profileRes.value.lastName,
            fullName: profileRes.value.fullName,
            avatarUrl: profileRes.value.avatarUrl,
            phone: profileRes.value.phone,
            gender: profileRes.value.gender,
            emailVerified: profileRes.value.emailVerified,
            isActive: profileRes.value.isActive,
            roles: profileRes.value.roles
          }
          setUser(updatedUserContext)
          console.log('✅ Profile updated after login:', updatedUserContext)
        }
      } catch (error) {
        console.error('⚠️ Failed to fetch profile after login, using login response data:', error)
        // Nếu getProfile fail, vẫn giữ user từ login response
      }
    } else {
      throw new Error(res.error?.message)
    }
  }

  // 🔹 Register
  const register = async (data: RegisterRequest) => {
    const res = await authService.register(data)
    if (res.isSuccess && res.value) {
      localStorage.setItem('accessToken', res.value.accessToken)
      localStorage.setItem('refreshToken', res.value.refreshToken)

      // Set user từ register response trước (để có thông tin cơ bản ngay lập tức)
      const userContext: UserContext = {
        id: res.value.id,
        email: res.value.email,
        firstName: res.value.firstName,
        lastName: res.value.lastName,
        fullName: res.value.fullName,
        avatarUrl: res.value.avatarUrl,
        phone: res.value.phone,
        gender: res.value.gender,
        emailVerified: res.value.emailVerified,
        isActive: res.value.isActive,
        roles: res.value.roles
      }

      setUser(userContext)

      // Sau đó gọi getProfile để cập nhật thông tin đầy đủ và mới nhất
      try {
        const profileRes = await authService.getProfile()
        if (profileRes && profileRes.value) {
          const updatedUserContext: UserContext = {
            id: profileRes.value.id,
            email: profileRes.value.email,
            firstName: profileRes.value.firstName,
            lastName: profileRes.value.lastName,
            fullName: profileRes.value.fullName,
            avatarUrl: profileRes.value.avatarUrl,
            phone: profileRes.value.phone,
            gender: profileRes.value.gender,
            emailVerified: profileRes.value.emailVerified,
            isActive: profileRes.value.isActive,
            roles: profileRes.value.roles
          }
          setUser(updatedUserContext)
          console.log('✅ Profile updated after register:', updatedUserContext)
        }
      } catch (error) {
        console.error('⚠️ Failed to fetch profile after register, using register response data:', error)
        // Nếu getProfile fail, vẫn giữ user từ register response
      }
    } else {
      throw new Error(res.error?.message)
    }
  }

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        login, 
        logout, 
        register 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
