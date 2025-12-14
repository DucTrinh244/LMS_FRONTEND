import { useQuery } from '@tanstack/react-query';
import { AlertCircle, BookMarked, BookOpen, CheckCircle, Heart, Loader2, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { studentDashboardService } from '~/module/student/services/DashboardApi';
import type { DashboardSummaryDto } from '~/module/student/types/dashboard';
import { useToast } from '~/shared/hooks/useToast';

// Helper function to format currency
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  if (currency === 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  }
  // For USD and other currencies, remove .00 if it's a whole number
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
  // Remove .00 if present
  return formatted.replace(/\.00$/, '');
};

const DashboardContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch dashboard summary
  const {
    data: summary,
    isLoading,
    error,
    refetch
  } = useQuery<DashboardSummaryDto>({
    queryKey: ['student-dashboard-summary'],
    queryFn: () => studentDashboardService.getSummary(),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 2,
    onError: (error: any) => {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể tải dữ liệu dashboard',
        variant: 'destructive'
      });
    }
  });

  const handleContinueQuiz = () => {
    if (summary?.currentQuiz?.quizId) {
      navigate(`/student/quiz/${summary.currentQuiz.quizId}/attempt`);
    }
  };

  const handleViewCourse = (courseId: string) => {
    navigate(`/courses-watch?courseId=${courseId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          <p className="text-slate-400">Đang tải dữ liệu dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <div>
            <p className="text-red-400 font-semibold mb-2">Không thể tải dữ liệu dashboard</p>
            <p className="text-slate-400 text-sm mb-4">
              {(error as any)?.message || 'Đã xảy ra lỗi không xác định'}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!summary) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Progress */}
      {summary.currentQuiz && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Quiz: {summary.currentQuiz.quizTitle}</h3>
              <p className="text-sm text-slate-400">
                Answered: {summary.currentQuiz.answeredQuestions}/{summary.currentQuiz.totalQuestions}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {summary.currentQuiz.courseTitle} • {summary.currentQuiz.lessonTitle}
              </p>
            </div>
            <button
              onClick={handleContinueQuiz}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition"
            >
              Continue Quiz
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{summary.stats.enrolledCourses}</div>
              <div className="text-gray-600 text-sm font-medium text-slate-300">Enrolled Courses</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <BookMarked className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{summary.stats.activeCourses}</div>
              <div className="text-gray-600 text-sm font-medium text-slate-300">Active Courses</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{summary.stats.completedCourses}</div>
              <div className="text-gray-600 text-sm font-medium text-slate-300">Completed Courses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Enrolled Courses */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
        <h3 className="text-xl font-bold text-white mb-6">Recently Enrolled Courses</h3>
        {summary.recentlyEnrolledCourses && summary.recentlyEnrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {summary.recentlyEnrolledCourses.slice(0, 2).map((course) => (
              <div key={course.id} className="group relative bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-violet-500/50 transition">
                {/* Image */}
                <div className="relative">
                  <img
                    src={course.thumbnailUrl || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80`}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      // Fallback to a different fake image if the first one fails
                      const fakeImages = [
                        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
                        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
                        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
                      ];
                      const currentSrc = (e.target as HTMLImageElement).src;
                      const nextImage = fakeImages.find(img => !currentSrc.includes(img)) || fakeImages[0];
                      (e.target as HTMLImageElement).src = nextImage;
                    }}
                  />
                  <button className="absolute top-3 right-3 bg-slate-700/50 p-2 rounded-full shadow-md hover:bg-violet-600/50 transition">
                    <Heart className="w-4 h-4 text-violet-400" />
                  </button>
                  {course.badge && (
                    <span className="absolute top-3 left-3 bg-violet-600/20 text-violet-400 text-xs font-bold px-3 py-1 rounded-full">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {course.instructorAvatarUrl ? (
                        <img
                          src={course.instructorAvatarUrl}
                          alt={course.instructorName}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=U';
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                          <span className="text-xs text-slate-400">{course.instructorName.charAt(0)}</span>
                        </div>
                      )}
                      <span className="text-sm text-slate-300 font-medium">{course.instructorName}</span>
                    </div>
                    <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <h4 className="text-white font-bold mb-3 line-clamp-2 group-hover:text-violet-400 transition">
                    {course.title}
                  </h4>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-sm text-white">{course.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-400 text-sm">({course.reviewCount} Reviews)</span>
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-slate-700">
                    <button
                      onClick={() => handleViewCourse(course.id)}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition text-sm"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-400">Chưa có khóa học nào</p>
          </div>
        )}
      </div>

      {/* Latest Quizzes */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
        <h3 className="text-xl font-bold text-white mb-6">Latest Quizzes</h3>
        {summary.latestQuizzes && summary.latestQuizzes.length > 0 ? (
          <div className="space-y-4">
            {summary.latestQuizzes.map((quiz) => (
              <div key={quiz.attemptId} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{quiz.quizTitle}</h4>
                    <p className="text-xs text-slate-400 mt-1">{quiz.courseTitle}</p>
                  </div>
                  <span className="text-white font-semibold">{quiz.percentage.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                  <span>Correct Answer: {quiz.correctAnswers}/{quiz.totalQuestions}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-violet-600 h-2 rounded-full transition-all"
                    style={{ width: `${quiz.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-slate-400">Chưa có quiz nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;