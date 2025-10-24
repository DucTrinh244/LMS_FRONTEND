import { Image as ImageIcon, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import type { Course } from '~/module/admin/types/Course';





const CourseEdit: React.FC<{
  course: Course;
  onBack: () => void;
  onSave: (updatedCourse: Course) => void;
}> = ({ course, onBack, onSave }) => {
  
  
  const [formData, setFormData] = useState<Course>(course);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Development',
    'Design',
    'Business',
    'Marketing',
    'Data Science',
    'Photography',
    'Music',
    'Health & Fitness',
    'Language Learning'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tên khóa học không được để trống';
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Tên giảng viên không được để trống';
    }

    if (formData.price < 0) {
      newErrors.price = 'Giá không được âm';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Thời lượng không được để trống';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'URL hình ảnh không được để trống';
    } else if (!formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = 'URL hình ảnh không hợp lệ';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Mô tả phải có ít nhất 50 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: keyof Course, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa khóa học</h2>
          <p className="text-gray-600 text-sm mt-1">Cập nhật thông tin khóa học</p>
        </div>
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Đóng"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Preview */}
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Xem trước</h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="relative mb-3">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-40 rounded-lg bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {formData.title || 'Tên khóa học'}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {formData.instructor || 'Giảng viên'}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {formData.category} • {formData.duration || 'Thời lượng'}
              </p>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-lg font-bold text-purple-600">${formData.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin cơ bản</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên khóa học <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập tên khóa học"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giảng viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white ${
                    errors.instructor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập tên giảng viên"
                />
                {errors.instructor && (
                  <p className="text-red-500 text-xs mt-1">{errors.instructor}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Danh mục <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white" 
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
                  >
                    <option value="pending">Chờ duyệt</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Tạm ẩn</option>
                    <option value="rejected">Đã từ chối</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    } text-black bg-white`}
                    placeholder="149"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thời lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.duration ? 'border-red-500' : 'border-gray-300'
                    } text-black bg-white`}
                    placeholder="40 giờ"
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hình ảnh */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Hình ảnh</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Nhập URL hình ảnh từ internet (khuyến nghị kích thước 800x600px)
              </p>
            </div>
          </div>

          {/* Mô tả */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Mô tả chi tiết</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mô tả khóa học <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập mô tả chi tiết về khóa học, nội dung học viên sẽ được học..."
              />
              <div className="flex items-center justify-between mt-1">
                {errors.description ? (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Tối thiểu 50 ký tự
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.description.length} ký tự
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin chỉ xem */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin thống kê</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Số học viên</p>
                <p className="text-xl font-bold text-gray-900">{formData.students}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Đánh giá</p>
                <p className="text-xl font-bold text-gray-900">
                  {formData.rating > 0 ? `⭐ ${formData.rating}` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Doanh thu</p>
                <p className="text-xl font-bold text-gray-900">${formData.revenue.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              * Các thông tin này chỉ để xem, không thể chỉnh sửa
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEdit;