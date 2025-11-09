// app/shared/components/common/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '~/context/authContext'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect về login và lưu lại trang muốn truy cập
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}