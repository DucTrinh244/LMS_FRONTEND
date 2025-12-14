import httpClient from '~/services/httpClient'
import type {
  BaseResponse,
  DashboardSummaryDto,
  DashboardStatsDto,
  CurrentQuizDto,
  RecentlyEnrolledCourseDto,
  LatestQuizDto
} from '~/module/student/types/dashboard'

/**
 * Student Dashboard Service
 * Handles dashboard-related API calls for students
 */
export const studentDashboardService = {
  /**
   * Get dashboard summary (all data in one request)
   * GET /api/StudentDashboard/summary
   */
  getSummary: async (): Promise<DashboardSummaryDto> => {
    try {
      const response = await httpClient.get<BaseResponse<DashboardSummaryDto>>(
        '/StudentDashboard/summary'
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch dashboard summary')
      }

      throw new Error('Failed to fetch dashboard summary')
    } catch (error: any) {
      console.error('Error fetching dashboard summary:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch dashboard summary'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch dashboard summary')
    }
  },

  /**
   * Get dashboard stats only
   * GET /api/StudentDashboard/stats
   */
  getStats: async (): Promise<DashboardStatsDto> => {
    try {
      const response = await httpClient.get<BaseResponse<DashboardStatsDto>>(
        '/StudentDashboard/stats'
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch dashboard stats')
      }

      throw new Error('Failed to fetch dashboard stats')
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch dashboard stats'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch dashboard stats')
    }
  },

  /**
   * Get current quiz (quiz in progress)
   * GET /api/StudentDashboard/current-quiz
   */
  getCurrentQuiz: async (): Promise<CurrentQuizDto | null> => {
    try {
      const response = await httpClient.get<BaseResponse<CurrentQuizDto | null>>(
        '/StudentDashboard/current-quiz'
      )

      if (response.data?.isSuccess) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch current quiz')
      }

      return null
    } catch (error: any) {
      console.error('Error fetching current quiz:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch current quiz'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch current quiz')
    }
  },

  /**
   * Get recently enrolled courses
   * GET /api/StudentDashboard/recently-enrolled-courses?limit={limit}
   */
  getRecentlyEnrolledCourses: async (limit: number = 3): Promise<RecentlyEnrolledCourseDto[]> => {
    try {
      const response = await httpClient.get<BaseResponse<RecentlyEnrolledCourseDto[]>>(
        `/StudentDashboard/recently-enrolled-courses?limit=${limit}`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch recently enrolled courses')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching recently enrolled courses:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch recently enrolled courses'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch recently enrolled courses')
    }
  },

  /**
   * Get latest quizzes
   * GET /api/StudentDashboard/latest-quizzes?limit={limit}
   */
  getLatestQuizzes: async (limit: number = 5): Promise<LatestQuizDto[]> => {
    try {
      const response = await httpClient.get<BaseResponse<LatestQuizDto[]>>(
        `/StudentDashboard/latest-quizzes?limit=${limit}`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch latest quizzes')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching latest quizzes:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch latest quizzes'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch latest quizzes')
    }
  }
}

