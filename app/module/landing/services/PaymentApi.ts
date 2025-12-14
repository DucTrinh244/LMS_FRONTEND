import type {
  ConfigInfoResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  PaymentCallbackData,
  PaymentCallbackResponse,
  PaymentCallbackResult
} from '~/module/landing/types/payment'
import httpClient from '~/services/httpClient'

/**
 * Payment Service
 * Handles all payment-related API calls
 * 
 * Base URL: /api/payment
 * Documentation: See PAYMENT_API_FRONTEND_SUMMARY.md
 */
export const paymentService = {
  /**
   * Create Payment URL
   * POST /api/payment/create
   * 
   * Creates a VNPay payment URL for a course.
   * Requires JWT authentication (automatically added by httpClient).
   * 
   * @param request - Payment creation request
   * @returns Payment data including paymentUrl
   * @throws Error if request fails
   * 
   * @example
   * ```typescript
   * const payment = await paymentService.createPayment({
   *   courseId: 'guid',
   *   amount: 100000,
   *   orderInfo: 'Thanh toan khoa hoc ABC'
   * });
   * window.location.href = payment.Data.paymentUrl;
   * ```
   */
  createPayment: async (
    request: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> => {
    try {
      // Validate request
      if (!request.courseId) {
        throw new Error('CourseId is required')
      }
      if (!request.amount || request.amount <= 0) {
        throw new Error('Amount must be greater than 0')
      }

      const response = await httpClient.post<any>(
        '/Payment/create',
        {
          courseId: request.courseId,
          amount: request.amount,
          orderInfo: request.orderInfo || ''
        }
      )

      const data = response.data

      // Normalize response format (handle both camelCase and PascalCase)
      const success = data.success ?? data.Success ?? false
      const message = data.message ?? data.Message ?? ''
      const responseData = data.data ?? data.Data

      // Check if response is successful
      if (!success) {
        throw new Error(message || 'Failed to create payment URL')
      }

      if (!responseData) {
        throw new Error('Invalid response: missing data')
      }

      // Return normalized response
      return {
        Success: success,
        Message: message,
        Data: responseData
      } as CreatePaymentResponse
    } catch (error: any) {
      console.error('Error creating payment:', error)

      // Handle different error types
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.message ||
          apiError.Message ||
          apiError.error ||
          apiError.Error ||
          'Failed to create payment URL'
        )
      }

      throw new Error(error.message || 'Failed to create payment URL')
    }
  },

  /**
   * Process Payment Callback
   * GET /api/payment/callback
   * 
   * Processes the callback from VNPay after payment.
   * This endpoint does NOT require authentication (VNPay redirects directly).
   * 
   * @param queryString - Query string from VNPay redirect (e.g., "?vnp_TxnRef=...&vnp_ResponseCode=00&...")
   * @returns Simplified callback result
   * @throws Error if callback processing fails
   * 
   * @example
   * ```typescript
   * const queryString = window.location.search;
   * const result = await paymentService.processCallback(queryString);
   * if (result.success) {
   *   // Payment successful
   * } else {
   *   // Payment failed
   * }
   * ```
   */
  processCallback: async (
    queryString: string
  ): Promise<PaymentCallbackResult> => {
    try {
      if (!queryString) {
        throw new Error('Query string is required')
      }

      // Create a request without authentication header for callback
      // Since httpClient automatically adds auth, we need to use axios directly
      // or create a request config that skips auth
      const axios = await import('axios')
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7151/api'

      // Ensure baseURL ends with /api
      const apiBaseURL = baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`

      const response = await axios.default.get<PaymentCallbackResponse>(
        `${apiBaseURL}/payment/callback${queryString}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
          // Note: No Authorization header - callback doesn't require auth
        }
      )

      const data = response.data

      // Normalize response format (handle both camelCase and PascalCase)
      const apiSuccess = data.success ?? data.Success ?? false
      const apiMessage = data.message ?? data.Message ?? 'Payment processed'
      const apiData = (data.data ?? data.Data ?? {}) as PaymentCallbackData

      // Transform API response to simplified result
      const result: PaymentCallbackResult = {
        success: apiSuccess === true && apiData.responseCode === '00',
        message: apiMessage,
        txnRef: apiData.txnRef || '',
        transactionNo: apiData.transactionNo || apiData.transactionId,
        responseCode: apiData.responseCode || '',
        amount: apiData.amount || 0,
        paymentId: apiData.paymentId,
        status: apiData.status
      }

      return result
    } catch (error: any) {
      console.error('Error processing payment callback:', error)

      // Handle different error types
      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(
          apiError.message ||
          apiError.Message ||
          apiError.error ||
          apiError.Error ||
          'Failed to process payment callback'
        )
      }

      throw new Error(error.message || 'Failed to process payment callback')
    }
  },

  /**
   * Get VNPay Configuration Info (Debug)
   * GET /api/payment/config-info
   * 
   * Retrieves VNPay configuration information.
   * This endpoint does NOT require authentication.
   * 
   * @returns VNPay configuration info
   * @throws Error if request fails
   * 
   * @example
   * ```typescript
   * const config = await paymentService.getConfigInfo();
   * console.log('VNPay Base URL:', config.Data.baseUrl);
   * ```
   */
  getConfigInfo: async (): Promise<ConfigInfoResponse> => {
    try {
      // Create a request without authentication header
      const axios = await import('axios')
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7151/api'

      // Ensure baseURL ends with /api
      const apiBaseURL = baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`

      const response = await axios.default.get<ConfigInfoResponse>(
        `${apiBaseURL}/payment/config-info`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
          // Note: No Authorization header - config-info doesn't require auth
        }
      )

      return response.data
    } catch (error: any) {
      console.error('Error fetching config info:', error)

      if (error.response?.data) {
        const apiError = error.response.data
        throw new Error(apiError.Message || apiError.Error || 'Failed to fetch config info')
      }

      throw new Error(error.message || 'Failed to fetch config info')
    }
  }
}

