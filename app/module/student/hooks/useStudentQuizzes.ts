import { useQuery } from '@tanstack/react-query'
import { quizService } from '~/module/instructor/services/QuizApi'
import type { QuizListDto } from '~/module/instructor/types/Quiz'

const STUDENT_QUIZZES_QUERY_KEY = ['student-quizzes']

/**
 * Hook to get all published quizzes from courses that the student is enrolled in
 * Uses the /api/quiz/student/my-quizzes endpoint
 */
export function useStudentQuizzes() {
  const {
    data: quizzes = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizListDto[]>({
    queryKey: STUDENT_QUIZZES_QUERY_KEY,
    queryFn: async () => {
      const res = await quizService.getMyQuizzesForStudent()
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Không thể tải danh sách quiz')
    },
    retry: 1,
  })

  return {
    quizzes,
    loading,
    error: error?.message || null,
    refetch,
  }
}

