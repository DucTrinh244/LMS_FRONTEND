import { useQuery } from '@tanstack/react-query';
import { Award, BookOpen, CheckCircle, Clock, Play, TrendingUp, HelpCircle, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { enrollmentService } from '~/module/student/services/EnrollmentApi';
import type { EnrollmentDto } from '~/module/student/types/enrollment';
import { EnrollmentStatus, formatLastAccessed, isEnrollmentCompleted } from '~/module/student/types/enrollment';

const EnrolledCoursesContent = () => {
  const navigate = useNavigate();

  // Fetch enrolled courses from API
  const {
    data: enrollments = [],
    isLoading,
    error,
    refetch
  } = useQuery<EnrollmentDto[]>({
    queryKey: ['my-enrolled-courses'],
    queryFn: () => enrollmentService.getMyEnrolledCourses(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Calculate stats from API data
  const stats = {
    total: enrollments.length,
    inProgress: enrollments.filter(e => e.status === EnrollmentStatus.Active && !isEnrollmentCompleted(e)).length,
    completed: enrollments.filter(e => isEnrollmentCompleted(e)).length,
    averageProgress: enrollments.length > 0
      ? Math.round(enrollments.reduce((acc, e) => acc + e.progressPercentage, 0) / enrollments.length)
      : 0
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Đang tải khóa học đã đăng ký...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">
            {error instanceof Error ? error.message : 'Không thể tải danh sách khóa học'}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-violet-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-violet-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (enrollments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Chưa có khóa học nào</h3>
          <p className="text-slate-400 mb-6">
            Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học và bắt đầu học ngay hôm nay!
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition"
          >
            Xem khóa học
          </button>
        </div>
      </div>
    );
  }

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
        {enrollments.map((enrollment) => {
          const isCompleted = isEnrollmentCompleted(enrollment);
          const defaultImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80';
          
          return (
            <div
              key={enrollment.id}
              className="bg-slate-800 rounded-xl border border-slate-700 shadow-md hover:shadow-violet-500/50 transition overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Course Image */}
                <div className="md:w-64 h-48 md:h-auto relative">
                  <img
                    src={enrollment.courseThumbnail || defaultImage}
                    alt={enrollment.courseTitle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`${isCompleted
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-violet-600/20 text-violet-400'
                      } text-xs font-semibold px-3 py-1 rounded-full`}>
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{enrollment.courseTitle}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-semibold">
                            {enrollment.instructorName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-slate-300">{enrollment.instructorName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Progress</span>
                      <span className="text-sm font-semibold text-white">{enrollment.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>{enrollment.completedLessons}/{enrollment.totalLessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Last accessed {formatLastAccessed(enrollment.lastAccessed)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => navigate(`/courses-watch?courseId=${enrollment.courseId}`)}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </button>
                    <button
                      onClick={() => navigate('/student')}
                      className="bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-600 transition flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      View Quizzes
                    </button>
                    {isCompleted && enrollment.certificateUrl && (
                      <a
                        href={enrollment.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-600 transition flex items-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCoursesContent;