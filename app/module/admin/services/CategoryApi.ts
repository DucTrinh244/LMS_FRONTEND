// import axios from 'axios'
// import type { Category, CategoryPayload } from '~/module/admin/types/Category'

import type { CategoryRequest } from '~/module/admin/types/Category'
import httpClient from '~/services/httpClient'

export const categoryService = {
  createCategory: (data: CategoryRequest): Promise<any> => {
    return httpClient.post('/category', data).then((res) => res.data)
  },

  updateCategory: (id: string, data: CategoryRequest): Promise<any> => {
    return httpClient.put(`/category/${id}`, data).then((res) => res.data)
  },

  getAllCategories: (): Promise<any> => {
    return httpClient
      .get('/category')
      .then((res) => res.data)
      .then((data) => data?.categories ?? data)
  },

  getCategoryById: (id: string): Promise<any> => {
    return httpClient.get(`/category/${id}`).then((res) => res.data)
  },

  deleteCategory: (id: string): Promise<any> => {
    return httpClient.delete(`/category/${id}`).then((res) => res.data)
  }
}
