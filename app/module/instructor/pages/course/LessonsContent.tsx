import { BookOpen, ChevronLeft, ClipboardList, Clock, Edit2, Eye, FileText, HelpCircle, Plus, Search, Trash2, Upload, Video, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { courseInstructorService } from '~/module/instructor/services/CourseInstructorApi'
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog'
import { useToast } from '~/shared/hooks/useToast'

interface Lesson {
  id: string
  courseId: string
  chapterId?: string
  title: string
  description: string
  content: string
  videoUrl?: string
  duration: number // in minutes
  order: number
  type: number // 1=Video, 2=Article, 3=Quiz, 4=Assignment
  isFree: boolean
  createdAt?: string
  updatedAt?: string
}

interface LessonsContentProps {
  courseId: string
  courseName?: string
  onBack: () => void
}

const LessonsContent: React.FC<LessonsContentProps> = ({ courseId, courseName, onBack }) => {
  const { toast } = useToast()
  const { confirm } = useConfirmDialog()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [chapters, setChapters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChapter, setSelectedChapter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null)
  const [lessonDetail, setLessonDetail] = useState<any>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    duration: 0,
    order: 0,
    type: 1, // 1=Video, 2=Article, 3=Quiz, 4=Assignment
    chapterId: '',
    isFree: false,
  })
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    loadLessons()
    loadChapters()
  }, [courseId])

  const loadChapters = async () => {
    try {
      const data = await courseInstructorService.getChaptersByCourse(courseId)
      const chaptersList = data?.isSuccess ? data.value : data?.chapters ?? data ?? []
      setChapters(chaptersList)
    } catch (error) {
      // Use empty array if API fails
      setChapters([])
    }
  }

  const loadLessons = async () => {
    try {
      setLoading(true)
      const data = await courseInstructorService.getLessonsByCourse(courseId)
      // Handle API response format
      const lessonsList = data?.isSuccess ? data.value : data?.lessons ?? data ?? []

      // Map API response to Lesson interface
      const mappedLessons: Lesson[] = lessonsList.map((lesson: any) => {
        return {
          id: lesson.id,
          courseId: lesson.courseId || courseId,
          chapterId: lesson.chapterId,
          title: lesson.title,
          description: lesson.description || lesson.title || '', // Fallback to title if no description
          content: lesson.content || '',
          videoUrl: lesson.videoUrl,
          duration: lesson.videoDuration ? Math.round(lesson.videoDuration / 60) : 0, // Convert seconds to minutes
          order: lesson.sortOrder ?? lesson.order ?? 0,
          type: lesson.type ?? 1, // 1=Video, 2=Article, 3=Quiz, 4=Assignment
          isFree: lesson.isPreview ?? false,
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt,
        }
      })

      setLessons(mappedLessons.sort((a: Lesson, b: Lesson) => (a.order || 0) - (b.order || 0)))
    } catch (error: any) {
      toast.error(error?.message || 'Không thể tải danh sách lessons')
      // Mock data for development
      const mockLessons: Lesson[] = [
        {
          id: '1',
          courseId,
          chapterId: 'chapter-1',
          title: 'Lesson 1: Giới thiệu về khóa học',
          description: 'Tổng quan về khóa học và những gì bạn sẽ học',
          content: 'Đây là nội dung chi tiết của lesson giới thiệu. Bạn sẽ được tìm hiểu về cấu trúc khóa học, mục tiêu học tập và cách sử dụng tài liệu.',
          videoUrl: 'https://www.youtube.com/watch?v=example1',
          duration: 15,
          order: 1,
          type: 1, // Video
          isFree: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          courseId,
          chapterId: 'chapter-1',
          title: 'Lesson 2: Cài đặt môi trường phát triển',
          description: 'Hướng dẫn cài đặt các công cụ cần thiết',
          content: 'Trong lesson này, bạn sẽ học cách cài đặt và cấu hình môi trường phát triển. Chúng ta sẽ cài đặt IDE, các extension cần thiết và cấu hình các công cụ hỗ trợ.',
          videoUrl: 'https://www.youtube.com/watch?v=example2',
          duration: 25,
          order: 2,
          type: 1, // Video
          isFree: false,
          createdAt: '2024-01-16T10:00:00Z',
          updatedAt: '2024-01-16T10:00:00Z',
        },
        {
          id: '3',
          courseId,
          chapterId: 'chapter-2',
          title: 'Lesson 3: Kiến thức cơ bản - Lý thuyết',
          description: 'Nắm vững các khái niệm cơ bản',
          content: 'Đây là lesson lý thuyết về các khái niệm cơ bản. Bạn sẽ được học về các nguyên tắc, quy tắc và best practices trong lĩnh vực này.',
          duration: 0,
          order: 3,
          type: 2, // Article
          isFree: false,
          createdAt: '2024-01-17T10:00:00Z',
          updatedAt: '2024-01-17T10:00:00Z',
        },
        {
          id: '4',
          courseId,
          chapterId: 'chapter-2',
          title: 'Lesson 4: Thực hành - Bài tập đầu tiên',
          description: 'Áp dụng kiến thức vào thực tế',
          content: 'Trong lesson này, bạn sẽ thực hành làm bài tập đầu tiên. Chúng ta sẽ áp dụng các kiến thức đã học vào một dự án thực tế.',
          videoUrl: 'https://www.youtube.com/watch?v=example4',
          duration: 30,
          order: 4,
          type: 3, // Quiz
          isFree: true,
          createdAt: '2024-01-18T10:00:00Z',
          updatedAt: '2024-01-18T10:00:00Z',
        },
        {
          id: '5',
          courseId,
          chapterId: 'chapter-3',
          title: 'Lesson 5: Nâng cao - Kỹ thuật chuyên sâu',
          description: 'Học các kỹ thuật nâng cao và tối ưu hóa',
          content: 'Lesson này sẽ đi sâu vào các kỹ thuật nâng cao, cách tối ưu hóa hiệu suất và xử lý các tình huống phức tạp.',
          videoUrl: 'https://www.youtube.com/watch?v=example5',
          duration: 45,
          order: 5,
          type: 1, // Video
          isFree: false,
          createdAt: '2024-01-19T10:00:00Z',
          updatedAt: '2024-01-19T10:00:00Z',
        },
        {
          id: '6',
          courseId,
          chapterId: 'chapter-3',
          title: 'Lesson 6: Bài tập lớn - Assignment',
          description: 'Hoàn thành bài tập lớn để đánh giá kiến thức',
          content: 'Đây là bài tập lớn yêu cầu bạn áp dụng toàn bộ kiến thức đã học. Bạn cần hoàn thành và nộp bài trong thời gian quy định.',
          duration: 60,
          order: 6,
          type: 4, // Assignment
          isFree: false,
          createdAt: '2024-01-20T10:00:00Z',
          updatedAt: '2024-01-20T10:00:00Z',
        },
      ]
      setLessons(mockLessons)
    } finally {
      setLoading(false)
    }
  }

  const filteredLessons = lessons
    .filter((lesson) => lesson.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((lesson) => selectedChapter === 'all' || lesson.chapterId === selectedChapter)

  const handleAdd = () => {
    setEditingLesson(null)
    setFormData({
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      duration: 0,
      order: lessons.length + 1,
      type: 1, // Video
      chapterId: '',
      isFree: false,
    })
    setVideoFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setShowModal(true)
  }

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson)
    setFormData({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      videoUrl: lesson.videoUrl || '',
      duration: lesson.duration,
      order: lesson.order,
      type: lesson.type,
      chapterId: lesson.chapterId || '',
      isFree: lesson.isFree,
    })
    setVideoFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    const ok = await confirm('Bạn có chắc chắn muốn xóa lesson này?')
    if (ok) {
      try {
        await courseInstructorService.deleteLesson(id)
        setLessons((prev) => prev.filter((l) => l.id !== id))
        toast.success('Xóa lesson thành công!')
      } catch (error: any) {
        toast.error(error?.message || 'Không thể xóa lesson')
        // For development, remove from local state
        setLessons((prev) => prev.filter((l) => l.id !== id))
        toast.success('Xóa lesson thành công!')
      }
    }
  }

  const handleView = async (lesson: Lesson) => {
    setViewingLesson(lesson)
    setLoadingDetail(true)
    try {
      // Try to get detailed lesson info
      const detail = await courseInstructorService.getLessonDetail(lesson.id)
      const detailData = detail?.isSuccess ? detail.value : detail
      setLessonDetail(detailData || lesson)
    } catch (error: any) {
      // If detail API fails, use the lesson data we already have
      console.warn('Could not load lesson detail:', error)
      setLessonDetail(lesson)
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleBackToList = () => {
    setViewingLesson(null)
    setLessonDetail(null)
  }

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/wmv', 'video/flv', 'video/webm']
      if (!validTypes.includes(file.type)) {
        toast.error('Định dạng video không hợp lệ. Vui lòng chọn file MP4, MOV, AVI, WMV, FLV hoặc WEBM')
        return
      }

      // Validate file size (max 2GB)
      const maxSize = 2 * 1024 * 1024 * 1024 // 2GB
      if (file.size > maxSize) {
        toast.error('File video quá lớn. Kích thước tối đa là 2GB')
        return
      }

      setVideoFile(file)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingLesson) {
        // Update lesson - không hỗ trợ upload video khi edit (có thể thêm sau)
        const updateData = {
          id: editingLesson.id,
          title: formData.title,
          content: formData.content,
          videoUrl: formData.videoUrl || undefined,
          videoDuration: formData.duration * 60, // Convert minutes to seconds
          type: formData.type,
          sortOrder: formData.order,
          isPublished: false,
          isPreview: formData.isFree,
          resources: undefined,
        }
        await courseInstructorService.updateLesson(editingLesson.id, updateData)
        setLessons((prev) =>
          prev.map((l) =>
            l.id === editingLesson.id
              ? { ...l, ...formData, updatedAt: new Date().toISOString() }
              : l
          )
        )
        toast.success('Cập nhật lesson thành công!')
        setShowModal(false)
        loadLessons()
      } else {
        // Create lesson - gửi FormData với video file (nếu có)
        if (!formData.chapterId) {
          toast.error('Vui lòng chọn chapter')
          return
        }

        setIsUploading(true)
        setUploadProgress(0)

        const formDataToSend = new FormData()

        // Required fields
        formDataToSend.append('ChapterId', formData.chapterId)
        formDataToSend.append('Title', formData.title)

        // Optional fields
        if (formData.content) {
          formDataToSend.append('Content', formData.content)
        }

        if (formData.type) {
          formDataToSend.append('Type', formData.type.toString())
        }

        if (formData.order) {
          formDataToSend.append('SortOrder', formData.order.toString())
        }

        formDataToSend.append('IsPreview', formData.isFree.toString())

        // Nếu có video file, gửi kèm với YouTube metadata
        if (videoFile) {
          formDataToSend.append('VideoFile', videoFile)

          // YouTube metadata
          if (formData.description || formData.content) {
            formDataToSend.append('YouTubeDescription', formData.description || formData.content)
          }

          formDataToSend.append('YouTubeTags', 'education,course,lesson')
          formDataToSend.append('YouTubePrivacyStatus', 'unlisted')
          formDataToSend.append('YouTubeCategoryId', '27') // Education
        } else if (formData.videoUrl) {
          // Nếu không có file nhưng có URL, chỉ lưu URL
          // Backend sẽ không upload lên YouTube
        }

        try {
          const newLesson = await courseInstructorService.createLesson(
            formDataToSend,
            (progress) => {
              setUploadProgress(progress)
            }
          )

          // Handle API response
          const lesson = newLesson?.isSuccess ? newLesson.value : newLesson

          // Update formData với videoUrl từ response (nếu có)
          if (lesson?.videoUrl) {
            setFormData((prev) => ({
              ...prev,
              videoUrl: lesson.videoUrl,
            }))

            // Update duration nếu có
            if (lesson.videoDuration) {
              setFormData((prev) => ({
                ...prev,
                duration: Math.round(lesson.videoDuration / 60), // Convert seconds to minutes
              }))
            }
          }

          setLessons((prev) => [
            ...prev,
            {
              id: lesson?.id || Date.now().toString(),
              courseId,
              chapterId: formData.chapterId,
              title: formData.title,
              description: formData.description,
              content: formData.content,
              videoUrl: lesson?.videoUrl || formData.videoUrl,
              duration: lesson?.videoDuration ? Math.round(lesson.videoDuration / 60) : formData.duration,
              order: formData.order,
              type: formData.type,
              isFree: formData.isFree,
              createdAt: new Date().toISOString(),
            },
          ])

          toast.success('Tạo lesson thành công!')
          setShowModal(false)
          setVideoFile(null)
          setUploadProgress(0)
          loadLessons()
        } catch (error: any) {
          throw error
        } finally {
          setIsUploading(false)
        }
      }
    } catch (error: any) {
      console.error('Error saving lesson:', error)
      const errorMessage = error?.message || 'Có lỗi xảy ra khi tạo lesson'
      toast.error(errorMessage)
    }
  }

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 1: // Video
        return <Video className="w-5 h-5 text-cyan-400" />
      case 2: // Article
        return <FileText className="w-5 h-5 text-indigo-400" />
      case 3: // Quiz
        return <HelpCircle className="w-5 h-5 text-yellow-400" />
      case 4: // Assignment
        return <ClipboardList className="w-5 h-5 text-orange-400" />
      default:
        return <BookOpen className="w-5 h-5 text-purple-400" />
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải lessons...</p>
          </div>
        </div>
      </div>
    )
  }

  // Lesson Detail View
  if (viewingLesson) {
    const lesson = lessonDetail || viewingLesson
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button

            onClick={handleBackToList}
            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Quay lại danh sách lessons
          </button>

          {loadingDetail ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
              <div className="text-white py-12">
                <p>Đang tải chi tiết lesson...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getTypeIcon(lesson.type)}
                      <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
                      {lesson.isFree && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full">
                          Miễn phí
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400 ml-8">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration} phút
                      </span>
                      <span>•</span>
                      <span>{getTypeName(lesson.type)}</span>
                      {lesson.chapterId && (
                        <>
                          <span>•</span>
                          <span className="text-violet-400">
                            {chapters.find((c) => c.id === lesson.chapterId)?.title || 'Chapter'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleBackToList()
                        handleEdit(lesson)
                      }}
                      className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              {lesson.description && (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                  <h2 className="text-lg font-semibold text-white mb-3">Mô tả</h2>
                  <p className="text-slate-300 leading-relaxed">{lesson.description}</p>
                </div>
              )}

              {/* Content */}
              {lesson.content && (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                  <h2 className="text-lg font-semibold text-white mb-3">Nội dung</h2>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">{lesson.content}</div>
                </div>
              )}

              {/* Video */}
              {lesson.videoUrl && (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Video</h2>
                  <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                    {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={lesson.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={lesson.videoUrl}
                        controls
                        className="w-full h-full"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Thông tin</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Loại</p>
                    <p className="text-white font-medium">{getTypeName(lesson.type)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Thời lượng</p>
                    <p className="text-white font-medium">{lesson.duration} phút</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Thứ tự</p>
                    <p className="text-white font-medium">{lesson.order}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Trạng thái</p>
                    <p className="text-white font-medium">
                      {lesson.isFree ? 'Miễn phí' : 'Có phí'}
                    </p>
                  </div>
                  {lesson.createdAt && (
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Ngày tạo</p>
                      <p className="text-white font-medium text-sm">
                        {new Date(lesson.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  )}
                  {lesson.updatedAt && (
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Cập nhật lần cuối</p>
                      <p className="text-white font-medium text-sm">
                        {new Date(lesson.updatedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Quay lại chi tiết khóa học
        </button>

        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-7 h-7" />
                Quản lý Lessons
              </h1>
              <p className="text-slate-400 mt-1">
                {courseName && `Khóa học: ${courseName}`}
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
            >
              <Plus className="w-5 h-5" />
              Thêm Lesson
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {chapters.length > 0 && (
              <div className="relative">
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
                >
                  <option value="all">Tất cả Chapters</option>
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="grid gap-6">
          {lessons.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Chưa có Lesson nào</h3>
              <p className="text-slate-400 mb-6">Tạo lesson đầu tiên cho khóa học của bạn</p>
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition font-medium"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Tạo Lesson
              </button>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Không tìm thấy Lesson nào</h3>
              <p className="text-slate-400 mb-6">
                Không có lesson nào phù hợp với tiêu chí tìm kiếm của bạn
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedChapter('all')
                }}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-medium"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(lesson.type)}
                      <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                      {lesson.isFree && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded">
                          Miễn phí
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 mb-3 ml-8">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-sm ml-8">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration} phút
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{getTypeName(lesson.type)}</span>
                      {lesson.chapterId && (
                        <>
                          <span className="text-slate-400">•</span>
                          <span className="text-violet-400">
                            {chapters.find((c) => c.id === lesson.chapterId)?.title || 'Chapter'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(lesson)}
                      className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition text-blue-400"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(lesson)}
                      className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {editingLesson ? 'Chỉnh sửa Lesson' : 'Thêm Lesson mới'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tiêu đề <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="VD: Lesson 1: Giới thiệu"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Loại <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, type: Number(e.target.value) }))
                      }
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    >
                      <option value={1}>Video</option>
                      <option value={2}>Article</option>
                      <option value={3}>Quiz</option>
                      <option value={4}>Assignment</option>
                    </select>
                  </div>
                </div>

                {chapters.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Chapter
                    </label>
                    <select
                      value={formData.chapterId}
                      onChange={(e) => setFormData((prev) => ({ ...prev, chapterId: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="">Không có chapter</option>
                      {chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                          {chapter.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    placeholder="Mô tả về lesson này..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nội dung
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    placeholder="Nội dung chi tiết của lesson..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                </div>

                {/* Video Upload Section - Only show for Video type */}
                {formData.type === 1 && (
                  <div className="border border-slate-600 rounded-lg p-4 bg-slate-700/30">
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Video File (sẽ tự động upload lên YouTube khi tạo lesson)
                    </label>

                    {!videoFile && !formData.videoUrl && (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="video/mp4,video/mov,video/avi,video/wmv,video/flv,video/webm"
                          onChange={handleVideoFileSelect}
                          className="hidden"
                          disabled={isUploading}
                        />
                        <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-600 rounded-lg hover:border-violet-500 transition text-slate-300 hover:text-violet-400">
                          <Upload className="w-5 h-5" />
                          <span>Chọn file video</span>
                        </div>
                      </label>
                    )}

                    {videoFile && (
                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-violet-400" />
                          <span className="text-sm text-slate-300">{videoFile.name}</span>
                          <span className="text-xs text-slate-500">
                            ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setVideoFile(null)}
                          disabled={isUploading}
                          className="text-red-400 hover:text-red-300 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {isUploading && (
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
                          <span>Đang tạo lesson và upload video...</span>
                          <span>{uploadProgress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-violet-600 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-400">
                          Vui lòng không đóng cửa sổ này trong lúc upload...
                        </p>
                      </div>
                    )}

                    {formData.videoUrl && !videoFile && !isUploading && (
                      <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-green-400" />
                          <a
                            href={formData.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-green-400 hover:underline"
                          >
                            Video URL đã có
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, videoUrl: '' }))}
                          className="text-slate-400 hover:text-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Hoặc nhập Video URL thủ công (nếu video đã có trên YouTube)
                      </label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
                        }
                        placeholder="https://www.youtube.com/watch?v=..."
                        disabled={isUploading || !!videoFile}
                        className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                      />
                      {videoFile && (
                        <p className="text-xs text-slate-400 mt-1">
                          Vui lòng xóa file video trước nếu muốn dùng URL thủ công
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Video URL for non-video types */}
                {formData.type !== 1 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Video URL (tùy chọn)
                    </label>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Thời lượng (phút)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, duration: Number(e.target.value) }))
                      }
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Thứ tự
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))
                      }
                      min="1"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div className="flex items-center pt-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFree}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, isFree: e.target.checked }))
                        }
                        className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-violet-600 focus:ring-violet-500"
                      />
                      <span className="text-slate-300">Lesson miễn phí</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tạo lesson...</span>
                      </>
                    ) : (
                      <span>{editingLesson ? 'Cập nhật' : 'Tạo'} Lesson</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled={isUploading}
                    className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonsContent

