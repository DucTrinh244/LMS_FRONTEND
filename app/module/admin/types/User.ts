// Base Response Type
export interface BaseResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: {
    statusCode: number;
    message: string;
  } | null;
}

// User Statistics
export interface UserStatisticsDto {
  totalCoursesEnrolled?: number;
  completedCourses?: number;
  totalQuizzesTaken?: number;
  averageQuizScore?: number;
  totalSpent?: number;
}

// User DTO
export interface AdminUserDto {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  role: "Student" | "Instructor" | "Admin";
  roleId: number; // 1: Student, 2: Instructor, 3: Admin
  status: "Active" | "Inactive";
  statusCode: number; // 1: Active, 0: Inactive
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  address?: string;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
  statistics: UserStatisticsDto | null;
}

// Paged User Response
export interface PagedUserResponse {
  items: AdminUserDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// User Stats Response
export interface UserStatsDto {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalAdmins: number;
  newUsersThisMonth: number;
  newUsersLastMonth: number;
  usersByRole: {
    Student: number;
    Instructor: number;
    Admin: number;
  };
  usersByStatus: {
    Active: number;
    Inactive: number;
  };
}

// Create User Request
export interface CreateAdminUserDto {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: "Student" | "Instructor" | "Admin";
  password: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

// Update User Request
export interface UpdateAdminUserDto {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: "Student" | "Instructor" | "Admin";
  status?: "Active" | "Inactive";
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

// Delete User Response
export interface DeleteUserResponse {
  id: string;
  deletedAt: string;
}

// Query Parameters for Get Users
export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  role?: "Student" | "Instructor" | "Admin" | "all";
  status?: "Active" | "Inactive" | "all";
  search?: string;
}

// Helper Functions
export function formatLastActive(lastActiveAt: string | null): string {
  if (!lastActiveAt) return "Never";
  
  const now = new Date();
  const lastActive = new Date(lastActiveAt);
  const diffMs = now.getTime() - lastActive.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return lastActive.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

