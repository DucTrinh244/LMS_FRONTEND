import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '~/services/auth/auth'
import type { User } from '~/types/auth/entities'
import type { LoginRequest, } from '~/types/auth/login'
import type { RegisterRequest } from '~/types/auth/register'

interface AuthContextType {
  user: User | null
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      authService.getProfile().then(res => setUser(res.user)).catch(() => logout())
    }
  }, [])

  const login = async (data:LoginRequest) => {
    const res = await authService.login( data)
    if (res.isSuccess && res.value) {
      localStorage.setItem('accessToken', res.value.accessToken)
      localStorage.setItem('refreshToken', res.value.refreshToken)
      setUser(res.value.user)
    } else {
      throw new Error(res.error?.message)
    }
  }

  const register = async (data: RegisterRequest) => {
    const res = await authService.register(data)
    if (res.isSuccess && res.value) {
      localStorage.setItem('accessToken', res.value.accessToken)
      localStorage.setItem('refreshToken', res.value.refreshToken)
      setUser(res.value.user)
    } else {
      throw new Error(res.error?.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
