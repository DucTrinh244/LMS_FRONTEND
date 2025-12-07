import { Link } from 'react-router'
import { ShieldX, Home, ArrowLeft, LogIn } from 'lucide-react'
import { useAuth } from '~/context/authContext'
import { getDefaultRedirectPath } from '~/shared/components/auth/RouteGuard'

/**
 * UnauthorizedPage - Trang hiển thị khi người dùng không có quyền truy cập
 */
const UnauthorizedPage = () => {
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <ShieldX className="w-12 h-12 text-red-400" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-white mb-4">403</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Truy cập bị từ chối
        </h2>

        {/* Description */}
        <p className="text-slate-400 mb-8 leading-relaxed">
          Bạn không có quyền truy cập trang này. 
          {isAuthenticated && user ? (
            <span>
              {' '}Tài khoản của bạn ({user.email}) không có quyền thực hiện thao tác này.
            </span>
          ) : (
            <span>
              {' '}Vui lòng đăng nhập với tài khoản có quyền phù hợp.
            </span>
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated && user ? (
            <>
              {/* Go to Dashboard */}
              <Link
                to={getDefaultRedirectPath(user.roles)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all font-medium"
              >
                <Home className="w-5 h-5" />
                Về Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors font-medium border border-slate-700"
              >
                <ArrowLeft className="w-5 h-5" />
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all font-medium"
              >
                <LogIn className="w-5 h-5" />
                Đăng nhập
              </Link>

              {/* Home */}
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors font-medium border border-slate-700"
              >
                <Home className="w-5 h-5" />
                Về trang chủ
              </Link>
            </>
          )}
        </div>

        {/* Help Text */}
        <p className="mt-8 text-slate-500 text-sm">
          Nếu bạn tin rằng đây là lỗi, vui lòng{' '}
          <Link to="/contact" className="text-violet-400 hover:text-violet-300 underline">
            liên hệ hỗ trợ
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UnauthorizedPage
