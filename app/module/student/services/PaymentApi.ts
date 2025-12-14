import httpClient from '~/services/httpClient'
import type {
  BaseResponse,
  PaymentOrderDetailResponse,
  PaymentOrderListResponse,
  PaymentStatus
} from '~/module/student/types/payment'

/**
 * Payment/Order Service for Student
 * Handles payment history and order management
 */
export const studentPaymentService = {
  /**
   * Get my orders/payments with pagination
   * GET /api/payment/my-orders
   * 
   * @param page - Page number (default: 1)
   * @param pageSize - Items per page (default: 10)
   * @param status - Filter by payment status (optional)
   * @returns Paginated list of orders
   */
  getMyOrders: async (
    page: number = 1,
    pageSize: number = 10,
    status?: PaymentStatus
  ): Promise<BaseResponse<PaymentOrderListResponse>> => {
    try {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('pageSize', pageSize.toString())
      if (status !== undefined) {
        params.append('status', status.toString())
      }

      const response = await httpClient.get<BaseResponse<PaymentOrderListResponse>>(
        `/payment/my-orders?${params.toString()}`
      )

      return response.data
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      const apiError = error.response?.data
      throw new Error(
        apiError?.error?.message ||
        apiError?.message ||
        error.message ||
        'Failed to fetch orders'
      )
    }
  },

  /**
   * Get order/payment detail by ID
   * GET /api/payment/my-orders/{id}
   * 
   * @param id - Payment/Order ID
   * @returns Order detail
   */
  getOrderDetail: async (id: string): Promise<BaseResponse<PaymentOrderDetailResponse>> => {
    try {
      if (!id) {
        throw new Error('Order ID is required')
      }

      const response = await httpClient.get<BaseResponse<PaymentOrderDetailResponse>>(
        `/payment/my-orders/${id}`
      )

      return response.data
    } catch (error: any) {
      console.error('Error fetching order detail:', error)
      const apiError = error.response?.data
      throw new Error(
        apiError?.error?.message ||
        apiError?.message ||
        error.message ||
        'Failed to fetch order detail'
      )
    }
  }
}

