/**
 * Course Types for Student View
 * Based on API: GET /api/Course/student/{id}
 */

/**
 * Course information
 */
export interface CourseInfo {
  id: string
  title: string
  shortDescription: string
  description: string
  objectives: string
  requirements: string
  targetAudience: string
  thumbnailUrl: string
  instructorName: string
  instructorAvatar: string
  price: number
  durationHours: number
  language: string
  certificateEnabled: boolean
  level: number
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}

/**
 * Enrollment information
 */
export interface EnrollmentInfo {
  id: string
  enrolledAt: string // ISO 8601 date string
  completedAt: string | null // ISO 8601 date string
  progressPercentage: number
  lastAccessed: string | null // ISO 8601 date string
  isCompleted: boolean
}

/**
 * Quiz Answer information
 */
export interface QuizAnswerInfo {
  id: string
  questionId: string
  answerText: string
  isCorrect: boolean
  sortOrder: number
  imageUrl: string | null
}

/**
 * Quiz Question information
 */
export interface QuizQuestionInfo {
  id: string
  quizId: string
  questionText: string
  explanation: string | null
  type: number
  points: number
  sortOrder: number
  imageUrl: string | null
  answers: QuizAnswerInfo[]
}

/**
 * Quiz information (from lesson)
 */
export interface QuizInfo {
  id: string
  lessonId: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  maxAttempts: number
  shuffleQuestions: boolean
  shuffleAnswers: boolean
  showCorrectAnswers: boolean
  isPublished: boolean
  sortOrder: number
  questionCount: number
  totalPoints: number
  questions?: QuizQuestionInfo[]
}

/**
 * Lesson information
 */
export interface LessonInfo {
  id: string
  chapterId: string
  title: string
  content: string
  videoUrl: string | null
  videoDuration?: number
  duration: number // in seconds
  sortOrder: number
  type: number // 1=Video, 2=Article, 3=Quiz, 4=Assignment
  isPreview: boolean
  isPublished?: boolean
  resources?: string | null
  quizzes?: QuizInfo[] // Quizzes associated with this lesson
  completed?: boolean // Added by frontend based on progress
}

/**
 * Chapter information
 */
export interface ChapterInfo {
  id: string
  courseId: string
  title: string
  description: string | null
  sortOrder: number
  isPublished: boolean
  lessons: LessonInfo[]
}

/**
 * Course data for student view
 */
export interface CourseStudentData {
  course: CourseInfo
  enrollment: EnrollmentInfo
  chapters: ChapterInfo[]
}

/**
 * API Response format
 */
export interface CourseStudentResponse {
  isSuccess: boolean
  value: CourseStudentData
  error: {
    statusCode: number
    message: string
  } | null
}

/**
 * Helper to format duration from seconds to readable format
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

/**
 * Helper to get level text
 */
export function getLevelText(level: number): string {
  const levels: Record<number, string> = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert'
  }
  return levels[level] || 'Unknown'
}

