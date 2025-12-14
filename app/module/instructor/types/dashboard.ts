/**
 * Instructor Dashboard Types
 * Based on API: /api/InstructorDashboard
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
 * Recent Course DTO
 */
export interface RecentCourseDto {
  id: string
  title: string
  thumbnailUrl: string | null
  enrolledCount: number
  status: string // "Published", "Draft"
  createdAt: string
}

/**
 * Monthly Breakdown DTO
 */
export interface MonthlyBreakdownDto {
  month: number
  monthName: string
  earnings: number
  enrollments: number
}

/**
 * Earnings by Year DTO
 */
export interface EarningsByYearDto {
  year: number
  totalEarnings: number
  totalEnrollments: number
  monthlyBreakdown: MonthlyBreakdownDto[]
}

/**
 * Dashboard Stats DTO
 */
export interface DashboardStatsDto {
  totalCourses: number
  activeCourses: number
  completedCourses: number
  totalStudents: number
  totalEnrollments: number
  totalEarnings: number
}

/**
 * Dashboard Summary DTO
 */
export interface DashboardSummaryDto {
  totalCourses: number
  activeCourses: number
  completedCourses: number
  totalStudents: number
  totalEnrollments: number
  totalEarnings: number
  recentCourses: RecentCourseDto[]
  earningsByYear: EarningsByYearDto[]
}

