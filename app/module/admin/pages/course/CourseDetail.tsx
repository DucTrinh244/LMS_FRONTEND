import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Star,
  Tag,
  TrendingUp,
  User,
  XCircle
} from "lucide-react";
import type { Course } from "~/module/admin/types/Course";

export const CourseDetailComponent: React.FC<{
  course: Course;
  onBack: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ course, onBack, onApprove, onReject }) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-400 border border-green-600/30';
      case 'pending': return 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30';
      case 'inactive': return 'bg-slate-600/20 text-slate-400 border border-slate-600/30';
      case 'rejected': return 'bg-red-600/20 text-red-400 border border-red-600/30';
      default: return 'bg-slate-600/20 text-slate-400 border border-slate-600/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hoạt động';
      case 'pending': return 'Chờ duyệt';
      case 'inactive': return 'Tạm ẩn';
      case 'rejected': return 'Đã từ chối';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-3">{course.title}</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(course.status)}`}>
              {getStatusText(course.status)}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {course.category}
            </span>
          </div>
        </div>
      </div>

      {/* Course Image */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Học viên</span>
          </div>
          <p className="text-2xl font-bold text-white">{course.students}</p>
          <p className="text-xs text-slate-400 mt-1">người</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Đánh giá</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {course.rating > 0 ? course.rating.toFixed(1) : 'N/A'}
          </p>
          <p className="text-xs text-slate-400 mt-1">{course.reviews} reviews</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Doanh thu</span>
          </div>
          <p className="text-2xl font-bold text-white">${course.revenue.toLocaleString()}</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            <span className="text-sm text-slate-400">Giá</span>
          </div>
          <p className="text-2xl font-bold text-white">${course.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Course Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            Thông tin khóa học
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">Giảng viên</p>
                <p className="text-white font-medium">{course.instructor}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">Danh mục</p>
                <p className="text-white font-medium">{course.category}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">Thời lượng</p>
                <p className="text-white font-medium">{course.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">Giá khóa học</p>
                <p className="text-white font-medium">${course.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">Ngày tạo</p>
                <p className="text-white font-medium">
                  {new Date(course.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            Thống kê
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
              <span className="text-slate-400">Tổng học viên</span>
              <span className="text-white font-semibold">{course.students} người</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
              <span className="text-slate-400">Đánh giá trung bình</span>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">
                  {course.rating > 0 ? course.rating.toFixed(1) : 'Chưa có'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
              <span className="text-slate-400">Số lượng reviews</span>
              <span className="text-white font-semibold">{course.reviews} reviews</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
              <span className="text-slate-400">Tổng doanh thu</span>
              <span className="text-green-400 font-semibold">${course.revenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-violet-400" />
          Mô tả khóa học
        </h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{course.description}</p>
      </div>

      {/* Action Buttons for Pending Courses */}
      {course.status === 'pending' && (
        <div className="flex gap-4 pt-6 border-t border-slate-700">
          <button
            onClick={() => {
              onApprove(course.id);
            }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
          >
            <CheckCircle className="w-5 h-5" />
            Phê duyệt khóa học
          </button>
          <button
            onClick={() => {
              onReject(course.id);
            }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
          >
            <XCircle className="w-5 h-5" />
            Từ chối khóa học
          </button>
        </div>
      )}
    </div>
  );
};
