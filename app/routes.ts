import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  // Auth routes
  route('login', 'routes/auth/login.tsx'),
  route('register', 'routes/auth/register.tsx'),
  route('forgot-password', 'routes/auth/forgot-password.tsx'),
  route('reset-password', 'routes/auth/reset-password.tsx'),
  route('verify-email', 'routes/auth/verify-email.tsx'),
  // Dashboard and nested routes

  //Courses routes
  route('courses', 'routes/course/_index.tsx'),
  // route('courses', 'routes/courses/_layout.tsx', [

  route('dashboard', 'routes/dashboard/_layout.tsx')
] satisfies RouteConfig
