// src/types/toast.ts

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string // ID duy nhất để React nhận biết khi render danh sách
  message: string
  type: ToastType
  duration?: number // Thời gian hiển thị (mili giây), mặc định có thể là 3000
}
