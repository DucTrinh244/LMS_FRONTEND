// src/utils/authHelpers.ts
import type { LoginFormData, LoginRequest } from '~/types/auth/login'
import type { RegisterFormData, RegisterRequest } from '~/types/auth/register'

export function genderToNumber(gender: 'male' | 'female' | 'other' | ''): number {
  switch (gender) {
    case 'male':
      return 1
    case 'female':
      return 2
    case 'other':
      return 3
    default:
      return 0
  }
}

export function mapFormDataToRegisterRequest(formData: RegisterFormData): RegisterRequest {
  return {
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    dateOfBirth: formData.birthday,
    gender: genderToNumber(formData.gender)
  }
}

export function mapFormDataToLoginRequest(formData: LoginFormData): LoginRequest {
  return {
    email: formData.email,
    password: formData.password,
    rememberMe: formData.rememberMe
  }
}
