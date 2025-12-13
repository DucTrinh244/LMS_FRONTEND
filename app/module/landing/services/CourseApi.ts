import httpClient from '~/services/httpClient'

export interface CourseResponse {
  id: string
  title: string
  instructor: string
  avatar: string
  category: string
  duration: string
  level: string
  rating: number
  reviews: number
  price: number
  image: string
  badge?: string | null
  badgeColor?: string | null
}

export interface CourseDetailInfo {
  id: string
  title: string
  shortDescription: string
  description: string
  objectives: string
  requirements: string
  image: string
  instructorName: string
  instructorAvatar: string
  rating: number
  reviews: number
  students: number
  price: number
  certificateEnabled: boolean
}

export interface CourseListResponse {
  isSuccess: boolean
  value: CourseResponse[]
  error?: {
    statusCode: number
    message: string
  }
}

export interface CategoryWithCount {
  id: string
  name: string
  count: number
}

export interface CategoryListResponse {
  isSuccess: boolean
  value: CategoryWithCount[]
  error?: {
    statusCode: number
    message: string
  } | null
}

export interface InstructorWithCount {
  id: string
  name: string
  count: number
}

export interface InstructorListResponse {
  isSuccess: boolean
  value: InstructorWithCount[]
  error?: {
    statusCode: number
    message: string
  } | null
}

export interface CourseChapter {
  id: string
  title: string
  description: string | null
  sortOrder: number
  isPublished: boolean
}

export interface CourseLesson {
  id: string
  chapterId?: string | null
  title: string
  content: string
  videoUrl?: string | null
  duration: number
  order: number
  type: number // 1=Video, 2=Article, 3=Quiz, 4=Assignment
  isPreview: boolean
}

export interface CourseQuiz {
  id: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  questionCount: number
  totalPoints: number
  isPublished: boolean
}

export interface CourseDetailData {
  course: CourseDetailInfo
  chapters: CourseChapter[]
  lessons: CourseLesson[]
  quizzes: CourseQuiz[]
}

export interface CourseDetailResponse {
  isSuccess: boolean
  value: CourseDetailData
  error?: {
    statusCode: number
    message: string
  } | null
}

export const courseService = {
  /**
   * Get all public courses
   * GET /api/Course/list/public
   */
  getPublicCourses: async (): Promise<CourseResponse[]> => {
    try {
      const response = await httpClient.get<CourseListResponse>('/Course/list/public')

      // Handle API response format: { isSuccess: true, value: [...], error: null }
      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      // Fallback: return empty array if response format is unexpected
      return []
    } catch (error: any) {
      console.error('Error fetching public courses:', error)
      throw new Error(error?.response?.data?.error?.message || 'Failed to fetch courses')
    }
  },

  /**
   * Get categories with count
   * GET /api/Category/with-count
   */
  getCategoriesWithCount: async (): Promise<CategoryWithCount[]> => {
    try {
      const response = await httpClient.get<CategoryListResponse>('/Category/with-count')

      // Handle API response format: { isSuccess: true, value: [...], error: null }
      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      // Fallback: return empty array if response format is unexpected
      return []
    } catch (error: any) {
      console.error('Error fetching categories with count:', error)
      throw new Error(error?.response?.data?.error?.message || 'Failed to fetch categories')
    }
  },

  /**
   * Get instructors with count
   * GET /api/User/instructors/with-count
   */
  getInstructorsWithCount: async (): Promise<InstructorWithCount[]> => {
    try {
      const response = await httpClient.get<InstructorListResponse>('/User/instructors/with-count')

      // Handle API response format: { isSuccess: true, value: [...], error: null }
      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      // Fallback: return empty array if response format is unexpected
      return []
    } catch (error: any) {
      console.error('Error fetching instructors with count:', error)
      throw new Error(error?.response?.data?.error?.message || 'Failed to fetch instructors')
    }
  },

  /**
   * Get course detail by ID (public)
   * GET /api/Course/public/{id}
   */
  getCourseDetail: async (courseId: string): Promise<CourseDetailData> => {
    try {
      const response = await httpClient.get<CourseDetailResponse>(`/Course/public/${courseId}`)

      // Handle API response format: { isSuccess: true, value: {...}, error: null }
      if (response.data?.isSuccess && response.data?.value) {
        return response.data.value
      }

      throw new Error('Invalid response format')
    } catch (error: any) {
      console.error('Error fetching course detail:', error)
      throw new Error(error?.response?.data?.error?.message || 'Failed to fetch course details')
    }
  }
}

