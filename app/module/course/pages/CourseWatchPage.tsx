import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router';
import CourseDetailView from '~/module/course/components/CourseDetailView';
import { courseStudentService } from '~/module/course/services/CourseApi';
import Footer from '~/shared/components/ui/Footer';
import Header from '~/shared/components/ui/Header';
import { Loader2, AlertCircle } from 'lucide-react';

const CourseWatchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('courseId');

  // Fetch course data
  const {
    data: courseData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['course-student', courseId],
    queryFn: () => courseStudentService.getCourseForStudent(courseId!),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Đang tải khóa học...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !courseId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              {!courseId ? 'Không tìm thấy khóa học' : 'Lỗi tải khóa học'}
            </h2>
            <p className="text-red-400 mb-4">
              {error instanceof Error ? error.message : 'Không thể tải thông tin khóa học'}
            </p>
            <button
              onClick={() => navigate('/student')}
              className="bg-violet-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-violet-700 transition"
            >
              Quay lại
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No data state
  if (!courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <p className="text-slate-300">Không tìm thấy thông tin khóa học</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <CourseDetailView courseData={courseData} />
      </main>
      <Footer/>
    </div>
  );
};

export default CourseWatchPage;