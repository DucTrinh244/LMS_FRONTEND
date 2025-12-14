import { Award, CheckCircle, ChevronDown, Clock, Eye, Search, TrendingDown, TrendingUp, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { quizService } from '~/module/instructor/services/QuizApi'
import type { QuizAttemptResultDto, QuizStatsDto, InstructorQuizListItemDto } from '~/module/instructor/types/Quiz'
import { useToast } from '~/shared/hooks/useToast'

const QuizResultsContent = () => {
  const { toast } = useToast()
  
  // Fetch instructor's quizzes
  const {
    data: quizzes = [],
    isLoading: quizzesLoading,
    error: quizzesError
  } = useQuery<InstructorQuizListItemDto[]>({
    queryKey: ['instructor-quizzes'],
    queryFn: async () => {
      const res = await quizService.getMyQuizzes()
      if (res.isSuccess && res.value) {
        return res.value
      }
      throw new Error(res.error?.message || 'Failed to fetch quizzes')
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2
  })

  // Fetch stats for all quizzes
  const quizStatsQueries = useQuery({
    queryKey: ['quiz-stats', quizzes.map(q => q.id)],
    queryFn: async () => {
      const statsPromises = quizzes.map(async (quiz) => {
        try {
          const res = await quizService.getQuizStats(quiz.id)
          if (res.isSuccess && res.value) {
            return { quizId: quiz.id, stats: res.value }
          }
          return null
        } catch (error) {
          console.error(`Error fetching stats for quiz ${quiz.id}:`, error)
          return null
        }
      })
      const results = await Promise.all(statsPromises)
      return results.filter(Boolean) as Array<{ quizId: string; stats: QuizStatsDto }>
    },
    enabled: quizzes.length > 0,
    staleTime: 2 * 60 * 1000
  })

  // Fetch attempts for all quizzes
  const quizAttemptsQueries = useQuery({
    queryKey: ['quiz-attempts', quizzes.map(q => q.id)],
    queryFn: async () => {
      const attemptsPromises = quizzes.map(async (quiz) => {
        try {
          const res = await quizService.getQuizAttempts(quiz.id)
          if (res.isSuccess && res.value) {
            return res.value.map(attempt => ({
              ...attempt,
              quizTitle: quiz.title,
              courseName: quiz.courseTitle
            }))
          }
          return []
        } catch (error) {
          console.error(`Error fetching attempts for quiz ${quiz.id}:`, error)
          return []
        }
      })
      const results = await Promise.all(attemptsPromises)
      return results.flat()
    },
    enabled: quizzes.length > 0,
    staleTime: 2 * 60 * 1000
  })

  // Transform data for display
  const analytics = useMemo(() => {
    if (!quizStatsQueries.data) return []
    return quizStatsQueries.data.map(({ stats }) => ({
      quizId: stats.quizId,
      quizTitle: stats.title,
      totalAttempts: stats.totalAttempts,
      averageScore: stats.averageScore,
      passRate: stats.passRate,
      highestScore: stats.highestScore,
      lowestScore: stats.lowestScore
    }))
  }, [quizStatsQueries.data])

  const results = useMemo(() => {
    if (!quizAttemptsQueries.data) return []
    return quizAttemptsQueries.data.map((attempt) => ({
      id: attempt.id,
      studentName: attempt.userName,
      studentEmail: '', // Not available in API
      quizTitle: attempt.quizTitle,
      courseName: (attempt as any).courseName || '',
      score: attempt.score,
      totalPoints: attempt.totalPoints,
      percentage: attempt.percentage,
      timeSpent: Math.round(attempt.timeSpentSeconds / 60), // Convert to minutes
      submittedAt: attempt.completedAt 
        ? new Date(attempt.completedAt).toLocaleString('vi-VN')
        : new Date(attempt.startedAt).toLocaleString('vi-VN'),
      status: attempt.isPassed ? 'passed' : 'failed' as 'passed' | 'failed',
      attempts: 1 // Not available in API response
    }))
  }, [quizAttemptsQueries.data])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedResult, setSelectedResult] = useState<typeof results[0] | null>(null)

  const filteredResults = useMemo(() => {
    return results
      .filter((result) =>
        result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.quizTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((result) => selectedQuiz === 'All' || result.quizTitle === selectedQuiz)
      .filter((result) => selectedStatus === 'All' || result.status === selectedStatus)
  }, [results, searchQuery, selectedQuiz, selectedStatus])

  const uniqueQuizzes = useMemo(() => {
    return Array.from(new Set(results.map((r) => r.quizTitle)))
  }, [results])

  const isLoading = quizzesLoading || quizStatsQueries.isLoading || quizAttemptsQueries.isLoading
  const hasError = quizzesError || quizStatsQueries.error || quizAttemptsQueries.error

  const handleViewDetails = (result: QuizResult) => {
    setSelectedResult(result)
    setShowDetailModal(true)
  }

  const getStatusBadge = (status: string) => {
    if (status === 'passed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/50">
          <CheckCircle className="w-3 h-3" />
          Passed
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/50">
        <XCircle className="w-3 h-3" />
        Failed
      </span>
    )
  }

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 70) return 'text-emerald-400'
    if (percentage >= 50) return 'text-amber-400'
    return 'text-red-400'
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Đang tải kết quả quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-red-700 shadow-md p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Lỗi tải dữ liệu</h3>
                <p className="text-red-400">
                  {hasError instanceof Error ? hasError.message : 'Không thể tải kết quả quiz'}
                </p>
                <button
                  onClick={() => {
                    quizStatsQueries.refetch()
                    quizAttemptsQueries.refetch()
                  }}
                  className="mt-4 bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-700 transition"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
            <Award className="w-7 h-7" />
            Quiz Results & Analytics
          </h1>
          <p className="text-slate-400">View student performance and quiz statistics</p>
        </div>

        {/* Analytics Cards */}
        {analytics.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-12 mb-8">
            <div className="text-center">
              <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Chưa có quiz nào</h3>
              <p className="text-slate-400">Bạn chưa tạo quiz nào hoặc chưa có học viên làm bài</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {analytics.map((quiz) => (
            <div
              key={quiz.quizId}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{quiz.quizTitle}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Total Attempts</p>
                  <p className="text-2xl font-bold text-white">{quiz.totalAttempts}</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-violet-400">{quiz.averageScore.toFixed(1)}%</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Pass Rate</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-green-400">{quiz.passRate}%</p>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Score Range</p>
                  <p className="text-lg font-bold text-white">
                    {quiz.lowestScore} - {quiz.highestScore}
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Total Submissions</h3>
              <p className="text-3xl font-bold">{results.length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Passed</h3>
              <p className="text-3xl font-bold">{results.filter((r) => r.status === 'passed').length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Failed</h3>
              <p className="text-3xl font-bold">{results.filter((r) => r.status === 'failed').length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Avg Score</h3>
              <p className="text-3xl font-bold">
                {(results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student or quiz name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white placeholder-slate-500"
              />
            </div>
            <div className="relative">
              <select
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
              >
                <option value="All">All Quizzes</option>
                {uniqueQuizzes.map((quiz) => (
                  <option key={quiz} value={quiz}>
                    {quiz}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600">
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Student</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Quiz</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Score</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Percentage</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Time Spent</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">No results found</p>
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((result) => (
                    <tr
                      key={result.id}
                      className="border-b border-slate-600 hover:bg-slate-700/50 transition"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-white">{result.studentName}</p>
                          <p className="text-sm text-slate-400">{result.studentEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-white">{result.quizTitle}</p>
                          <p className="text-sm text-slate-400">{result.courseName}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-white font-bold">
                          {result.score}/{result.totalPoints}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-2xl font-bold ${getPercentageColor(result.percentage)}`}>
                          {result.percentage}%
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>{result.timeSpent} mins</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(result.status)}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewDetails(result)}
                          className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedResult && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full">
              <div className="border-b border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white">Quiz Result Details</h3>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Student</p>
                    <p className="text-white font-semibold">{selectedResult.studentName}</p>
                    <p className="text-sm text-slate-400">{selectedResult.studentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Quiz</p>
                    <p className="text-white font-semibold">{selectedResult.quizTitle}</p>
                    <p className="text-sm text-slate-400">{selectedResult.courseName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Score</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedResult.score}/{selectedResult.totalPoints}
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Percentage</p>
                    <p className={`text-2xl font-bold ${getPercentageColor(selectedResult.percentage)}`}>
                      {selectedResult.percentage}%
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Time Spent</p>
                    <p className="text-2xl font-bold text-white">{selectedResult.timeSpent} min</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Status</p>
                    {getStatusBadge(selectedResult.status)}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Submitted At</p>
                    <p className="text-white font-medium">{selectedResult.submittedAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Attempts</p>
                    <p className="text-white font-medium">{selectedResult.attempts}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 p-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizResultsContent
