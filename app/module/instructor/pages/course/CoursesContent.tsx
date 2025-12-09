import {
  BookOpen,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  Grid,
  HelpCircle,
  List,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router"; // Sửa: react-router-dom
import { useCourseInstructor } from "~/module/instructor/hooks/useCourseInstructor";
import { AddCourse } from "~/module/instructor/pages/course/AddCourseInstructor";
import ChaptersContent from "~/module/instructor/pages/course/ChaptersContent";
import CourseDetailInstructor from "~/module/instructor/pages/course/DetailCourseInstructor";
import { EditCourse } from "~/module/instructor/pages/course/EditCourseInstructor";
import LessonsContent from "~/module/instructor/pages/course/LessonsContent";
import QuizContent from "~/module/instructor/pages/quiz/QuizContent";
import type { AddRequestCourseInstructor } from "~/module/instructor/types/CourseInstructor";
import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";


const CoursesContent: FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [mode, setMode] = useState<'list' | 'add' | 'edit' | 'detail' | 'chapters' | 'lessons' | 'quizzes'>('list');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const { confirm } = useConfirmDialog();

  const {
    courses,
    loading,
    error,
    deleteCourse,
    createCourse,
    updateCourse,
    isDeleting
  } = useCourseInstructor();

  // Map status to display format
  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { display: string; color: string }> = {
      'published': { display: 'Published', color: 'bg-violet-500' },
      'pending': { display: 'Pending', color: 'bg-yellow-500' },
      'draft': { display: 'Draft', color: 'bg-gray-500' },
      'archived': { display: 'Archived', color: 'bg-slate-500' },
    }
    return statusMap[status?.toLowerCase()] || { display: status || 'Draft', color: 'bg-gray-500' }
  }

  const statsCards = [
    {
      title: 'Active Courses',
      count: courses.filter((c) => c.status === 'published').length,
      color: 'from-violet-600 to-purple-600',
    },
    {
      title: 'Pending',
      count: courses.filter((c) => c.status === 'pending').length,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Draft',
      count: courses.filter((c) => c.status === 'draft').length,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Free Courses',
      count: courses.filter((c) => c.price === 0).length,
      color: 'from-teal-500 to-cyan-500',
    },
    {
      title: 'Paid Courses',
      count: courses.filter((c) => c.price > 0).length,
      color: 'from-violet-600 to-pink-600',
    },
  ];

  const filteredCourses = courses
    .filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((course) => {
      if (selectedStatus === 'All') return true
      const statusDisplay = getStatusDisplay(course.status)
      return statusDisplay.display === selectedStatus
    })
    .map((course) => ({
      ...course,
      statusDisplay: getStatusDisplay(course.status)
    }));
  const handleView = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setSelectedCourse(course);
      setMode('detail');
    }
  }

  const handleEdit = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setSelectedCourse(course);
      setMode('edit');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm('Are you sure you want to delete this course?');
    if (ok) {
      await deleteCourse(id);
    }
  };

  const handleSaveAdd = async (newCourse: AddRequestCourseInstructor) => {
    await createCourse(newCourse);
    setMode('list');
  };

  const handleSaveEdit = async (updatedCourse: any) => {
    await updateCourse(updatedCourse.id, updatedCourse);
    setMode('list');
    setSelectedCourse(null);
  };

  // === RENDER THEO MODE (phải ở đầu return) ===
  if (mode === 'add') {
    return <AddCourse onBack={() => setMode('list')} onSave={handleSaveAdd} />;
  }

  if (mode === 'edit' && selectedCourse) {
    return (
      <EditCourse
        course={selectedCourse}
        onBack={() => {
          setMode('list');
          setSelectedCourse(null);
        }}
        onSave={handleSaveEdit}
      />
    );
  }

  if (mode === 'detail' && selectedCourse) {
    return (
      <CourseDetailInstructor
        course={selectedCourse}
        onBack={() => {
          setMode('list');
          setSelectedCourse(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onManageChapters={(courseId) => {
          setMode('chapters');
        }}
        onManageLessons={(courseId) => {
          setMode('lessons');
        }}
        onManageQuizzes={(courseId) => {
          setMode('quizzes');
        }}
      />
    );
  }

  if (mode === 'chapters' && selectedCourse) {
    return (
      <ChaptersContent
        courseId={selectedCourse.id}
        courseName={selectedCourse.title}
        onBack={() => {
          setMode('detail');
        }}
      />
    );
  }

  if (mode === 'lessons' && selectedCourse) {
    return (
      <LessonsContent
        courseId={selectedCourse.id}
        courseName={selectedCourse.title}
        onBack={() => {
          setMode('detail');
        }}
      />
    );
  }

  if (mode === 'quizzes' && selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setMode('detail')}
            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-6"
          >
            <ChevronDown className="w-5 h-5 rotate-90" />
            Quay lại chi tiết khóa học
          </button>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">
              Quản lý Quizzes - {selectedCourse.title}
            </h2>
            <p className="text-slate-400">
              Tạo và quản lý các bài kiểm tra cho khóa học này
            </p>
          </div>
          <QuizContent />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white py-12">
            <p>Loading courses...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-400 py-12">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-80`}
              />
              <div className="relative p-6 text-white">
                <h3 className="text-sm font-semibold text-slate-200 mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-lg font-bold text-white">Courses</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setMode('add')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white"
              >
                <Plus className="w-4 h-4" />
                New Course
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                  : 'bg-slate-700/50 text-slate-400 hover:text-violet-400'
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                  : 'bg-slate-700/50 text-slate-400 hover:text-violet-400'
                  }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white font-medium cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-800/50 backdrop-blur-xl text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Courses Display */}
        {viewMode === 'list' ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/50 border-b border-slate-600">
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">
                      Course Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">
                      Students
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">
                      Ratings
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No courses found
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b border-slate-600 hover:bg-slate-700/50 transition"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white text-base mb-2">
                                {course.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.lessons} Lessons
                                </span>
                                <span className="flex items-center gap-1">
                                  <HelpCircle className="w-4 h-4" />
                                  {course.quizzes} Quizzes
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-slate-200 font-medium">
                            {course.students}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-violet-400 font-bold">
                            {course.price > 0 ? `₫${course.price.toLocaleString()}` : 'Free'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-bold text-white">
                              {course.rating}
                            </span>
                            <span className="text-slate-400 text-sm">
                              ({course.reviews})
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-2 ${course.statusDisplay.color} text-white text-sm font-semibold px-3 py-1 rounded-full`}
                          >
                            <span className="w-2 h-2 bg-white rounded-full" />
                            {course.statusDisplay.display}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(course.id)}
                              className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                            >
                              <Eye className="w-4 h-4 text-violet-400" />
                            </button>
                            <button
                              onClick={() => handleEdit(course.id)}
                              className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                            >
                              <Edit className="w-4 h-4 text-violet-400" />
                            </button>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="p-2 hover:bg-red-600/50 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400">
                No courses found
              </div>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80'}
                      alt={course.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span
                      className={`absolute top-3 left-3 ${course.statusDisplay.color} text-white text-sm font-semibold px-2.5 py-1 rounded-full`}
                    >
                      {course.statusDisplay.display}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-white text-base mb-2.5 line-clamp-2 group-hover:text-violet-400 transition">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.lessons} Lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" />
                        {course.quizzes} Quizzes
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-white text-sm">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm">
                        ({course.reviews} Reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <span className="text-lg font-bold text-violet-400">
                        {course.price > 0 ? `₫${course.price.toLocaleString()}` : 'Free'}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          onClick={() => handleEdit(course.id)}
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition font-medium text-sm flex items-center gap-1.5 group" to={""}                      >
                          View Course
                        </Link>
                        <button
                          onClick={() => handleEdit(course.id)}
                          className="p-2 hover:bg-slate-600/50 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4 text-violet-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 hover:bg-red-600/50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesContent;