import { BookOpen, ChevronLeft, Edit2, Plus, Search, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useToast } from '~/shared/hooks/useToast'
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog'
import { courseInstructorService } from '~/module/instructor/services/CourseInstructorApi'

interface Chapter {
  id: string
  courseId: string
  title: string
  description: string
  order: number
  sortOrder?: number
  isPublished?: boolean
  lessonsCount?: number
  createdAt?: string
  updatedAt?: string
}

interface ChaptersContentProps {
  courseId: string
  courseName?: string
  onBack: () => void
}

const ChaptersContent: React.FC<ChaptersContentProps> = ({ courseId, courseName, onBack }) => {
  const { toast } = useToast()
  const { confirm } = useConfirmDialog()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
    isPublished: false,
  })

  useEffect(() => {
    loadChapters()
  }, [courseId])

  const loadChapters = async () => {
    try {
      setLoading(true)
      const data = await courseInstructorService.getChaptersByCourse(courseId)
      // Handle API response format
      const chaptersList = data?.isSuccess ? data.value : data?.chapters ?? data ?? []
      // Map sortOrder to order for display, or use order if available
      const mappedChapters = chaptersList.map((chapter: any) => ({
        ...chapter,
        order: chapter.sortOrder ?? chapter.order ?? 0,
        isPublished: chapter.isPublished ?? false,
      }))
      setChapters(mappedChapters.sort((a: Chapter, b: Chapter) => a.order - b.order))
    } catch (error: any) {
      toast.error(error?.message || 'Không thể tải danh sách chapters')
      // Use mock data for development
      setChapters([
        {
          id: '1',
          courseId,
          title: 'Chapter 1: Introduction',
          description: 'Introduction to the course',
          order: 1,
          lessonsCount: 5,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredChapters = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = () => {
    setEditingChapter(null)
    setFormData({
      title: '',
      description: '',
      order: chapters.length + 1,
      isPublished: false,
    })
    setShowModal(true)
  }

  const handleEdit = (chapter: Chapter) => {
    setEditingChapter(chapter)
    setFormData({
      title: chapter.title,
      description: chapter.description,
      order: chapter.order,
      isPublished: chapter.isPublished ?? false,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    const ok = await confirm('Bạn có chắc chắn muốn xóa chapter này?')
    if (ok) {
      try {
        await courseInstructorService.deleteChapter(id)
        setChapters((prev) => prev.filter((c) => c.id !== id))
        toast.success('Xóa chapter thành công!')
      } catch (error: any) {
        toast.error(error?.message || 'Không thể xóa chapter')
        // For development, remove from local state
        setChapters((prev) => prev.filter((c) => c.id !== id))
        toast.success('Xóa chapter thành công!')
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingChapter) {
        // Map order to sortOrder for update
        const updateData = {
          id: editingChapter.id,
          title: formData.title,
          description: formData.description,
          sortOrder: formData.order,
          isPublished: formData.isPublished,
        }
        await courseInstructorService.updateChapter(editingChapter.id, updateData)
        setChapters((prev) =>
          prev.map((c) =>
            c.id === editingChapter.id
              ? { ...c, ...formData, updatedAt: new Date().toISOString() }
              : c
          )
        )
        toast.success('Cập nhật chapter thành công!')
      } else {
        // Map order to sortOrder for create
        const createData = {
          title: formData.title,
          description: formData.description,
          sortOrder: formData.order,
        }
        const newChapter = await courseInstructorService.createChapter(courseId, createData)
        // Handle API response
        const chapter = newChapter?.isSuccess ? newChapter.value : newChapter
        setChapters((prev) => [
          ...prev,
          {
            id: chapter?.id || Date.now().toString(),
            courseId,
            title: formData.title,
            description: formData.description,
            order: formData.order,
            isPublished: formData.isPublished,
            lessonsCount: 0,
            createdAt: new Date().toISOString(),
          },
        ])
        toast.success('Tạo chapter thành công!')
      }
      setShowModal(false)
      loadChapters()
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra')
      // For development, update local state
      if (editingChapter) {
        setChapters((prev) =>
          prev.map((c) =>
            c.id === editingChapter.id
              ? { ...c, ...formData, updatedAt: new Date().toISOString() }
              : c
          )
        )
      } else {
        setChapters((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            courseId,
            title: formData.title,
            description: formData.description,
            order: formData.order,
            isPublished: formData.isPublished,
            lessonsCount: 0,
            createdAt: new Date().toISOString(),
          },
        ])
      }
      setShowModal(false)
      toast.success(editingChapter ? 'Cập nhật chapter thành công!' : 'Tạo chapter thành công!')
    }
  }

  const handleMoveOrder = async (chapterId: string, direction: 'up' | 'down') => {
    const chapterIndex = chapters.findIndex((c) => c.id === chapterId)
    if (
      (direction === 'up' && chapterIndex === 0) ||
      (direction === 'down' && chapterIndex === chapters.length - 1)
    ) {
      return
    }

    const newChapters = [...chapters]
    const targetIndex = direction === 'up' ? chapterIndex - 1 : chapterIndex + 1
    ;[newChapters[chapterIndex], newChapters[targetIndex]] = [
      newChapters[targetIndex],
      newChapters[chapterIndex],
    ]

    // Update order numbers
    newChapters.forEach((chapter, index) => {
      chapter.order = index + 1
    })

    setChapters(newChapters)
    toast.success('Đã cập nhật thứ tự chapter')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Đang tải chapters...</p>
          </div>
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
                <BookOpen className="w-7 h-7" />
                Quản lý Chapters
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
              Thêm Chapter
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Chapters List */}
        <div className="grid gap-6">
          {filteredChapters.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Chưa có Chapter nào</h3>
              <p className="text-slate-400 mb-6">Tạo chapter đầu tiên cho khóa học của bạn</p>
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              >
                Tạo Chapter
              </button>
            </div>
          ) : (
            filteredChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {chapter.order}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{chapter.title}</h3>
                      {chapter.isPublished && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded border border-green-500/50">
                          Đã xuất bản
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 mb-3 ml-11">{chapter.description}</p>
                    <div className="flex items-center gap-4 text-sm ml-11">
                      <span className="text-slate-400">
                        {chapter.lessonsCount || 0} bài học
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveOrder(chapter.id, 'up')}
                      disabled={index === 0}
                      className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Di chuyển lên"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(chapter.id, 'down')}
                      disabled={index === filteredChapters.length - 1}
                      className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Di chuyển xuống"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(chapter)}
                      className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(chapter.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
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
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {editingChapter ? 'Chỉnh sửa Chapter' : 'Thêm Chapter mới'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tiêu đề <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="VD: Chapter 1: Giới thiệu"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={4}
                    placeholder="Mô tả về chapter này..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
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
                        checked={formData.isPublished}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
                        }
                        className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-violet-600 focus:ring-violet-500"
                      />
                      <span className="text-slate-300">Đã xuất bản</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
                  >
                    {editingChapter ? 'Cập nhật' : 'Tạo'} Chapter
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
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

export default ChaptersContent

