import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  CreditCard,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  UserCog,
  Users,
  X
} from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { useAuth } from '~/context/authContext'

/**
 * AdminLayout - Layout cho trang quản trị
 * Bao gồm: Sidebar, Header, Main Content
 */
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Người dùng', href: '/admin/users' },
    { icon: GraduationCap, label: 'Giảng viên', href: '/admin/instructors' },
    { icon: Users, label: 'Học viên', href: '/admin/students' },
    { icon: BookOpen, label: 'Khóa học', href: '/admin/courses' },
    { icon: FolderOpen, label: 'Danh mục', href: '/admin/categories' },
    { icon: Award, label: 'Chứng chỉ', href: '/admin/certificates' },
    { icon: CreditCard, label: 'Thanh toán', href: '/admin/payments' },
    { icon: MessageSquare, label: 'Tin nhắn', href: '/admin/messages' },
    { icon: BarChart3, label: 'Báo cáo', href: '/admin/reports' },
  ]

  const settingsItems = [
    { icon: Settings, label: 'Cài đặt', href: '/admin/settings' },
    { icon: UserCog, label: 'Phân quyền', href: '/admin/roles' },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${mobileMenuOpen ? 'translate-x-0' : ''} lg:translate-x-0`}
      >
        <div className="h-full w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">ZoneEdu</span>
                <span className="text-xs text-violet-400 block -mt-1">Admin Panel</span>
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
                Menu chính
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(item.href)
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

            {/* Settings Menu */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Cài đặt
              </h3>
              <div className="space-y-1">
                {settingsItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(item.href)
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
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
              <img
                src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.firstName || 'Admin'}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">
                  {user?.firstName || 'Admin'}
                </div>
                <div className="text-slate-400 text-sm truncate">Administrator</div>
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
                    placeholder="Tìm kiếm..."
                    className="w-64 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
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
                    src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.firstName || 'Admin'}`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-xl py-1 z-50">
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      Hồ sơ
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Cài đặt
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

export default AdminLayout
