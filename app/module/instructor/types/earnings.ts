/**
 * Instructor Earnings Types
 * Based on API: /api/InstructorEarnings
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
 * Top Course Earnings DTO
 */
export interface TopCourseEarningsDto {
  courseId: string
  courseTitle: string
  courseThumbnailUrl: string | null
  totalEarnings: number
  totalEnrollments: number
  averageEarningPerEnrollment: number
  lastPaymentDate: string | null
}

/**
 * Earnings by Month DTO
 */
export interface EarningsByMonthDto {
  year: number
  month: number
  monthName: string
  totalEarnings: number
  totalEnrollments: number
}

/**
 * Earnings Summary DTO
 */
export interface EarningsSummaryDto {
  totalEarnings: number
  thisMonthEarnings: number
  lastMonthEarnings: number
  totalEnrollments: number
  thisMonthEnrollments: number
  lastMonthEnrollments: number
  totalCourses: number
  topCourses: TopCourseEarningsDto[]
  earningsByMonth: EarningsByMonthDto[]
}

/**
 * Course Earnings DTO
 */
export interface CourseEarningsDto {
  courseId: string
  courseTitle: string
  courseThumbnailUrl: string | null
  totalEarnings: number
  totalEnrollments: number
  averageEarningPerEnrollment: number
  lastPaymentDate: string | null
}

/**
 * Payment DTO
 */
export interface PaymentDto {
  paymentId: string
  courseId: string
  courseTitle: string
  courseThumbnailUrl: string | null
  studentId: string
  studentFullName: string
  studentEmail: string
  studentAvatarUrl: string | null
  amount: number
  currency: string
  status: string
  statusCode: number
  paidAt: string | null
  createdAt: string
  transactionNo: string | null
  paymentMethod: string | null
}

/**
 * Earnings by Time Range DTO
 */
export interface EarningsByTimeRangeDto {
  startDate: string
  endDate: string
  totalEarnings: number
  totalEnrollments: number
  earningsByCourse: CourseEarningsDto[]
  payments: PaymentDto[]
}

/**
 * Helper function to format currency
 */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currency 
  }).format(amount)
}

/**
 * Helper function to format number
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

