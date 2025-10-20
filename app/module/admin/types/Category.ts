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
  id: string
  name: string
  description: string
  parentId?: string | null
  sortOrder: number
}

export interface CategoryResponse {
  id: string
  name: string
  description: string
  createdAt: string
  parentId?: string | null
  priority: number
}
export interface CategoryDetail {
  id: string
  name: string
  description: string
  parentId: string | null
  parentName: string | null
  iconUrl: string | null
  isActive: boolean
  sortOrder: number
  courseCount: number
  childrenCount: number
  createdAt: string
  updatedAt: string
}
