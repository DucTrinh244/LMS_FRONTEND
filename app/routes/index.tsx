import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Star,
  Users,
  Video,
  X
} from 'lucide-react';
import { useState } from 'react';

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <span className="text-2xl font-bold text-white">Dreams</span>
              <span className="text-xs text-violet-400 block -mt-1">Learning Management</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a href="#home" className="px-4 py-2 text-violet-400 font-medium rounded-lg hover:bg-slate-800 transition">
              Home
            </a>
            <a href="#courses" className="px-4 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              Courses
            </a>
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
              <a href="#home" className="px-4 py-3 text-violet-400 font-medium bg-slate-800 rounded-lg">Home</a>
              <a href="#courses" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Courses</a>
              <a href="#instructors" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Instructors</a>
              <a href="#about" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">About</a>
              <a href="#blog" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Blog</a>
              <a href="#contact" className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg">Contact</a>
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

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-violet-300 text-sm font-medium">The Leader in Online Learning</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Learn from the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Best Mentors
              </span>
              Worldwide
            </h1>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Access 10,000+ courses from industry experts. Build skills with interactive lessons and earn certificates.
            </p>

            {/* Search Bar */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition font-medium">
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-slate-400 text-sm">Active Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-slate-400 text-sm">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">2K+</div>
                <div className="text-slate-400 text-sm">Instructors</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-3xl opacity-20" />
              
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-2 hover:border-violet-500/50 transition duration-300">
                <div className="relative rounded-2xl overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" 
                    alt="Course" 
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition">
                      <Heart className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-violet-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      BESTSELLER
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
                      Business
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span>4.9</span>
                      <span className="text-slate-500">(2.5k)</span>
                    </div>
                  </div>

                  <h3 className="text-white text-xl font-bold mb-3 leading-tight">
                    Complete Business Management Masterclass
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
                      alt="Instructor" 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/50"
                    />
                    <div>
                      <div className="text-white text-sm font-medium">Sarah Johnson</div>
                      <div className="text-slate-500 text-xs">Business Expert</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      42 lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      12h 30m
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div>
                      <span className="text-2xl font-bold text-white">$89</span>
                      <span className="text-slate-500 text-sm line-through ml-2">$199</span>
                    </div>
                    <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition font-medium text-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'HD Video Lessons',
      description: 'High-quality video content for better learning experience',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Certification',
      description: 'Get recognized certificates upon course completion',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Lifetime Access',
      description: 'Access your courses anytime, anywhere, forever',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-violet-500/50 transition group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition`}>
                {feature.icon}
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Categories Section Component
const CategoriesSection = () => {
  const categories = [
    { name: 'Development', icon: '💻', count: 450, color: 'from-blue-500 to-cyan-500' },
    { name: 'Business', icon: '💼', count: 320, color: 'from-violet-500 to-purple-500' },
    { name: 'Design', icon: '🎨', count: 280, color: 'from-pink-500 to-rose-500' },
    { name: 'Marketing', icon: '📈', count: 210, color: 'from-orange-500 to-amber-500' },
    { name: 'Photography', icon: '📷', count: 180, color: 'from-emerald-500 to-teal-500' },
    { name: 'Music', icon: '🎵', count: 150, color: 'from-indigo-500 to-blue-500' }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Explore Top Categories
          </h2>
          <p className="text-slate-400 text-lg">
            Choose from thousands of courses across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-violet-500/50 transition cursor-pointer group text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">{category.icon}</div>
              <h3 className="text-white font-semibold mb-1 text-sm">{category.name}</h3>
              <p className="text-slate-500 text-xs">{category.count} courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Courses Section Component
const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp 2024',
      instructor: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      category: 'Development',
      rating: 4.9,
      reviews: 1250,
      students: 5400,
      price: 149,
      originalPrice: 299,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      lessons: 68,
      duration: '24h 15m',
      level: 'All Levels'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass with Figma',
      instructor: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      category: 'Design',
      rating: 5.0,
      reviews: 890,
      students: 3200,
      price: 129,
      originalPrice: 249,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      lessons: 52,
      duration: '18h 30m',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Digital Marketing Complete Guide 2024',
      instructor: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      category: 'Marketing',
      rating: 4.8,
      reviews: 620,
      students: 2800,
      price: 99,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      lessons: 45,
      duration: '15h 45m',
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Python Programming: From Zero to Hero',
      instructor: 'Sarah Davis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Development',
      rating: 4.9,
      reviews: 1100,
      students: 6200,
      price: 139,
      originalPrice: 279,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
      lessons: 72,
      duration: '26h 20m',
      level: 'All Levels'
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Most Popular Courses
          </h2>
          <p className="text-slate-400 text-lg">
            Join thousands of students learning from the best
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 transition group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4 text-rose-500" />
                </button>
                <div className="absolute top-3 left-3">
                  <span className="bg-violet-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">{course.rating}</span>
                    <span className="text-slate-500 text-xs">({course.reviews})</span>
                  </div>
                </div>

                <h3 className="text-white font-bold mb-3 leading-snug line-clamp-2 group-hover:text-violet-400 transition text-base">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src={course.avatar} 
                    alt={course.instructor} 
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-700"
                  />
                  <span className="text-slate-400 text-xs font-medium">{course.instructor}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-500 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    {course.lessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {course.students}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <span className="text-white text-xl font-bold">${course.price}</span>
                    <span className="text-slate-500 text-sm line-through ml-2">${course.originalPrice}</span>
                  </div>
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition text-xs font-semibold">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-slate-800/50 border border-slate-700 text-white px-8 py-3.5 rounded-xl hover:border-violet-500/50 transition font-medium">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-12 lg:p-16 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5">
              Start Your Learning Journey Today
            </h2>
            <p className="text-violet-100 text-lg mb-8">
              Join millions of learners worldwide. Get access to 10,000+ courses and start building your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition">
                Browse All Courses
              </button>
              <button className="bg-violet-800/50 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-800 transition">
                Become Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Dreams</span>
                <span className="text-xs text-violet-400 block -mt-0.5">Learning Platform</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Empowering learners worldwide with quality education and expert mentorship.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="text-slate-400 hover:text-violet-400 transition text-sm">About Us</a></li>
              <li><a href="#courses" className="text-slate-400 hover:text-violet-400 transition text-sm">Browse Courses</a></li>
              <li><a href="#instructors" className="text-slate-400 hover:text-violet-400 transition text-sm">Become Instructor</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-violet-400 transition text-sm">Pricing Plans</a></li>
              <li><a href="#blog" className="text-slate-400 hover:text-violet-400 transition text-sm">Blog & News</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#help" className="text-slate-400 hover:text-violet-400 transition text-sm">Help Center</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-violet-400 transition text-sm">FAQs</a></li>
              <li><a href="#terms" className="text-slate-400 hover:text-violet-400 transition text-sm">Terms of Service</a></li>
              <li><a href="#privacy" className="text-slate-400 hover:text-violet-400 transition text-sm">Privacy Policy</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-violet-400 transition text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe to get the latest courses and updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 Dreams LMS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#terms" className="text-slate-500 hover:text-violet-400 transition text-sm">Terms</a>
            <a href="#privacy" className="text-slate-500 hover:text-violet-400 transition text-sm">Privacy</a>
            <a href="#cookies" className="text-slate-500 hover:text-violet-400 transition text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function DreamsLMS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CoursesSection />
      <CTASection />
      <Footer />
    </div>
  );
}