import { Search, ShoppingCart, Users, DollarSign, TrendingUp, Calendar, CheckCircle, Clock, XCircle, Eye, Download } from "lucide-react";
import { useState } from "react";

const EnrollmentsContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const enrollments = [
    {
      id: 'ENR-001',
      student: 'John Smith',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      course: 'Complete Web Development Bootcamp',
      courseImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      instructor: 'Sarah Wilson',
      date: '2024-01-15',
      amount: 149,
      status: 'Completed',
      progress: 100
    },
    {
      id: 'ENR-002',
      student: 'Emma Johnson',
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      course: 'UI/UX Design Masterclass',
      courseImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      instructor: 'Michael Chen',
      date: '2024-01-14',
      amount: 199,
      status: 'Active',
      progress: 65
    },
    {
      id: 'ENR-003',
      student: 'Michael Brown',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      course: 'Python Programming',
      courseImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
      instructor: 'David Lee',
      date: '2024-01-14',
      amount: 129,
      status: 'Active',
      progress: 45
    },
    {
      id: 'ENR-004',
      student: 'Sophie Davis',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      course: 'Digital Marketing',
      courseImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      instructor: 'Lisa Anderson',
      date: '2024-01-13',
      amount: 99,
      status: 'Pending',
      progress: 0
    },
    {
      id: 'ENR-005',
      student: 'James Wilson',
      studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      course: 'Data Science Bootcamp',
      courseImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      instructor: 'Robert Taylor',
      date: '2024-01-13',
      amount: 299,
      status: 'Completed',
      progress: 100
    }
  ];

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enrollment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || enrollment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: enrollments.length,
    completed: enrollments.filter(e => e.status === 'Completed').length,
    active: enrollments.filter(e => e.status === 'Active').length,
    totalRevenue: enrollments.reduce((sum, e) => sum + e.amount, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Active':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Active':
        return <Clock className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm font-medium text-gray-600">Total Enrollments</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.completed}</div>
              <div className="text-sm font-medium text-gray-600">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm font-medium text-gray-600">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm font-medium text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enrollments Management</h2>
            <p className="text-gray-600">View and manage course enrollments</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search enrollments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Enrollments List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Enrollment ID</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Instructor</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Progress</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-gray-600">{enrollment.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={enrollment.studentAvatar}
                        alt={enrollment.student}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">{enrollment.student}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={enrollment.courseImage}
                        alt={enrollment.course}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="text-sm text-gray-700 max-w-xs truncate">{enrollment.course}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{enrollment.instructor}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(enrollment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">${enrollment.amount}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 w-fit ${getStatusColor(enrollment.status)}`}>
                      {getStatusIcon(enrollment.status)}
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 hover:bg-purple-50 rounded-lg transition" title="View Details">
                      <Eye className="w-4 h-4 text-purple-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentsContent;