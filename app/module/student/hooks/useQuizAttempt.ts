import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { quizService } from '~/module/instructor/services/QuizApi'
import type {
  QuizAttemptDetailDto,
  QuizAttemptSummaryDto,
  QuizForAttemptDto,
  SaveAnswerDto,
  SubmitQuizAttemptDto,
} from '~/module/instructor/types/Quiz'
import { useToast } from '~/shared/hooks/useToast'

const QUIZ_ATTEMPT_QUERY_KEY = ['quiz-attempts']

export function useQuizAttempt(quizId: string) {
  const {
    data: attempt,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizForAttemptDto>({
    queryKey: [...QUIZ_ATTEMPT_QUERY_KEY, quizId],
    queryFn: async () => {
      const res = await quizService.startAttempt(quizId)
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Không thể bắt đầu quiz')
    },
    enabled: false, // Only fetch when explicitly called
    retry: 1,
  })

  return {
    attempt,
    loading,
    error: error?.message || null,
    refetch,
  }
}

export function useMyAttempts(quizId: string) {
  const {
    data: attempts = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizAttemptSummaryDto[]>({
    queryKey: [...QUIZ_ATTEMPT_QUERY_KEY, quizId, 'my-attempts'],
    queryFn: async () => {
      const res = await quizService.getMyAttempts(quizId)
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Không thể tải lịch sử attempts')
    },
    enabled: !!quizId,
    retry: 1,
  })

  return {
    attempts,
    loading,
    error: error?.message || null,
    refetch,
  }
}

export function useAttemptDetail(attemptId: string) {
  const {
    data: attemptDetail,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizAttemptDetailDto>({
    queryKey: [...QUIZ_ATTEMPT_QUERY_KEY, attemptId, 'detail'],
    queryFn: async () => {
      const res = await quizService.getAttemptDetail(attemptId)
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Không thể tải chi tiết attempt')
    },
    enabled: !!attemptId,
    retry: 1,
  })

  return {
    attemptDetail,
    loading,
    error: error?.message || null,
    refetch,
  }
}

export function useQuizAttemptMutations() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const startAttemptMutation = useMutation({
    mutationFn: (quizId: string) => quizService.startAttempt(quizId),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_ATTEMPT_QUERY_KEY })
      } else {
        toast.error(res.error?.message || 'Không thể bắt đầu quiz')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi bắt đầu quiz')
    },
  })

  const saveAnswerMutation = useMutation({
    mutationFn: (data: SaveAnswerDto) => quizService.saveAnswer(data),
    onSuccess: (res) => {
      if (!res.isSuccess) {
        toast.error(res.error?.message || 'Không thể lưu câu trả lời')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi lưu câu trả lời')
    },
  })

  const submitAttemptMutation = useMutation({
    mutationFn: (data: SubmitQuizAttemptDto) => quizService.submitAttempt(data),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_ATTEMPT_QUERY_KEY })
        toast.success('Nộp bài thành công!')
      } else {
        toast.error(res.error?.message || 'Nộp bài thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi nộp bài')
    },
  })

  const abandonAttemptMutation = useMutation({
    mutationFn: (attemptId: string) => quizService.abandonAttempt(attemptId),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_ATTEMPT_QUERY_KEY })
        toast.success('Đã hủy attempt')
      } else {
        toast.error(res.error?.message || 'Không thể hủy attempt')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi hủy attempt')
    },
  })

  return {
    startAttempt: startAttemptMutation.mutateAsync,
    saveAnswer: saveAnswerMutation.mutateAsync,
    submitAttempt: submitAttemptMutation.mutateAsync,
    abandonAttempt: abandonAttemptMutation.mutateAsync,
    isStarting: startAttemptMutation.isPending,
    isSaving: saveAnswerMutation.isPending,
    isSubmitting: submitAttemptMutation.isPending,
    isAbandoning: abandonAttemptMutation.isPending,
  }
}

