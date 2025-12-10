import { Calendar, CheckCircle, Clock, Eye, HelpCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { quizService } from '~/module/instructor/services/QuizApi'
import type { QuizAttemptSummaryDto } from '~/module/instructor/types/Quiz'
import { useToast } from '~/shared/hooks/useToast'

const MyQuizAttemptsContent = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptSummaryDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentAttempts()
  }, [])

  const loadRecentAttempts = async () => {
    try {
      setLoading(true)
      const res = await quizService.getMyRecentAttempts(50)
      if (res.isSuccess && res.value) {
        setQuizAttempts(res.value)
      } else {
        toast.error(res.error?.message || 'Không thể tải lịch sử attempts')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (attemptId: string) => {
    window.location.href = `/student/quiz/attempt/${attemptId}`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center text-white py-12">
          <p>Đang tải lịch sử attempts...</p>
        </div>
      </div>
    )
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 70) return 'text-violet-400'
    return 'text-orange-400'
  }

  const getScoreBg = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-600/20'
    if (percentage >= 70) return 'bg-violet-600/20'
    return 'bg-orange-600/20'
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} phút`
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{quizAttempts.length}</div>
              <div className="text-sm font-medium text-slate-300">Total Attempts</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {quizAttempts.length > 0
                  ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / quizAttempts.length)
                  : 0}%
              </div>
              <div className="text-sm font-medium text-slate-300">Average Score</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {formatTime(quizAttempts.reduce((acc, q) => acc + q.timeSpentSeconds, 0))}
              </div>
              <div className="text-sm font-medium text-slate-300">Total Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Attempts List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">Quiz Attempts History</h3>
        <div className="space-y-4">
          {quizAttempts.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Chưa có Attempt nào</h3>
              <p className="text-slate-400">Bạn chưa làm quiz nào</p>
            </div>
          ) : (
            quizAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">Quiz Attempt</h4>
                      {attempt.isPassed && (
                        <span className="bg-green-600/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                          Đã đạt
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(attempt.timeSpentSeconds)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        <span>{attempt.score}/{attempt.totalPoints} điểm</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getScoreBg(attempt.percentage)}`}
                        style={{ width: `${attempt.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-center ${getScoreColor(attempt.percentage)}`}>
                      <div className="text-3xl font-bold">{attempt.percentage}%</div>
                      <div className="text-xs text-slate-400">Score</div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(attempt.id)}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyQuizAttemptsContent;