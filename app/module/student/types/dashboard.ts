/**
 * Student Dashboard Types
 * Based on API: /api/StudentDashboard
 */

/**
 * Base API Response
 */
export interface BaseResponse<T> {
  isSuccess: boolean
  value: T | null
  error: {
    statusCode: number
    message: string
  } | null
}

/**
 * Dashboard Stats DTO
 */
export interface DashboardStatsDto {
  enrolledCourses: number
  activeCourses: number
  completedCourses: number
}

/**
 * Current Quiz DTO
 */
export interface CurrentQuizDto {
  quizId: string
  quizTitle: string
  lessonId: string
  lessonTitle: string
  courseId: string
  courseTitle: string
  attemptId: string
  answeredQuestions: number
  totalQuestions: number
  startedAt: string
  expiresAt: string | null
}

/**
 * Recently Enrolled Course DTO
 */
export interface RecentlyEnrolledCourseDto {
  id: string
  title: string
  thumbnailUrl: string | null
  instructorName: string
  instructorAvatarUrl: string | null
  category: string
  rating: number
  reviewCount: number
  price: number
  currency: string
  badge: string | null // "NEW", "15% OFF", etc.
  enrolledAt: string
}

/**
 * Latest Quiz DTO
 */
export interface LatestQuizDto {
  quizId: string
  quizTitle: string
  courseId: string
  courseTitle: string
  attemptId: string
  correctAnswers: number
  totalQuestions: number
  percentage: number
  completedAt: string
}

/**
 * Dashboard Summary DTO
 */
export interface DashboardSummaryDto {
  stats: DashboardStatsDto
  currentQuiz: CurrentQuizDto | null
  recentlyEnrolledCourses: RecentlyEnrolledCourseDto[]
  latestQuizzes: LatestQuizDto[]
}

