/**
 * Payment API Types
 * Based on Payment API documentation
 */

// ==================== Request Types ====================

/**
 * Request body for creating payment URL
 */
export interface CreatePaymentRequest {
  courseId: string // Guid
  amount: number // decimal, must be > 0
  orderInfo?: string // Optional, max 255 characters
}

// ==================== Response Types ====================

/**
 * Standard API Response wrapper
 * Supports both camelCase (actual API) and PascalCase (documentation) formats
 */
export interface ApiResponse<T> {
  // Actual API format (camelCase)
  success?: boolean
  message?: string
  data?: T
  error?: string
  // Documentation format (PascalCase) - for backward compatibility
  Success?: boolean
  Message?: string
  Data?: T
  Error?: string
}

/**
 * Payment data returned from create payment endpoint
 */
export interface PaymentData {
  paymentUrl: string
  paymentId: string // Guid
  txnRef: string
  userId: string // Guid
  courseId: string // Guid
  amount: number
  orderInfo: string
  status: PaymentStatus
  expiredAt: string // ISO 8601 date string
}

/**
 * Payment status enum
 */
export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Failed = 3,
  Canceled = 4
}

/**
 * Payment status as string
 */
export type PaymentStatusString = 'Pending' | 'Paid' | 'Failed' | 'Canceled'

/**
 * Response from create payment endpoint
 */
export type CreatePaymentResponse = ApiResponse<PaymentData>

/**
 * Callback data returned from payment callback endpoint
 */
export interface PaymentCallbackData {
  orderId: string
  txnRef: string
  transactionId?: string
  transactionNo?: string
  paymentMethod: string
  orderDescription: string
  responseCode: string
  paymentId: string
  status: PaymentStatusString
  amount?: number
}

/**
 * Response from payment callback endpoint
 */
export type PaymentCallbackResponse = ApiResponse<PaymentCallbackData>

/**
 * Simplified callback response for frontend use
 */
export interface PaymentCallbackResult {
  success: boolean
  message: string
  txnRef: string
  transactionNo?: string
  responseCode: string
  amount: number
  paymentId?: string
  status?: PaymentStatusString
}

/**
 * VNPay configuration info
 */
export interface VnPayConfigInfo {
  tmnCode: string
  baseUrl: string
  version: string
  command: string
  currCode: string
  locale: string
  hashSecret: string
}

/**
 * Response from config info endpoint
 */
export type ConfigInfoResponse = ApiResponse<VnPayConfigInfo>

// ==================== VNPay Response Codes ====================

/**
 * VNPay response codes
 */
export enum VnPayResponseCode {
  Success = '00', // Giao dịch thành công
  Suspicious = '07', // Trừ tiền thành công. Giao dịch bị nghi ngờ
  NotRegistered = '09', // Thẻ/Tài khoản chưa đăng ký InternetBanking
  WrongInfo = '10', // Xác thực thông tin không đúng quá 3 lần
  Expired = '11', // Đã hết hạn chờ thanh toán
  Cancelled = '24', // Khách hàng hủy giao dịch
  InsufficientFunds = '51', // Tài khoản không đủ số dư
  ExceedLimit = '65', // Vượt quá hạn mức giao dịch trong ngày
  BankMaintenance = '75', // Ngân hàng đang bảo trì
  Other = '99' // Các lỗi khác
}

/**
 * Get human-readable message for VNPay response code
 */
export function getVnPayResponseMessage(code: string): string {
  const messages: Record<string, string> = {
    '00': 'Giao dịch thành công',
    '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ',
    '09': 'Thẻ/Tài khoản chưa đăng ký InternetBanking',
    '10': 'Xác thực thông tin không đúng quá 3 lần',
    '11': 'Đã hết hạn chờ thanh toán',
    '24': 'Khách hàng hủy giao dịch',
    '51': 'Tài khoản không đủ số dư',
    '65': 'Vượt quá hạn mức giao dịch trong ngày',
    '75': 'Ngân hàng đang bảo trì',
    '99': 'Các lỗi khác'
  }
  return messages[code] || `Mã lỗi: ${code}`
}

