import { BookMarked, BookOpen, CheckCircle, Download, Heart, Star } from 'lucide-react';

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
    { id: 'INV001', title: 'Build Responsive Real World Websites...', amount: 200, status: 'Paid' },
    { id: 'INV002', title: 'Wordpress for Beginners', amount: 310, status: 'Paid' },
    { id: 'INV003', title: 'Information About UI/UX Design Degree', amount: 270, status: 'Paid' },
    { id: 'INV004', title: 'Sketch from A to Z (2024)', amount: 180, status: 'Paid' },
    { id: 'INV005', title: 'Become an app designer', amount: 220, status: 'Paid' }
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
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Quiz: Build Responsive Real World</h3>
            <p className="text-sm text-slate-400">Answered: 15/22</p>
          </div>
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition">
            Continue Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-gray-600 text-sm font-medium text-slate-300">Enrolled Courses</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <BookMarked className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">03</div>
              <div className="text-gray-600 text-sm font-medium text-slate-300">Active Courses</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10</div>
              <div className="text-gray-600 text-sm font-medium text-slate-300">Completed Courses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Enrolled Courses */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
        <h3 className="text-xl font-bold text-white mb-6">Recently Enrolled Courses</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group relative bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-violet-500/50 transition">
              {/* Image */}
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <button className="absolute top-3 right-3 bg-slate-700/50 p-2 rounded-full shadow-md hover:bg-violet-600/50 transition">
                  <Heart className="w-4 h-4 text-violet-400" />
                </button>
                {course.badge && (
                  <span className="absolute top-3 left-3 bg-violet-600/20 text-violet-400 text-xs font-bold px-3 py-1 rounded-full">
                    {course.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-slate-300 font-medium">{course.instructor}</span>
                  </div>
                  <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>

                <h4 className="text-white font-bold mb-3 line-clamp-2 group-hover:text-violet-400 transition">
                  {course.title}
                </h4>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-sm text-white">{course.rating}</span>
                  </div>
                  <span className="text-slate-400 text-sm">({course.reviews} Reviews)</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-2xl font-bold text-violet-400">${course.price}</span>
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition text-sm">
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
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <h3 className="text-xl font-bold text-white mb-6">Recent Invoices</h3>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{invoice.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>#{invoice.id}</span>
                    <span>•</span>
                    <span>Amount: ${invoice.amount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-violet-600/20 text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full">
                    {invoice.status}
                  </span>
                  <button className="text-violet-400 hover:text-violet-300">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Quizzes */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <h3 className="text-xl font-bold text-white mb-6">Latest Quizzes</h3>
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{quiz.title}</h4>
                  <span className="text-white font-semibold">{quiz.percentage}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                  <span>Correct Answer: {quiz.correct}/{quiz.total}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-violet-600 h-2 rounded-full transition-all"
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

export default DashboardContent;