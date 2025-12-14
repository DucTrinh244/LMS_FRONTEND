import httpClient from "~/services/httpClient"
import type {
  BaseResponse,
  AdminDashboardSummaryDto,
} from "~/module/admin/types/dashboard"

/**
 * Admin Dashboard Service
 * Handles dashboard-related API calls for admins
 */
export const adminDashboardService = {
  /**
   * Get dashboard summary (all data in one request)
   * GET /api/AdminDashboard/summary
   */
  getSummary: async (): Promise<AdminDashboardSummaryDto> => {
    try {
      const response = await httpClient.get<BaseResponse<AdminDashboardSummaryDto>>(
        "/AdminDashboard/summary"
      )

      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      if (response.data?.error) {
        throw new Error(response.data.error.message || "Failed to fetch dashboard summary")
      }

      throw new Error("Failed to fetch dashboard summary")
    } catch (error: any) {
      console.error("Error fetching dashboard summary:", error)

      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.error?.message ||
          apiError.message ||
          "Failed to fetch dashboard summary"
        )
      }

      throw new Error(error.message || "Failed to fetch dashboard summary")
    }
  },
}

