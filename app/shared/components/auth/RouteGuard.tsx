import { Navigate, useLocation } from 'react-router'
import { useAuth } from '~/context/authContext'
import { UserRole } from '~/types/auth/entities'

interface RouteGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requireAuth?: boolean
  redirectTo?: string
}

/**
 * RouteGuard - Component bảo vệ routes dựa trên authentication và roles
 * 
 * @param children - Component con cần bảo vệ
 * @param allowedRoles - Danh sách roles được phép truy cập (nếu không có = tất cả authenticated users)
 * @param requireAuth - Yêu cầu đăng nhập (mặc định: true)
 * @param redirectTo - Trang chuyển hướng khi không có quyền (mặc định: /login)
 */
export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { user, isLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    // Lưu trang hiện tại để redirect sau khi login
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check roles if specified
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const hasRequiredRole = user.roles.some(role => allowedRoles.includes(role))

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}

/**
 * PublicRoute - Route công khai, không cần đăng nhập
 * Nếu đã đăng nhập sẽ redirect về trang phù hợp với role
 */
export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Nếu đã đăng nhập, redirect về dashboard tương ứng
  if (isAuthenticated && user) {
    const redirectPath = getDefaultRedirectPath(user.roles)
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

/**
 * GuestRoute - Route chỉ dành cho khách (chưa đăng nhập)
 * Ví dụ: Login, Register
 */
export const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Nếu đã đăng nhập, redirect về dashboard
  if (isAuthenticated && user) {
    const redirectPath = getDefaultRedirectPath(user.roles)
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

/**
 * StudentRoute - Route chỉ dành cho Student
 */
export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RouteGuard allowedRoles={[UserRole.STUDENT]} redirectTo="/login">
      {children}
    </RouteGuard>
  )
}

/**
 * InstructorRoute - Route chỉ dành cho Instructor
 */
export const InstructorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RouteGuard allowedRoles={[UserRole.INSTRUCTOR]} redirectTo="/login">
      {children}
    </RouteGuard>
  )
}

/**
 * AdminRoute - Route chỉ dành cho Admin
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RouteGuard allowedRoles={[UserRole.ADMIN]} redirectTo="/login">
      {children}
    </RouteGuard>
  )
}

/**
 * ModeratorRoute - Route dành cho Moderator hoặc Admin
 */
export const ModeratorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RouteGuard allowedRoles={[UserRole.MODERATOR, UserRole.ADMIN]} redirectTo="/login">
      {children}
    </RouteGuard>
  )
}

/**
 * Helper function - Lấy đường dẫn mặc định dựa trên roles
 */
export const getDefaultRedirectPath = (roles: UserRole[]): string => {
  if (roles.includes(UserRole.ADMIN)) {
    return '/admin'
  }
  if (roles.includes(UserRole.INSTRUCTOR)) {
    return '/instructor'
  }
  if (roles.includes(UserRole.STUDENT)) {
    return '/student'
  }
  return '/'
}

export default RouteGuard
