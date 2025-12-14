/**
 * Instructor Enrollment Types
 * Based on API: GET /api/Enrollment/instructor/course/{courseId}/students
 * and GET /api/Enrollment/instructor/students
 */

/**
 * Enrollment status string (from API)
 */
export type EnrollmentStatusString = 'Active' | 'Completed' | 'Pending' | 'Cancelled'

/**
 * Instructor Student Enrollment DTO
 */
export interface InstructorStudentEnrollmentDto {
  enrollmentId: string
  studentId: string
  studentFullName: string
  studentEmail: string
  studentAvatarUrl: string | null
  courseId: string
  courseTitle: string
  courseThumbnailUrl: string | null
  enrolledAt: string // ISO 8601 date string
  completedAt: string | null // ISO 8601 date string
  progressPercentage: number // 0-100
  lastAccessed: string | null // ISO 8601 date string
  status: EnrollmentStatusString
  isCompleted: boolean
  certificateIssuedAt: string | null // ISO 8601 date string
  certificateUrl: string | null
}

/**
 * API Response format
 */
export interface InstructorEnrollmentListResponse {
  isSuccess: boolean
  value: InstructorStudentEnrollmentDto[]
  error: {
    statusCode: number
    message: string
  } | null
}

/**
 * Helper to get enrollment status color
 */
export function getEnrollmentStatusColor(status: EnrollmentStatusString): string {
  switch (status) {
    case 'Active':
      return 'bg-blue-600/20 text-blue-400'
    case 'Completed':
      return 'bg-green-600/20 text-green-400'
    case 'Pending':
      return 'bg-yellow-600/20 text-yellow-400'
    case 'Cancelled':
      return 'bg-red-600/20 text-red-400'
    default:
      return 'bg-gray-600/20 text-gray-400'
  }
}

/**
 * Helper to format date
 */
export function formatEnrollmentDate(dateString: string | null): string {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Helper to format last accessed
 */
export function formatLastAccessed(lastAccessed: string | null): string {
  if (!lastAccessed) return 'Never'
  
  const date = new Date(lastAccessed)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

