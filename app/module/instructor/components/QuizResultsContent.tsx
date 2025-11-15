import { Award, CheckCircle, ChevronDown, Clock, Eye, Search, TrendingDown, TrendingUp, XCircle } from 'lucide-react'
import { useState } from 'react'

interface QuizResult {
  id: string
  studentName: string
  studentEmail: string
  quizTitle: string
  courseName: string
  score: number
  totalPoints: number
  percentage: number
  timeSpent: number // in minutes
  submittedAt: string
  status: 'passed' | 'failed'
  attempts: number
}

interface QuizAnalytics {
  quizId: string
  quizTitle: string
  totalAttempts: number
  averageScore: number
  passRate: number
  highestScore: number
  lowestScore: number
}

const QuizResultsContent = () => {
  const [results, setResults] = useState<QuizResult[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentEmail: 'john@example.com',
      quizTitle: 'React Fundamentals - Chapter 1',
      courseName: 'React Fundamentals',
      score: 85,
      totalPoints: 100,
      percentage: 85,
      timeSpent: 25,
      submittedAt: '2025-01-15 14:30',
      status: 'passed',
      attempts: 1,
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentEmail: 'jane@example.com',
      quizTitle: 'React Fundamentals - Chapter 1',
      courseName: 'React Fundamentals',
      score: 65,
      totalPoints: 100,
      percentage: 65,
      timeSpent: 28,
      submittedAt: '2025-01-15 15:45',
      status: 'failed',
      attempts: 2,
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentEmail: 'mike@example.com',
      quizTitle: 'JavaScript ES6+ Quiz',
      courseName: 'Advanced JavaScript',
      score: 140,
      totalPoints: 150,
      percentage: 93,
      timeSpent: 40,
      submittedAt: '2025-01-14 10:20',
      status: 'passed',
      attempts: 1,
    },
    {
      id: '4',
      studentName: 'Sarah Wilson',
      studentEmail: 'sarah@example.com',
      quizTitle: 'JavaScript ES6+ Quiz',
      courseName: 'Advanced JavaScript',
      score: 120,
      totalPoints: 150,
      percentage: 80,
      timeSpent: 42,
      submittedAt: '2025-01-14 11:15',
      status: 'passed',
      attempts: 1,
    },
  ])

  const [analytics] = useState<QuizAnalytics[]>([
    {
      quizId: '1',
      quizTitle: 'React Fundamentals - Chapter 1',
      totalAttempts: 45,
      averageScore: 75.5,
      passRate: 78,
      highestScore: 100,
      lowestScore: 45,
    },
    {
      quizId: '2',
      quizTitle: 'JavaScript ES6+ Quiz',
      totalAttempts: 38,
      averageScore: 82.3,
      passRate: 85,
      highestScore: 148,
      lowestScore: 60,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null)

  const filteredResults = results
    .filter((result) =>
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.quizTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((result) => selectedQuiz === 'All' || result.quizTitle === selectedQuiz)
    .filter((result) => selectedStatus === 'All' || result.status === selectedStatus)

  const uniqueQuizzes = Array.from(new Set(results.map((r) => r.quizTitle)))

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
