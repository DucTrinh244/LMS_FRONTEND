import httpClient from '~/services/httpClient'
import type {
  BaseResponse,
  CreateQuizDto,
  CreateQuizQuestionDto,
  QuizDetailDto,
  QuizDto,
  QuizForAttemptDto,
  QuizListDto,
  QuizSearchDto,
  QuizSummaryDto,
  PagedResult,
  UpdateQuizDto,
  QuizAttemptDetailDto,
  QuizAttemptSummaryDto,
  SaveAnswerDto,
  SubmitQuizAttemptDto,
  StartQuizAttemptDto,
} from '~/module/instructor/types/Quiz'

export const quizService = {
  // ==================== Quiz CRUD Operations ====================

  /**
   * Get quiz by ID
   */
  getQuiz: (id: string): Promise<BaseResponse<QuizDto>> => {
    return httpClient.get(`/quiz/${id}`).then((res) => res.data)
  },

  /**
   * Get quiz detail with questions
   */
  getQuizDetail: (id: string): Promise<BaseResponse<QuizDetailDto>> => {
    return httpClient.get(`/quiz/${id}/detail`).then((res) => res.data)
  },

  /**
   * Get quizzes by lesson
   */
  getQuizzesByLesson: (
    lessonId: string,
    publishedOnly: boolean = false
  ): Promise<BaseResponse<QuizSummaryDto[]>> => {
    return httpClient
      .get(`/quiz/lesson/${lessonId}?publishedOnly=${publishedOnly}`)
      .then((res) => res.data)
  },

  /**
   * Get quizzes by course
   */
  getQuizzesByCourse: (
    courseId: string,
    publishedOnly: boolean = false
  ): Promise<BaseResponse<QuizListDto[]>> => {
    return httpClient
      .get(`/quiz/course/${courseId}?publishedOnly=${publishedOnly}`)
      .then((res) => res.data)
  },

  /**
   * Search quizzes
   */
  searchQuizzes: (
    searchDto: QuizSearchDto
  ): Promise<BaseResponse<PagedResult<QuizListDto>>> => {
    const params = new URLSearchParams()
    if (searchDto.searchTerm) params.append('searchTerm', searchDto.searchTerm)
    if (searchDto.lessonId) params.append('lessonId', searchDto.lessonId)
    if (searchDto.courseId) params.append('courseId', searchDto.courseId)
    if (searchDto.isPublished !== undefined)
      params.append('isPublished', searchDto.isPublished.toString())
    if (searchDto.page) params.append('page', searchDto.page.toString())
    if (searchDto.pageSize) params.append('pageSize', searchDto.pageSize.toString())
    if (searchDto.sortBy) params.append('sortBy', searchDto.sortBy)
    if (searchDto.sortDescending !== undefined)
      params.append('sortDescending', searchDto.sortDescending.toString())

    return httpClient.get(`/quiz/search?${params.toString()}`).then((res) => res.data)
  },

  /**
   * Create quiz
   */
  createQuiz: (data: CreateQuizDto): Promise<BaseResponse<QuizDto>> => {
    return httpClient.post('/quiz', data).then((res) => res.data)
  },

  /**
   * Update quiz
   */
  updateQuiz: (id: string, data: UpdateQuizDto): Promise<BaseResponse<QuizDto>> => {
    return httpClient.put(`/quiz/${id}`, { ...data, id }).then((res) => res.data)
  },

  /**
   * Delete quiz
   */
  deleteQuiz: (id: string): Promise<BaseResponse<boolean>> => {
    return httpClient.delete(`/quiz/${id}`).then((res) => res.data)
  },

  /**
   * Publish/Unpublish quiz
   */
  publishQuiz: (id: string, isPublished: boolean): Promise<BaseResponse<boolean>> => {
    return httpClient
      .patch(`/quiz/${id}/publish?isPublished=${isPublished}`)
      .then((res) => res.data)
  },

  /**
   * Duplicate quiz
   */
  duplicateQuiz: (
    sourceQuizId: string,
    targetLessonId?: string | null,
    newTitle?: string | null
  ): Promise<BaseResponse<QuizDto>> => {
    return httpClient
      .post('/quiz/duplicate', {
        sourceQuizId,
        targetLessonId,
        newTitle,
      })
      .then((res) => res.data)
  },

  // ==================== Question Operations ====================

  /**
   * Get question by ID
   */
  getQuestion: (id: string): Promise<BaseResponse<any>> => {
    return httpClient.get(`/quiz/question/${id}`).then((res) => res.data)
  },

  /**
   * Get questions by quiz
   */
  getQuestionsByQuiz: (quizId: string): Promise<BaseResponse<any[]>> => {
    return httpClient.get(`/quiz/${quizId}/questions`).then((res) => res.data)
  },

  /**
   * Create question
   */
  createQuestion: (data: CreateQuizQuestionDto): Promise<BaseResponse<any>> => {
    return httpClient.post('/quiz/question', data).then((res) => res.data)
  },

  /**
   * Bulk create questions
   */
  bulkCreateQuestions: (
    quizId: string,
    questions: CreateQuizQuestionDto[]
  ): Promise<BaseResponse<any[]>> => {
    return httpClient
      .post('/quiz/questions/bulk', {
        quizId,
        questions,
      })
      .then((res) => res.data)
  },

  /**
   * Update question
   */
  updateQuestion: (
    id: string,
    data: Partial<CreateQuizQuestionDto> & { id: string }
  ): Promise<BaseResponse<any>> => {
    return httpClient.put(`/quiz/question/${id}`, { ...data, id }).then((res) => res.data)
  },

  /**
   * Delete question
   */
  deleteQuestion: (id: string): Promise<BaseResponse<boolean>> => {
    return httpClient.delete(`/quiz/question/${id}`).then((res) => res.data)
  },

  // ==================== Answer Operations ====================

  /**
   * Add answer to question
   */
  addAnswer: (
    questionId: string,
    answerText: string,
    isCorrect: boolean = false,
    sortOrder: number = 0,
    imageUrl?: string | null
  ): Promise<BaseResponse<any>> => {
    return httpClient
      .post('/quiz/answer', {
        questionId,
        answerText,
        isCorrect,
        sortOrder,
        imageUrl,
      })
      .then((res) => res.data)
  },

  /**
   * Update answer
   */
  updateAnswer: (
    id: string,
    answerText: string,
    isCorrect: boolean,
    sortOrder: number,
    imageUrl?: string | null
  ): Promise<BaseResponse<any>> => {
    return httpClient
      .put(`/quiz/answer/${id}`, {
        id,
        answerText,
        isCorrect,
        sortOrder,
        imageUrl,
      })
      .then((res) => res.data)
  },

  /**
   * Delete answer
   */
  deleteAnswer: (id: string): Promise<BaseResponse<boolean>> => {
    return httpClient.delete(`/quiz/answer/${id}`).then((res) => res.data)
  },

  // ==================== Quiz Attempt Operations ====================

  /**
   * Start quiz attempt
   */
  startAttempt: (quizId: string): Promise<BaseResponse<QuizForAttemptDto>> => {
    return httpClient.post('/quiz/attempt/start', { quizId }).then((res) => res.data)
  },

  /**
   * Save answer progress (auto-save)
   */
  saveAnswer: (data: SaveAnswerDto): Promise<BaseResponse<boolean>> => {
    return httpClient.post('/quiz/attempt/save', data).then((res) => res.data)
  },

  /**
   * Get attempt progress
   */
  getAttemptProgress: (attemptId: string): Promise<BaseResponse<any>> => {
    return httpClient.get(`/quiz/attempt/${attemptId}/progress`).then((res) => res.data)
  },

  /**
   * Submit quiz attempt
   */
  submitAttempt: (data: SubmitQuizAttemptDto): Promise<BaseResponse<QuizAttemptDetailDto>> => {
    return httpClient.post('/quiz/attempt/submit', data).then((res) => res.data)
  },

  /**
   * Get attempt detail
   */
  getAttemptDetail: (attemptId: string): Promise<BaseResponse<QuizAttemptDetailDto>> => {
    return httpClient.get(`/quiz/attempt/${attemptId}`).then((res) => res.data)
  },

  /**
   * Get user's attempts for a quiz
   */
  getMyAttempts: (quizId: string): Promise<BaseResponse<QuizAttemptSummaryDto[]>> => {
    return httpClient.get(`/quiz/${quizId}/my-attempts`).then((res) => res.data)
  },

  /**
   * Get all attempts for quiz (Instructor only)
   */
  getAllAttempts: (quizId: string): Promise<BaseResponse<any[]>> => {
    return httpClient.get(`/quiz/${quizId}/attempts`).then((res) => res.data)
  },

  /**
   * Abandon attempt
   */
  abandonAttempt: (attemptId: string): Promise<BaseResponse<boolean>> => {
    return httpClient.post(`/quiz/attempt/${attemptId}/abandon`).then((res) => res.data)
  },

  // ==================== Statistics & Analytics ====================

  /**
   * Get quiz statistics (Instructor only)
   */
  getQuizStats: (quizId: string): Promise<BaseResponse<any>> => {
    return httpClient.get(`/quiz/${quizId}/stats`).then((res) => res.data)
  },

  /**
   * Get quiz leaderboard
   */
  getQuizLeaderboard: (quizId: string, top: number = 10): Promise<BaseResponse<any>> => {
    return httpClient.get(`/quiz/${quizId}/leaderboard?top=${top}`).then((res) => res.data)
  },

  /**
   * Get my recent attempts
   */
  getMyRecentAttempts: (count: number = 10): Promise<BaseResponse<QuizAttemptSummaryDto[]>> => {
    return httpClient.get(`/quiz/my-recent-attempts?count=${count}`).then((res) => res.data)
  },

  // ==================== Instructor Specific ====================

  /**
   * Get my quizzes
   */
  getMyQuizzes: (): Promise<BaseResponse<QuizListDto[]>> => {
    return httpClient.get('/quiz/my-quizzes').then((res) => res.data)
  },

  /**
   * Get unpublished quizzes
   */
  getUnpublishedQuizzes: (): Promise<BaseResponse<QuizListDto[]>> => {
    return httpClient.get('/quiz/unpublished').then((res) => res.data)
  },
}

