// ~/module/instructor/pages/course/CourseDetailInstructor.tsx
import type { FC } from "react";
import {
  BookOpen,
  Clock,
  DollarSign,
  Edit,
  Eye,
  HelpCircle,
  Star,
  Users,
  ChevronLeft,
  Trash2,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";
import type { Course } from "~/module/instructor/types/CourseInstructor";



interface CourseDetailInstructorProps {
  course: Course;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onManageChapters?: (courseId: string) => void;
  onManageLessons?: (courseId: string) => void;
  onManageQuizzes?: (courseId: string) => void;
}

const CourseDetailInstructor: FC<CourseDetailInstructorProps> = ({
  course,
  onBack,
  onEdit,
  onDelete,
  onManageChapters,
  onManageLessons,
  onManageQuizzes,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Courses
        </button>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          {/* Header Image + Status */}
          <div className="relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {course.title}
              </h1>
              <span
                className={`inline-flex items-center gap-2 ${course.statusColor} text-white text-sm font-semibold px-3 py-1 rounded-full`}
              >
                <span className="w-2 h-2 bg-white rounded-full" />
                {course.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Stats */}
              <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  <span className="text-sm">Total Students</span>
                </div>
                <p className="text-2xl font-bold text-white">{course.students}</p>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Price</span>
                </div>
                <p className="text-2xl font-bold text-violet-400">
                  ${course.price}
                  {course.price === 0 && " (Free)"}
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    {course.rating}
                  </span>
                  <span className="text-slate-400 text-sm">
                    ({course.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-slate-500">Duration</p>
                  <p className="font-medium">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-slate-500">Lessons</p>
                  <p className="font-medium">{course.lessons} lessons</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <HelpCircle className="w-5 h-5 text-pink-400" />
                <div>
                  <p className="text-slate-500">Quizzes</p>
                  <p className="font-medium">{course.quizzes} quizzes</p>
                </div>
              </div>
            </div>

            {/* Description (nếu có) */}
            {course.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Description
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {course.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-700">
              <Link
                to={`/instructor/courses/${course.id}/preview`}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg font-medium transition text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview Course
              </Link>

              <button
                onClick={() => onEdit(course.id)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition text-sm border border-slate-600"
              >
                <Edit className="w-4 h-4" />
                Edit Course
              </button>

              <button
                onClick={() => onDelete(course.id)}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-900/50 hover:bg-red-800/60 text-red-400 rounded-lg font-medium transition text-sm border border-red-800/50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Quản lý nội dung khóa học</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Chapters Management */}
            <div 
              onClick={() => onManageChapters?.(course.id)}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 cursor-pointer hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-violet-500/20 rounded-lg group-hover:bg-violet-500/30 transition">
                  <BookOpen className="w-6 h-6 text-violet-400" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-violet-400 transition" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quản lý Chapters
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Tạo và quản lý các chương trong khóa học
              </p>
              <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                <span>Quản lý</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Lessons Management */}
            <div 
              onClick={() => onManageLessons?.(course.id)}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 cursor-pointer hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quản lý Lessons
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Tạo và quản lý các bài học trong khóa học
              </p>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                <span>Quản lý</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Quizzes Management */}
            <div 
              onClick={() => onManageQuizzes?.(course.id)}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 cursor-pointer hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/20 transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition">
                  <HelpCircle className="w-6 h-6 text-pink-400" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quản lý Quizzes
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Tạo và quản lý các bài kiểm tra trong khóa học
              </p>
              <div className="flex items-center gap-2 text-pink-400 text-sm font-medium">
                <span>Quản lý</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Student Analytics
            </h3>
            <p className="text-slate-400 text-sm">
              Track student progress, completion rates, and engagement.
            </p>
            <Link
              to={`/instructor/courses/${course.id}/analytics`}
              className="mt-3 inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium"
            >
              View Analytics
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailInstructor;