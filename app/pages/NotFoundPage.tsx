import { Link } from 'react-router'
import { FileQuestion, Home, ArrowLeft, Search } from 'lucide-react'

/**
 * NotFoundPage - Trang 404 khi không tìm thấy trang
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-violet-500/20 rounded-full flex items-center justify-center border border-violet-500/30">
            <FileQuestion className="w-12 h-12 text-violet-400" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Không tìm thấy trang
        </h2>

        {/* Description */}
        <p className="text-slate-400 mb-8 leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Home */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all font-medium"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors font-medium border border-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-slate-500 text-sm mb-4">Hoặc thử các trang sau:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/courses"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors text-sm"
            >
              Khóa học
            </Link>
            <Link
              to="/instructors"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors text-sm"
            >
              Giảng viên
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors text-sm"
            >
              Về chúng tôi
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors text-sm"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
