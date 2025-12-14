import { BookOpen, Globe, Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '~/context/authContext'
import { getDefaultRedirectPath } from '~/shared/components/auth/RouteGuard'
import { useWishlist } from '~/shared/hooks/useWishlist'

const Header = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const { wishlistCount } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg z-50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">ZoneEdu</span>
              <span className="text-xs text-violet-400 block -mt-1">
                Learning Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg hover:bg-slate-800 transition ${
                isActive('/') && location.pathname === '/'
                  ? 'text-violet-400 font-medium'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <Link
                to="/courses"
                className={`px-4 py-2 rounded-lg hover:bg-slate-800 transition ${
                  isActive('/courses') || isActive('/course')
                    ? 'text-violet-400 font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Courses
              </Link>
              {courseDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
                  <Link
                    to="/courses"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    Tất cả khóa học
                  </Link>
                  <Link
                    to="/course/category"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    Danh mục
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/instructors"
              className={`px-4 py-2 rounded-lg hover:bg-slate-800 transition ${
                isActive('/instructors')
                  ? 'text-violet-400 font-medium'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Instructors
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg hover:bg-slate-800 transition ${
                isActive('/about')
                  ? 'text-violet-400 font-medium'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg hover:bg-slate-800 transition ${
                isActive('/contact')
                  ? 'text-violet-400 font-medium'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/wishlist"
              className="p-2.5 hover:bg-slate-800 rounded-lg transition group relative"
            >
              <Heart className="w-5 h-5 text-slate-300 group-hover:text-rose-400 transition" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Language */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-2.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                <Globe className="w-5 h-5 text-violet-400" />
                <span className="text-sm font-medium">Language</span>
              </button>
              {languageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                    <span>🇺🇸</span> English
                  </button>
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                    <span>🇻🇳</span> Tiếng Việt
                  </button>
                </div>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition text-slate-200"
                >
                  <img
                    src={
                      user.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${user.firstName}`
                    }
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border border-slate-700"
                  />
                  <span>{user.firstName}</span>
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to={user.roles?.length > 0 ? getDefaultRedirectPath(user.roles) : '/'}
                      className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setUserDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-rose-400 hover:bg-slate-700 hover:text-rose-300 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-slate-800 mt-2 pt-4">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg transition ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-violet-400 font-medium bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`px-4 py-3 rounded-lg transition ${
                  isActive('/courses') || isActive('/course')
                    ? 'text-violet-400 font-medium bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/instructors"
                className={`px-4 py-3 rounded-lg transition ${
                  isActive('/instructors')
                    ? 'text-violet-400 font-medium bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructors
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 rounded-lg transition ${
                  isActive('/about')
                    ? 'text-violet-400 font-medium bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 rounded-lg transition ${
                  isActive('/contact')
                    ? 'text-violet-400 font-medium bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            {/* Auth (mobile) */}
            <div className="flex flex-col gap-2 mt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-lg">
                    <img
                      src={
                        user.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${user.firstName}`
                      }
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-slate-700"
                    />
                    <span className="text-white font-medium">
                      {user.firstName}
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to={user.roles?.length > 0 ? getDefaultRedirectPath(user.roles) : '/'}
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 text-rose-400 hover:bg-slate-800 rounded-lg transition text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-3 text-white border border-slate-700 rounded-lg hover:bg-slate-800 text-center transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-center transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
