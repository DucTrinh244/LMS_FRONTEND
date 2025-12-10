import { CheckCircle, ChevronDown, Clock, Edit2, Eye, HelpCircle, Plus, Search, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCourseInstructor } from '~/module/instructor/hooks/useCourseInstructor'
import { useQuizMutations, useQuizzes } from '~/module/instructor/hooks/useQuiz'
import { courseInstructorService } from '~/module/instructor/services/CourseInstructorApi'
import { quizService } from '~/module/instructor/services/QuizApi'
import type { CreateQuizDto, CreateQuizQuestionDto, QuizDetailDto, QuizListDto, UpdateQuizDto } from '~/module/instructor/types/Quiz'
import { QuestionType as QType } from '~/module/instructor/types/Quiz'
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog'
import { useToast } from '~/shared/hooks/useToast'

interface QuizContentProps {
  courseId?: string
}

const QuizContent: React.FC<QuizContentProps> = ({ courseId }) => {
  const { toast } = useToast()
  const { confirm } = useConfirmDialog()
  const { courses } = useCourseInstructor()
  const { quizzes, loading: quizzesLoading, refetch: refetchQuizzes } = useQuizzes(courseId, false)
  const { createQuiz, updateQuiz, deleteQuiz, publishQuiz, createQuestion, updateQuestion, deleteQuestion, isCreating, isUpdating, isDeleting } = useQuizMutations()

  const [lessons, setLessons] = useState<any[]>([])
  const [selectedQuizDetail, setSelectedQuizDetail] = useState<QuizDetailDto | null>(null)
  const [quizzesList, setQuizzesList] = useState<QuizListDto[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState<QuizListDto | null>(null)
  const [selectedQuiz, setSelectedQuiz] = useState<QuizListDto | null>(null)
  const [formData, setFormData] = useState({
    lessonId: '',
    lessonTitle: '',
    title: '',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    maxAttempts: 3,
    shuffleQuestions: false,
    shuffleAnswers: false,
    showCorrectAnswers: true,
    sortOrder: 0,
  })

  const [questionFormData, setQuestionFormData] = useState<CreateQuizQuestionDto>({
    quizId: '',
    questionText: '',
    explanation: '',
    type: QType.SingleChoice,
    points: 10,
    sortOrder: 0,
    answers: [],
  })

  const [answerOptions, setAnswerOptions] = useState<{ text: string; isCorrect: boolean }[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ])

  useEffect(() => {
    if (quizzes && quizzes.length > 0) {
      setQuizzesList(quizzes)
    } else {
      setQuizzesList([])
    }
  }, [quizzes])

  useEffect(() => {
    if (courseId) {
      loadLessons()
    }
  }, [courseId])

  const loadLessons = async () => {
    try {
      const data = await courseInstructorService.getLessonsByCourse(courseId || '')
      const lessonsList = data?.isSuccess ? data.value : data?.lessons ?? data ?? []
      setLessons(lessonsList)
    } catch (error) {
      setLessons([])
    }
  }

  const filteredQuizzes = quizzesList
    .filter((quiz) => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((quiz) => {
      if (selectedStatus === 'All') return true
      if (selectedStatus === 'published') return quiz.isPublished
      if (selectedStatus === 'draft') return !quiz.isPublished
      return true
    })

  const handleAdd = () => {
    setEditingQuiz(null)
    setFormData({
      lessonId: '',
      lessonTitle: '',
      title: '',
      description: '',
      timeLimit: 30,
      passingScore: 70,
      maxAttempts: 3,
      shuffleQuestions: false,
      shuffleAnswers: false,
      showCorrectAnswers: true,
      sortOrder: quizzesList.length + 1,
    })
    setShowModal(true)
  }

  const handleEdit = async (quiz: QuizListDto) => {
    setEditingQuiz(quiz)
    try {
      const res = await quizService.getQuizDetail(quiz.id)
      if (res.isSuccess && res.value) {
        const detail = res.value
        setFormData({
          lessonId: detail.lessonId,
          lessonTitle: detail.lessonTitle,
          title: detail.title,
          description: detail.description || '',
          timeLimit: detail.timeLimit,
          passingScore: detail.passingScore,
          maxAttempts: detail.maxAttempts,
          shuffleQuestions: detail.shuffleQuestions,
          shuffleAnswers: detail.shuffleAnswers,
          showCorrectAnswers: detail.showCorrectAnswers,
          sortOrder: detail.sortOrder,
        })
        setSelectedQuizDetail(detail)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Không thể tải chi tiết quiz')
    }
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    const ok = await confirm('Bạn có chắc chắn muốn xóa quiz này?')
    if (ok) {
      try {
        await deleteQuiz(id)
        setQuizzesList((prev) => prev.filter((q) => q.id !== id))
      } catch (error: any) {
        toast.error(error?.message || 'Không thể xóa quiz')
      }
    }
  }

  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingQuiz) {
        const updateData: UpdateQuizDto = {
          id: editingQuiz.id,
          title: formData.title,
          description: formData.description || null,
          timeLimit: formData.timeLimit,
          passingScore: formData.passingScore,
          maxAttempts: formData.maxAttempts,
          shuffleQuestions: formData.shuffleQuestions,
          shuffleAnswers: formData.shuffleAnswers,
          showCorrectAnswers: formData.showCorrectAnswers,
          sortOrder: formData.sortOrder,
        }
        await updateQuiz({ id: editingQuiz.id, data: updateData })
      } else {
        if (!formData.lessonId) {
          toast.error('Vui lòng chọn lesson')
          return
        }
        const createData: CreateQuizDto = {
          lessonId: formData.lessonId,
          title: formData.title,
          description: formData.description || null,
          timeLimit: formData.timeLimit,
          passingScore: formData.passingScore,
          maxAttempts: formData.maxAttempts,
          shuffleQuestions: formData.shuffleQuestions,
          shuffleAnswers: formData.shuffleAnswers,
          showCorrectAnswers: formData.showCorrectAnswers,
          sortOrder: formData.sortOrder,
        }
        await createQuiz(createData)
      }
      setShowModal(false)
      await refetchQuizzes()
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra')
    }
  }

  const handleManageQuestions = async (quiz: QuizListDto) => {
    setSelectedQuiz(quiz)
    try {
      const res = await quizService.getQuizDetail(quiz.id)
      if (res.isSuccess && res.value) {
        setSelectedQuizDetail(res.value)
        setShowQuestionsModal(true)
      } else {
        toast.error(res.error?.message || 'Không thể tải chi tiết quiz')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra')
    }
  }

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedQuiz) return

    try {
      // Prepare answers based on question type
      const answers: any[] = []

      if (questionFormData.type === QType.ShortAnswer || questionFormData.type === QType.Essay) {
        // For text questions, create a single answer with the correct text
        if (answerOptions[0]?.text) {
          answers.push({
            answerText: answerOptions[0].text,
            isCorrect: true,
            sortOrder: 0,
          })
        }
      } else {
        // For choice questions, use all answer options
        answerOptions.forEach((option, index) => {
          if (option.text.trim()) {
            answers.push({
              answerText: option.text,
              isCorrect: option.isCorrect,
              sortOrder: index,
            })
          }
        })
      }

      if (answers.length === 0) {
        toast.error('Vui lòng thêm ít nhất một đáp án')
        return
      }

      const questionData: CreateQuizQuestionDto = {
        quizId: selectedQuiz.id,
        questionText: questionFormData.questionText,
        explanation: questionFormData.explanation || null,
        type: questionFormData.type || QType.SingleChoice,
        points: questionFormData.points || 10,
        sortOrder: questionFormData.sortOrder || (selectedQuizDetail?.questions.length || 0) + 1,
        imageUrl: null,
        answers: answers,
      }

      await createQuestion(questionData)

      // Refresh quiz detail
      const res = await quizService.getQuizDetail(selectedQuiz.id)
      if (res.isSuccess && res.value) {
        setSelectedQuizDetail(res.value)
        // Update selectedQuiz to reflect new question count
        setSelectedQuiz((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            questionCount: res.value?.questions.length || 0,
            totalPoints: res.value?.questions.reduce((sum: number, q: any) => sum + q.points, 0) || 0,
          }
        })
      }

      // Reset form
      setQuestionFormData({
        quizId: selectedQuiz.id,
        questionText: '',
        explanation: '',
        type: QType.SingleChoice,
        points: 10,
        sortOrder: 0,
        answers: [],
      })
      setAnswerOptions([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ])
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra khi thêm câu hỏi')
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (!selectedQuiz) return

    const ok = await confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')
    if (!ok) return

    try {
      await deleteQuestion(questionId)

      // Refresh quiz detail
      const res = await quizService.getQuizDetail(selectedQuiz.id)
      if (res.isSuccess && res.value) {
        setSelectedQuizDetail(res.value)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra khi xóa câu hỏi')
    }
  }

  const getStatusColor = (isPublished: boolean) => {
    if (isPublished) {
      return 'bg-green-500/20 text-green-300 border-green-500/50'
    }
    return 'bg-amber-500/20 text-amber-300 border-amber-500/50'
  }

  const handlePublishToggle = async (quiz: QuizListDto) => {
    try {
      await publishQuiz({ id: quiz.id, isPublished: !quiz.isPublished })
      setQuizzesList((prev) =>
        prev.map((q) =>
          q.id === quiz.id ? { ...q, isPublished: !q.isPublished } : q
        )
      )
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra')
    }
  }

  if (quizzesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải quizzes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Total Quizzes</h3>
              <p className="text-3xl font-bold">{quizzes.length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Published</h3>
              <p className="text-3xl font-bold">{quizzesList.filter((q) => q.isPublished).length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Draft</h3>
              <p className="text-3xl font-bold">{quizzesList.filter((q) => !q.isPublished).length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Total Attempts</h3>
              <p className="text-3xl font-bold">{quizzesList.reduce((sum, q) => sum + q.totalAttempts, 0)}</p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-7 h-7" />
                Quiz Management
              </h1>
              <p className="text-slate-400 mt-1">Create and manage quizzes for your courses</p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
            >
              <Plus className="w-5 h-5" />
              New Quiz
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Quizzes List */}
        <div className="grid gap-6">
          {filteredQuizzes.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
              <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Quizzes Yet</h3>
              <p className="text-slate-400 mb-6">Create your first quiz to test your students</p>
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              >
                Create Quiz
              </button>
            </div>
          ) : (
            filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          quiz.isPublished
                        )}`}
                      >
                        {quiz.isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-3">{quiz.description || 'Không có mô tả'}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-violet-400 font-medium">{quiz.courseTitle}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{quiz.lessonTitle}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.timeLimit} phút
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{quiz.questionCount} câu hỏi</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{quiz.totalPoints} điểm</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePublishToggle(quiz)}
                      className={`p-2 rounded-lg transition ${quiz.isPublished
                        ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
                        : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                        }`}
                      title={quiz.isPublished ? 'Hủy xuất bản' : 'Xuất bản'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(quiz)}
                      className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold text-white">{quiz.totalAttempts}</p>
                      <p className="text-sm text-slate-400">Attempts</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{quiz.passingScore}%</p>
                      <p className="text-sm text-slate-400">Passing Score</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleManageQuestions(quiz)}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Quản lý Câu hỏi ({quiz.questionCount})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create/Edit Quiz Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {editingQuiz ? 'Edit Quiz' : 'New Quiz'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveQuiz} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. React Fundamentals Quiz"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    placeholder="Quiz description..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lesson <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.lessonId}
                    onChange={(e) => {
                      const selectedLesson = lessons.find((l) => l.id === e.target.value)
                      setFormData((prev) => ({
                        ...prev,
                        lessonId: e.target.value,
                        lessonTitle: selectedLesson?.title || '',
                      }))
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                    disabled={!!editingQuiz}
                  >
                    <option value="">Chọn lesson</option>
                    {lessons.map((lesson) => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Thời gian (phút)
                    </label>
                    <input
                      type="number"
                      value={formData.timeLimit}
                      onChange={(e) => setFormData((prev) => ({ ...prev, timeLimit: Number(e.target.value) }))}
                      min="1"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Điểm đạt (%)
                    </label>
                    <input
                      type="number"
                      value={formData.passingScore}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, passingScore: Number(e.target.value) }))
                      }
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Số lần làm tối đa
                    </label>
                    <input
                      type="number"
                      value={formData.maxAttempts}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maxAttempts: Number(e.target.value) }))}
                      min="1"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Thứ tự
                    </label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shuffleQuestions}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, shuffleQuestions: e.target.checked }))
                      }
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-slate-300">Xáo trộn câu hỏi</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shuffleAnswers}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, shuffleAnswers: e.target.checked }))
                      }
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-slate-300">Xáo trộn đáp án</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showCorrectAnswers}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, showCorrectAnswers: e.target.checked }))
                      }
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-slate-300">Hiển thị đáp án đúng sau khi nộp bài</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
                  >
                    {editingQuiz ? 'Update' : 'Create'} Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Manage Questions Modal */}
        {showQuestionsModal && selectedQuiz && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedQuiz.title}</h3>
                  <p className="text-slate-400 text-sm">
                    {selectedQuizDetail?.questions.length || 0} Questions • {selectedQuizDetail?.totalPoints || selectedQuiz.totalPoints} Points
                  </p>
                </div>
                <button
                  onClick={() => setShowQuestionsModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6">
                {/* Add Question Form */}
                <form onSubmit={handleAddQuestion} className="bg-slate-700/30 rounded-xl p-4 mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Add New Question</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Question</label>
                      <textarea
                        value={questionFormData.questionText}
                        onChange={(e) =>
                          setQuestionFormData((prev) => ({ ...prev, questionText: e.target.value }))
                        }
                        rows={3}
                        placeholder="Nhập câu hỏi..."
                        className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Loại câu hỏi</label>
                        <select
                          value={questionFormData.type}
                          onChange={(e) => {
                            const newType = Number(e.target.value) as QType
                            setQuestionFormData((prev) => ({
                              ...prev,
                              type: newType,
                            }))
                            // Reset answers based on type
                            if (newType === QType.TrueFalse) {
                              setAnswerOptions([
                                { text: 'True', isCorrect: false },
                                { text: 'False', isCorrect: false },
                              ])
                            } else if (newType === QType.ShortAnswer || newType === QType.Essay) {
                              setAnswerOptions([{ text: '', isCorrect: true }])
                            } else {
                              setAnswerOptions([
                                { text: '', isCorrect: false },
                                { text: '', isCorrect: false },
                                { text: '', isCorrect: false },
                                { text: '', isCorrect: false },
                              ])
                            }
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                          <option value={QType.SingleChoice}>Single Choice</option>
                          <option value={QType.MultipleChoice}>Multiple Choice</option>
                          <option value={QType.TrueFalse}>True/False</option>
                          <option value={QType.ShortAnswer}>Short Answer</option>
                          <option value={QType.Essay}>Essay</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Điểm</label>
                        <input
                          type="number"
                          value={questionFormData.points}
                          onChange={(e) =>
                            setQuestionFormData((prev) => ({ ...prev, points: Number(e.target.value) }))
                          }
                          min="1"
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Giải thích (tùy chọn)</label>
                      <textarea
                        value={questionFormData.explanation || ''}
                        onChange={(e) =>
                          setQuestionFormData((prev) => ({ ...prev, explanation: e.target.value }))
                        }
                        rows={2}
                        placeholder="Giải thích đáp án đúng..."
                        className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      />
                    </div>

                    {/* Answer Options */}
                    {(questionFormData.type === QType.SingleChoice ||
                      questionFormData.type === QType.MultipleChoice ||
                      questionFormData.type === QType.TrueFalse) && (
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Đáp án <span className="text-red-400">*</span>
                          </label>
                          {answerOptions.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <input
                                type={questionFormData.type === QType.MultipleChoice ? 'checkbox' : 'radio'}
                                name="correctAnswer"
                                checked={option.isCorrect}
                                onChange={(e) => {
                                  const newOptions = [...answerOptions]
                                  if (questionFormData.type === QType.MultipleChoice) {
                                    newOptions[index].isCorrect = e.target.checked
                                  } else {
                                    // Single choice or True/False - only one correct
                                    newOptions.forEach((opt, i) => {
                                      opt.isCorrect = i === index
                                    })
                                  }
                                  setAnswerOptions(newOptions)
                                }}
                                className="w-5 h-5 text-violet-600"
                              />
                              <input
                                type="text"
                                value={option.text}
                                onChange={(e) => {
                                  const newOptions = [...answerOptions]
                                  newOptions[index].text = e.target.value
                                  setAnswerOptions(newOptions)
                                }}
                                placeholder={`Đáp án ${index + 1}`}
                                disabled={questionFormData.type === QType.TrueFalse}
                                className="flex-1 px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                              />
                              {answerOptions.length > 2 && questionFormData.type !== QType.TrueFalse && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAnswerOptions(answerOptions.filter((_, i) => i !== index))
                                  }}
                                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          {questionFormData.type !== QType.TrueFalse && answerOptions.length < 6 && (
                            <button
                              type="button"
                              onClick={() => {
                                setAnswerOptions([...answerOptions, { text: '', isCorrect: false }])
                              }}
                              className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                            >
                              + Thêm đáp án
                            </button>
                          )}
                        </div>
                      )}

                    {(questionFormData.type === QType.ShortAnswer ||
                      questionFormData.type === QType.Essay) && (
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Đáp án mẫu (tùy chọn)
                          </label>
                          <input
                            type="text"
                            value={answerOptions[0]?.text || ''}
                            onChange={(e) => {
                              setAnswerOptions([{ text: e.target.value, isCorrect: true }])
                            }}
                            placeholder="Đáp án mẫu..."
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                          />
                        </div>
                      )}

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
                    >
                      Add Question
                    </button>
                  </div>
                </form>

                {/* Questions List */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white mb-4">Questions</h4>
                  {!selectedQuizDetail || selectedQuizDetail.questions.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">
                      Chưa có câu hỏi nào. Thêm câu hỏi đầu tiên ở trên.
                    </p>
                  ) : (
                    selectedQuizDetail.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <h5 className="text-white font-medium">{question.questionText}</h5>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-400 ml-11">
                              <span className="capitalize">
                                {question.type === QType.SingleChoice && 'Single Choice'}
                                {question.type === QType.MultipleChoice && 'Multiple Choice'}
                                {question.type === QType.TrueFalse && 'True/False'}
                                {question.type === QType.ShortAnswer && 'Short Answer'}
                                {question.type === QType.Essay && 'Essay'}
                              </span>
                              <span>•</span>
                              <span>{question.points} điểm</span>
                            </div>
                            {question.explanation && (
                              <p className="text-slate-400 text-sm ml-11 mt-2 italic">
                                Giải thích: {question.explanation}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {question.answers && question.answers.length > 0 && (
                          <div className="ml-11 grid grid-cols-2 gap-2">
                            {question.answers.map((answer, optIndex) => (
                              <div
                                key={answer.id}
                                className={`px-3 py-2 rounded text-sm ${answer.isCorrect
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                  : 'bg-slate-600/30 text-slate-400'
                                  }`}
                              >
                                {answer.isCorrect && (
                                  <CheckCircle className="w-3 h-3 inline mr-1" />
                                )}
                                {answer.answerText}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizContent
