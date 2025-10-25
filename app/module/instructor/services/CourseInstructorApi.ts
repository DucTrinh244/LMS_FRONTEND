import type { CourseEditInstructorRequest } from '~/module/instructor/types/CourseInstructor'
import httpClient from '~/services/httpClient'

export const courseInstructorService = {
  createCourseInstructor: (data: CourseEditInstructorRequest): Promise<any> => {
    return httpClient.post('/course', data).then((res) => res.data)
  },

  updateCourseAdmin: (id: string, data: CourseEditInstructorRequest): Promise<any> => {
    return httpClient.put(`/course/${id}`, data).then((res) => res.data)
  },

  getCoursesByInstructor: (instructorId: string): Promise<any> => {
    return httpClient
      .get(`/instructors/${instructorId}/courses`)
      .then((res) => res.data)
      .then((data) => data?.courses ?? data)
  },

  getCourseDetails: (courseId: string): Promise<any> => {
    return httpClient.get(`/courses/${courseId}`).then((res) => res.data)
  },

  deleteCourseInstructor: (id: string): Promise<any> => {
    return httpClient.delete(`/course/${id}`).then((res) => res.data)
  }
}   
