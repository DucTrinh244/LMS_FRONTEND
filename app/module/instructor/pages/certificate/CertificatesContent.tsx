import { Award, Calendar, CheckCircle, ChevronDown, Download, Eye, FileText, Plus, Search, X, Clock } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Certificate {
  id: string
  studentName: string
  studentEmail: string
  courseName: string
  issueDate: string
  completionDate: string
  certificateNumber: string
  grade: string
  instructor: string
  status: 'issued' | 'pending' | 'revoked'
}

interface CertificateTemplate {
  id: string
  name: string
  description: string
  courseName: string
}

const CertificatesContent = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentEmail: 'john@example.com',
      courseName: 'React Fundamentals',
      issueDate: '2025-01-15',
      completionDate: '2025-01-10',
      certificateNumber: 'CERT-2025-001',
      grade: 'A',
      instructor: 'Dr. Sarah Johnson',
      status: 'issued',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentEmail: 'jane@example.com',
      courseName: 'Advanced JavaScript',
      issueDate: '2025-01-14',
      completionDate: '2025-01-08',
      certificateNumber: 'CERT-2025-002',
      grade: 'A+',
      instructor: 'Dr. Sarah Johnson',
      status: 'issued',
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentEmail: 'mike@example.com',
      courseName: 'Node.js Backend',
      issueDate: '',
      completionDate: '2025-01-12',
      certificateNumber: '',
      grade: 'B+',
      instructor: 'Dr. Sarah Johnson',
      status: 'pending',
    },
  ])

  const [templates] = useState<CertificateTemplate[]>([
    {
      id: '1',
      name: 'Standard Certificate',
      description: 'Default certificate template with course completion details',
      courseName: 'All Courses',
    },
    {
      id: '2',
      name: 'Excellence Certificate',
      description: 'Special certificate for students with grade A or above',
      courseName: 'All Courses',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState('All')
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [showIssueModal, setShowIssueModal] = useState(false)

  const filteredCertificates = certificates
    .filter(
      (cert) =>
        cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((cert) => selectedStatus === 'All' || cert.status === selectedStatus)
    .filter((cert) => selectedCourse === 'All' || cert.courseName === selectedCourse)

  const uniqueCourses = Array.from(new Set(certificates.map((c) => c.courseName)))

  const handlePreview = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setShowPreviewModal(true)
  }

  const handleDownload = (certificate: Certificate) => {
    toast.success(`Downloading certificate ${certificate.certificateNumber}...`)
  }

  const handleIssueCertificate = () => {
    setShowIssueModal(true)
  }

  const handleRevoke = (id: string) => {
    if (confirm('Are you sure you want to revoke this certificate?')) {
      setCertificates((prev) =>
        prev.map((cert) => (cert.id === id ? { ...cert, status: 'revoked' as const } : cert))
      )
      toast.success('Certificate revoked successfully')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'issued':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/50">
            <CheckCircle className="w-3 h-3" />
            Issued
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/50">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case 'revoked':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/50">
            <X className="w-3 h-3" />
            Revoked
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
              <Award className="w-7 h-7" />
              Certificates Management
            </h1>
            <p className="text-slate-400">Issue and manage course completion certificates</p>
          </div>
          <button
            onClick={handleIssueCertificate}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Issue Certificate
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Total Certificates</h3>
              <p className="text-3xl font-bold">{certificates.length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Issued</h3>
              <p className="text-3xl font-bold">{certificates.filter((c) => c.status === 'issued').length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Pending</h3>
              <p className="text-3xl font-bold">{certificates.filter((c) => c.status === 'pending').length}</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 opacity-80" />
            <div className="relative p-6 text-white">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Revoked</h3>
              <p className="text-3xl font-bold">{certificates.filter((c) => c.status === 'revoked').length}</p>
            </div>
          </div>
        </div>

        {/* Certificate Templates */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Certificate Templates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-violet-600/20 rounded-lg">
                    <FileText className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">{template.description}</p>
                    <span className="text-xs text-violet-400">{template.courseName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student, course, or certificate number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white placeholder-slate-500"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
              >
                <option value="All">All Courses</option>
                {uniqueCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="issued">Issued</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600">
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Student</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Course</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Certificate #</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Grade</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Issue Date</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">No certificates found</p>
                    </td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert) => (
                    <tr key={cert.id} className="border-b border-slate-600 hover:bg-slate-700/50 transition">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-white">{cert.studentName}</p>
                          <p className="text-sm text-slate-400">{cert.studentEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">{cert.courseName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-violet-400 font-mono text-sm">
                          {cert.certificateNumber || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-violet-600/20 text-violet-300 rounded-full text-sm font-semibold">
                          {cert.grade}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.issueDate || 'Not issued'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(cert.status)}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {cert.status === 'issued' && (
                            <>
                              <button
                                onClick={() => handlePreview(cert)}
                                className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition text-slate-300 hover:text-white"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDownload(cert)}
                                className="p-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition text-white"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {cert.status === 'pending' && (
                            <button
                              onClick={() => {
                                const newCertNumber = `CERT-2025-00${certificates.length + 1}`
                                setCertificates((prev) =>
                                  prev.map((c) =>
                                    c.id === cert.id
                                      ? {
                                          ...c,
                                          status: 'issued' as const,
                                          issueDate: new Date().toISOString().split('T')[0],
                                          certificateNumber: newCertNumber,
                                        }
                                      : c
                                  )
                                )
                                toast.success('Certificate issued successfully!')
                              }}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg transition text-white text-sm"
                            >
                              Issue Now
                            </button>
                          )}
                          {cert.status === 'issued' && (
                            <button
                              onClick={() => handleRevoke(cert.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition text-red-400"
                              title="Revoke"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreviewModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-4xl w-full">
              <div className="border-b border-slate-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Certificate Preview</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-8">
                {/* Certificate Design */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-violet-600 rounded-xl p-12 text-center">
                  <div className="mb-6">
                    <Award className="w-20 h-20 text-violet-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">Certificate of Completion</h2>
                    <p className="text-slate-400">This is to certify that</p>
                  </div>

                  <h3 className="text-4xl font-bold text-violet-400 mb-6">{selectedCertificate.studentName}</h3>

                  <p className="text-slate-300 mb-8">
                    has successfully completed the course
                    <br />
                    <span className="text-xl font-bold text-white mt-2 block">
                      {selectedCertificate.courseName}
                    </span>
                  </p>

                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Grade</p>
                      <p className="text-2xl font-bold text-violet-400">{selectedCertificate.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Completion Date</p>
                      <p className="text-lg font-semibold text-white">{selectedCertificate.completionDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Certificate Number</p>
                      <p className="text-lg font-mono text-violet-400">{selectedCertificate.certificateNumber}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-600 pt-6">
                    <p className="text-slate-400 text-sm">Instructor</p>
                    <p className="text-white font-semibold">{selectedCertificate.instructor}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 p-6 flex gap-3">
                <button
                  onClick={() => handleDownload(selectedCertificate)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Issue Certificate Modal */}
        {showIssueModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl w-full">
              <div className="border-b border-slate-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Issue New Certificate</h3>
                <button
                  onClick={() => setShowIssueModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  toast.success('Certificate issued successfully!')
                  setShowIssueModal(false)
                }}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Student <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Select student</option>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                    <option value="3">Mike Johnson</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Course <span className="text-red-400">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Select course</option>
                    <option value="1">React Fundamentals</option>
                    <option value="2">Advanced JavaScript</option>
                    <option value="3">Node.js Backend</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Grade</label>
                    <input
                      type="text"
                      placeholder="e.g. A, B+, 95%"
                      className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Template</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option value="1">Standard Certificate</option>
                      <option value="2">Excellence Certificate</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
                  >
                    Issue Certificate
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowIssueModal(false)}
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
    </div>
  )
}

export default CertificatesContent
