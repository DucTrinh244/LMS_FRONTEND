import { Award, Search, Download, Eye, Calendar, User, BookOpen, CheckCircle, Filter } from "lucide-react";
import { useState } from "react";

const CertificatesContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const certificates = [
    {
      id: 'CERT-001',
      student: 'John Smith',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      course: 'Complete Web Development Bootcamp',
      courseImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      instructor: 'Sarah Wilson',
      issueDate: '2024-01-15',
      certificateId: 'CERT-2024-001',
      status: 'Issued'
    },
    {
      id: 'CERT-002',
      student: 'Emma Johnson',
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      course: 'UI/UX Design Masterclass',
      courseImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      instructor: 'Michael Chen',
      issueDate: '2024-01-10',
      certificateId: 'CERT-2024-002',
      status: 'Issued'
    },
    {
      id: 'CERT-003',
      student: 'Michael Brown',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      course: 'Python Programming',
      courseImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
      instructor: 'David Lee',
      issueDate: '2024-01-08',
      certificateId: 'CERT-2024-003',
      status: 'Issued'
    },
    {
      id: 'CERT-004',
      student: 'Sophie Davis',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      course: 'Digital Marketing',
      courseImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      instructor: 'Lisa Anderson',
      issueDate: '2024-01-05',
      certificateId: 'CERT-2024-004',
      status: 'Issued'
    }
  ];

  const filteredCertificates = certificates.filter(cert =>
    cert.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'Issued').length,
    thisMonth: certificates.filter(c => {
      const date = new Date(c.issueDate);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
              <div className="text-sm font-medium text-slate-400">Total Certificates</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.issued}</div>
              <div className="text-sm font-medium text-slate-400">Issued</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.thisMonth}</div>
              <div className="text-sm font-medium text-slate-400">This Month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Certificates Management</h2>
            <p className="text-slate-400">Manage certificates issued to students</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-slate-700/50 border border-slate-600 rounded-xl overflow-hidden hover:border-slate-500 hover:shadow-lg transition"
            >
              <div className="relative h-32 bg-gradient-to-br from-purple-600 to-pink-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={certificate.studentAvatar}
                    alt={certificate.student}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{certificate.student}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      Student
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-white line-clamp-1">{certificate.course}</span>
                  </div>
                  <div className="text-xs text-slate-400">Instructor: {certificate.instructor}</div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </div>
                  <span className="font-mono text-slate-300">{certificate.certificateId}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition">
                    <Download className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No certificates found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesContent;