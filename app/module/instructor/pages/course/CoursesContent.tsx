import {
  BookOpen,
  ChevronDown,
  Clock,
  Edit,
  Grid,
  HelpCircle,
  List,
  Search,
  Star,
  Trash2
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const CoursesContent = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const courses = [
    {
      id: 1,
      title: 'Information About UI/UX Design Degree',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 600,
      price: 160,
      rating: 4.5,
      reviews: 300,
      status: 'Published',
      statusColor: 'bg-violet-500'
    },
    {
      id: 2,
      title: 'Wordpress for Beginners - Master Wordpress Quickly',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 500,
      price: 180,
      rating: 4.2,
      reviews: 430,
      status: 'Pending',
      statusColor: 'bg-cyan-500'
    },
    {
      id: 3,
      title: 'Sketch from A to Z (2024): Become an app designer',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 300,
      price: 200,
      rating: 4.7,
      reviews: 140,
      status: 'Draft',
      statusColor: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Build Responsive Real World Websites with Crash Course',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 400,
      price: 220,
      rating: 4.4,
      reviews: 260,
      status: 'Published',
      statusColor: 'bg-violet-500'
    },
    {
      id: 5,
      title: 'Learn JavaScript and Express to become a Expert',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 700,
      price: 170,
      rating: 4.8,
      reviews: 180,
      status: 'Published',
      statusColor: 'bg-violet-500'
    },
    {
      id: 6,
      title: 'Introduction to Python Programming',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 450,
      price: 150,
      rating: 4.8,
      reviews: 180,
      status: 'Published',
      statusColor: 'bg-violet-500'
    },
    {
      id: 7,
      title: 'Build Responsive Websites with HTML5 and CSS3',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 620,
      price: 130,
      rating: 4.9,
      reviews: 510,
      status: 'Published',
      statusColor: 'bg-violet-500'
    },
    {
      id: 8,
      title: 'Information About Photoshop Design Degree',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 550,
      price: 190,
      rating: 4.6,
      reviews: 400,
      status: 'Published',
      statusColor: 'bg-violet-500'
    },
    {
      id: 9,
      title: 'C# Developers Double Your Coding with Visual Studio',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80',
      lessons: 11,
      quizzes: 2,
      duration: '03:15:00 Hours',
      students: 240,
      price: 140,
      rating: 4.1,
      reviews: 180,
      status: 'Published',
      statusColor: 'bg-violet-500'
    }
  ];

  // Dynamic stats based on filtered courses
  const statsCards = [
    {
      title: 'Active Courses',
      count: courses.filter(c => c.status === 'Published').length,
      color: 'from-violet-600 to-purple-600',
      bgColor: 'bg-slate-800/50'
    },
    {
      title: 'Pending',
      count: courses.filter(c => c.status === 'Pending').length,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-slate-800/50'
    },
    {
      title: 'Draft',
      count: courses.filter(c => c.status === 'Draft').length,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-slate-800/50'
    },
    {
      title: 'Free Courses',
      count: courses.filter(c => c.price === 0).length,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-slate-800/50'
    },
    {
      title: 'Paid Courses',
      count: courses.filter(c => c.price > 0).length,
      color: 'from-violet-600 to-pink-600',
      bgColor: 'bg-slate-800/50'
    }
  ];

  // Filter courses by search query and status
  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(course =>
      selectedStatus === 'All' || course.status === selectedStatus
    );

  const handleEdit = (id: number) => {
    console.log(`Editing course with ID: ${id}`);
    // TODO: Implement edit functionality (e.g., navigate to edit page)
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting course with ID: ${id}`);
    // TODO: Implement delete functionality (e.g., confirm dialog, API call)
  };

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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-80`} />
              <div className="relative p-6 text-white">
                <h3 className="text-sm font-semibold text-slate-200 mb-2">{stat.title}</h3>
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
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Course Name</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Students</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Price</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Ratings</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b border-slate-600 hover:bg-slate-700/50 transition">
                      {/* Course Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-base mb-2">{course.title}</h3>
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

                      {/* Students */}
                      <td className="py-4 px-6">
                        <span className="text-slate-200 font-medium">{course.students}</span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <span className="text-violet-400 font-bold">${course.price}</span>
                      </td>

                      {/* Ratings */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white">{course.rating}</span>
                          <span className="text-slate-400 text-sm">({course.reviews})</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-2 ${course.statusColor} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
                          <span className="w-2 h-2 bg-white rounded-full" />
                          {course.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className={`absolute top-3 left-3 ${course.statusColor} text-white text-sm font-semibold px-2.5 py-1 rounded-full`}>
                    {course.status}
                  </span>
                </div>

                {/* Content */}
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
                      <span className="font-semibold text-white text-sm">{course.rating}</span>
                    </div>
                    <span className="text-slate-400 text-sm">({course.reviews} Reviews)</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <span className="text-lg font-bold text-violet-400">${course.price}</span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/courses/${course.id}`}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition font-medium text-sm flex items-center gap-1.5 group"
                      >
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesContent;