import { useMemo } from 'react'
import { useAuth } from '~/context/authContext'
import { UserRole } from '~/types/auth/entities'

interface UseAuthorizationReturn {
  // Role checks
  isAdmin: boolean
  isInstructor: boolean
  isStudent: boolean
  isModerator: boolean
  
  // Helper functions
  hasRole: (role: UserRole) => boolean
  hasAnyRole: (roles: UserRole[]) => boolean
  hasAllRoles: (roles: UserRole[]) => boolean
  
  // User info
  roles: UserRole[]
  userId: string | null
  
  // Auth state
  isAuthenticated: boolean
  isLoading: boolean
}

/**
 * useAuthorization - Hook để kiểm tra quyền truy cập
 * 
 * @example
 * const { isAdmin, hasRole, hasAnyRole } = useAuthorization()
 * 
 * if (isAdmin) {
 *   // Show admin content
 * }
 * 
 * if (hasRole(UserRole.INSTRUCTOR)) {
 *   // Show instructor content
 * }
 * 
 * if (hasAnyRole([UserRole.ADMIN, UserRole.MODERATOR])) {
 *   // Show admin or moderator content
 * }
 */
export function useAuthorization(): UseAuthorizationReturn {
  const { user, isAuthenticated, isLoading } = useAuth()

  const roles = useMemo(() => user?.roles || [], [user])

  const hasRole = useMemo(() => {
    return (role: UserRole): boolean => {
      return roles.includes(role)
    }
  }, [roles])

  const hasAnyRole = useMemo(() => {
    return (checkRoles: UserRole[]): boolean => {
      return checkRoles.some(role => roles.includes(role))
    }
  }, [roles])

  const hasAllRoles = useMemo(() => {
    return (checkRoles: UserRole[]): boolean => {
      return checkRoles.every(role => roles.includes(role))
    }
  }, [roles])

  const isAdmin = useMemo(() => roles.includes(UserRole.ADMIN), [roles])
  const isInstructor = useMemo(() => roles.includes(UserRole.INSTRUCTOR), [roles])
  const isStudent = useMemo(() => roles.includes(UserRole.STUDENT), [roles])
  const isModerator = useMemo(() => roles.includes(UserRole.MODERATOR), [roles])

  return {
    // Role checks
    isAdmin,
    isInstructor,
    isStudent,
    isModerator,
    
    // Helper functions
    hasRole,
    hasAnyRole,
    hasAllRoles,
    
    // User info
    roles,
    userId: user?.id || null,
    
    // Auth state
    isAuthenticated,
    isLoading
  }
}

export default useAuthorization
