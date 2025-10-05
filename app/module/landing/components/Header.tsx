import { BookOpen, Globe, Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

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
              <span className="text-xs text-violet-400 block -mt-1">Learning Management</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a href="#home" className="px-4 py-2 text-violet-400 font-medium rounded-lg hover:bg-slate-800 transition">
              Home
            </a>
            <div 
              className="relative"
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <a href="#courses" className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
                Courses
              </a>
              {courseDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2 z-50">
                  <a href="/courses" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition">
                    Courses
                  </a>
                  <a href="course/detail" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition">
                    Course Detail
                  </a>
                  <a href="category" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition">
                    Category
                  </a>
                  <a href="#business" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition">
                    Business
                  </a>
                  <a href="#marketing" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition">
                    Marketing
                  </a>
                </div>
              )}
            </div>
            <a href="#instructors" className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              Instructors
            </a>
            <a href="#about" className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              About
            </a>
            <a href="#blog" className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              Blog
            </a>
            <a href="#contact" className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
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
                    <span>🇺🇳</span> English
                  </button>
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                    <span>🇪🇸</span> Español
                  </button>
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                    <span>🇫🇷</span> Français
                  </button>
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                    <span>🇩🇪</span> Deutsch
                  </button>
                </div>
              )}
            </div>
            <a href="/login" className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium">
              Sign In
            </a>
            <a href="/register" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-medium">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-slate-800 mt-2 pt-4">
            <nav className="flex flex-col gap-2">
              <a href="#home" className="px-4 py-3 text-violet-400 font-medium bg-slate-800 rounded-lg">Home</a>
              <div>
                <button 
                  onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition"
                >
                  Courses
                </button>
                {courseDropdownOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-1">
                    <a href="courses" className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition text-sm">
                      Course list 
                    </a>
                    <a href="#design" className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition text-sm">
                      Course detail 
                    </a>
                    <a href="#business" className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition text-sm">
                      Business
                    </a>
                    <a href="#marketing" className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition text-sm">
                      Marketing
                    </a>
                  </div>
                )}
              </div>
              <a href="#instructors" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Instructors</a>
              <a href="#about" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">About</a>
              <a href="#blog" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Blog</a>
              <a href="#contact" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Contact</a>
              <div className="relative">
                <button 
                  className="w-full text-left px-4 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition flex items-center gap-2"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                >
                  <Globe className="w-5 h-5 text-violet-400" />
                  <span className="text-sm font-medium">Language</span>
                </button>
                {languageDropdownOpen && (
                  <div className="mt-2 w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2">
                    <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <span>🇺🇳</span> English
                    </button>
                    <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <span>🇪🇸</span> Español
                    </button>
                    <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <span>🇫🇷</span> Français
                    </button>
                    <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <span>🇩🇪</span> Deutsch
                    </button>
                  </div>
                )}
              </div>
            </nav>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-4 py-3 text-white border border-slate-700 rounded-lg hover:bg-slate-800">
                Sign In
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;