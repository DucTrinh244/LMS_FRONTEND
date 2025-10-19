// import axios from 'axios'
// import type { Category, CategoryPayload } from '~/module/admin/types/Category'

import type { CategoryRequest } from '~/module/admin/types/Category'
import httpClient from '~/services/httpClient'

export const categoryService = {
  createCategory: (data: CategoryRequest): Promise<any> => {
    return httpClient.post('/category', data).then((res) => res.data)
  },
  updateCategory: (id: string, data: CategoryRequest): Promise<any> => {
    return httpClient.put(`/categories/${id}`, data).then((res) => res.data)
  }
}
