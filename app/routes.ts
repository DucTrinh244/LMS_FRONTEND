import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  // Auth routes
  route('login', 'routes/auth/login.tsx'),
  route('register', 'routes/auth/register.tsx'),
  // Dashboard and nested routes

  route('dashboard', 'routes/dashboard/_layout.tsx')
] satisfies RouteConfig
