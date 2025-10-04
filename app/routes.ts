import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  // index('routes/home.tsx'),
  index('module/landing/pages/homePage.tsx'),
  // Auth routes
  route('login', 'module/auth/pages/login.tsx'),
  route('register', 'module/auth/pages/register.tsx'),
  route('forgot-password', 'module/auth/pages/forgot-password.tsx'),
  route('reset-password', 'module/auth/pages/reset-password.tsx'),
  route('verify-email', 'module/auth/pages/verify-email.tsx'),
  // Dashboard and nested routes

  //Courses routes
  route('courses', 'module/course/pages/_index.tsx'),
  // route('courses', 'routes/courses/_layout.tsx', [

  route('dashboard', 'module/student/pages/_layout.tsx')

  // <Route />
] satisfies RouteConfig

// const Demo:FC  = {

// }
