export interface CategoryPayload {
  name: string
  description: string
  parentId?: string | null
  priority: number
}

export interface Category {
  id: string
  name: string
  description: string
  createdAt?: string
  parentId?: string | null
  priority: number
}

export interface CategoryRequest {
  name: string
  description: string
  parentId?: string | null
  sortOrder: number
}
