import httpClient from '~/services/httpClient'
import type {
  BaseResponse,
  DashboardSummaryDto,
  DashboardStatsDto,
  RecentCourseDto,
  EarningsByYearDto
} from '~/module/instructor/types/dashboard'

/**
 * Instructor Dashboard Service
 * Handles dashboard-related API calls for instructors
 */
export const instructorDashboardService = {
  /**
   * Get dashboard summary (all data in one request)
   * GET /api/InstructorDashboard/summary
   */
  getSummary: async (): Promise<DashboardSummaryDto> => {
    try {
      const response = await httpClient.get<BaseResponse<DashboardSummaryDto>>(
        '/InstructorDashboard/summary'
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
   * GET /api/InstructorDashboard/stats
   */
  getStats: async (): Promise<DashboardStatsDto> => {
    try {
      const response = await httpClient.get<BaseResponse<DashboardStatsDto>>(
        '/InstructorDashboard/stats'
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
   * Get recent courses
   * GET /api/InstructorDashboard/recent-courses?limit={limit}
   */
  getRecentCourses: async (limit: number = 5): Promise<RecentCourseDto[]> => {
    try {
      const response = await httpClient.get<BaseResponse<RecentCourseDto[]>>(
        `/InstructorDashboard/recent-courses?limit=${limit}`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch recent courses')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching recent courses:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch recent courses'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch recent courses')
    }
  },

  /**
   * Get earnings by year
   * GET /api/InstructorDashboard/earnings-by-year?year={year}
   */
  getEarningsByYear: async (year?: number): Promise<EarningsByYearDto> => {
    try {
      let endpoint = '/InstructorDashboard/earnings-by-year'
      if (year) {
        endpoint += `?year=${year}`
      }

      const response = await httpClient.get<BaseResponse<EarningsByYearDto>>(endpoint)

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch earnings by year')
      }

      throw new Error('Failed to fetch earnings by year')
    } catch (error: any) {
      console.error('Error fetching earnings by year:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch earnings by year'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch earnings by year')
    }
  }
}

