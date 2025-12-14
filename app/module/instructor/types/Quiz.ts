// Quiz Types for Instructor and Student

export enum QuestionType {
  SingleChoice = 1,
  MultipleChoice = 2,
  TrueFalse = 3,
  ShortAnswer = 4,
  Essay = 5
}

export enum AttemptStatus {
  InProgress = 1,
  Completed = 2,
  TimedOut = 3,
  Abandoned = 4
}

export interface BaseResponse<T> {
  isSuccess: boolean
  value: T | null
  error: {
    code: string
    message: string
  } | null
}

// Quiz DTOs
export interface QuizDto {
  id: string
  lessonId: string
  lessonTitle: string
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
  createdAt: string
  updatedAt: string
}

export interface QuizDetailDto extends QuizDto {
  courseId: string
  courseTitle: string
  questions: QuizQuestionDto[]
  canEdit: boolean
  canDelete: boolean
  userAttemptCount: number | null
  bestScore: number | null
}

export interface QuizSummaryDto {
  id: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  questionCount: number
  totalPoints: number
  isPublished: boolean
  sortOrder: number
}

export interface QuizListDto {
  id: string
  lessonId: string
  lessonTitle: string
  courseId: string
  courseTitle: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  questionCount: number
  totalPoints: number
  isPublished: boolean
  totalAttempts: number
  createdAt: string
  updatedAt: string
}

// Question DTOs
export interface QuizQuestionDto {
  id: string
  quizId: string
  questionText: string
  explanation: string | null
  type: QuestionType
  points: number
  sortOrder: number
  imageUrl: string | null
  answers: QuizAnswerDto[]
  createdAt: string
  updatedAt: string
}

export interface QuizQuestionForAttemptDto {
  id: string
  questionText: string
  type: QuestionType
  points: number
  sortOrder: number
  imageUrl: string | null
  answers: QuizAnswerForAttemptDto[]
}

// Answer DTOs
export interface QuizAnswerDto {
  id: string
  questionId: string
  answerText: string
  isCorrect: boolean
  sortOrder: number
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface QuizAnswerForAttemptDto {
  id: string
  answerText: string
  sortOrder: number
  imageUrl: string | null
}

// Attempt DTOs
export interface QuizForAttemptDto {
  id: string
  attemptId: string
  title: string
  description: string | null
  timeLimit: number
  remainingTimeSeconds: number
  questionCount: number
  totalPoints: number
  questions: QuizQuestionForAttemptDto[]
}

export interface QuizAttemptDetailDto {
  id: string
  quizId: string
  quizTitle: string
  score: number
  totalPoints: number
  percentage: number
  isPassed: boolean
  startedAt: string
  completedAt: string | null
  timeSpentSeconds: number
  status: AttemptStatus
  answers: QuizAttemptAnswerDto[]
  showCorrectAnswers: boolean
}

export interface QuizAttemptAnswerDto {
  id: string
  questionId: string
  questionText: string
  selectedAnswerId: string | null
  selectedAnswerText: string | null
  textAnswer: string | null
  isCorrect: boolean
  pointsEarned: number
  maxPoints: number
  correctAnswerText: string | null
  explanation: string | null
}

export interface QuizAttemptSummaryDto {
  id: string
  quizId?: string
  quizTitle?: string
  score: number
  totalPoints: number
  percentage: number
  isPassed: boolean
  completedAt: string
  timeSpentSeconds: number
}

// Request DTOs
export interface CreateQuizDto {
  lessonId: string
  title: string
  description?: string | null
  timeLimit?: number
  passingScore?: number
  maxAttempts?: number
  shuffleQuestions?: boolean
  shuffleAnswers?: boolean
  showCorrectAnswers?: boolean
  sortOrder?: number
}

export interface UpdateQuizDto {
  id: string
  title: string
  description?: string | null
  timeLimit?: number
  passingScore?: number
  maxAttempts?: number
  shuffleQuestions?: boolean
  shuffleAnswers?: boolean
  showCorrectAnswers?: boolean
  sortOrder?: number
}

export interface CreateQuizQuestionDto {
  quizId: string
  questionText: string
  explanation?: string | null
  type?: QuestionType
  points?: number
  sortOrder?: number
  imageUrl?: string | null
  answers?: CreateQuizAnswerDto[]
}

export interface CreateQuizAnswerDto {
  answerText: string
  isCorrect?: boolean
  sortOrder?: number
  imageUrl?: string | null
}

export interface StartQuizAttemptDto {
  quizId: string
}

export interface SaveAnswerDto {
  attemptId: string
  questionId: string
  selectedAnswerId?: string | null
  selectedAnswerIds?: string[] | null
  textAnswer?: string | null
}

export interface SubmitAnswerDto {
  questionId: string
  selectedAnswerId?: string | null
  selectedAnswerIds?: string[] | null
  textAnswer?: string | null
}

export interface SubmitQuizAttemptDto {
  attemptId: string
  answers: SubmitAnswerDto[]
}

export interface QuizSearchDto {
  searchTerm?: string | null
  lessonId?: string | null
  courseId?: string | null
  isPublished?: boolean | null
  page?: number
  pageSize?: number
  sortBy?: string
  sortDescending?: boolean
}

export interface PagedResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

// Quiz Result API Types for Instructor

/**
 * Quiz Attempt Result for Instructor
 */
export interface QuizAttemptResultDto {
  id: string
  quizId: string
  quizTitle: string
  userId: string
  userName: string
  score: number
  totalPoints: number
  percentage: number
  isPassed: boolean
  startedAt: string
  completedAt: string | null
  timeSpentSeconds: number
  status: 'InProgress' | 'Completed' | 'Abandoned'
  createdAt: string
}

/**
 * Quiz Statistics DTO
 */
export interface QuizStatsDto {
  quizId: string
  title: string
  totalAttempts: number
  uniqueUsers: number
  passedCount: number
  failedCount: number
  averageScore: number
  highestScore: number
  lowestScore: number
  averageTimeSpentSeconds: number
  passRate: number
  questionStats: QuestionStatsDto[]
}

/**
 * Question Statistics DTO
 */
export interface QuestionStatsDto {
  questionId: string
  questionText: string
  totalAnswered: number
  correctCount: number
  correctRate: number
  answerStats: AnswerStatsDto[]
}

/**
 * Answer Statistics DTO
 */
export interface AnswerStatsDto {
  answerId: string
  answerText: string
  isCorrect: boolean
  selectionCount: number
  selectionRate: number
}

/**
 * Leaderboard Entry DTO
 */
export interface LeaderboardEntryDto {
  rank: number
  userId: string
  userName: string
  avatarUrl: string | null
  bestScore: number
  attemptsCount: number
  bestTimeSpentSeconds: number
  bestAttemptDate: string
}

/**
 * Leaderboard DTO
 */
export interface LeaderboardDto {
  quizId: string
  quizTitle: string
  entries: LeaderboardEntryDto[]
}

/**
 * Instructor Quiz List Item (with stats)
 */
export interface InstructorQuizListItemDto {
  id: string
  lessonId: string
  lessonTitle: string
  courseId: string
  courseTitle: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  questionCount: number
  totalPoints: number
  isPublished: boolean
  totalAttempts: number
  createdAt: string
  updatedAt: string
}

