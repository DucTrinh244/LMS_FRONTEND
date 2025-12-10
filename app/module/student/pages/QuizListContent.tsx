import { Clock, HelpCircle, BookOpen, Play, Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useQuizzes } from '~/module/instructor/hooks/useQuiz'
import { useMyAttempts } from '~/module/student/hooks/useQuizAttempt'
import type { QuizListDto } from '~/module/instructor/types/Quiz'
import { useToast } from '~/shared/hooks/useToast'

interface QuizListContentProps {
  courseId?: string
}

const QuizListContent: React.FC<QuizListContentProps> = ({ courseId }) => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { quizzes, loading } = useQuizzes(courseId, true) // Only published quizzes

  const handleStartQuiz = (quizId: string) => {
    navigate(`/student/quiz/${quizId}/attempt`)
  }

  const handleViewAttempts = (quizId: string) => {
    // Navigate to My Quiz Attempts page and filter by quiz
    navigate('/student')
    // Could add filter functionality later
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải danh sách quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <HelpCircle className="w-7 h-7" />
            Danh sách Quiz
          </h1>
          <p className="text-slate-400">Chọn quiz để bắt đầu làm bài</p>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
            <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Chưa có Quiz nào</h3>
            <p className="text-slate-400">Hiện tại chưa có quiz nào được xuất bản</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {quizzes.map((quiz: QuizListDto) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onStart={() => handleStartQuiz(quiz.id)}
                onViewAttempts={() => handleViewAttempts(quiz.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface QuizCardProps {
  quiz: QuizListDto
  onStart: () => void
  onViewAttempts: () => void
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart, onViewAttempts }) => {
  const { attempts, loading } = useMyAttempts(quiz.id)

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
            {quiz.isPublished && (
              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded border border-green-500/50">
                Đã xuất bản
              </span>
            )}
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
            <span className="text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              {quiz.questionCount} câu hỏi
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">{quiz.totalPoints} điểm</span>
          </div>
          {loading ? (
            <p className="text-slate-400 text-sm mt-2">Đang tải...</p>
          ) : attempts.length > 0 ? (
            <div className="mt-3 flex items-center gap-4">
              <p className="text-slate-400 text-sm">
                Đã làm: {attempts.length} lần
              </p>
              <p className="text-slate-400 text-sm">
                Điểm cao nhất: {Math.max(...attempts.map((a) => a.percentage))}%
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
        >
          <Play className="w-4 h-4" />
          Bắt đầu làm bài
        </button>
        {attempts.length > 0 && (
          <button
            onClick={onViewAttempts}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition"
          >
            <Eye className="w-4 h-4" />
            Xem lịch sử ({attempts.length})
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizListContent

