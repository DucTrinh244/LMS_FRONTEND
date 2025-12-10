import { Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useQuizAttemptMutations, useAttemptDetail } from '~/module/student/hooks/useQuizAttempt'
import { useQuizDetail } from '~/module/instructor/hooks/useQuiz'
import type { QuestionType, QuizQuestionForAttemptDto, SubmitAnswerDto } from '~/module/instructor/types/Quiz'
import { useToast } from '~/shared/hooks/useToast'
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog'

const QuizAttemptContent = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { confirm } = useConfirmDialog()
  
  const { quizDetail, loading: quizLoading } = useQuizDetail(quizId || '')
  const { startAttempt, saveAnswer, submitAttempt, isStarting, isSaving, isSubmitting } = useQuizAttemptMutations()

  const [currentAttempt, setCurrentAttempt] = useState<any>(null)
  const [attemptDetail, setAttemptDetail] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, SubmitAnswerDto>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (quizId && !currentAttempt && !quizLoading) {
      handleStartAttempt()
    }
  }, [quizId, quizLoading])

  useEffect(() => {
    if (currentAttempt?.remainingTimeSeconds) {
      setTimeRemaining(currentAttempt.remainingTimeSeconds)
    }
  }, [currentAttempt])

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeRemaining, isSubmitted])

  const handleStartAttempt = async () => {
    if (!quizId) return
    try {
      const res = await startAttempt(quizId)
      if (res.isSuccess && res.value) {
        setCurrentAttempt(res.value)
        // Initialize answers
        const initialAnswers: Record<string, SubmitAnswerDto> = {}
        res.value.questions.forEach((q) => {
          initialAnswers[q.id] = {
            questionId: q.id,
            selectedAnswerId: null,
            selectedAnswerIds: null,
            textAnswer: null,
          }
        })
        setAnswers(initialAnswers)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Không thể bắt đầu quiz')
    }
  }

  const handleAnswerChange = (questionId: string, value: any, questionType: QuestionType) => {
    setAnswers((prev) => {
      const newAnswer: SubmitAnswerDto = { questionId }
      
      if (questionType === QuestionType.MultipleChoice) {
        newAnswer.selectedAnswerIds = Array.isArray(value) ? value : [value]
      } else if (questionType === QuestionType.ShortAnswer || questionType === QuestionType.Essay) {
        newAnswer.textAnswer = value
      } else {
        newAnswer.selectedAnswerId = value
      }
      
      return { ...prev, [questionId]: newAnswer }
    })

    // Auto-save
    if (currentAttempt?.attemptId) {
      saveAnswer({
        attemptId: currentAttempt.attemptId,
        questionId,
        selectedAnswerId: questionType === QuestionType.SingleChoice || questionType === QuestionType.TrueFalse ? value : null,
        selectedAnswerIds: questionType === QuestionType.MultipleChoice ? (Array.isArray(value) ? value : [value]) : null,
        textAnswer: questionType === QuestionType.ShortAnswer || questionType === QuestionType.Essay ? value : null,
      })
    }
  }

  const handleAutoSubmit = async () => {
    if (isSubmitted || !currentAttempt) return
    await handleSubmit()
  }

  const handleSubmit = async () => {
    if (!currentAttempt) return
    
    const ok = await confirm('Bạn có chắc chắn muốn nộp bài?')
    if (!ok) return

    try {
      const submitData = {
        attemptId: currentAttempt.attemptId,
        answers: Object.values(answers),
      }
      
      const res = await submitAttempt(submitData)
      if (res.isSuccess && res.value) {
        setIsSubmitted(true)
        setShowResults(true)
        setAttemptDetail(res.value)
        toast.success('Nộp bài thành công!')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Nộp bài thất bại!')
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (quizLoading || isStarting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!currentAttempt && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Không tìm thấy quiz</p>
          </div>
        </div>
      </div>
    )
  }

  if (showResults && attemptDetail) {
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

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8">
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
                {attemptDetail.isPassed ? 'Chúc mừng!' : 'Chưa đạt'}
              </h1>
              <p className="text-slate-400 mb-4">
                Điểm số: {attemptDetail.score}/{attemptDetail.totalPoints} ({attemptDetail.percentage}%)
              </p>
              <p className={`text-lg font-semibold ${
                attemptDetail.isPassed ? 'text-green-400' : 'text-red-400'
              }`}>
                {attemptDetail.isPassed ? 'Bạn đã vượt qua bài kiểm tra!' : 'Bạn cần cải thiện để vượt qua bài kiểm tra'}
              </p>
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
      </div>
    )
  }

  const currentQuestion = currentAttempt?.questions[currentQuestionIndex]
  const totalQuestions = currentAttempt?.questions.length || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{currentAttempt?.title}</h1>
              <p className="text-slate-400">{currentAttempt?.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-bold">{formatTime(timeRemaining)}</span>
              </div>
              <p className="text-slate-400 text-sm">
                Câu {currentQuestionIndex + 1}/{totalQuestions}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 mb-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-violet-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                  {currentQuestionIndex + 1}
                </span>
                <h2 className="text-xl font-semibold text-white flex-1">
                  {currentQuestion.questionText}
                </h2>
                <span className="text-slate-400 text-sm">
                  {currentQuestion.points} điểm
                </span>
              </div>

              {currentQuestion.imageUrl && (
                <img
                  src={currentQuestion.imageUrl}
                  alt="Question"
                  className="w-full rounded-lg mb-4"
                />
              )}

              <div className="space-y-3">
                {currentQuestion.type === QuestionType.SingleChoice && (
                  <>
                    {currentQuestion.answers.map((answer) => (
                      <label
                        key={answer.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
                          answers[currentQuestion.id]?.selectedAnswerId === answer.id
                            ? 'bg-violet-500/20 border-violet-500'
                            : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={answer.id}
                          checked={answers[currentQuestion.id]?.selectedAnswerId === answer.id}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, currentQuestion.type)}
                          className="w-5 h-5 text-violet-600"
                        />
                        <span className="text-white flex-1">{answer.answerText}</span>
                      </label>
                    ))}
                  </>
                )}

                {currentQuestion.type === QuestionType.MultipleChoice && (
                  <>
                    {currentQuestion.answers.map((answer) => (
                      <label
                        key={answer.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
                          answers[currentQuestion.id]?.selectedAnswerIds?.includes(answer.id)
                            ? 'bg-violet-500/20 border-violet-500'
                            : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={answers[currentQuestion.id]?.selectedAnswerIds?.includes(answer.id) || false}
                          onChange={(e) => {
                            const current = answers[currentQuestion.id]?.selectedAnswerIds || []
                            const newValue = e.target.checked
                              ? [...current, answer.id]
                              : current.filter((id) => id !== answer.id)
                            handleAnswerChange(currentQuestion.id, newValue, currentQuestion.type)
                          }}
                          className="w-5 h-5 text-violet-600"
                        />
                        <span className="text-white flex-1">{answer.answerText}</span>
                      </label>
                    ))}
                  </>
                )}

                {currentQuestion.type === QuestionType.TrueFalse && (
                  <>
                    {currentQuestion.answers.map((answer) => (
                      <label
                        key={answer.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition ${
                          answers[currentQuestion.id]?.selectedAnswerId === answer.id
                            ? 'bg-violet-500/20 border-violet-500'
                            : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={answer.id}
                          checked={answers[currentQuestion.id]?.selectedAnswerId === answer.id}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, currentQuestion.type)}
                          className="w-5 h-5 text-violet-600"
                        />
                        <span className="text-white flex-1">{answer.answerText}</span>
                      </label>
                    ))}
                  </>
                )}

                {(currentQuestion.type === QuestionType.ShortAnswer ||
                  currentQuestion.type === QuestionType.Essay) && (
                  <textarea
                    value={answers[currentQuestion.id]?.textAnswer || ''}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value, currentQuestion.type)
                    }
                    rows={currentQuestion.type === QuestionType.Essay ? 8 : 4}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    placeholder="Nhập câu trả lời của bạn..."
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Câu trước
          </button>

          <div className="flex gap-2">
            {currentAttempt?.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  index === currentQuestionIndex
                    ? 'bg-violet-600 text-white'
                    : answers[currentAttempt.questions[index].id]?.selectedAnswerId ||
                      answers[currentAttempt.questions[index].id]?.selectedAnswerIds?.length ||
                      answers[currentAttempt.questions[index].id]?.textAnswer
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))
              }
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
            >
              Câu tiếp
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizAttemptContent

