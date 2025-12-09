import { CheckCircle, ChevronDown, Clock, Edit2, Eye, HelpCircle, Plus, Search, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '~/shared/hooks/useToast'
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog'

interface Question {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  options?: string[]
  correctAnswer: string | number
  points: number
}

interface Quiz {
  id: string
  title: string
  courseId: string
  courseName: string
  description: string
  duration: number // in minutes
  totalPoints: number
  questions: Question[]
  status: 'draft' | 'published' | 'archived'
  attempts: number
  passPercentage: number
  createdAt: string
}

const QuizContent = () => {
  const { toast } = useToast()
  const { confirm } = useConfirmDialog()
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'React Fundamentals - Chapter 1',
      courseId: '1',
      courseName: 'React Fundamentals',
      description: 'Test your knowledge of React basics and JSX',
      duration: 30,
      totalPoints: 100,
      questions: [
        {
          id: 'q1',
          question: 'What is JSX?',
          type: 'multiple-choice',
          options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'None of the above'],
          correctAnswer: 0,
          points: 10,
        },
        {
          id: 'q2',
          question: 'React is a library, not a framework.',
          type: 'true-false',
          options: ['True', 'False'],
          correctAnswer: 0,
          points: 10,
        },
      ],
      status: 'published',
      attempts: 45,
      passPercentage: 70,
      createdAt: '2025-01-10',
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Quiz',
      courseId: '2',
      courseName: 'Advanced JavaScript',
      description: 'Modern JavaScript features and syntax',
      duration: 45,
      totalPoints: 150,
      questions: [],
      status: 'draft',
      attempts: 0,
      passPercentage: 75,
      createdAt: '2025-01-12',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    courseName: '',
    description: '',
    duration: 30,
    passPercentage: 70,
    status: 'draft' as 'draft' | 'published' | 'archived',
  })

  const [questionFormData, setQuestionFormData] = useState<Question>({
    id: '',
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
  })

  const filteredQuizzes = quizzes
    .filter((quiz) => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((quiz) => selectedStatus === 'All' || quiz.status === selectedStatus)

  const handleAdd = () => {
    setEditingQuiz(null)
    setFormData({
      title: '',
      courseId: '',
      courseName: '',
      description: '',
      duration: 30,
      passPercentage: 70,
      status: 'draft',
    })
    setShowModal(true)
  }

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz)
    setFormData({
      title: quiz.title,
      courseId: quiz.courseId,
      courseName: quiz.courseName,
      description: quiz.description,
      duration: quiz.duration,
      passPercentage: quiz.passPercentage,
      status: quiz.status,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    const ok = await confirm('Are you sure you want to delete this quiz?')
    if (ok) {
      setQuizzes((prev) => prev.filter((q) => q.id !== id))
      toast.success('Quiz deleted successfully!')
    }
  }

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingQuiz) {
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === editingQuiz.id
            ? {
                ...q,
                ...formData,
                totalPoints: q.questions.reduce((sum, question) => sum + question.points, 0),
              }
            : q
        )
      )
      toast.success('Quiz updated successfully!')
    } else {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        ...formData,
        questions: [],
        totalPoints: 0,
        attempts: 0,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setQuizzes((prev) => [newQuiz, ...prev])
      toast.success('Quiz created successfully!')
    }

    setShowModal(false)
  }

  const handleManageQuestions = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setShowQuestionsModal(true)
  }

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedQuiz) return

    const newQuestion: Question = {
      ...questionFormData,
      id: Date.now().toString(),
    }

    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === selectedQuiz.id
          ? {
              ...q,
              questions: [...q.questions, newQuestion],
              totalPoints: q.totalPoints + newQuestion.points,
            }
          : q
      )
    )

    setSelectedQuiz((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
        totalPoints: prev.totalPoints + newQuestion.points,
      }
    })

    setQuestionFormData({
      id: '',
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
    })

    toast.success('Question added successfully!')
  }

  const handleDeleteQuestion = (questionId: string) => {
    if (!selectedQuiz) return

    const question = selectedQuiz.questions.find((q) => q.id === questionId)
    if (!question) return

    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === selectedQuiz.id
          ? {
              ...q,
              questions: q.questions.filter((ques) => ques.id !== questionId),
              totalPoints: q.totalPoints - question.points,
            }
          : q
      )
    )

    setSelectedQuiz((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        questions: prev.questions.filter((ques) => ques.id !== questionId),
        totalPoints: prev.totalPoints - question.points,
      }
    })

    toast.success('Question deleted successfully!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-300 border-green-500/50'
      case 'draft':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50'
      case 'archived':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50'
    }
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
              <p className="text-3xl font-bold">{quizzes.filter((q) => q.status === 'published').length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Draft</h3>
              <p className="text-3xl font-bold">{quizzes.filter((q) => q.status === 'draft').length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Total Attempts</h3>
              <p className="text-3xl font-bold">{quizzes.reduce((sum, q) => sum + q.attempts, 0)}</p>
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
                          quiz.status
                        )}`}
                      >
                        {quiz.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-3">{quiz.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-violet-400 font-medium">{quiz.courseName}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.duration} mins
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{quiz.questions.length} Questions</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{quiz.totalPoints} Points</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
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
                      <p className="text-2xl font-bold text-white">{quiz.attempts}</p>
                      <p className="text-sm text-slate-400">Attempts</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{quiz.passPercentage}%</p>
                      <p className="text-sm text-slate-400">Pass Rate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleManageQuestions(quiz)}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Manage Questions ({quiz.questions.length})
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Course <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.courseId}
                      onChange={(e) => {
                        const courseName = e.target.options[e.target.selectedIndex].text
                        setFormData((prev) => ({ ...prev, courseId: e.target.value, courseName }))
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    >
                      <option value="">Select course</option>
                      <option value="1">React Fundamentals</option>
                      <option value="2">Advanced JavaScript</option>
                      <option value="3">Node.js Backend</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, status: e.target.value as any }))
                      }
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                      min="1"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Pass Percentage
                    </label>
                    <input
                      type="number"
                      value={formData.passPercentage}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, passPercentage: Number(e.target.value) }))
                      }
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
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
                    {selectedQuiz.questions.length} Questions • {selectedQuiz.totalPoints} Points
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
                      <input
                        type="text"
                        value={questionFormData.question}
                        onChange={(e) =>
                          setQuestionFormData((prev) => ({ ...prev, question: e.target.value }))
                        }
                        placeholder="Enter your question..."
                        className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                        <select
                          value={questionFormData.type}
                          onChange={(e) =>
                            setQuestionFormData((prev) => ({
                              ...prev,
                              type: e.target.value as any,
                              options: e.target.value === 'true-false' ? ['True', 'False'] : ['', '', '', ''],
                            }))
                          }
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        >
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                          <option value="short-answer">Short Answer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Points</label>
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

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Correct Answer</label>
                        {questionFormData.type === 'short-answer' ? (
                          <input
                            type="text"
                            value={questionFormData.correctAnswer}
                            onChange={(e) =>
                              setQuestionFormData((prev) => ({ ...prev, correctAnswer: e.target.value }))
                            }
                            placeholder="Answer"
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                          />
                        ) : (
                          <select
                            value={questionFormData.correctAnswer}
                            onChange={(e) =>
                              setQuestionFormData((prev) => ({ ...prev, correctAnswer: Number(e.target.value) }))
                            }
                            className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                          >
                            {questionFormData.options?.map((_, index) => (
                              <option key={index} value={index}>
                                Option {index + 1}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    {questionFormData.type !== 'short-answer' && (
                      <div className="grid grid-cols-2 gap-3">
                        {questionFormData.options?.map((option, index) => (
                          <div key={index}>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Option {index + 1}
                            </label>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(questionFormData.options || [])]
                                newOptions[index] = e.target.value
                                setQuestionFormData((prev) => ({ ...prev, options: newOptions }))
                              }}
                              placeholder={`Option ${index + 1}`}
                              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                              disabled={questionFormData.type === 'true-false'}
                            />
                          </div>
                        ))}
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
                  {selectedQuiz.questions.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No questions yet. Add your first question above.</p>
                  ) : (
                    selectedQuiz.questions.map((question, index) => (
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
                              <h5 className="text-white font-medium">{question.question}</h5>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-400 ml-11">
                              <span className="capitalize">{question.type.replace('-', ' ')}</span>
                              <span>•</span>
                              <span>{question.points} points</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {question.options && (
                          <div className="ml-11 grid grid-cols-2 gap-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`px-3 py-2 rounded text-sm ${
                                  optIndex === question.correctAnswer
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                    : 'bg-slate-600/30 text-slate-400'
                                }`}
                              >
                                {optIndex === question.correctAnswer && (
                                  <CheckCircle className="w-3 h-3 inline mr-1" />
                                )}
                                {option}
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
