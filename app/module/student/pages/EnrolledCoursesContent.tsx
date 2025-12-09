import { Award, BookOpen, CheckCircle, Clock, Play, Star, TrendingUp } from 'lucide-react';

const EnrolledCoursesContent = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Information About UI/UX Design Degree',
      instructor: 'Brenda Staton',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Design',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      status: 'in-progress',
      lastAccessed: '2 days ago'
    },
    {
      id: 2,
      title: 'Wordpress for Beginners - Master Wordpress Quickly',
      instructor: 'Ana Reyes',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      category: 'Wordpress',
      progress: 100,
      totalLessons: 38,
      completedLessons: 38,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80',
      status: 'completed',
      lastAccessed: '1 week ago'
    },
    {
      id: 3,
      title: 'Sketch from A to Z (2024): Become an app designer',
      instructor: 'Andrew Pinto',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      category: 'Design',
      progress: 45,
      totalLessons: 52,
      completedLessons: 23,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80',
      status: 'in-progress',
      lastAccessed: '1 day ago'
    },
    {
      id: 4,
      title: 'Build Responsive Real World Websites',
      instructor: 'John Smith',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      category: 'Development',
      progress: 20,
      totalLessons: 60,
      completedLessons: 12,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      status: 'in-progress',
      lastAccessed: '3 days ago'
    }
  ];

  const stats = {
    total: enrolledCourses.length,
    inProgress: enrolledCourses.filter(c => c.status === 'in-progress').length,
    completed: enrolledCourses.filter(c => c.status === 'completed').length,
    averageProgress: Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
              <div className="text-sm font-medium text-slate-300">Total Courses</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.inProgress}</div>
              <div className="text-sm font-medium text-slate-300">In Progress</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.completed}</div>
              <div className="text-sm font-medium text-slate-300">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.averageProgress}%</div>
              <div className="text-sm font-medium text-slate-300">Avg Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="space-y-4">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-800 rounded-xl border border-slate-700 shadow-md hover:shadow-violet-500/50 transition overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Course Image */}
              <div className="md:w-64 h-48 md:h-auto relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`${course.status === 'completed'
                    ? 'bg-green-600/20 text-green-400'
                    : 'bg-violet-600/20 text-violet-400'
                    } text-xs font-semibold px-3 py-1 rounded-full`}>
                    {course.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-white font-semibold">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-slate-300">{course.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Progress</span>
                    <span className="text-sm font-semibold text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Last accessed {course.lastAccessed}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </button>
                  {course.status === 'completed' && (
                    <button className="bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-600 transition flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      View Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesContent;