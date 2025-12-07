import type { CourseEditInstructorRequest } from '~/module/instructor/types/CourseInstructor'
import httpClient from '~/services/httpClient'

export const courseInstructorService = {
  // Get all courses for an instructor
  getAllCoursesInstructor: (instructorId?: string): Promise<any> => {
    const endpoint = instructorId ? `/instructors/${instructorId}/courses` : '/courses/instructor'
    return httpClient
      .get(endpoint)
      .then((res) => res.data)
      .then((data) => data?.courses ?? data)
  },

  // Create a new course
  createCourseInstructor: (data: CourseEditInstructorRequest): Promise<any> => {
    return httpClient.post('/courses', data).then((res) => res.data)
  },

  // Update course
  updateCourseInstructor: (id: string, data: CourseEditInstructorRequest): Promise<any> => {
    return httpClient.put(`/courses/${id}`, data).then((res) => res.data)
  },

  // Get courses by instructor ID
  getCoursesByInstructor: (instructorId: string): Promise<any> => {
    return httpClient
      .get(`/instructors/${instructorId}/courses`)
      .then((res) => res.data)
      .then((data) => data?.courses ?? data)
  },

  // Get course details
  getCourseDetails: (courseId: string): Promise<any> => {
    return httpClient.get(`/courses/${courseId}`).then((res) => res.data)
  },

  // Delete course
  deleteCourseInstructor: (id: string): Promise<any> => {
    return httpClient.delete(`/courses/${id}`).then((res) => res.data)
  },

  // Publish/unpublish course
  publishCourse: (id: string, published: boolean): Promise<any> => {
    return httpClient.patch(`/courses/${id}/publish`, { published }).then((res) => res.data)
  },

  // Get course statistics for instructor
  getCourseStats: (courseId: string): Promise<any> => {
    return httpClient.get(`/courses/${courseId}/stats`).then((res) => res.data)
  }
}   
