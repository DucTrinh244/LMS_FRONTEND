import {
  Award,
  Bell,
  BookMarked,
  BookOpen,
  CheckCircle,
  Download,
  Edit2,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Repeat,
  Settings,
  ShoppingCart,
  Star,
  User
} from 'lucide-react';

// ==================== HEADER COMPONENT ====================
const DashboardHeader = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>1442 Crosswind Drive Madisonville</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>+1 45887 77874</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent border-none text-white focus:outline-none text-xs">
              <option>ENG</option>
              <option>VIE</option>
            </select>
            <select className="bg-transparent border-none text-white focus:outline-none text-xs">
              <option>USD</option>
              <option>VND</option>
            </select>
            <div className="hidden md:flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <a key={i} href="#" className="w-6 h-6 bg-white/10 rounded-full hover:bg-white/20 transition" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dreams
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {['Home', 'Courses', 'Dashboard', 'Pages', 'Blog'].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 font-medium transition ${
                  item === 'Dashboard'
                    ? 'text-red-500'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                1
              </span>
            </button>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
              alt="User"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200"
            />
          </div>
        </div>
      </header>
    </>
  );
};

// ==================== HERO COMPONENT ====================
const DashboardHero = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
            <span className="text-gray-400">➔</span>
            <span className="text-purple-600 font-medium">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-32 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                  alt="Ronald Richard"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-white">Ronald Richard</h2>
                  <button className="text-white/80 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-blue-100">Student</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition whitespace-nowrap">
                Become an Instructor
              </button>
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition whitespace-nowrap">
                Instructor Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== SIDEBAR COMPONENT ====================
const DashboardSidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <User className="w-5 h-5" />, label: 'My Profile' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Enrolled Courses' },
    { icon: <Award className="w-5 h-5" />, label: 'My Certificates' },
    { icon: <Heart className="w-5 h-5" />, label: 'Wishlist' },
    { icon: <Star className="w-5 h-5" />, label: 'Reviews' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'My Quiz Attempts' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Order History' },
    { icon: <Repeat className="w-5 h-5" />, label: 'Referrals' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Support Tickets' },
  ];

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <div className="mb-8">
        <h3 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-4">
          Main Menu
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm ${
                item.active
                  ? 'bg-red-50 text-red-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div>
        <h3 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-4">
          Account Settings
        </h3>
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

// ==================== CONTENT COMPONENT ====================
const DashboardContent = () => {
  const courses = [
    {
      id: 1,
      title: 'Information About UI/UX Design Degree',
      instructor: 'Brenda Staton',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Design',
      rating: 4.5,
      reviews: 200,
      price: 120,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      badge: '15% OFF'
    },
    {
      id: 2,
      title: 'Wordpress for Beginners - Master Wordpress Quickly',
      instructor: 'Ana Reyes',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      category: 'Wordpress',
      rating: 4.4,
      reviews: 180,
      price: 140,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'
    },
    {
      id: 3,
      title: 'Sketch from A to Z (2024): Become an app designer',
      instructor: 'Andrew Pinto',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      category: 'Design',
      rating: 4.4,
      reviews: 160,
      price: 140,
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80'
    }
  ];

  const invoices = [
    { id: 'INV001', title: 'Build Responsive Real World Websites...', amount: 200 },
    { id: 'INV002', title: 'Wordpress for Beginners', amount: 310 },
    { id: 'INV003', title: 'Information About UI/UX Design Degree', amount: 270 },
    { id: 'INV004', title: 'Sketch from A to Z (2024)', amount: 180 },
    { id: 'INV005', title: 'Become an app designer', amount: 220 }
  ];

  const quizzes = [
    { title: 'Sketch from A to Z (2024)', correct: 15, total: 22, percentage: 68 },
    { title: 'Build Responsive Real World', correct: 18, total: 22, percentage: 100 },
    { title: 'UI/UX Design Degree', correct: 25, total: 30, percentage: 80 },
    { title: 'Build Responsive Real World', correct: 15, total: 20, percentage: 85 },
    { title: 'Become an app designer', correct: 12, total: 20, percentage: 70 }
  ];

  return (
    <div className="space-y-6">
      {/* Quiz Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Quiz : Build Responsive Real World</h3>
            <p className="text-sm text-gray-500">Answered : 15/22</p>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition whitespace-nowrap">
            Continue Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: <BookOpen className="w-7 h-7" />, count: '12', label: 'Enrolled Courses', gradient: 'from-blue-500 to-blue-600' },
          { icon: <BookMarked className="w-7 h-7" />, count: '03', label: 'Active Courses', gradient: 'from-red-500 to-red-600' },
          { icon: <CheckCircle className="w-7 h-7" />, count: '10', label: 'Completed Courses', gradient: 'from-green-500 to-green-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.count}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recently Enrolled Courses */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recently Enrolled Courses</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <button className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-lg hover:bg-red-50 transition">
                  <Heart className="w-4 h-4 text-red-500" />
                </button>
                {course.badge && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {course.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 font-medium">{course.instructor}</span>
                  </div>
                  <span className="bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>

                <h4 className="text-gray-900 font-bold mb-3 line-clamp-2 group-hover:text-purple-600 transition leading-snug">
                  {course.title}
                </h4>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-sm">{course.rating}</span>
                  <span className="text-gray-500 text-sm">({course.reviews} Reviews)</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-2xl font-bold text-red-600">${course.price}</span>
                  <button className="bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition text-sm">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Invoices & Latest Quizzes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Invoices</h3>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 truncate">{invoice.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>#{invoice.id}</span>
                    <span>•</span>
                    <span>Amount: ${invoice.amount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                    Paid
                  </span>
                  <button className="text-purple-600 hover:text-purple-700">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Quizzes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Quizzes</h3>
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{quiz.title}</h4>
                  <span className="text-gray-900 font-bold text-sm">{quiz.percentage}%</span>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  Correct Answer: {quiz.correct}/{quiz.total}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${quiz.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== FOOTER COMPONENT ====================
const DashboardFooter = () => {
  return (
    <>
      <footer className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dreams
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Platform designed for organizations, educators, and learners manage, deliver, and track learning and training activities.
              </p>
            </div>

            {['For Instructor', 'For Student'].map((title, i) => (
              <div key={i}>
                <h4 className="text-gray-900 font-bold mb-6">{title}</h4>
                <ul className="space-y-3">
                  {['Search Mentors', 'Login', 'Register', 'Booking', 'Dashboard'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-600 hover:text-purple-600 transition text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-gray-900 font-bold mb-6">Newsletter</h4>
              <input
                type="email"
                placeholder="Enter your Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 mb-3 text-sm"
              />
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Subscribe
              </button>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>3556 Beech Street, San Francisco, CA 94108</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span>[email protected]</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span>+19 123-456-7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-purple-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-purple-200 text-sm">
            Copyright © 2025 DreamsLMS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-purple-200 hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="text-purple-200 hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== MAIN APP ====================
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardHero />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <DashboardSidebar />
          </div>
          <div className="lg:col-span-3">
            <DashboardContent />
          </div>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}