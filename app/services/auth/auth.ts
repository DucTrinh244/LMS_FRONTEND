import httpClient from '~/services/httpClient'

export interface LoginRequest {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}
export const auhService = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return httpClient.post('/auth/login', data).then((res) => res.data)
  },
  logout: (): Promise<void> => {
    return httpClient.post('/auth/logout').then((res) => res.data)
  },
  getProfile: (): Promise<any> => {
    return httpClient.get('/auth/profile').then((res) => res.data)
  }
}
