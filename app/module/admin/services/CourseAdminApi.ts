// import axios from 'axios'
// import type { Category, CategoryPayload } from '~/module/admin/types/Category'

import type { CourseEditAdminRequest } from '~/module/admin/types/Course'
import httpClient from '~/services/httpClient'

export const courseAdminService = {
  updateCourseAdmin: (id: string, data: CourseEditAdminRequest): Promise<any> => {
    return httpClient.put(`/category/${id}`, data).then((res) => res.data)
  },

  getAllCourseAdmin: (): Promise<any> => {
    return httpClient
      .get('/category')
      .then((res) => res.data)
      .then((data) => data?.categories ?? data)
  },

  getCourseByIdAdmin: (id: string): Promise<any> => {
    return httpClient.get(`/category/${id}`).then((res) => res.data)
  },

  deleteCourseAdmin: (id: string): Promise<any> => {
    return httpClient.delete(`/course/${id}`).then((res) => res.data)
  }
}
