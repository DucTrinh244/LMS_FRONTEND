import { BookOpen, Globe, Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '~/context/authContext'; // ✅ import context (điều chỉnh theo đường dẫn của bạn)

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg z-50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">ZoneEdu</span>
              <span className="text-xs text-violet-400 block -mt-1">
                Learning Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#home"
              className="px-4 py-2 text-violet-400 font-medium rounded-lg hover:bg-slate-800 transition"
            >
              Home
            </a>
            <div
              className="relative"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <a
                href="#courses"
                className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                Courses
              </a>
              {courseDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
                  <a
                    href="/courses"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    Courses
                  </a>
                  <a
                    href="/course/detail"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    Course Detail
                  </a>
                  <a
                    href="/course/category"
                    className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    Category
                  </a>
                </div>
              )}
            </div>
            <a
              href="/instructors"
              className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              Instructors
            </a>
            <a
              href="/about"
              className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              About
            </a>
            <a
              href="/blog"
              className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2.5 hover:bg-slate-800 rounded-lg transition group relative">
              <Heart className="w-5 h-5 text-slate-300 group-hover:text-rose-400 transition" />
            </button>
            <button className="p-2.5 hover:bg-slate-800 rounded-lg transition relative group">
              <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-violet-400 transition" />
              <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </button>

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
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-lg py-2">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      Profile
                    </a>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-rose-400 hover:bg-slate-700 hover:text-rose-300 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-medium"
                >
                  Get Started
                </a>
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
              <a
                href="#home"
                className="px-4 py-3 text-violet-400 font-medium bg-slate-800 rounded-lg"
              >
                Home
              </a>
              <a
                href="#courses"
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Courses
              </a>
              <a
                href="#instructors"
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Instructors
              </a>
              <a
                href="#about"
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                About
              </a>
              <a
                href="#blog"
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Contact
              </a>
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
                  <a
                    href="/profile"
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition"
                  >
                    Profile
                  </a>
                  <a
                    href="/dashboard"
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-rose-400 hover:bg-slate-800 rounded-lg transition text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-3 text-white border border-slate-700 rounded-lg hover:bg-slate-800 text-center"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-center"
                  >
                    Get Started
                  </a>
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
