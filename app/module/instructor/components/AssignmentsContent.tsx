import { CheckCircle, Clock, Edit2, FileText, Plus, Trash2, X, XCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Assignment {
  id: string
  title: string
  courseId: string
  courseName: string
  dueDate: string
  maxScore: number
  submissions: number
  totalStudents: number
  description: string
  status: 'active' | 'closed' | 'draft'
}

interface Submission {
  id: string
  studentName: string
  submittedAt: string
  score: number | null
  status: 'pending' | 'graded'
  fileUrl?: string
}

const AssignmentsContent = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Build a Todo App',
      courseId: '1',
      courseName: 'React Fundamentals',
      dueDate: '2025-01-20',
      maxScore: 100,
      submissions: 15,
      totalStudents: 25,
      description: 'Create a fully functional todo application using React hooks',
      status: 'active',
    },
    {
      id: '2',
      title: 'JavaScript Algorithms',
      courseId: '2',
      courseName: 'Advanced JavaScript',
      dueDate: '2025-01-15',
      maxScore: 50,
      submissions: 20,
      totalStudents: 25,
      description: 'Solve 10 algorithm challenges',
      status: 'closed',
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showSubmissions, setShowSubmissions] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    courseName: '',
    dueDate: '',
    maxScore: 100,
    description: '',
    status: 'draft' as 'active' | 'closed' | 'draft',
  })

  const mockSubmissions: Submission[] = [
    { id: '1', studentName: 'John Doe', submittedAt: '2025-01-12', score: 95, status: 'graded' },
    { id: '2', studentName: 'Jane Smith', submittedAt: '2025-01-13', score: null, status: 'pending' },
  ]

  const handleAdd = () => {
    setEditingAssignment(null)
    setFormData({
      title: '',
      courseId: '',
      courseName: '',
      dueDate: '',
      maxScore: 100,
      description: '',
      status: 'draft',
    })
    setShowModal(true)
  }

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment)
    setFormData({
      title: assignment.title,
      courseId: assignment.courseId,
      courseName: assignment.courseName,
      dueDate: assignment.dueDate,
      maxScore: assignment.maxScore,
      description: assignment.description,
      status: assignment.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== id))
      toast.success('Assignment deleted successfully!')
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAssignment) {
      setAssignments(prev =>
        prev.map(a =>
          a.id === editingAssignment.id
            ? { ...a, ...formData, submissions: a.submissions, totalStudents: a.totalStudents }
            : a
        )
      )
      toast.success('Assignment updated successfully!')
    } else {
      const newAssignment: Assignment = {
        id: Date.now().toString(),
        ...formData,
        submissions: 0,
        totalStudents: 25,
      }
      setAssignments(prev => [newAssignment, ...prev])
      toast.success('Assignment created successfully!')
    }

    setShowModal(false)
  }

  const viewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmissions(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-300'
      case 'closed':
        return 'bg-red-500/20 text-red-300'
      case 'draft':
        return 'bg-amber-500/20 text-amber-300'
      default:
        return 'bg-slate-500/20 text-slate-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-7 h-7" />
            Assignments
          </h2>
          <p className="text-slate-400 mt-1">Manage assignments and grade submissions</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Assignment
        </button>
      </div>

      <div className="grid gap-4">
        {assignments.map(assignment => (
          <div
            key={assignment.id}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-300 mb-3">{assignment.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-violet-400 font-medium">{assignment.courseName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400">Max: {assignment.maxScore} pts</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(assignment)}
                  className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(assignment.id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-white">{assignment.submissions}</p>
                  <p className="text-sm text-slate-400">Submissions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{assignment.totalStudents - assignment.submissions}</p>
                  <p className="text-sm text-slate-400">Pending</p>
                </div>
              </div>
              <button
                onClick={() => viewSubmissions(assignment)}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
              >
                View Submissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {editingAssignment ? 'Edit Assignment' : 'New Assignment'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-700 rounded-lg transition">
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
                  placeholder="e.g. Build a Todo App"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Assignment instructions..."
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
                      setFormData(prev => ({ ...prev, courseId: e.target.value, courseName }))
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
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Due Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Max Score
                  </label>
                  <input
                    type="number"
                    value={formData.maxScore}
                    onChange={e => setFormData(prev => ({ ...prev, maxScore: Number(e.target.value) }))}
                    min="1"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
                >
                  {editingAssignment ? 'Update' : 'Create'} Assignment
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

      {/* Submissions Modal */}
      {showSubmissions && selectedAssignment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedAssignment.title}</h3>
                <p className="text-slate-400 text-sm">Student Submissions</p>
              </div>
              <button onClick={() => setShowSubmissions(false)} className="p-2 hover:bg-slate-700 rounded-lg transition">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Student</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Submitted</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Score</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSubmissions.map(submission => (
                    <tr key={submission.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-4 px-4 text-white">{submission.studentName}</td>
                      <td className="py-4 px-4 text-slate-400">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        {submission.score !== null ? (
                          <span className="text-white font-medium">{submission.score}/{selectedAssignment.maxScore}</span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {submission.status === 'graded' ? (
                          <span className="flex items-center gap-1 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            Graded
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-400">
                            <Clock className="w-4 h-4" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="px-3 py-1 bg-violet-600 text-white text-sm rounded hover:bg-violet-700 transition">
                          {submission.status === 'pending' ? 'Grade' : 'Re-grade'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssignmentsContent
