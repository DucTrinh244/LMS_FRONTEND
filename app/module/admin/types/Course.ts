
// Course Level Enum
export enum CourseLevel {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

// Course Status Enum
export enum CourseStatusCode {
  Pending = 0,
  Active = 1,
  Inactive = 2,
  Rejected = 3,
}

// Course Status String
export type CourseStatus = "active" | "pending" | "inactive" | "rejected";

// Lesson Type Enum
export enum LessonType {
  Video = 1,
  Article = 2,
  Quiz = 3,
}

// Admin Course DTO (for list)
export interface AdminCourseDto {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  objectives: string;
  requirements: string;
  targetAudience: string;
  thumbnailUrl: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  instructorEmail?: string;
  categoryId: string;
  categoryName: string;
  price: number;
  currency: string;
  durationHours: number;
  language: string;
  level: number;
  levelName: string;
  certificateEnabled: boolean;
  status: CourseStatus;
  statusCode: CourseStatusCode;
  isPublished: boolean;
  totalStudents: number;
  totalEnrollments: number;
  completedEnrollments: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  totalLessons: number;
  totalChapters: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  rejectionReason: string | null;
}

// Admin Chapter DTO
export interface AdminChapterDto {
  id: string;
  courseId: string;
  title: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
  lessons: AdminLessonDto[];
}

// Admin Lesson DTO
export interface AdminLessonDto {
  id: string;
  chapterId: string;
  title: string;
  content: string;
  videoUrl: string | null;
  videoDuration: number;
  duration: number;
  sortOrder: number;
  type: LessonType;
  typeName: string;
  isPreview: boolean;
  isPublished: boolean;
  resources: string | null;
  quizzes: AdminQuizDto[];
}

// Admin Quiz DTO
export interface AdminQuizDto {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questionCount: number;
  isPublished: boolean;
}

// Admin Course Detail DTO (includes chapters, lessons, quizzes)
export interface AdminCourseDetailDto extends AdminCourseDto {
  chapters: AdminChapterDto[];
  reviews: any[] | null;
}

// Admin Course List Stats
export interface AdminCourseListStatsDto {
  totalCourses: number;
  activeCourses: number;
  pendingCourses: number;
  inactiveCourses: number;
  rejectedCourses: number;
  totalStudents: number;
  totalRevenue: number;
}

// Paginated Response
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PagedAdminCourseResponse extends PagedResult<AdminCourseDto> {
  stats?: AdminCourseListStatsDto;
}

// Admin Course Stats DTO
export interface AdminCourseStatsDto {
  totalCourses: number;
  activeCourses: number;
  pendingCourses: number;
  inactiveCourses: number;
  rejectedCourses: number;
  totalStudents: number;
  totalEnrollments: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  coursesByCategory: { [key: string]: number };
  coursesByStatus: { [key: string]: number };
  topCourses: {
    id: string;
    title: string;
    totalStudents: number;
    totalRevenue: number;
    averageRating: number;
  }[];
}

// Update Course Request DTO
export interface UpdateAdminCourseDto {
  title?: string;
  shortDescription?: string;
  description?: string;
  objectives?: string;
  requirements?: string;
  targetAudience?: string;
  categoryId?: string;
  price?: number;
  durationHours?: number;
  language?: string;
  level?: number;
  certificateEnabled?: boolean;
}

// Reject Course Request DTO
export interface RejectCourseDto {
  reason: string;
}

// Toggle Course Status Request DTO
export interface ToggleCourseStatusDto {
  status: "active" | "inactive";
}

// Delete Course Response
export interface DeleteCourseResponse {
  id: string;
  deletedAt: string;
}

// Get Courses Query Parameters
export interface GetCoursesParams {
  page?: number;
  pageSize?: number;
  status?: CourseStatus | "all";
  category?: string; // category name or categoryId
  instructorId?: string;
  search?: string;
}

// Legacy Course interface (for backward compatibility)
export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  image: string;
  category: string;
  status: CourseStatus;
  students: number;
  duration: string;
  description: string;
  revenue: number;
  rating: number;
  reviews: number;
  createdAt: string;
}

// Legacy CourseEditAdminRequest (for backward compatibility)
export interface CourseEditAdminRequest extends UpdateAdminCourseDto { }

// Helper Functions
export function getLevelText(level: number): string {
  switch (level) {
    case CourseLevel.Beginner:
      return "Beginner";
    case CourseLevel.Intermediate:
      return "Intermediate";
    case CourseLevel.Advanced:
      return "Advanced";
    default:
      return "Unknown";
  }
}

export function getStatusText(status: CourseStatus): string {
  switch (status) {
    case "active":
      return "Đang hoạt động";
    case "pending":
      return "Chờ duyệt";
    case "inactive":
      return "Tạm ẩn";
    case "rejected":
      return "Đã từ chối";
    default:
      return "Không xác định";
  }
}

export function getStatusColor(status: CourseStatus): string {
  switch (status) {
    case "active":
      return "bg-green-600/20 text-green-400";
    case "pending":
      return "bg-yellow-600/20 text-yellow-400";
    case "inactive":
      return "bg-slate-600/20 text-slate-400";
    case "rejected":
      return "bg-red-600/20 text-red-400";
    default:
      return "bg-gray-600/20 text-gray-400";
  }
}

export function formatCurrency(amount: number, currency: string = "VND"): string {
  if (currency === "VND") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
