import httpClient from '~/services/httpClient'
import type {
  BaseResponse,
  EarningsSummaryDto,
  CourseEarningsDto,
  EarningsByTimeRangeDto,
  EarningsByMonthDto,
  PaymentDto
} from '~/module/instructor/types/earnings'

/**
 * Instructor Earnings Service
 * Handles earnings-related API calls for instructors
 */
export const instructorEarningsService = {
  /**
   * Get earnings summary
   * GET /api/InstructorEarnings/summary
   */
  getSummary: async (): Promise<EarningsSummaryDto> => {
    try {
      const response = await httpClient.get<BaseResponse<EarningsSummaryDto>>(
        '/InstructorEarnings/summary'
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch earnings summary')
      }

      throw new Error('Failed to fetch earnings summary')
    } catch (error: any) {
      console.error('Error fetching earnings summary:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch earnings summary'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch earnings summary')
    }
  },

  /**
   * Get earnings by course
   * GET /api/InstructorEarnings/by-course?courseId={courseId}
   */
  getByCourse: async (courseId?: string): Promise<CourseEarningsDto[]> => {
    try {
      let endpoint = '/InstructorEarnings/by-course'
      if (courseId) {
        endpoint += `?courseId=${courseId}`
      }

      const response = await httpClient.get<BaseResponse<CourseEarningsDto[]>>(endpoint)

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch earnings by course')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching earnings by course:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch earnings by course'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch earnings by course')
    }
  },

  /**
   * Get earnings by time range
   * GET /api/InstructorEarnings/by-time-range?startDate={date}&endDate={date}
   */
  getByTimeRange: async (startDate: string, endDate: string): Promise<EarningsByTimeRangeDto> => {
    try {
      if (!startDate || !endDate) {
        throw new Error('Start date and end date are required')
      }

      const response = await httpClient.get<BaseResponse<EarningsByTimeRangeDto>>(
        `/InstructorEarnings/by-time-range?startDate=${startDate}&endDate=${endDate}`
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch earnings by time range')
      }

      throw new Error('Failed to fetch earnings by time range')
    } catch (error: any) {
      console.error('Error fetching earnings by time range:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch earnings by time range'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch earnings by time range')
    }
  },

  /**
   * Get earnings by month
   * GET /api/InstructorEarnings/by-month?year={year}
   */
  getByMonth: async (year?: number): Promise<EarningsByMonthDto[]> => {
    try {
      let endpoint = '/InstructorEarnings/by-month'
      if (year) {
        endpoint += `?year=${year}`
      }

      const response = await httpClient.get<BaseResponse<EarningsByMonthDto[]>>(endpoint)

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch earnings by month')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching earnings by month:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch earnings by month'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch earnings by month')
    }
  },

  /**
   * Get payments list
   * GET /api/InstructorEarnings/payments?courseId={courseId}&startDate={date}&endDate={date}&page={page}&pageSize={pageSize}
   */
  getPayments: async (params?: {
    courseId?: string
    startDate?: string
    endDate?: string
    page?: number
    pageSize?: number
  }): Promise<PaymentDto[]> => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params?.courseId) {
        queryParams.append('courseId', params.courseId)
      }
      if (params?.startDate) {
        queryParams.append('startDate', params.startDate)
      }
      if (params?.endDate) {
        queryParams.append('endDate', params.endDate)
      }
      if (params?.page) {
        queryParams.append('page', params.page.toString())
      }
      if (params?.pageSize) {
        queryParams.append('pageSize', params.pageSize.toString())
      }

      const endpoint = `/InstructorEarnings/payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await httpClient.get<BaseResponse<PaymentDto[]>>(endpoint)

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || 'Failed to fetch payments')
      }

      return []
    } catch (error: any) {
      console.error('Error fetching payments:', error)
      
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message || 
          apiError.message || 
          'Failed to fetch payments'
        )
      }
      
      throw new Error(error.message || 'Failed to fetch payments')
    }
  }
}

