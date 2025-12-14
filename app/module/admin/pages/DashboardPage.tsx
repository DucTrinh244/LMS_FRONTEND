import {
  AlertTriangle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  DollarSign,
  Download,
  Edit,
  Eye,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreVertical,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  X
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import React, { useState, useMemo, type JSX } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '~/context/authContext'
import { useDashboardSummary } from '~/module/admin/hooks/useDashboardAdmin'
import CategoryContent from '~/module/admin/pages/category/CategoryPage'
import CertificatesContent from '~/module/admin/pages/certificates/CertificatesContent'
import CoursesContent from '~/module/admin/pages/course/CoursesContent'
import RevenueContent from '~/module/admin/pages/RevenueContent'
import UsersManagementContent from '~/module/admin/pages/user/UsersManagementContent'
import { formatCurrency, formatDate } from '~/module/admin/types/dashboard'
import { AdminRoute } from '~/shared/components/auth/RouteGuard'
import { useToast } from '~/shared/hooks/useToast'

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
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', badge: null },
    { icon: <Users className="w-5 h-5" />, label: 'Users Management', badge: null },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Courses', badge: null },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Categories', badge: null },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Revenue', badge: null },
    { icon: <Award className="w-5 h-5" />, label: 'Certificates', badge: null },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout', badge: null }
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
      case 'Categories':
        return <CategoryContent />;
      case 'Revenue':
        return <RevenueContent />;
      case 'Certificates':
        return <CertificatesContent />;
      case 'Logout':
        return <LogoutContent onCancel={() => setActiveMenu('Dashboard')} />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Top Navigation Bar */}
        <header className="bg-slate-800 border-b border-slate-700 fixed top-0 left-0 right-0 z-50">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <a href="/" className="no-underline">
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                        ZoneEdu LMS
                      </h1>
                      <p className="text-xs text-slate-400">Admin Dashboard</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Center - Search */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search courses, students, instructors..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-white placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                <button className="relative p-2 hover:bg-slate-700 rounded-lg transition text-slate-300">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                    alt="Admin"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-white">Admin User</p>
                    <p className="text-xs text-slate-400">Super Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex pt-20">
          {/* Sidebar */}
          <aside
            className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-slate-800 border-r border-slate-700 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'
              }`}
          >
            <div className="h-full overflow-y-auto py-6">
              <nav className="space-y-1 px-3">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveMenu(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeMenu === item.label
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                      : item.label === 'Logout'
                        ? 'text-red-400 hover:bg-red-600/20'
                        : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                  >
                    {item.icon}
                    {sidebarOpen && (
                      <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main
            className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
              }`}
          >
            <div className="p-6 space-y-6">
              {renderMainContent()}
            </div>
          </main>
        </div>
      </div>
    </AdminRoute>
  )
}

