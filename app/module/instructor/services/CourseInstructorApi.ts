import type { CourseEditInstructorRequest } from '~/module/instructor/types/CourseInstructor'
import httpClient, { getApiBaseURL } from '~/services/httpClient'

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
    return httpClient.get(`/course/${courseId}`).then((res) => res.data)
  },

  // Delete course
  deleteCourseInstructor: (id: string): Promise<any> => {
    return httpClient.delete(`/courses/${id}`).then((res) => res.data)
  },

  // Publish/unpublish course
  publishCourse: (id: string, published: boolean): Promise<any> => {
    return httpClient.patch(`/course/${id}/publish`, { published }).then((res) => res.data)
  },

  // Get course statistics for instructor
  getCourseStats: (courseId: string): Promise<any> => {
    return httpClient.get(`/course/${courseId}/stats`).then((res) => res.data)
  },

  // Chapter Management
  getChaptersByCourse: (courseId: string): Promise<any> => {
    return httpClient.get(`/chapter?courseId=${courseId}`).then((res) => res.data)
  },
  getChapter: (chapterId: string): Promise<any> => {
    return httpClient.get(`/chapter/${chapterId}`).then((res) => res.data)
  },
  createChapter: (courseId: string, data: { title: string; description: string; sortOrder: number; isPublished?: boolean }): Promise<any> => {
    const requestBody = {
      courseId,
      title: data.title,
      description: data.description || null,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished || false,
    }
    return httpClient.post('/chapter', requestBody).then((res) => res.data)
  },
  updateChapter: (chapterId: string, data: { id: string; title: string; description: string; sortOrder: number; isPublished: boolean }): Promise<any> => {
    const requestBody = {
      id: chapterId, // Must match URL parameter
      title: data.title,
      description: data.description || null,
      sortOrder: data.sortOrder,
      isPublished: data.isPublished,
    }
    return httpClient.put(`/chapter/${chapterId}`, requestBody).then((res) => res.data)
  },
  deleteChapter: (chapterId: string): Promise<any> => {
    return httpClient.delete(`/chapter/${chapterId}`).then((res) => res.data)
  },

  // Lesson Management
  getLessonsByCourse: (courseId: string): Promise<any> => {
    return httpClient.get(`/lesson?courseId=${courseId}`).then((res) => res.data)
  },
  getLessonsByChapter: (chapterId: string): Promise<any> => {
    return httpClient.get(`/lesson?chapterId=${chapterId}`).then((res) => res.data)
  },
  getLesson: (lessonId: string): Promise<any> => {
    return httpClient.get(`/lesson/${lessonId}`).then((res) => res.data)
  },
  getLessonDetail: (lessonId: string): Promise<any> => {
    return httpClient.get(`/lesson/${lessonId}/detail`).then((res) => res.data)
  },
  createLesson: (
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<any> => {
    // Sử dụng XMLHttpRequest để track upload progress
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 201 || xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText)
            if (data.isSuccess) {
              resolve(data)
            } else {
              reject(new Error(data.error?.message || 'Failed to create lesson'))
            }
          } catch (error) {
            reject(new Error('Failed to parse response'))
          }
        } else {
          try {
            const data = JSON.parse(xhr.responseText)
            reject(new Error(data.error?.message || `Failed with status ${xhr.status}`))
          } catch {
            reject(new Error(`Failed with status ${xhr.status}`))
          }
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'))
      })

      const token = localStorage.getItem('accessToken')
      const baseURL = getApiBaseURL()

      xhr.open('POST', `${baseURL}/lesson`)
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      }
      // KHÔNG set Content-Type header - browser sẽ tự động set với boundary
      xhr.send(formData)
    })
  },
  updateLesson: (lessonId: string, data: { id: string; title: string; content?: string; videoUrl?: string; videoDuration?: number; type?: number; sortOrder?: number; isPublished?: boolean; isPreview?: boolean; resources?: string }): Promise<any> => {
    const requestBody = {
      id: lessonId, // Must match URL parameter
      title: data.title,
      content: data.content || null,
      videoUrl: data.videoUrl || null,
      videoDuration: data.videoDuration || 0,
      type: data.type || 1,
      sortOrder: data.sortOrder || 0,
      isPublished: data.isPublished || false,
      isPreview: data.isPreview || false,
      resources: data.resources || null,
    }
    return httpClient.put(`/lesson/${lessonId}`, requestBody).then((res) => res.data)
  },
  deleteLesson: (lessonId: string): Promise<any> => {
    return httpClient.delete(`/lesson/${lessonId}`).then((res) => res.data)
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
