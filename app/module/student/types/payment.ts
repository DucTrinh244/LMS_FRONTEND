/**
 * Payment/Order Types for Student
 * Based on Payment API documentation
 */

// ==================== Enums ====================

export enum PaymentStatus {
  Pending = 1,   // Đang chờ thanh toán
  Paid = 2,      // Đã thanh toán thành công
  Failed = 3,    // Thanh toán thất bại
  Canceled = 4   // Đã hủy
}

// ==================== Response Types ====================

export interface BaseResponse<T> {
  isSuccess: boolean
  value: T | null
  error: {
    statusCode: number
    message: string
  } | null
}

/**
 * Payment Order DTO for List Response
 * GET /api/payment/my-orders
 */
export interface PaymentOrderListItemDto {
  id: string
  courseId: string
  courseTitle: string
  courseImageUrl: string | null
  amount: number
  currency: string
  status: string // "Pending" | "Paid" | "Failed" | "Canceled"
  statusCode: PaymentStatus // 1=Pending, 2=Paid, 3=Failed, 4=Canceled
  txnRef: string
  paidAt: string | null
  createdAt: string
}

/**
 * Payment Order DTO for Detail Response
 * GET /api/payment/my-orders/{id}
 */
export interface PaymentOrderDetailDto {
  id: string
  courseId: string
  courseTitle: string
  courseImageUrl: string | null
  amount: number
  currency: string
  status: string // "Pending" | "Paid" | "Failed" | "Canceled"
  statusCode: PaymentStatus // 1=Pending, 2=Paid, 3=Failed, 4=Canceled
  provider: string
  txnRef: string
  transactionNo: string | null
  orderInfo: string | null
  paymentMethod: string | null
  bankCode: string | null
  paidAt: string | null
  createdAt: string
}

export interface PagedResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaymentOrderListResponse {
  items: PaymentOrderListItemDto[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaymentOrderDetailResponse extends PaymentOrderDetailDto {}

// ==================== Helper Functions ====================

export function getPaymentStatusText(status: PaymentStatus | number): string {
  switch (status) {
    case PaymentStatus.Pending:
      return 'Đang chờ thanh toán'
    case PaymentStatus.Paid:
      return 'Đã thanh toán'
    case PaymentStatus.Failed:
      return 'Thanh toán thất bại'
    case PaymentStatus.Canceled:
      return 'Đã hủy'
    default:
      return 'Không xác định'
  }
}

export function getPaymentStatusColor(status: PaymentStatus | number): string {
  switch (status) {
    case PaymentStatus.Paid:
      return 'bg-green-600/20 text-green-400'
    case PaymentStatus.Pending:
      return 'bg-yellow-600/20 text-yellow-400'
    case PaymentStatus.Failed:
      return 'bg-red-600/20 text-red-400'
    case PaymentStatus.Canceled:
      return 'bg-gray-600/20 text-gray-400'
    default:
      return 'bg-gray-600/20 text-gray-400'
  }
}

export function formatCurrency(amount: number, currency: string = 'VND'): string {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

