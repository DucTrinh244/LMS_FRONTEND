import { CheckCircle, Edit, Eye, Lock, Trash2, Unlock, XCircle } from "lucide-react";
import type { Course } from "~/module/admin/types/Course";

export const CourseList: React.FC<{
  courses: Course[];
  onViewDetail: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onToggleStatus: (id: string) => void;
}> = ({ courses, onViewDetail, onEdit, onDelete, onApprove, onReject, onToggleStatus }) => {

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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div key={course.id} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600 hover:border-slate-500 hover:shadow-lg transition">
          <div className="relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 rounded-lg object-cover mb-4"
            />
            <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
              {getStatusText(course.status)}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{course.title}</h3>
          <p className="text-sm text-slate-300 mb-1">Giảng viên: {course.instructor}</p>
          <p className="text-xs text-slate-400 mb-2">{course.category} • {course.duration}</p>

          <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <span>⭐ {course.rating > 0 ? course.rating : 'N/A'}</span>
            <span>•</span>
            <span>{course.students} học viên</span>
            <span>•</span>
            <span>${course.revenue.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-600">
            <button
              onClick={() => onViewDetail(course)}
              className="flex-1 px-3 py-1.5 bg-violet-600/20 text-violet-400 border border-violet-600/30 rounded-lg hover:bg-violet-600/30 transition text-sm font-medium flex items-center justify-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Chi tiết
            </button>

            {course.status === 'pending' && (
              <>
                <button
                  onClick={() => onApprove(course.id)}
                  className="p-1.5 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 rounded-lg transition"
                  title="Phê duyệt"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={() => onReject(course.id)}
                  className="p-1.5 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 rounded-lg transition"
                  title="Từ chối"
                >
                  <XCircle className="w-4 h-4 text-red-400" />
                </button>
              </>
            )}

            {(course.status === 'active' || course.status === 'inactive') && (
              <button
                onClick={() => onToggleStatus(course.id)}
                className={`p-1.5 rounded-lg transition border ${course.status === 'active'
                    ? 'bg-slate-600/20 hover:bg-slate-600/30 border-slate-600/30'
                    : 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30'
                  }`}
                title={course.status === 'active' ? 'Tạm ẩn' : 'Kích hoạt'}
              >
                {course.status === 'active'
                  ? <Lock className="w-4 h-4 text-slate-400" />
                  : <Unlock className="w-4 h-4 text-green-400" />
                }
              </button>
            )}

            <button
              onClick={() => onEdit(course)}
              className="p-1.5 hover:bg-slate-600/30 rounded-lg transition border border-slate-600/30"
              title="Chỉnh sửa"
            >
              <Edit className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="p-1.5 hover:bg-red-600/20 rounded-lg transition border border-red-600/30"
              title="Xóa"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
