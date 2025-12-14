import httpClient from '~/services/httpClient'
import type { 
  InstructorEnrollmentListResponse,
  InstructorStudentEnrollmentDto
} from '~/module/instructor/types/enrollment'

/**
 * Instructor Enrollment Service
 * Handles enrollment-related API calls for instructors
 */
export const instructorEnrollmentService = {
  /**
   * Get students enrolled in a specific course
   * GET /api/Enrollment/instructor/course/{courseId}/students
   * 
   * @param courseId - ID của khóa học
   * @returns List of student enrollments for the course
   * @throws Error if request fails
   */
  getCourseStudents: async (courseId: string): Promise<InstructorStudentEnrollmentDto[]> => {
    try {
      if (!courseId) {
        throw new Error('CourseId is required')
      }

      const response = await httpClient.get<InstructorEnrollmentListResponse>(
        `/Enrollment/instructor/course/${courseId}/students`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch course students')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching course students:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch course students'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch course students')
    }
  },

  /**
   * Get all students enrolled in instructor's courses
   * GET /api/Enrollment/instructor/students?courseId={courseId}
   * 
   * @param courseId - Optional: Filter by course ID
   * @returns List of all student enrollments
   * @throws Error if request fails
   */
  getAllStudents: async (courseId?: string): Promise<InstructorStudentEnrollmentDto[]> => {
    try {
      let endpoint = '/Enrollment/instructor/students'
      
      if (courseId) {
        endpoint += `?courseId=${courseId}`
      }

      const response = await httpClient.get<InstructorEnrollmentListResponse>(endpoint)

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch students')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching students:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch students'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch students')
    }
  }
}

