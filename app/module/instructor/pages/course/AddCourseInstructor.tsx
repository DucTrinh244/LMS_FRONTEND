import { ChevronLeft } from 'lucide-react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type {
  AddRequestCourseInstructor,
  LanguageCourse,
  LevelCourse,
} from '~/module/instructor/types/CourseInstructor'
import { sharedApi } from '~/services/sharedApi'

interface AddCourseProps {
  onBack: () => void
  onSave: (course: AddRequestCourseInstructor) => void
  course?: AddRequestCourseInstructor | null
}

// Giả lập danh sách level
const LEVELS: LevelCourse[] = [
  { id: 1, name: 'Beginner' },
  { id: 2, name: 'Intermediate' },
  { id: 3, name: 'Advanced' },
  { id: 4, name: 'All Levels' },
]

const LANGUAGES: LanguageCourse[] = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Spanish' },
  { id: 'fr', name: 'French' },
  { id: 'de', name: 'German' },
  { id: 'zh', name: 'Chinese' },
  { id: 'vi', name: 'Vietnamese' },
]

export const AddCourse: FC<AddCourseProps> = ({ onBack, onSave, course }) => {
  const isEdit = !!course

  const [formData, setFormData] = useState<AddRequestCourseInstructor>({
    title: course?.title || '',
    description: course?.description || '',
    shortDescription: course?.shortDescription || '',
    categoryId: course?.categoryId || '',
    price: course?.price || 0,
    durationHours: course?.durationHours || 0,
    maxStudents: course?.maxStudents || 100,
    requirements: course?.requirements || '',
    objectives: course?.objectives || '',
    targetAudience: course?.targetAudience || '',
    level: course?.level || 1,
    language: course?.language || 'vi',
    certificateEnabled: course?.certificateEnabled ?? true,
  })

  // 🔹 Tạo state để lưu categories
  const [CATEGORIES, setCATEGORIES] = useState<{ id: number; name: string }[]>([])

  // 🔹 Gọi API lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await sharedApi.getNameAndIdOfAllCategories()
        setCATEGORIES(data)
        console.log('CATEGORIES:', data)
      } catch (error) {
        console.error('Lỗi khi tải category:', error)
      }
    }

    fetchCategories()
  }, [])

  // Khi `course` thay đổi (edit mode)
  useEffect(() => {
    if (course) {
      setFormData({ ...course })
    }
  }, [course])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (name === 'level') {
      setFormData((prev) => ({ ...prev, level: Number(value) }))
    } else if (['price', 'durationHours', 'maxStudents'].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) return alert('Please enter a course title')
    if (!formData.categoryId) return alert('Please select a category')
    if (formData.price < 0) return alert('Price cannot be negative')

    onSave(formData)
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 transition text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Course' : 'Create New Course'}
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-xl p-6 md:p-8 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Course Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Complete Web Development Bootcamp"
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={2}
              placeholder="Brief overview (shown in course card)"
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Detailed course content, what students will learn..."
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
          </div>

          {/* Grid: Category, Level, Language */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid: Price, Duration, Max Students */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0 for free"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (hours)
              </label>
              <input
                type="number"
                name="durationHours"
                value={formData.durationHours}
                onChange={handleChange}
                min="0"
                step="0.5"
                placeholder="e.g. 12.5"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Max Students
              </label>
              <input
                type="number"
                name="maxStudents"
                value={formData.maxStudents}
                onChange={handleChange}
                min="1"
                placeholder="e.g. 100"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              placeholder="• Basic computer skills&#10;• Laptop with internet&#10;• Desire to learn"
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none font-mono text-sm"
            />
          </div>

          {/* Objectives */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              What You'll Learn (one per line)
            </label>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              rows={3}
              placeholder="• Build responsive websites&#10;• Master React & Node.js&#10;• Deploy full-stack apps"
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none font-mono text-sm"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Target Audience
            </label>
            <textarea
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              rows={2}
              placeholder="Beginners, career changers, students..."
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
          </div>

          {/* Certificate */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="certificateEnabled"
              id="certificate"
              checked={!!formData.certificateEnabled}
              onChange={handleChange}
              className="w-5 h-5 rounded border-slate-600 text-violet-600 focus:ring-violet-500 bg-slate-700"
            />
            <label htmlFor="certificate" className="text-white font-medium">
              Provide Certificate upon completion
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition shadow-lg"
            >
              {isEdit ? 'Update Course' : 'Create Course'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};