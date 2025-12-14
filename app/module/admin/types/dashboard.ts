/**
 * Admin Dashboard Types
 * Based on API: /api/AdminDashboard
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
    totalRevenue: number
    totalStudents: number
    activeCourses: number
    totalInstructors: number
    revenueChange: number
    revenueTrend: "up" | "down"
    studentsChange: number
    studentsTrend: "up" | "down"
    coursesChange: number
    coursesTrend: "up" | "down"
    instructorsChange: number
    instructorsTrend: "up" | "down"
}

/**
 * Recent Enrollment DTO
 */
export interface RecentEnrollmentDto {
    id: string
    studentId: string
    studentName: string
    studentAvatarUrl: string | null
    studentEmail: string
    courseId: string
    courseTitle: string
    instructorName: string
    instructorAvatarUrl: string | null
    amount: number
    currency: string
    enrolledAt: string
    status: "Completed" | "Active" | "Pending"
}

/**
 * Top Course DTO
 */
export interface TopCourseDto {
    courseId: string
    courseTitle: string
    courseThumbnailUrl: string | null
    instructorName: string
    totalStudents: number
    averageRating: number
    totalReviews: number
    totalRevenue: number
}

/**
 * Revenue Chart Data Point DTO
 */
export interface RevenueChartDataPointDto {
    date: string
    revenue: number
    transactions: number
}

/**
 * Revenue Chart Data DTO
 */
export interface RevenueChartDataDto {
    timeRange: string
    dataPoints: RevenueChartDataPointDto[]
}

/**
 * Enrollment Chart Data Point DTO
 */
export interface EnrollmentChartDataPointDto {
    date: string
    enrollments: number
    newStudents: number
}

/**
 * Enrollment Chart Data DTO
 */
export interface EnrollmentChartDataDto {
    timeRange: string
    dataPoints: EnrollmentChartDataPointDto[]
}

/**
 * Dashboard Summary DTO
 */
export interface AdminDashboardSummaryDto {
    stats: DashboardStatsDto
    recentEnrollments: RecentEnrollmentDto[]
    topCourses: TopCourseDto[]
    revenueChartData: RevenueChartDataDto
    enrollmentChartData: EnrollmentChartDataDto
}

/**
 * Helper Functions
 */
export function formatCurrency(amount: number, currency: string = "VND"): string {
    if (currency === "VND") {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount)
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

