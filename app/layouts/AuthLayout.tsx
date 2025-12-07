import { Outlet, Link } from 'react-router'
import { BookOpen } from 'lucide-react'

/**
 * AuthLayout - Layout cho các trang authentication
 * Bao gồm: Login, Register, Forgot Password, Reset Password, Verify Email
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-600/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-2xl shadow-2xl shadow-violet-500/30">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </Link>
          
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Chào mừng đến với{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              ZoneEdu
            </span>
          </h1>
          
          <p className="text-slate-300 text-center text-lg max-w-md mb-8">
            Nền tảng học trực tuyến hàng đầu với hàng nghìn khóa học chất lượng cao
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-slate-400 text-sm">Khóa học</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-slate-400 text-sm">Học viên</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1K+</div>
              <div className="text-slate-400 text-sm">Giảng viên</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 max-w-md border border-slate-700/50">
            <p className="text-slate-300 italic mb-4">
              "ZoneEdu đã giúp tôi nâng cao kỹ năng và tìm được công việc mơ ước. 
              Các khóa học rất chất lượng và dễ hiểu!"
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-white font-medium">Nguyễn Thị Mai</div>
                <div className="text-slate-400 text-sm">Frontend Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
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
          </div>

          {/* Auth Form Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
            <Outlet />
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} ZoneEdu. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Link to="/terms" className="text-slate-400 hover:text-violet-400 text-sm transition-colors">
                Điều khoản
              </Link>
              <span className="text-slate-600">•</span>
              <Link to="/privacy" className="text-slate-400 hover:text-violet-400 text-sm transition-colors">
                Bảo mật
              </Link>
              <span className="text-slate-600">•</span>
              <Link to="/help" className="text-slate-400 hover:text-violet-400 text-sm transition-colors">
                Hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
