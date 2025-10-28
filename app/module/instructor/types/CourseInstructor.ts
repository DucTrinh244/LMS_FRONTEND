export interface CourseEditInstructorRequest {}

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
  level: LevelCourse
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
