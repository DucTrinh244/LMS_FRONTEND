import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  X
} from 'lucide-react';
import React, { useState, type JSX } from 'react';
import CertificatesContent from '~/module/admin/components/CertificatesContent';
import CoursesContent from '~/module/admin/components/CoursesContent';
import EnrollmentsContent from '~/module/admin/components/EnrollmentsContent';
import InstructorsContent from '~/module/admin/components/InstructorsContent';
import MessagesContent from '~/module/admin/components/MessagesContent';
import ReportsContent from '~/module/admin/components/ReportsContent';
import RevenueContent from '~/module/admin/components/RevenueContent';
import ReviewsContent from '~/module/admin/components/ReviewsContent';
import SettingsContent from '~/module/admin/components/SettingsContent';
import StudentsContent from '~/module/admin/components/StudentsContent';
import UsersManagementContent from '~/module/admin/components/UsersManagementContent';

// Import individual components for each menu item
// import DashboardContent from './DashboardContent';
// import UsersManagementContent from './UsersManagementContent';
// import CoursesContent from './CoursesContent';
// import InstructorsContent from './InstructorsContent';
// import StudentsContent from './StudentsContent';
// import EnrollmentsContent from './EnrollmentsContent';
// import RevenueContent from './RevenueContent';
// import CertificatesContent from './CertificatesContent';
// import ReportsContent from './ReportsContent';
// import MessagesContent from './MessagesContent';
// import ReviewsContent from './ReviewsContent';
// import SettingsContent from './SettingsContent';

// Interface for menu items
interface MenuItem {
  icon: JSX.Element;
  label: string;
  badge: string | null;
}

// Main AdminDashboard component
const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');

  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', badge: null },
    { icon: <Users className="w-5 h-5" />, label: 'Users Management', badge: '45' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Courses', badge: '120' },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Instructors', badge: '28' },
    { icon: <Users className="w-5 h-5" />, label: 'Students', badge: '1.2K' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Enrollments', badge: null },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Revenue', badge: null },
    { icon: <Award className="w-5 h-5" />, label: 'Certificates', badge: null },
    { icon: <FileText className="w-5 h-5" />, label: 'Reports', badge: null },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', badge: '12' },
    { icon: <Star className="w-5 h-5" />, label: 'Reviews', badge: null },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', badge: null }
  ];

  // Function to render the appropriate main content based on activeMenu
  const renderMainContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Users Management':
        return <UsersManagementContent />;
      case 'Courses':
        return <CoursesContent />;
      case 'Instructors':
        return <InstructorsContent />;
      case 'Students':
        return <StudentsContent />;
      case 'Enrollments':
        return <EnrollmentsContent />;
      case 'Revenue':
        return <RevenueContent />;
      case 'Certificates':
        return <CertificatesContent />;
      case 'Reports':
        return <ReportsContent />;
      case 'Messages':
        return <MessagesContent />;
      case 'Reviews':
        return <ReviewsContent />;
      case 'Settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <a href="/" className="no-underline">
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ZoneEdu LMS
                    </h1>
                    <p className="text-xs text-gray-500">Admin Dashboard</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, students, instructors..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
            sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'
          }`}
        >
          <div className="h-full overflow-y-auto py-6">
            <nav className="space-y-1 px-3">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMenu(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    activeMenu === item.label
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          activeMenu === item.label
                            ? 'bg-white/20 text-white'
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
          }`}
        >
          <div className="p-6 space-y-6">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Example DashboardContent component (reusing the original main content)
const DashboardContent: React.FC = () => {
  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$45,890',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      bgGradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Students',
      value: '8,549',
      change: '+8.2%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      bgGradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Active Courses',
      value: '342',
      change: '-2.4%',
      trend: 'down',
      icon: <BookOpen className="w-6 h-6" />,
      bgGradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Total Instructors',
      value: '156',
      change: '+5.7%',
      trend: 'up',
      icon: <GraduationCap className="w-6 h-6" />,
      bgGradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ];

  const recentEnrollments = [
    {
      id: 1,
      student: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      course: 'Complete Web Development',
      instructor: 'Sarah Wilson',
      date: '2025-01-15',
      amount: '$149',
      status: 'Completed'
    },
    {
      id: 2,
      student: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      course: 'UI/UX Design Masterclass',
      instructor: 'Michael Chen',
      date: '2025-01-14',
      amount: '$199',
      status: 'Active'
    },
    {
      id: 3,
      student: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      course: 'Python Programming',
      instructor: 'David Lee',
      date: '2025-01-14',
      amount: '$129',
      status: 'Active'
    },
    {
      id: 4,
      student: 'Sophie Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      course: 'Digital Marketing',
      instructor: 'Lisa Anderson',
      date: '2025-01-13',
      amount: '$99',
      status: 'Pending'
    },
    {
      id: 5,
      student: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      course: 'Data Science Bootcamp',
      instructor: 'Robert Taylor',
      date: '2025-01-13',
      amount: '$299',
      status: 'Completed'
    }
  ];

  const topCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      students: 2547,
      rating: 4.9,
      revenue: '$38,115'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      students: 1823,
      rating: 4.8,
      revenue: '$27,345'
    },
    {
      id: 3,
      title: 'Python Programming Complete',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
      students: 1654,
      rating: 4.7,
      revenue: '$23,556'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      students: 1432,
      rating: 4.6,
      revenue: '$18,796'
    }
  ];

  return (
    <>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-purple-100 mb-6">Here's what's happening with your platform today.</p>
          <div className="flex gap-3">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Course
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition border border-white/30 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                {React.cloneElement(card.icon, { className: `w-6 h-6 ${card.iconColor}` })}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                card.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {card.change}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly revenue statistics</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-purple-300" />
          </div>
        </div>

        {/* Enrollment Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Enrollment Trends</h3>
              <p className="text-sm text-gray-500">Student enrollment over time</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-16 h-16 text-blue-300" />
          </div>
        </div>
      </div>

      {/* Recent Enrollments & Top Courses */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Enrollments</h3>
              <p className="text-sm text-gray-500">Latest student enrollments</p>
            </div>
            <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={enrollment.avatar}
                          alt={enrollment.student}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900 text-sm">{enrollment.student}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{enrollment.course}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{enrollment.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">{enrollment.amount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        enrollment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        enrollment.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Top Courses</h3>
              <p className="text-sm text-gray-500">Best performing</p>
            </div>
          </div>

          <div className="space-y-4">
            {topCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 truncate">{course.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Users className="w-3 h-3" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold">{course.rating}</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{course.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Example UsersManagementContent component


// Example CoursesContent component


// Placeholder components for other menu items












export default AdminDashboard;