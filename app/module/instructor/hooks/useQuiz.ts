import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { quizService } from '~/module/instructor/services/QuizApi'
import type {
  CreateQuizDto,
  CreateQuizQuestionDto,
  QuizDetailDto,
  QuizDto,
  QuizListDto,
  QuizSearchDto,
  UpdateQuizDto,
} from '~/module/instructor/types/Quiz'
import { useToast } from '~/shared/hooks/useToast'

const QUIZ_QUERY_KEY = ['quizzes']

export function useQuizzes(courseId?: string, publishedOnly: boolean = false) {
  const { toast } = useToast()

  const {
    data: quizzes = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizListDto[]>({
    queryKey: [...QUIZ_QUERY_KEY, courseId, publishedOnly],
    queryFn: async () => {
      if (courseId) {
        const res = await quizService.getQuizzesByCourse(courseId, publishedOnly)
        if (res.isSuccess && res.value) {
          return res.value
        }
        throw new Error(res.error?.message || 'Không thể tải danh sách quizzes')
      } else {
        const res = await quizService.getMyQuizzes()
        if (res.isSuccess && res.value) {
          return res.value
        }
        throw new Error(res.error?.message || 'Không thể tải danh sách quizzes')
      }
    },
    enabled: !!courseId || true,
    retry: 1,
  })

  return {
    quizzes,
    loading,
    error: error?.message || null,
    refetch,
  }
}

export function useQuiz(quizId: string) {
  const {
    data: quiz,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizDto>({
    queryKey: [...QUIZ_QUERY_KEY, quizId],
    queryFn: async () => {
      const res = await quizService.getQuiz(quizId)
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Không thể tải quiz')
    },
    enabled: !!quizId,
    retry: 1,
  })

  return {
    quiz,
    loading,
    error: error?.message || null,
    refetch,
  }
}

export function useQuizDetail(quizId: string) {
  const {
    data: quizDetail,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<QuizDetailDto>({
    queryKey: [...QUIZ_QUERY_KEY, quizId, 'detail'],
    queryFn: async () => {
      const res = await quizService.getQuizDetail(quizId)
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Không thể tải chi tiết quiz')
    },
    enabled: !!quizId,
    retry: 1,
  })

  return {
    quizDetail,
    loading,
    error: error?.message || null,
    refetch,
  }
}

export function useQuizMutations() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const createQuizMutation = useMutation({
    mutationFn: (data: CreateQuizDto) => quizService.createQuiz(data),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success('Tạo quiz thành công!')
      } else {
        toast.error(res.error?.message || 'Tạo quiz thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi tạo quiz')
    },
  })

  const updateQuizMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuizDto }) =>
      quizService.updateQuiz(id, data),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success('Cập nhật quiz thành công!')
      } else {
        toast.error(res.error?.message || 'Cập nhật quiz thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi cập nhật quiz')
    },
  })

  const deleteQuizMutation = useMutation({
    mutationFn: (id: string) => quizService.deleteQuiz(id),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success('Xóa quiz thành công!')
      } else {
        toast.error(res.error?.message || 'Xóa quiz thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi xóa quiz')
    },
  })

  const publishQuizMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      quizService.publishQuiz(id, isPublished),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success(
          res.value ? 'Quiz đã được xuất bản!' : 'Quiz đã được hủy xuất bản!'
        )
      } else {
        toast.error(res.error?.message || 'Thay đổi trạng thái quiz thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi thay đổi trạng thái quiz')
    },
  })

  const createQuestionMutation = useMutation({
    mutationFn: (data: CreateQuizQuestionDto) => quizService.createQuestion(data),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success('Thêm câu hỏi thành công!')
      } else {
        toast.error(res.error?.message || 'Thêm câu hỏi thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi thêm câu hỏi')
    },
  })

  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateQuizQuestionDto> & { id: string } }) =>
      quizService.updateQuestion(id, data),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success('Cập nhật câu hỏi thành công!')
      } else {
        toast.error(res.error?.message || 'Cập nhật câu hỏi thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi cập nhật câu hỏi')
    },
  })

  const deleteQuestionMutation = useMutation({
    mutationFn: (id: string) => quizService.deleteQuestion(id),
    onSuccess: (res) => {
      if (res.isSuccess) {
        queryClient.invalidateQueries({ queryKey: QUIZ_QUERY_KEY })
        toast.success('Xóa câu hỏi thành công!')
      } else {
        toast.error(res.error?.message || 'Xóa câu hỏi thất bại!')
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi xóa câu hỏi')
    },
  })

  return {
    createQuiz: createQuizMutation.mutateAsync,
    updateQuiz: updateQuizMutation.mutateAsync,
    deleteQuiz: deleteQuizMutation.mutateAsync,
    publishQuiz: publishQuizMutation.mutateAsync,
    createQuestion: createQuestionMutation.mutateAsync,
    updateQuestion: updateQuestionMutation.mutateAsync,
    deleteQuestion: deleteQuestionMutation.mutateAsync,
    isCreating: createQuizMutation.isPending,
    isUpdating: updateQuizMutation.isPending,
    isDeleting: deleteQuizMutation.isPending,
    isPublishing: publishQuizMutation.isPending,
    isCreatingQuestion: createQuestionMutation.isPending,
    isUpdatingQuestion: updateQuestionMutation.isPending,
    isDeletingQuestion: deleteQuestionMutation.isPending,
  }
}

