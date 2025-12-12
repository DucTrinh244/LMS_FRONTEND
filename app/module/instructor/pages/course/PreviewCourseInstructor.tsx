import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  Clock,
  FileText,
  HelpCircle,
  Play,
  Star,
  Users,
  Video,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useCourseDetails } from '~/module/instructor/hooks/useCourseInstructor'
import { courseInstructorService } from '~/module/instructor/services/CourseInstructorApi'
import { quizService } from '~/module/instructor/services/QuizApi'
import { useToast } from '~/shared/hooks/useToast'

interface Chapter {
  id: string
  title: string
  description: string | null
  sortOrder: number
  isPublished: boolean
}

interface Lesson {
  id: string
  chapterId?: string
  title: string
  content: string
  videoUrl?: string
  duration: number // in minutes
  order: number
  type: number // 1=Video, 2=Article, 3=Quiz, 4=Assignment
  isPreview: boolean
}

interface Quiz {
  id: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  questionCount: number
  totalPoints: number
  isPublished: boolean
}

const PreviewCourseInstructor = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const courseDetailsQuery = useCourseDetails(courseId || '')
  // Handle API response format - could be direct course object or wrapped in BaseResponse
  const courseData = courseDetailsQuery.data
  const course = courseData?.isSuccess ? courseData.value : courseData?.course || courseData || null
  const courseLoading = courseDetailsQuery.isLoading

  const [chapters, setChapters] = useState<Chapter[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (courseId) {
      loadCourseContent()
    }
  }, [courseId])

  const loadCourseContent = async () => {
    if (!courseId) return

    try {
      setLoading(true)

      // Load chapters
      const chaptersData = await courseInstructorService.getChaptersByCourse(courseId)
      const chaptersList = chaptersData?.isSuccess ? chaptersData.value : chaptersData?.chapters ?? chaptersData ?? []
      setChapters(chaptersList.sort((a: Chapter, b: Chapter) => (a.sortOrder || 0) - (b.sortOrder || 0)))

      // Load lessons
      const lessonsData = await courseInstructorService.getLessonsByCourse(courseId)
      const lessonsList = lessonsData?.isSuccess ? lessonsData.value : lessonsData?.lessons ?? lessonsData ?? []
      const mappedLessons: Lesson[] = lessonsList.map((lesson: any) => ({
        id: lesson.id,
        chapterId: lesson.chapterId,
        title: lesson.title,
        content: lesson.content || '',
        videoUrl: lesson.videoUrl,
        duration: lesson.videoDuration ? Math.round(lesson.videoDuration / 60) : 0,
        order: lesson.sortOrder ?? lesson.order ?? 0,
        type: lesson.type ?? 1,
        isPreview: lesson.isPreview ?? false,
      }))
      setLessons(mappedLessons.sort((a: Lesson, b: Lesson) => (a.order || 0) - (b.order || 0)))

      // Load quizzes
      const quizzesData = await quizService.getQuizzesByCourse(courseId, true) // Only published
      if (quizzesData.isSuccess && quizzesData.value) {
        setQuizzes(quizzesData.value)
      }
    } catch (error: any) {
      toast.error(error?.message || 'Không thể tải nội dung khóa học')
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (chapterId: string) => {
    setExpandedSections((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    )
  }

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 1: // Video
        return <Video className="w-4 h-4 text-cyan-400" />
      case 2: // Article
        return <FileText className="w-4 h-4 text-indigo-400" />
      case 3: // Quiz
        return <HelpCircle className="w-4 h-4 text-yellow-400" />
      case 4: // Assignment
        return <ClipboardList className="w-4 h-4 text-orange-400" />
      default:
        return <BookOpen className="w-4 h-4 text-purple-400" />
    }
  }

  const getTypeName = (type: number): string => {
    switch (type) {
      case 1:
        return 'Video'
      case 2:
        return 'Article'
      case 3:
        return 'Quiz'
      case 4:
        return 'Assignment'
      default:
        return 'Unknown'
    }
  }

  const getLessonsByChapter = (chapterId: string) => {
    return lessons.filter((lesson) => lesson.chapterId === chapterId).sort((a, b) => a.order - b.order)
  }

  const getLessonsWithoutChapter = () => {
    return lessons.filter((lesson) => !lesson.chapterId).sort((a, b) => a.order - b.order)
  }

  if (courseLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải khóa học...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Không tìm thấy khóa học</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-violet-400 hover:text-violet-300"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0)
  const totalLessons = lessons.length
  const totalQuizzes = quizzes.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-900/50 via-purple-900/50 to-slate-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Quay lại
          </button>

          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <div className="mb-2">
                <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/50">
                  <span className="w-2 h-2 bg-violet-400 rounded-full" />
                  Preview Mode
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-slate-300 text-sm mb-3">{course.shortDescription || course.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                  <BookOpen className="w-3 h-3 text-violet-400" />
                  <span className="text-xs">{totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                  <Clock className="w-3 h-3 text-violet-400" />
                  <span className="text-xs">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                  <Users className="w-3 h-3 text-violet-400" />
                  <span className="text-xs">{course.students || 0} students</span>
                </div>
                {totalQuizzes > 0 && (
                  <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                    <HelpCircle className="w-3 h-3 text-violet-400" />
                    <span className="text-xs">{totalQuizzes} Quizzes</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {course.instructorName && (
                  <>
                    <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {course.instructorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{course.instructorName}</p>
                      <p className="text-xs text-slate-400">Instructor</p>
                    </div>
                  </>
                )}
                {(course.rating || course.reviews) && (
                  <div className="flex items-center gap-1 ml-2">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                    <Star className="w-3 h-3 text-amber-400" />
                    <span className="ml-1 font-semibold text-xs text-white">
                      {(course.rating || 0).toFixed(1)} ({course.reviews || 0})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-2 shadow-md group">
              <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-violet-600/50 to-purple-600/50 p-4">
                <div className="flex items-center justify-center relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-lg group-hover:bg-black/20 transition"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition">
                      <Play className="w-5 h-5 text-violet-600 fill-violet-600 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md mb-6">
              <div className="border-b border-slate-700 px-5">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 font-semibold text-sm border-b-2 ${activeTab === 'overview'
                    ? 'border-violet-600 text-violet-400'
                    : 'border-transparent text-slate-300 hover:text-violet-400'
                    } transition`}
                >
                  Overview
                </button>
              </div>

              <div className="p-5">
                {/* Course Description */}
                {course.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Course Description</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{course.description}</p>
                  </div>
                )}

                {/* What you'll learn */}
                {course.objectives && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">What you'll learn</h3>
                    <ul className="space-y-2">
                      {course.objectives
                        .split('\n')
                        .filter((line: string) => line.trim())
                        .map((objective: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{objective.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {course.requirements && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements
                        .split('\n')
                        .filter((line: string) => line.trim())
                        .map((requirement: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{requirement.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md mb-6">
              <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Course Content</h3>
                <div className="text-xs text-slate-400">
                  {totalLessons} Lessons <span className="text-violet-400 ml-2">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                </div>
              </div>

              <div className="divide-y divide-slate-700">
                {/* Lessons grouped by chapters */}
                {chapters.map((chapter) => {
                  const chapterLessons = getLessonsByChapter(chapter.id)
                  if (chapterLessons.length === 0) return null

                  return (
                    <div key={chapter.id}>
                      <button
                        onClick={() => toggleSection(chapter.id)}
                        className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-700 transition"
                      >
                        <span className="font-semibold text-white text-sm">{chapter.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{chapterLessons.length} lessons</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-300 transition ${expandedSections.includes(chapter.id) ? 'rotate-180' : ''
                              }`}
                          />
                        </div>
                      </button>
                      {expandedSections.includes(chapter.id) && (
                        <div className="px-5 py-3 bg-slate-700/50 space-y-2">
                          {chapterLessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 p-2 hover:bg-slate-600/50 rounded transition"
                            >
                              {getTypeIcon(lesson.type)}
                              <div className="flex-1">
                                <p className="text-sm text-white">{lesson.title}</p>
                                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                  <span>{getTypeName(lesson.type)}</span>
                                  {lesson.duration > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{lesson.duration} min</span>
                                    </>
                                  )}
                                  {lesson.isPreview && (
                                    <>
                                      <span>•</span>
                                      <span className="text-green-400">Free Preview</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Lessons without chapter */}
                {getLessonsWithoutChapter().length > 0 && (
                  <div>
                    <div className="px-5 py-3 bg-slate-700/30">
                      <span className="font-semibold text-white text-sm">Other Lessons</span>
                    </div>
                    <div className="px-5 py-3 bg-slate-700/50 space-y-2">
                      {getLessonsWithoutChapter().map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 p-2 hover:bg-slate-600/50 rounded transition"
                        >
                          {getTypeIcon(lesson.type)}
                          <div className="flex-1">
                            <p className="text-sm text-white">{lesson.title}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span>{getTypeName(lesson.type)}</span>
                              {lesson.duration > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{lesson.duration} min</span>
                                </>
                              )}
                              {lesson.isPreview && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-400">Free Preview</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quizzes */}
                {quizzes.length > 0 && (
                  <div>
                    <div className="px-5 py-3 bg-slate-700/30">
                      <span className="font-semibold text-white text-sm">Quizzes</span>
                    </div>
                    <div className="px-5 py-3 bg-slate-700/50 space-y-2">
                      {quizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex items-center gap-3 p-2 hover:bg-slate-600/50 rounded transition"
                        >
                          <HelpCircle className="w-4 h-4 text-yellow-400" />
                          <div className="flex-1">
                            <p className="text-sm text-white">{quiz.title}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span>{quiz.questionCount} questions</span>
                              <span>•</span>
                              <span>{quiz.totalPoints} points</span>
                              {quiz.timeLimit > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{quiz.timeLimit} min</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {(course.price || 0) === 0 ? 'Free' : `$${course.price || 0}`}
                </div>
                {(course.price || 0) > 0 && (
                  <div className="text-sm text-slate-400 line-through">$199.99</div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Includes:</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m Content</span>
                  </div>
                  {totalQuizzes > 0 && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{totalQuizzes} Quizzes</span>
                    </div>
                  )}
                  {course.certificateEnabled && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Award className="w-4 h-4 text-green-400" />
                      <span>Certificate of Completion</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <div className="text-xs text-slate-400 text-center">
                  <p className="mb-2">This is a preview of how students will see your course</p>
                  <button
                    onClick={() => navigate(-1)}
                    className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition text-sm"
                  >
                    Back to Course Management
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewCourseInstructor

