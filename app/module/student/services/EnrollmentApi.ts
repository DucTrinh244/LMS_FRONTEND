import httpClient from '~/services/httpClient'
import type { 
  EnrollmentListResponse,
  UpdateProgressDto,
  CourseProgressDto,
  LessonProgressDto,
  BaseApiResponse
} from '~/module/student/types/enrollment'

/**
 * Enrollment Service
 * Handles enrollment-related API calls for students
 */
export const enrollmentService = {
  /**
   * Get my enrolled courses
   * GET /api/Enrollment/my-course-student
   * 
   * Retrieves all courses that the current student has enrolled in.
   * Requires JWT authentication (automatically added by httpClient).
   * 
   * @returns List of enrolled courses
   * @throws Error if request fails
   * 
   * @example
   * ```typescript
   * const enrollments = await enrollmentService.getMyEnrolledCourses();
   * console.log('Enrolled courses:', enrollments);
   * ```
   */
  getMyEnrolledCourses: async (): Promise<EnrollmentListResponse['value']> => {
    try {
      const response = await httpClient.get<EnrollmentListResponse>(
        '/Enrollment/my-course-student'
      )

      // Handle API response format: { isSuccess: true, value: [...], error: null }
      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      // If not successful, throw error
      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch enrolled courses')
      }

      // Fallback: return empty array if response format is unexpected
      return []
    } catch (error: any) {
      console.error('Error fetching enrolled courses:', error)
      
      // Handle different error types
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch enrolled courses'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch enrolled courses')
    }
  },

  /**
   * Update lesson progress
   * PUT /api/enrollment/progress/lesson
   * 
   * Cập nhật tiến trình học của student cho một lesson
   * 
   * @param request - UpdateProgressDto với enrollmentId, lessonId, và optional timeSpentSeconds, lessonProgress
   * @returns true if successful
   * @throws Error if request fails
   */
  updateLessonProgress: async (request: UpdateProgressDto): Promise<boolean> => {
    try {
      if (!request.enrollmentId) {
        throw new Error('EnrollmentId is required')
      }
      if (!request.lessonId) {
        throw new Error('LessonId is required')
      }

      const response = await httpClient.put<BaseApiResponse<boolean>>(
        '/enrollment/progress/lesson',
        {
          enrollmentId: request.enrollmentId,
          lessonId: request.lessonId,
          timeSpentSeconds: request.timeSpentSeconds,
          lessonProgress: request.lessonProgress ?? 100 // Default to 100 if not provided
        }
      )

      if (response.data?.isSuccess && response.data?.value === true) {
        return true
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to update lesson progress')
      }

      throw new Error('Failed to update lesson progress')
    } catch (error: any) {
      console.error('Error updating lesson progress:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to update lesson progress'
        )
      }
      
      throw new Error(error.message || 'Failed to update lesson progress')
    }
  },

  /**
   * Mark lesson as completed
   * POST /api/enrollment/progress/lesson/{lessonId}/complete
   * 
   * Đánh dấu một lesson đã hoàn thành (progress = 100%)
   * 
   * @param lessonId - ID của lesson
   * @returns true if successful
   * @throws Error if request fails
   */
  completeLesson: async (lessonId: string): Promise<boolean> => {
    try {
      if (!lessonId) {
        throw new Error('LessonId is required')
      }

      const response = await httpClient.post<BaseApiResponse<boolean>>(
        `/enrollment/progress/lesson/${lessonId}/complete`
      )

      if (response.data?.isSuccess && response.data?.value === true) {
        return true
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to complete lesson')
      }

      throw new Error('Failed to complete lesson')
    } catch (error: any) {
      console.error('Error completing lesson:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to complete lesson'
        )
      }
      
      throw new Error(error.message || 'Failed to complete lesson')
    }
  },

  /**
   * Get course progress
   * GET /api/enrollment/progress/course/{courseId}
   * 
   * Lấy thông tin tiến trình chi tiết của course
   * 
   * @param courseId - ID của course
   * @returns CourseProgressDto
   * @throws Error if request fails
   */
  getCourseProgress: async (courseId: string): Promise<CourseProgressDto> => {
    try {
      if (!courseId) {
        throw new Error('CourseId is required')
      }

      const response = await httpClient.get<BaseApiResponse<CourseProgressDto>>(
        `/enrollment/progress/course/${courseId}`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch course progress')
      }

      throw new Error('Failed to fetch course progress')
    } catch (error: any) {
      console.error('Error fetching course progress:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch course progress'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch course progress')
    }
  },

  /**
   * Get lesson progress
   * GET /api/enrollment/progress/lesson/{lessonId}
   * 
   * Lấy thông tin tiến trình của một lesson cụ thể
   * 
   * @param lessonId - ID của lesson
   * @returns LessonProgressDto
   * @throws Error if request fails
   */
  getLessonProgress: async (lessonId: string): Promise<LessonProgressDto> => {
    try {
      if (!lessonId) {
        throw new Error('LessonId is required')
      }

      const response = await httpClient.get<BaseApiResponse<LessonProgressDto>>(
        `/enrollment/progress/lesson/${lessonId}`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch lesson progress')
      }

      throw new Error('Failed to fetch lesson progress')
    } catch (error: any) {
      console.error('Error fetching lesson progress:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch lesson progress'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch lesson progress')
    }
  }
}

