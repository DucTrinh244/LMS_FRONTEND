import httpClient from '~/services/httpClient'
import type { CourseStudentData, CourseStudentResponse } from '~/module/course/types/course'

/**
 * Course Service for Student
 * Handles course-related API calls for students
 */
export const courseStudentService = {
  /**
   * Get course details for student
   * GET /api/Course/student/{id}
   * 
   * Retrieves course details including enrollment info and chapters for the current student.
   * Requires JWT authentication (automatically added by httpClient).
   * 
   * @param courseId - Course ID
   * @returns Course data with enrollment and chapters
   * @throws Error if request fails
   * 
   * @example
   * ```typescript
   * const courseData = await courseStudentService.getCourseForStudent('course-id');
   * console.log('Course:', courseData.course.title);
   * ```
   */
  getCourseForStudent: async (courseId: string): Promise<CourseStudentData> => {
    try {
      if (!courseId) {
        throw new Error('Course ID is required')
      }

      const response = await httpClient.get<CourseStudentResponse>(
        `/Course/student/${courseId}`
      )

      // Handle API response format: { isSuccess: true, value: {...}, error: null }
      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      // If not successful, throw error
      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch course details')
      }

      throw new Error('Invalid response format')
    } catch (error: any) {
      console.error('Error fetching course for student:', error)
      
      // Handle different error types
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch course details'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch course details')
    }
  }
}

