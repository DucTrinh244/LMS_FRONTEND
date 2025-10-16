import { ChevronLeft, ChevronRight, Eye, Grid, List, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const StudentsContent = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const studentsPerPage = 5;

  const students = [
    {
      id: 'STU020',
      name: 'Thompson Hicks',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      enrollDate: '22 Aug 2025',
      progress: 0,
      courses: 10
    },
    {
      id: 'STU019',
      name: 'Jennifer Tovar',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      enrollDate: '10 Aug 2025',
      progress: 15,
      courses: 8
    },
    {
      id: 'STU018',
      name: 'James Schulte',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      enrollDate: '26 Jul 2025',
      progress: 60,
      courses: 12
    },
    {
      id: 'STU017',
      name: 'Kristy Cardona',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      enrollDate: '12 Jul 2025',
      progress: 20,
      courses: 17
    },
    {
      id: 'STU016',
      name: 'William Aragon',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      enrollDate: '02 Jul 2025',
      progress: 10,
      courses: 9
    },
    {
      id: 'STU015',
      name: 'Shirley Lis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      enrollDate: '25 Jun 2025',
      progress: 80,
      courses: 15
    },
    {
      id: 'STU014',
      name: 'John Brewer',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
      enrollDate: '17 Jun 2025',
      progress: 40,
      courses: 13
    },
    {
      id: 'STU013',
      name: 'Doris Hughes',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
      enrollDate: '04 Jun 2025',
      progress: 50,
      courses: 17
    },
    {
      id: 'STU012',
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80',
      enrollDate: '20 May 2025',
      progress: 20,
      courses: 8
    },
    {
      id: 'STU011',
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
      enrollDate: '15 May 2025',
      progress: 60,
      courses: 10
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-violet-400';
    if (progress <= 20) return 'bg-violet-500';
    if (progress <= 50) return 'bg-violet-600';
    if (progress <= 70) return 'bg-purple-500';
    return 'bg-purple-600';
  };

  // Filter students by search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const handleView = (id: string) => {
    console.log(`Viewing student with ID: ${id}`);
    // TODO: Navigate to /students/:id
  };

  const handleMessage = (id: string) => {
    console.log(`Messaging student with ID: ${id}`);
    // TODO: Implement messaging functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h1 className="text-lg font-bold text-white">Students</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                    : 'bg-slate-700/50 text-slate-400 hover:text-violet-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                    : 'bg-slate-700/50 text-slate-400 hover:text-violet-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Students Display */}
        {viewMode === 'list' ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/50 border-b border-slate-600">
                    <th className="text-left py-5 px-8 text-sm font-bold text-slate-200 min-w-[100px]">Student ID</th>
                    <th className="text-left py-5 px-8 text-sm font-bold text-slate-200 min-w-[250px]">Student Name</th>
                    <th className="text-left py-5 px-8 text-sm font-bold text-slate-200 min-w-[120px]">Enroll Date</th>
                    <th className="text-left py-5 px-8 text-sm font-bold text-slate-200 min-w-[150px]">Progress</th>
                    <th className="text-left py-5 px-8 text-sm font-bold text-slate-200 min-w-[120px]">Courses</th>
                    <th className="text-left py-5 px-8 text-sm font-bold text-slate-200 min-w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="border-b border-slate-600 hover:bg-slate-700/50 hover:shadow-violet-500/20 transition">
                      {/* Student ID */}
                      <td className="py-5 px-8">
                        <span className="text-violet-400 font-semibold">#{student.id}</span>
                      </td>

                      {/* Student Name */}
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-600"
                          />
                          <span className="font-medium text-white line-clamp-1">{student.name}</span>
                        </div>
                      </td>

                      {/* Enroll Date */}
                      <td className="py-5 px-8">
                        <span className="text-slate-400 text-sm">{student.enrollDate}</span>
                      </td>

                      {/* Progress */}
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-600 rounded-full h-2 max-w-[100px] sm:max-w-[150px]">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(student.progress)} transition-all`}
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-white min-w-[40px]">
                            {student.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Courses */}
                      <td className="py-5 px-8">
                        <span className="text-white font-semibold">{student.courses}</span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/students/${student.id}`}
                            onClick={() => handleView(student.id)}
                            className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4 text-violet-400" />
                          </Link>
                          <button
                            onClick={() => handleMessage(student.id)}
                            className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                          >
                            <MessageSquare className="w-4 h-4 text-violet-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-6 border-t border-slate-600">
              <p className="text-sm text-slate-400">Page {currentPage} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                        : 'border border-slate-700 text-slate-200 hover:bg-slate-700/50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedStudents.map((student) => (
              <div
                key={student.id}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition group"
              >
                {/* Avatar */}
                <div className="relative overflow-hidden">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white text-base mb-2 line-clamp-1 group-hover:text-violet-400 transition">
                    {student.name}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Student ID</span>
                      <span className="text-violet-400 font-semibold">#{student.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Enroll Date</span>
                      <span>{student.enrollDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Courses</span>
                      <span className="font-semibold text-white">{student.courses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Progress</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(student.progress)} transition-all`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="font-semibold text-white">{student.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-700">
                    <Link
                      to={`/students/${student.id}`}
                      onClick={() => handleView(student.id)}
                      className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4 text-violet-400" />
                    </Link>
                    <button
                      onClick={() => handleMessage(student.id)}
                      className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                    >
                      <MessageSquare className="w-4 h-4 text-violet-400" />
                    </button>
                  </div>
                </div>
              </div>  
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsContent;