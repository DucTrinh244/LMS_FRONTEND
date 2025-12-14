import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useCourseAdmin, useCourseById } from "~/module/admin/hooks/useCourse";
import { CourseDetailComponent } from "~/module/admin/pages/course/CourseDetail";
import CourseEdit from "~/module/admin/pages/course/CourseEdit";
import { CourseList } from "~/module/admin/pages/course/CourseList";
import type { AdminCourseDto, Course } from "~/module/admin/types/Course";
import { formatCurrency } from "~/module/admin/types/Course";
import { useConfirmDialog } from "~/shared/hooks/useConfirmDialog";

// Helper function to convert AdminCourseDto to Course (for backward compatibility)
const mapAdminCourseToCourse = (adminCourse: AdminCourseDto): Course => {
  return {
    id: adminCourse.id,
    title: adminCourse.title,
    instructor: adminCourse.instructorName,
    price: adminCourse.price,
    image: adminCourse.thumbnailUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    category: adminCourse.categoryName,
    status: adminCourse.status,
    students: adminCourse.totalStudents,
    duration: `${adminCourse.durationHours} giờ`,
    description: adminCourse.description || adminCourse.shortDescription,
    revenue: adminCourse.totalRevenue,
    rating: adminCourse.averageRating,
    reviews: adminCourse.totalReviews,
    createdAt: adminCourse.createdAt,
  };
};

