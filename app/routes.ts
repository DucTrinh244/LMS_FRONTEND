import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  // ============================================
  // PUBLIC ROUTES - Không cần đăng nhập
  // ============================================
  index('module/landing/pages/homePage.tsx'),
  route('courses', 'module/landing/pages/coursePage.tsx'),
  route('course/detail/:courseId', 'module/landing/pages/courseDetailPage.tsx'),
  route('course/category', 'module/landing/pages/CategoryGridPage.tsx'),
  route('instructors', 'module/landing/pages/InstructorGridPage.tsx'),
  route('instructor/detail', 'module/landing/pages/InstructorDetailPage.tsx'),
  route('cart', 'module/landing/pages/CartPage.tsx'),
  route('about', 'module/landing/pages/aboutPage.tsx'),
  route('contact', 'module/landing/pages/contactPage.tsx'),
  route('faq', 'module/landing/pages/FAQPage.tsx'),
  route('pricing', 'module/landing/pages/pricingPages.tsx'),

  // ============================================
  // AUTH ROUTES - Guest only (chưa đăng nhập)
  // ============================================
  route('login', 'module/auth/pages/login.tsx'),
  route('register', 'module/auth/pages/register.tsx'),
  route('forgot-password', 'module/auth/pages/forgot-password.tsx'),
  route('reset-password', 'module/auth/pages/reset-password.tsx'),
  route('verify-email', 'module/auth/pages/verify-email.tsx'),

  // ============================================
  // COURSE ROUTES - Yêu cầu đăng nhập
  // ============================================
  route('courses-resume', 'module/course/pages/CourseResumePage.tsx'),
  route('courses-watch', 'module/course/pages/CourseWatchPage.tsx'),

  // ============================================
  // STUDENT ROUTES - Chỉ Student
  // ============================================
  route('student', 'module/student/pages/DashboardPage.tsx'),
  route('student/quiz/:quizId/attempt', 'module/student/pages/QuizAttemptPage.tsx'),
  route('student/quiz/attempt/:attemptId', 'module/student/pages/QuizAttemptDetailPage.tsx'),

  // ============================================
  // INSTRUCTOR ROUTES - Chỉ Instructor
  // ============================================
  route('instructor', 'module/instructor/pages/DashboardPage.tsx'),
  route('instructor/courses/:courseId/preview', 'module/instructor/pages/course/PreviewCourseInstructorPage.tsx'),

  // ============================================
  // ADMIN ROUTES - Chỉ Admin
  // ============================================
  route('admin', 'module/admin/pages/DashboardPage.tsx'),

  // ============================================
  // ERROR PAGES
  // ============================================
  route('unauthorized', 'pages/UnauthorizedPage.tsx'),
  route('*', 'pages/NotFoundPage.tsx'),
] satisfies RouteConfig
