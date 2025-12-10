import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useParams, useNavigate } from 'react-router'
import { useAttemptDetail } from '~/module/student/hooks/useQuizAttempt'

const QuizAttemptDetailContent = () => {
  const { attemptId } = useParams<{ attemptId: string }>()
  const navigate = useNavigate()
  const { attemptDetail, loading } = useAttemptDetail(attemptId || '')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải chi tiết attempt...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!attemptDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Không tìm thấy attempt</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 mb-6">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              attemptDetail.isPassed ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {attemptDetail.isPassed ? (
                <CheckCircle className="w-12 h-12 text-green-400" />
              ) : (
                <XCircle className="w-12 h-12 text-red-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {attemptDetail.quizTitle}
            </h1>
            <p className="text-slate-400 mb-4">
              Điểm số: {attemptDetail.score}/{attemptDetail.totalPoints} ({attemptDetail.percentage}%)
            </p>
            <p className={`text-lg font-semibold ${
              attemptDetail.isPassed ? 'text-green-400' : 'text-red-400'
            }`}>
              {attemptDetail.isPassed ? 'Bạn đã vượt qua bài kiểm tra!' : 'Bạn cần cải thiện để vượt qua bài kiểm tra'}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Thời gian: {Math.floor(attemptDetail.timeSpentSeconds / 60)} phút
              </span>
              <span>•</span>
              <span>
                Hoàn thành: {new Date(attemptDetail.completedAt || attemptDetail.startedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {attemptDetail.answers.map((answer, index) => (
            <div
              key={answer.id}
              className={`p-4 rounded-lg border ${
                answer.isCorrect
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-red-500/10 border-red-500/50'
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">{answer.questionText}</p>
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <span className="font-semibold">Câu trả lời của bạn: </span>
                      {answer.selectedAnswerText || answer.textAnswer || 'Chưa trả lời'}
                    </p>
                    {!answer.isCorrect && answer.correctAnswerText && (
                      <p className="text-green-300">
                        <span className="font-semibold">Đáp án đúng: </span>
                        {answer.correctAnswerText}
                      </p>
                    )}
                    {answer.explanation && (
                      <p className="text-slate-400 text-sm italic">{answer.explanation}</p>
                    )}
                    <p className="text-slate-400 text-sm">
                      Điểm: {answer.pointsEarned}/{answer.maxPoints}
                    </p>
                  </div>
                </div>
                {answer.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizAttemptDetailContent

