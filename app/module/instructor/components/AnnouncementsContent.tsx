import { Bell, Edit2, Plus, Send, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Announcement {
  id: string
  title: string
  message: string
  courseId: string
  courseName: string
  createdAt: string
  priority: 'low' | 'medium' | 'high'
}

const AnnouncementsContent = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'New Quiz Available',
      message: 'Chapter 5 quiz is now available. Please complete it before the deadline.',
      courseId: '1',
      courseName: 'React Fundamentals',
      createdAt: '2025-01-10',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Office Hours This Week',
      message: 'I will be available for Q&A sessions every Tuesday 2-4 PM.',
      courseId: '2',
      courseName: 'Advanced JavaScript',
      createdAt: '2025-01-08',
      priority: 'medium',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    courseId: '',
    courseName: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  })

  const handleAdd = () => {
    setEditingAnnouncement(null)
    setFormData({
      title: '',
      message: '',
      courseId: '',
      courseName: '',
      priority: 'medium',
    })
    setShowModal(true)
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      message: announcement.message,
      courseId: announcement.courseId,
      courseName: announcement.courseName,
      priority: announcement.priority,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id))
      toast.success('Announcement deleted successfully!')
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAnnouncement) {
      setAnnouncements(prev =>
        prev.map(a =>
          a.id === editingAnnouncement.id
            ? { ...a, ...formData }
            : a
        )
      )
      toast.success('Announcement updated successfully!')
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setAnnouncements(prev => [newAnnouncement, ...prev])
      toast.success('Announcement created and sent to students!')
    }

    setShowModal(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/50'
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50'
      case 'low':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-7 h-7" />
            Announcements
          </h2>
          <p className="text-slate-400 mt-1">Broadcast messages to your students</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      <div className="grid gap-4">
        {announcements.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-12 text-center">
            <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Announcements Yet</h3>
            <p className="text-slate-400 mb-6">Create your first announcement to notify students</p>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
            >
              Create Announcement
            </button>
          </div>
        ) : (
          announcements.map(announcement => (
            <div
              key={announcement.id}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        announcement.priority
                      )}`}
                    >
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-3">{announcement.message}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-violet-400">{announcement.courseName}</span>
                    </span>
                    <span>•</span>
                    <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}
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
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. New Assignment Posted"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={5}
                  placeholder="Write your announcement message here..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Course <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.courseId}
                    onChange={e => {
                      const courseName = e.target.options[e.target.selectedIndex].text
                      setFormData(prev => ({
                        ...prev,
                        courseId: e.target.value,
                        courseName,
                      }))
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  >
                    <option value="">Select course</option>
                    <option value="1">React Fundamentals</option>
                    <option value="2">Advanced JavaScript</option>
                    <option value="3">Node.js Backend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        priority: e.target.value as 'low' | 'medium' | 'high',
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {editingAnnouncement ? 'Update' : 'Send'} Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnnouncementsContent