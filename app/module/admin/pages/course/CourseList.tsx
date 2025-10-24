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
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <div key={course.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
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
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-1">Giảng viên: {course.instructor}</p>
          <p className="text-xs text-gray-500 mb-2">{course.category} • {course.duration}</p>
          
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
            <span>⭐ {course.rating > 0 ? course.rating : 'N/A'}</span>
            <span>•</span>
            <span>{course.students} học viên</span>
            <span>•</span>
            <span>${course.revenue.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
            <button
              onClick={() => onViewDetail(course)}
              className="flex-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium flex items-center justify-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Chi tiết
            </button>

            {course.status === 'pending' && (
              <>
                <button
                  onClick={() => onApprove(course.id)}
                  className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition"
                  title="Phê duyệt"
                >
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </button>
                <button
                  onClick={() => onReject(course.id)}
                  className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition"
                  title="Từ chối"
                >
                  <XCircle className="w-4 h-4 text-red-700" />
                </button>
              </>
            )}

            {(course.status === 'active' || course.status === 'inactive') && (
              <button
                onClick={() => onToggleStatus(course.id)}
                className={`p-1.5 rounded-lg transition ${
                  course.status === 'active' 
                    ? 'bg-gray-100 hover:bg-gray-200' 
                    : 'bg-green-100 hover:bg-green-200'
                }`}
                title={course.status === 'active' ? 'Tạm ẩn' : 'Kích hoạt'}
              >
                {course.status === 'active' 
                  ? <Lock className="w-4 h-4 text-gray-700" />
                  : <Unlock className="w-4 h-4 text-green-700" />
                }
              </button>
            )}

            <button
              onClick={() => onEdit(course)}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition"
              title="Chỉnh sửa"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(course.id)}
              className="p-1.5 hover:bg-red-100 rounded-lg transition"
              title="Xóa"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