// Component chính
const CoursesContent: React.FC = () => {
  const { confirm } = useConfirmDialog();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCourseEdit, setSelectedCourseEdit] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterInstructor, setFilterInstructor] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterCategory, filterInstructor]);

  // Fetch courses with API
  const {
    courses: adminCourses,
    totalCount,
    totalPages,
    stats: listStats,
    globalStats,
    loading,
    error,
    approveCourse,
    rejectCourse,
    toggleStatus,
    deleteCourse,
    isApproving,
    isRejecting,
    isToggling,
    isDeleting,
  } = useCourseAdmin({
    page: currentPage,
    pageSize,
    status: filterStatus === "all" ? undefined : (filterStatus as any),
    category: filterCategory === "all" ? undefined : filterCategory,
    search: debouncedSearchTerm || undefined,
  });

  // Fetch selected course detail
  const {
    course: selectedCourseDetail,
    loading: detailLoading,
  } = useCourseById(selectedCourseId || "");

  // Convert AdminCourseDto to Course
  const courses: Course[] = useMemo(() => {
    return adminCourses.map(mapAdminCourseToCourse);
  }, [adminCourses]);

  // Get unique categories and instructors from courses
  const categories = useMemo(() => {
    const uniqueCategories = new Set(courses.map((c) => c.category));
    return Array.from(uniqueCategories).sort();
  }, [courses]);

  const instructors = useMemo(() => {
    const uniqueInstructors = new Set(courses.map((c) => c.instructor));
    return Array.from(uniqueInstructors).sort();
  }, [courses]);

  // Use stats from API
  const stats = listStats || globalStats;

  const handleViewDetail = (course: Course) => {
    setSelectedCourseId(course.id);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourseEdit(course);
  };

  const handleBackToList = () => {
    setSelectedCourseId(null);
    setSelectedCourseEdit(null);
  };

  const handleApprove = async (id: string) => {
    const ok = await confirm("Phê duyệt khóa học này?");
    if (ok) {
      try {
        await approveCourse(id);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Nhập lý do từ chối:");
    if (!reason) {
      return;
    }
    const ok = await confirm("Từ chối khóa học này?");
    if (ok) {
      try {
        await rejectCourse(id, { reason });
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;

    const newStatus = course.status === "active" ? "inactive" : "active";
    const ok = await confirm(
      `Chuyển trạng thái khóa học sang "${newStatus === "active" ? "Đang hoạt động" : "Tạm ẩn"}"?`
    );
    if (ok) {
      try {
        await toggleStatus(id, { status: newStatus });
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm("Bạn có chắc chắn muốn xóa khóa học này?");
    if (ok) {
      try {
        await deleteCourse(id);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const handleSaveCourse = (updatedCourse: Course) => {
    // This will be handled by CourseEdit component
    setSelectedCourseEdit(null);
  };

  // Filter courses client-side for instructor filter (since API doesn't support it)
  const filteredCourses = useMemo(() => {
    if (filterInstructor === "all") {
      return courses;
    }
    return courses.filter((course) => course.instructor === filterInstructor);
  }, [courses, filterInstructor]);

  // Get selected course for detail view
  const selectedCourse = useMemo(() => {
    if (!selectedCourseId || !selectedCourseDetail) return null;
    return mapAdminCourseToCourse(selectedCourseDetail);
  }, [selectedCourseId, selectedCourseDetail]);

  // Loading state
  if (loading && courses.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-slate-400">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && courses.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-red-400">Lỗi: {error}</div>
        </div>
      </div>
    );
  }

  // Course Detail View
  if (selectedCourse) {
    if (detailLoading) {
      return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <button
            onClick={handleBackToList}
            className="mb-4 px-4 py-2 text-violet-400 hover:bg-violet-600/20 rounded-lg transition flex items-center gap-2"
          >
            ← Quay lại danh sách
          </button>
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-400">Đang tải chi tiết khóa học...</div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
        <button
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 text-violet-400 hover:bg-violet-600/20 rounded-lg transition flex items-center gap-2"
        >
          ← Quay lại danh sách
        </button>
        <CourseDetailComponent
          course={selectedCourse}
          onBack={handleBackToList}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    );
  }

  // Course Edit View
  if (selectedCourseEdit) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
        <button
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 text-violet-400 hover:bg-violet-600/20 rounded-lg transition flex items-center gap-2"
        >
          ← Quay lại danh sách
        </button>
        <CourseEdit course={selectedCourseEdit} onBack={handleBackToList} onSave={handleSaveCourse} />
      </div>
    );
  }

  // Main List View
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Quản lý khóa học</h2>
        <p className="text-slate-400">Quản lý, duyệt và theo dõi tất cả các khóa học trên nền tảng</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-violet-600/20 rounded-lg p-4 border border-violet-600/30">
          <p className="text-sm text-violet-400 font-semibold">Tổng khóa học</p>
          <p className="text-2xl font-bold text-white">{stats?.totalCourses || totalCount || 0}</p>
        </div>
        <div className="bg-green-600/20 rounded-lg p-4 border border-green-600/30">
          <p className="text-sm text-green-400 font-semibold">Đang hoạt động</p>
          <p className="text-2xl font-bold text-white">{stats?.activeCourses || 0}</p>
        </div>
        <div className="bg-yellow-600/20 rounded-lg p-4 border border-yellow-600/30">
          <p className="text-sm text-yellow-400 font-semibold">Chờ duyệt</p>
          <p className="text-2xl font-bold text-white">{stats?.pendingCourses || 0}</p>
        </div>
        <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-600/30">
          <p className="text-sm text-blue-400 font-semibold">Tổng học viên</p>
          <p className="text-2xl font-bold text-white">{stats?.totalStudents || 0}</p>
        </div>
        <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-600/30">
          <p className="text-sm text-indigo-400 font-semibold">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-white">
            {stats?.totalRevenue ? formatCurrency(stats.totalRevenue).replace(".00", "") : "0 ₫"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-slate-400"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="pending">Chờ duyệt</option>
          <option value="inactive">Tạm ẩn</option>
          <option value="rejected">Đã từ chối</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filterInstructor}
          onChange={(e) => setFilterInstructor(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
        >
          <option value="all">Tất cả giảng viên</option>
          {instructors.map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </select>
      </div>

      {/* Course List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Đang tải dữ liệu...</p>
        </div>
      ) : filteredCourses.length > 0 ? (
        <>
          <CourseList
            courses={filteredCourses}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onApprove={handleApprove}
            onReject={handleReject}
            onToggleStatus={handleToggleStatus}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
              <div className="text-sm text-slate-400">
                Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} trong tổng số {totalCount} khóa học
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        disabled={loading}
                        className={`px-3 py-2 rounded-lg transition ${currentPage === pageNum
                            ? "bg-violet-600 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          } disabled:opacity-50`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400">Không tìm thấy khóa học nào</p>
        </div>
      )}
    </div>
  );
};

export default CoursesContent;
