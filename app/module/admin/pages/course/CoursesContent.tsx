import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useCourseAdmin } from '~/module/admin/hooks/useCourse';
import { CourseDetailComponent } from '~/module/admin/pages/course/CourseDetail';
import CourseEdit from '~/module/admin/pages/course/CourseEdit';
import { CourseList } from '~/module/admin/pages/course/CourseList';
import { useConfirmDialog } from '~/shared/hooks/useConfirmDialog';
import type { Course } from '~/module/admin/types/Course';


const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Wilson',
    price: 149,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    category: 'Development',
    status: 'active',
    students: 1234,
    duration: '40 giờ',
    description: 'Khóa học lập trình web toàn diện từ cơ bản đến nâng cao. Học viên sẽ được trang bị kiến thức về HTML, CSS, JavaScript, React, Node.js và nhiều công nghệ khác.',
    revenue: 183766,
    rating: 4.8,
    reviews: 342,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'John Doe',
    price: 129,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    category: 'Design',
    status: 'active',
    students: 856,
    duration: '30 giờ',
    description: 'Học cách thiết kế trải nghiệm người dùng chuyên nghiệp với Figma, Adobe XD. Khóa học bao gồm các nguyên tắc thiết kế, research, wireframing và prototyping.',
    revenue: 110424,
    rating: 4.6,
    reviews: 178,
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Data Science with Python',
    instructor: 'Mike Chen',
    price: 179,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    category: 'Data Science',
    status: 'pending',
    students: 0,
    duration: '50 giờ',
    description: 'Khóa học khoa học dữ liệu và phân tích với Python. Học pandas, numpy, matplotlib, machine learning cơ bản và các kỹ thuật phân tích dữ liệu thực tế.',
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    instructor: 'Emily Brown',
    price: 99,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    category: 'Marketing',
    status: 'inactive',
    students: 567,
    duration: '25 giờ',
    description: 'Chiến lược marketing số hiệu quả cho doanh nghiệp. Học SEO, SEM, Social Media Marketing, Content Marketing và Analytics.',
    revenue: 56133,
    rating: 4.5,
    reviews: 89,
    createdAt: '2024-01-05'
  }
];

// Component chính
const CoursesContent: React.FC = () => {
  const { confirm } = useConfirmDialog()
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCourseEdit, setSelectedCourseEdit] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterInstructor, setFilterInstructor] = useState<string>('all');
  // const {
  //   courses,
  //   loading,
  //   error,
  //   deleteCourseAdmin,
  //   updateCou

  // }= useCourseAdmin();

  const categories = ['Development', 'Design', 'Business', 'Marketing', 'Data Science', 'Photography'];
  const instructors = [...new Set(courses.map(c => c.instructor))];


  const handleViewDetail = (course: Course) => {
    setSelectedCourse(course);
  };
  const handleEdit = (course: Course) => {
    setSelectedCourseEdit(course);
  }

  const handleBackToList = () => {
    setSelectedCourse(null);
    setSelectedCourseEdit(null);
  };

  const handleApprove = async (id: string) => {
    const ok = await confirm('Phê duyệt khóa học này?')
    if (ok) {
      setCourses(courses.map(course => 
        course.id === id ? { ...course, status: 'active' as const } : course
      ));
    }
  };

  const handleReject = async (id: string) => {
    const ok = await confirm('Từ chối khóa học này?')
    if (ok) {
      setCourses(courses.map(course => 
        course.id === id ? { ...course, status: 'rejected' as const } : course
      ));
    }
  };

  const handleToggleStatus = (id: string) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        const newStatus: Course['status'] = course.status === 'active' ? 'inactive' : 'active';
        return { ...course, status: newStatus };
      }
      return course;
    }));
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm('Bạn có chắc chắn muốn xóa khóa học này?')
    if (ok) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };
  const handleSaveCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    setSelectedCourseEdit(null);
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesInstructor = filterInstructor === 'all' || course.instructor === filterInstructor;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesInstructor;
  });

  const totalRevenue = courses.reduce((sum, c) => sum + c.revenue, 0);
  const pendingCount = courses.filter(c => c.status === 'pending').length;


  if (selectedCourse) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition flex items-center gap-2"
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
  if (selectedCourseEdit) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <button
          onClick={handleBackToList}
          className="mb-4 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition flex items-center gap-2"
        >
          ← Quay lại danh sách
        </button>
        <CourseEdit 
          course={selectedCourseEdit} 
          onBack={handleBackToList}
          onSave={handleSaveCourse}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quản lý khóa học</h2>
        <p className="text-gray-600">Quản lý, duyệt và theo dõi tất cả các khóa học trên nền tảng</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-semibold">Tổng khóa học</p>
          <p className="text-2xl font-bold text-purple-900">{courses.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600 font-semibold">Đang hoạt động</p>
          <p className="text-2xl font-bold text-green-900">
            {courses.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-600 font-semibold">Chờ duyệt</p>
          <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-semibold">Tổng học viên</p>
          <p className="text-2xl font-bold text-blue-900">
            {courses.reduce((sum, c) => sum + c.students, 0)}
          </p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-600 font-semibold">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-indigo-900">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
     <div className="grid md:grid-cols-4 gap-4 mb-6">
  <div className="relative">
    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Tìm kiếm khóa học..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
    />
  </div>

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
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
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
  >
    <option value="all">Tất cả danh mục</option>
    {categories.map(cat => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>

  <select
    value={filterInstructor}
    onChange={(e) => setFilterInstructor(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black bg-white"
  >
    <option value="all">Tất cả giảng viên</option>
    {instructors.map(inst => (
      <option key={inst} value={inst}>{inst}</option>
    ))}
  </select>
      </div>


      {/* Course List */}
      {filteredCourses.length > 0 ? (
        <CourseList
          courses={filteredCourses}
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
          onToggleStatus={handleToggleStatus}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy khóa học nào</p>
        </div>
      )}
    </div>
  );
};


 
export default CoursesContent;