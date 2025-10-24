import type { Course } from "~/module/admin/types/Course";

// Component chi tiết khóa học (Sẽ tách ra file riêng: CourseDetail.tsx)
 export const CourseDetailComponent: React.FC<{
  course: Course;
  onBack: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ course, onBack, onApprove, onReject }) => {
  
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
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(course.status)}`}>
            {getStatusText(course.status)}
          </span>
        </div>
      </div>

      <img
        src={course.image}
        alt={course.title}
        className="w-full h-96 rounded-lg object-cover mb-6"
      />

      <div className="grid md:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin khóa học</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Giảng viên:</span>
              <span className="text-gray-600">{course.instructor}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Danh mục:</span>
              <span className="text-gray-600">{course.category}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Thời lượng:</span>
              <span className="text-gray-600">{course.duration}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Giá:</span>
              <span className="text-gray-600">${course.price}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Ngày tạo:</span>
              <span className="text-gray-600">{new Date(course.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Thống kê</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Học viên:</span>
              <span className="text-gray-600">{course.students} người</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Đánh giá:</span>
              <span className="text-gray-600">
                ⭐ {course.rating > 0 ? course.rating : 'Chưa có'} ({course.reviews} reviews)
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Doanh thu:</span>
              <span className="text-gray-600">${course.revenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Mô tả khóa học</h3>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      {course.status === 'pending' && (
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              onApprove(course.id);
              onBack();
            }}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            ✓ Phê duyệt khóa học
          </button>
          <button
            onClick={() => {
              onReject(course.id);
              onBack();
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            ✗ Từ chối khóa học
          </button>
        </div>
      )}
    </div>
  );
};