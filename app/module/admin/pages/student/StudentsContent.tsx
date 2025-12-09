import { Search, Users, BookOpen, Award, TrendingUp, Mail, Phone, Calendar, Eye, Edit } from "lucide-react";
import { useState } from "react";

const StudentsContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 234 567 8900',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      enrolledCourses: 5,
      completedCourses: 3,
      certificates: 2,
      joinDate: '2024-01-15',
      totalSpent: 745,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      phone: '+1 234 567 8901',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      enrolledCourses: 8,
      completedCourses: 6,
      certificates: 4,
      joinDate: '2023-12-10',
      totalSpent: 1240,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1 234 567 8902',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      enrolledCourses: 3,
      completedCourses: 1,
      certificates: 1,
      joinDate: '2024-01-20',
      totalSpent: 397,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Sophie Davis',
      email: 'sophie.davis@example.com',
      phone: '+1 234 567 8903',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      enrolledCourses: 12,
      completedCourses: 10,
      certificates: 8,
      joinDate: '2023-11-05',
      totalSpent: 1890,
      status: 'Active'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'Active').length,
    totalEnrolled: students.reduce((sum, s) => sum + s.enrolledCourses, 0),
    totalRevenue: students.reduce((sum, s) => sum + s.totalSpent, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm font-medium text-gray-600">Total Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm font-medium text-gray-600">Active Students</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalEnrolled}</div>
              <div className="text-sm font-medium text-gray-600">Total Enrollments</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-orange-600" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Students Management</h2>
            <p className="text-gray-600">Manage all students enrolled in courses</p>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Courses</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Certificates</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-gray-900">
                        Enrolled: {student.enrolledCourses}
                      </div>
                      <div className="text-sm text-gray-600">
                        Completed: {student.completedCourses}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold text-gray-900">{student.certificates}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-green-600">${student.totalSpent}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(student.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-purple-50 rounded-lg transition" title="View">
                        <Eye className="w-4 h-4 text-purple-600" />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 rounded-lg transition" title="Edit">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
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

export default StudentsContent;
