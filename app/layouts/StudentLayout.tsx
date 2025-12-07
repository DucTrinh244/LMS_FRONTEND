import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router'
import { 
  BookOpen, 
  LayoutDashboard, 
  User,
  GraduationCap,
  PlayCircle,
  Heart,
  Award,
  CreditCard,
  MessageSquare,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Clock,
  Star
} from 'lucide-react'
import { useAuth } from '~/context/authContext'

/**
 * StudentLayout - Layout cho trang học viên
 * Bao gồm: Sidebar, Header, Main Content
 */
const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/student' },
    { icon: User, label: 'Hồ sơ', href: '/student/profile' },
    { icon: GraduationCap, label: 'Khóa học của tôi', href: '/student/my-courses' },
    { icon: PlayCircle, label: 'Đang học', href: '/student/in-progress' },
    { icon: Clock, label: 'Lịch sử học', href: '/student/history' },
    { icon: Heart, label: 'Yêu thích', href: '/student/wishlist' },
    { icon: Award, label: 'Chứng chỉ', href: '/student/certificates' },
  ]

  const activityItems = [
    { icon: Star, label: 'Đánh giá của tôi', href: '/student/reviews' },
    { icon: MessageSquare, label: 'Tin nhắn', href: '/student/messages' },
    { icon: ShoppingCart, label: 'Lịch sử mua hàng', href: '/student/orders' },
    { icon: CreditCard, label: 'Thanh toán', href: '/student/payments' },
  ]

  const isActive = (href: string) => {
    if (href === '/student') {
      return location.pathname === '/student'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${mobileMenuOpen ? 'translate-x-0' : ''} lg:translate-x-0`}
      >
        <div className="h-full w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">ZoneEdu</span>
                <span className="text-xs text-violet-400 block -mt-1">Student</span>
              </div>
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {/* Main Menu */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Học tập
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Activity Menu */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Hoạt động
              </h3>
              <div className="space-y-1">
                {activityItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Tài khoản
              </h3>
              <div className="space-y-1">
                <Link
                  to="/student/settings"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive('/student/settings')
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Cài đặt</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Learning Progress Card */}
          <div className="px-4 py-3 border-t border-slate-700">
            <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-lg p-4 border border-violet-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Tiến độ tuần này</span>
                <span className="text-violet-400 font-semibold">75%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-xs text-slate-400 mt-2">5/7 ngày học trong tuần</p>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
              <img
                src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.firstName || 'Student'}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">
                  {user?.firstName || 'Học viên'}
                </div>
                <div className="text-slate-400 text-sm truncate">Student</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
          <div className="h-full px-4 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileMenuOpen(!mobileMenuOpen)
                  } else {
                    setSidebarOpen(!sidebarOpen)
                  }
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    className="w-72 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Browse Courses */}
              <Link
                to="/courses"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>Khám phá khóa học</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </Link>

              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <img
                    src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.firstName || 'Student'}`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-xl py-1 z-50">
                    <Link
                      to="/student/profile"
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Hồ sơ
                    </Link>
                    <Link
                      to="/student/my-courses"
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <GraduationCap className="w-4 h-4" />
                      Khóa học của tôi
                    </Link>
                    <Link
                      to="/student/settings"
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Cài đặt
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Trang chủ
                    </Link>
                    <hr className="my-1 border-slate-700" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout