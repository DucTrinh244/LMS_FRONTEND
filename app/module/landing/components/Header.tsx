import { BookOpen, Briefcase, ChevronRight, Code, Globe, Heart, Megaphone, Menu, Palette, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theo dõi cuộn trang với debouncing
  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* Placeholder để giữ chiều cao khi header fixed */}
      {isScrolled && <div className="h-20"></div>}
      
      <header
        className={`left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 transition-all duration-300 ${
          isScrolled
            ? 'fixed top-0 z-50 translate-y-0'
            : 'relative top-0 z-0 translate-y-0'
        }`}
      >
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
                className="relative group"
                onMouseEnter={() => setCourseDropdownOpen(true)}
                onMouseLeave={() => setCourseDropdownOpen(false)}
              >
                <a
                  href="#courses"
                  className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  Courses
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:rotate-90 transition-transform duration-200" />
                </a>
                {courseDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-3 z-50">
                    <div className="px-4 py-2 text-xs text-slate-400 font-semibold uppercase border-b border-slate-700">
                      Popular Categories
                    </div>
                    <a href="/courses" className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition group">
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                        <div>
                          <span className="font-medium">Course Grid</span>
                          <p className="text-xs text-slate-500">Learn coding skills</p>
                        </div>
                      </div>
                    </a>
                    <a href="#design" className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition group">
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                        <div>
                          <span className="font-medium">Design</span>
                          <p className="text-xs text-slate-500">Master UI/UX & graphics</p>
                        </div>
                      </div>
                    </a>
                    <a href="#business" className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition group">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                        <div>
                          <span className="font-medium">Business</span>
                          <p className="text-xs text-slate-500">Grow your enterprise</p>
                        </div>
                      </div>
                    </a>
                    <a href="#marketing" className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition group">
                      <div className="flex items-center gap-3">
                        <Megaphone className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
                        <div>
                          <span className="font-medium">Marketing</span>
                          <p className="text-xs text-slate-500">Boost your brand</p>
                        </div>
                      </div>
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
              <button className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium">
                Sign In
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-medium">
                Get Started
              </button>
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
                <a href="#home" className="px-4 py-3 text-violet-400 font-medium bg-slate-800 rounded-lg">
                  Home
                </a>
                <div className="relative">
                  <a href="#courses" className="flex items-center gap-1 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">
                    Courses
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </a>
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    <a href="#programming" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <Code className="w-4 h-4 text-violet-400" /> Programming
                    </a>
                    <a href="#design" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <Palette className="w-4 h-4 text-violet-400" /> Design
                    </a>
                    <a href="#business" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-violet-400" /> Business
                    </a>
                    <a href="#marketing" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-violet-400" /> Marketing
                    </a>
                  </div>
                </div>
                <a href="#instructors" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">
                  Instructors
                </a>
                <a href="#about" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">
                  About
                </a>
                <a href="#blog" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">
                  Blog
                </a>
                <a href="#contact" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">
                  Contact
                </a>
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
    </>
  );
};

export default Header;