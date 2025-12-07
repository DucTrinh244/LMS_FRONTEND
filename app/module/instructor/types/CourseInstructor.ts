export interface CourseEditInstructorRequest {
  title: string
  description: string
  shortDescription: string
  categoryId: string
  price: number
  durationHours: number
  maxStudents: number
  requirements: string
  objectives: string
  targetAudience: string
  level: number
  language: string
  certificateEnabled: boolean
  image?: string
  thumbnail?: string
  tags?: string[]
}

export interface Course {
  id: string
  title: string
  image: string
  thumbnail?: string
  lessons: number
  quizzes: number
  duration: string
  durationHours: number
  students: number
  enrolledStudents?: number
  maxStudents: number
  price: number
  rating: number
  reviews: number
  status: 'draft' | 'published' | 'archived' | 'pending'
  statusColor: string
  description?: string
  shortDescription?: string
  categoryId: string
  categoryName?: string
  requirements?: string
  objectives?: string
  targetAudience?: string
  level: number
  levelName?: string
  language: string
  certificateEnabled: boolean
  instructorId?: string
  instructorName?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  tags?: string[]
}

export interface AddRequestCourseInstructor {
  title: string
  description: string
  shortDescription: string
  categoryId: string
  price: number
  durationHours: number
  maxStudents: number
  requirements: string
  objectives: string
  targetAudience: string
  level: number
  language: string
  certificateEnabled: boolean
  image?: string
  thumbnail?: string
  tags?: string[]
}

export interface CourseStats {
  courseId: string
  totalStudents: number
  totalRevenue: number
  completionRate: number
  averageRating: number
  totalReviews: number
  monthlyEnrollments: {
    month: string
    enrollments: number
  }[]
  recentActivity: {
    type: 'enrollment' | 'completion' | 'review'
    count: number
    date: string
  }[]
}

export interface LevelCourse {
  id: number
  name: string
}

export interface LanguageCourse {
  id: string
  name: string
}

export interface CourseFilters {
  status?: string
  categoryId?: string
  level?: number
  language?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'students' | 'rating'
  sortOrder?: 'asc' | 'desc'
}

export interface CoursePaginationParams {
  page?: number
  limit?: number
  filters?: CourseFilters
}
