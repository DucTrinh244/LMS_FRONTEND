/**
 * Enrollment Types
 * Based on API: GET /api/Enrollment/my-course-student
 */

/**
 * Enrollment status enum
 */
export enum EnrollmentStatus {
  Pending = 1,
  Active = 2,
  Completed = 3,
  Cancelled = 4
}

/**
 * Enrollment data from API
 */
export interface EnrollmentDto {
  id: string
  userId: string
  userName: string
  userEmail: string
  courseId: string
  courseTitle: string
  courseThumbnail: string | null
  instructorName: string
  enrolledAt: string // ISO 8601 date string
  completedAt: string | null // ISO 8601 date string
  progressPercentage: number
  lastAccessed: string | null // ISO 8601 date string
  certificateIssuedAt: string | null // ISO 8601 date string
  certificateUrl: string | null
  status: EnrollmentStatus
  totalLessons: number
  completedLessons: number
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}

/**
 * API Response format
 */
export interface EnrollmentListResponse {
  isSuccess: boolean
  value: EnrollmentDto[]
  error: {
    statusCode: number
    message: string
  } | null
}

/**
 * Helper to get enrollment status text
 */
export function getEnrollmentStatusText(status: EnrollmentStatus): string {
  switch (status) {
    case EnrollmentStatus.Pending:
      return 'Pending'
    case EnrollmentStatus.Active:
      return 'Active'
    case EnrollmentStatus.Completed:
      return 'Completed'
    case EnrollmentStatus.Cancelled:
      return 'Cancelled'
    default:
      return 'Unknown'
  }
}

/**
 * Helper to check if enrollment is completed
 */
export function isEnrollmentCompleted(enrollment: EnrollmentDto): boolean {
  return enrollment.status === EnrollmentStatus.Completed || enrollment.progressPercentage === 100
}

/**
 * Helper to format last accessed date
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

/**
 * Progress API Types
 */

/**
 * Update Progress Request DTO
 */
export interface UpdateProgressDto {
  enrollmentId: string // Required: ID của enrollment
  lessonId: string // Required: ID của lesson
  timeSpentSeconds?: number // Optional: Thời gian đã xem (giây)
  lessonProgress?: number // Optional: Tiến trình (0-100), default: 100
}

/**
 * Chapter Progress DTO
 */
export interface ChapterProgressDto {
  chapterId: string
  chapterTitle: string
  totalLessons: number
  completedLessons: number
  progressPercentage: number // 0-100
}

/**
 * Course Progress DTO
 */
export interface CourseProgressDto {
  enrollmentId: string
  courseId: string
  courseTitle: string
  overallProgress: number // 0-100
  totalLessons: number
  completedLessons: number
  totalChapters: number
  completedChapters: number
  lastAccessed?: string // ISO 8601 date string
  completedAt?: string | null // ISO 8601 date string
  chapterProgress: ChapterProgressDto[]
}

/**
 * Lesson Progress DTO
 */
export interface LessonProgressDto {
  lessonId: string
  lessonTitle: string
  isCompleted: boolean
  completedAt?: string | null // ISO 8601 date string
  watchTimeSeconds: number
  progressPercentage: number // 0-100
  lastAccessed?: string | null // ISO 8601 date string
}

/**
 * Base API Response
 */
export interface BaseApiResponse<T> {
  isSuccess: boolean
  value: T | null
  error: {
    code: string
    message: string
  } | null
}

