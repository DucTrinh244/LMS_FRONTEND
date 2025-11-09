// app/shared/components/common/RoleGuard.tsx
import { Navigate } from 'react-router'
import { useAuth } from '~/context/authContext'
import { UserRole } from '~/types/auth/entities'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user } = useAuth()

  // Nếu user không có role phù hợp
  if (!user || !allowedRoles.includes(user.roles[0])) {
    // Redirect về dashboard phù hợp với role của user
    const redirectPath = getDashboardByRole(user?.roles[0])
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

// Helper function để lấy dashboard path theo role
export function getDashboardByRole(role?: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return '/admin/dashboard'
    case UserRole.INSTRUCTOR:
      return '/instructor/dashboard'
    case UserRole.STUDENT:
      return '/student/dashboard'
    default:
      return '/login'
  }
}