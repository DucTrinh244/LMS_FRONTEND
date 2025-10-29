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
  certificateEnabled: Boolean
}
export interface Course {
  id: string
  title: string
  image: string
  lessons: number
  quizzes: number
  duration: string
  students: number
  price: number
  rating: number
  reviews: number
  status: string
  statusColor: string
  description?: string
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
  certificateEnabled: Boolean
}

export interface LevelCourse {
  id: number
  name: string
}
export interface LanguageCourse {
  id: string
  name: string
}
