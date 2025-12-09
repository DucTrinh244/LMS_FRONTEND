import type { CourseEditInstructorRequest } from '~/module/instructor/types/CourseInstructor'
import httpClient from '~/services/httpClient'

export const courseInstructorService = {
  // Get all courses for an instructor
  getAllCoursesInstructor: (instructorId?: string): Promise<any> => {
    const endpoint = '/Course/instructor/list'
    return httpClient
      .get(endpoint)
      .then((res) => {
        // Handle API response format: { isSuccess: true, value: [...], error: null }
        if (res.data?.isSuccess && res.data?.value) {
          return res.data.value
        }
        return res.data?.courses ?? res.data ?? []
      })
  },

  // Create a new course
  createCourseInstructor: (data: CourseEditInstructorRequest): Promise<any> => {
    return httpClient.post('/course', data).then((res) => res.data)
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
  },

  // Chapter Management
  getChaptersByCourse: (courseId: string): Promise<any> => {
    return httpClient.get(`/course/${courseId}/chapters`).then((res) => res.data)
  },
  createChapter: (courseId: string, data: { title: string; description: string; sortOrder: number }): Promise<any> => {
    const requestBody = {
      courseId,
      title: data.title,
      description: data.description,
      sortOrder: data.sortOrder,
    }
    return httpClient.post(`/course/${courseId}/chapters`, requestBody).then((res) => res.data)
  },
  updateChapter: (courseId: string, chapterId: string, data: { id: string; title: string; description: string; sortOrder: number; isPublished: boolean }): Promise<any> => {
    const requestBody = {
      id: chapterId,
      title: data.title,
      description: data.description,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished,
    }
    return httpClient.put(`/course/${courseId}/chapters/${chapterId}`, requestBody).then((res) => res.data)
  },
  deleteChapter: (courseId: string, chapterId: string): Promise<any> => {
    return httpClient.delete(`/course/${courseId}/chapters/${chapterId}`).then((res) => res.data)
  },

  // Lesson Management
  getLessonsByCourse: (courseId: string): Promise<any> => {
    return httpClient.get(`/courses/${courseId}/lessons`).then((res) => res.data)
  },
  getLessonsByChapter: (courseId: string, chapterId: string): Promise<any> => {
    return httpClient.get(`/courses/${courseId}/chapters/${chapterId}/lessons`).then((res) => res.data)
  },
  createLesson: (courseId: string, data: any): Promise<any> => {
    return httpClient.post(`/courses/${courseId}/lessons`, data).then((res) => res.data)
  },
  updateLesson: (courseId: string, lessonId: string, data: any): Promise<any> => {
    return httpClient.put(`/courses/${courseId}/lessons/${lessonId}`, data).then((res) => res.data)
  },
  deleteLesson: (courseId: string, lessonId: string): Promise<any> => {
    return httpClient.delete(`/courses/${courseId}/lessons/${lessonId}`).then((res) => res.data)
  },

  // Quiz Management
  getQuizzesByCourse: (courseId: string): Promise<any> => {
    return httpClient.get(`/courses/${courseId}/quizzes`).then((res) => res.data)
  },
  createQuiz: (courseId: string, data: any): Promise<any> => {
    return httpClient.post(`/courses/${courseId}/quizzes`, data).then((res) => res.data)
  },
  updateQuiz: (courseId: string, quizId: string, data: any): Promise<any> => {
    return httpClient.put(`/courses/${courseId}/quizzes/${quizId}`, data).then((res) => res.data)
  },
  deleteQuiz: (courseId: string, quizId: string): Promise<any> => {
    return httpClient.delete(`/courses/${courseId}/quizzes/${quizId}`).then((res) => res.data)
  }
}   