// DashboardContent component with API integration
const DashboardContent: React.FC = () => {
  const { summary, loading, error } = useDashboardSummary()

  // Transform revenue chart data - must be called before early returns
  const revenueData = useMemo(() => {
    if (!summary?.revenueChartData?.dataPoints || summary.revenueChartData.dataPoints.length === 0) return []
    
    return summary.revenueChartData.dataPoints.map((point) => {
      const date = new Date(point.date)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return {
        month: monthNames[date.getMonth()] || date.toLocaleDateString('vi-VN', { month: 'short' }),
        revenue: point.revenue,
        transactions: point.transactions,
      }
    })
  }, [summary?.revenueChartData])

  // Transform enrollment chart data - must be called before early returns
  const enrollmentData = useMemo(() => {
    if (!summary?.enrollmentChartData?.dataPoints || summary.enrollmentChartData.dataPoints.length === 0) return []
    
    return summary.enrollmentChartData.dataPoints.map((point) => {
      const date = new Date(point.date)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return {
        month: monthNames[date.getMonth()] || date.toLocaleDateString('vi-VN', { month: 'short' }),
        enrollments: point.enrollments,
        newStudents: point.newStudents,
      }
    })
  }, [summary?.enrollmentChartData])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !summary) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-2">Không thể tải dữ liệu dashboard</p>
          <p className="text-slate-400 text-sm">{error || "Unknown error"}</p>
        </div>
      </div>
    )
  }

  const { stats, recentEnrollments, topCourses } = summary

  // Format stats cards
  const statsCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue).replace('.00', ''),
      change: `${stats.revenueChange >= 0 ? '+' : ''}${stats.revenueChange.toFixed(1)}%`,
      trend: stats.revenueTrend,
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString('vi-VN'),
      change: `${stats.studentsChange >= 0 ? '+' : ''}${stats.studentsChange.toFixed(1)}%`,
      trend: stats.studentsTrend,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Active Courses',
      value: stats.activeCourses.toLocaleString('vi-VN'),
      change: `${stats.coursesChange >= 0 ? '+' : ''}${stats.coursesChange.toFixed(1)}%`,
      trend: stats.coursesTrend,
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: 'Total Instructors',
      value: stats.totalInstructors.toLocaleString('vi-VN'),
      change: `${stats.instructorsChange >= 0 ? '+' : ''}${stats.instructorsChange.toFixed(1)}%`,
      trend: stats.instructorsTrend,
      icon: <GraduationCap className="w-6 h-6" />,
    }
  ]

  return (
    <>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-violet-100">Here's what's happening with your platform today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6 hover:shadow-violet-500/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
                {React.cloneElement(card.icon, { className: 'w-6 h-6 text-violet-400' })}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${card.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                {card.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {card.change}
              </div>
            </div>
            <h3 className="text-slate-300 text-sm mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
              <p className="text-sm text-slate-400">Monthly revenue statistics</p>
            </div>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64">
            {revenueData.length === 0 ? (
              <div className="h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-violet-400/50 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Chưa có dữ liệu</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
                      return value.toString()
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'revenue') {
                        return [formatCurrency(value).replace('.00', ''), 'Doanh thu']
                      }
                      return [value, 'Giao dịch']
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#revenueGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Enrollment Chart */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Enrollment Trends</h3>
              <p className="text-sm text-slate-400">Student enrollment over time</p>
            </div>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64">
            {enrollmentData.length === 0 ? (
              <div className="h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-violet-400/50 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Chưa có dữ liệu</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'enrollments') return [value, 'Enrollments']
                      if (name === 'newStudents') return [value, 'Học viên mới']
                      return [value, name]
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="newStudents" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recent Enrollments & Top Courses */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Recent Enrollments</h3>
              <p className="text-sm text-slate-400">Latest student enrollments</p>
            </div>
            <button className="text-violet-400 hover:text-violet-300 font-semibold text-sm">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Chưa có enrollment nào
                    </td>
                  </tr>
                ) : (
                  recentEnrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={enrollment.studentAvatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'}
                            alt={enrollment.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
                            }}
                          />
                          <span className="font-medium text-white text-sm">{enrollment.studentName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-300">{enrollment.courseTitle}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-400">{formatDate(enrollment.enrolledAt)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-semibold text-white">{formatCurrency(enrollment.amount, enrollment.currency).replace('.00', '')}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${enrollment.status === 'Completed' ? 'bg-green-600/20 text-green-400' :
                          enrollment.status === 'Active' ? 'bg-blue-600/20 text-blue-400' :
                            'bg-yellow-600/20 text-yellow-400'
                          }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-red-600/20 rounded-lg transition text-slate-400 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Top Courses</h3>
              <p className="text-sm text-slate-400">Best performing</p>
            </div>
          </div>

          <div className="space-y-4">
            {topCourses.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                Chưa có khóa học nào
              </div>
            ) : (
              topCourses.map((course) => (
                <div key={course.courseId} className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition cursor-pointer">
                  <img
                    src={course.courseThumbnailUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80'}
                    alt={course.courseTitle}
                    className="w-16 h-16 rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80'
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-white mb-1 truncate">{course.courseTitle}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Users className="w-3 h-3" />
                      <span>{course.totalStudents.toLocaleString('vi-VN')} students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-white">{course.averageRating > 0 ? course.averageRating.toFixed(1) : 'N/A'}</span>
                      </div>
                      <span className="text-sm font-bold text-violet-400">{formatCurrency(course.totalRevenue).replace('.00', '')}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Example UsersManagementContent component


// Example CoursesContent component


// Placeholder components for other menu items












// Logout Content Component
const LogoutContent: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500/20 rounded-full">
            <AlertTriangle className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Xác nhận đăng xuất</h2>
        <p className="text-slate-300 mb-2">
          Bạn có chắc chắn muốn đăng xuất, <span className="font-semibold text-violet-400">{user?.fullName}</span>?
        </p>
        <p className="text-slate-400 text-sm mb-8">
          Bạn sẽ cần đăng nhập lại để truy cập vào admin dashboard.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Có, đăng xuất
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;