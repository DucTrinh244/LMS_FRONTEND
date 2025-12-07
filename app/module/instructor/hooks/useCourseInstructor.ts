import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { courseInstructorService } from '~/module/instructor/services/CourseInstructorApi'
import type { 
  CourseEditInstructorRequest, 
  Course, 
  CourseFilters, 
  CoursePaginationParams 
} from '~/module/instructor/types/CourseInstructor'
import { useToast } from '~/shared/hooks/useToast'
import { usePagination } from '~/shared/hooks/usePagination'

const COURSE_INSTRUCTOR_QUERY_KEY = ['courses', 'instructor']

// Mock data for development (when API is not available)
const USE_MOCK_DATA = true

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    lessons: 24,
    quizzes: 5,
    duration: '12h 30m',
    durationHours: 12.5,
    students: 1250,
    enrolledStudents: 1250,
    maxStudents: 2000,
    price: 299000,
    rating: 4.8,
    reviews: 156,
    status: 'published',
    statusColor: 'green',
    description: 'Khóa học React từ cơ bản đến nâng cao',
    shortDescription: 'Học React JS từ A-Z',
    categoryId: '1',
    categoryName: 'Web Development',
    level: 1,
    levelName: 'Beginner',
    language: 'vi',
    certificateEnabled: true
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
    lessons: 32,
    quizzes: 8,
    duration: '18h 45m',
    durationHours: 18.75,
    students: 890,
    enrolledStudents: 890,
    maxStudents: 1500,
    price: 399000,
    rating: 4.9,
    reviews: 203,
    status: 'published',
    statusColor: 'green',
    description: 'Nâng cao kiến thức JavaScript của bạn',
    shortDescription: 'JavaScript nâng cao',
    categoryId: '1',
    categoryName: 'Web Development',
    level: 2,
    levelName: 'Intermediate',
    language: 'vi',
    certificateEnabled: true
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    lessons: 28,
    quizzes: 6,
    duration: '15h 20m',
    durationHours: 15.33,
    students: 567,
    enrolledStudents: 567,
    maxStudents: 1000,
    price: 449000,
    rating: 4.7,
    reviews: 89,
    status: 'draft',
    statusColor: 'yellow',
    description: 'Xây dựng backend với Node.js và Express',
    shortDescription: 'Backend với Node.js',
    categoryId: '2',
    categoryName: 'Backend Development',
    level: 2,
    levelName: 'Intermediate',
    language: 'vi',
    certificateEnabled: true
  }
]

export function useCourseInstructor(instructorId?: string) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch courses for instructor
  const {
    data: courses = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery<Course[]>({
    queryKey: [...COURSE_INSTRUCTOR_QUERY_KEY, instructorId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return MOCK_COURSES
      }
      try {
        const data = await courseInstructorService.getAllCoursesInstructor(instructorId)
        return Array.isArray(data) ? data : data?.courses || []
      } catch (error: any) {
        throw new Error(error?.message || 'Không thể tải khóa học')
      }
    },
    retry: USE_MOCK_DATA ? false : 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Create course mutation
  const createCourseMutation = useMutation({
    mutationFn: async (data: CourseEditInstructorRequest) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { id: `course-${Date.now()}`, ...data }
      }
      return courseInstructorService.createCourseInstructor(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_INSTRUCTOR_QUERY_KEY })
      toast.success('Khóa học đã được tạo thành công!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi khi tạo khóa học!')
    }
  })

  // Update course mutation
  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CourseEditInstructorRequest }) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { id, ...data }
      }
      return courseInstructorService.updateCourseInstructor(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_INSTRUCTOR_QUERY_KEY })
      toast.success('Khóa học đã được cập nhật thành công!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Cập nhật khóa học thất bại!')
    }
  })

  // Delete course mutation
  const deleteCourseMutation = useMutation({
    mutationFn: async (id: string) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return
      }
      return courseInstructorService.deleteCourseInstructor(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_INSTRUCTOR_QUERY_KEY })
      toast.success('Khóa học đã được xóa thành công!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi khi xóa khóa học!')
    }
  })

  // Publish/unpublish course mutation
  const publishCourseMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return
      }
      return courseInstructorService.publishCourse(id, published)
    },
    onSuccess: (_, { published }) => {
      queryClient.invalidateQueries({ queryKey: COURSE_INSTRUCTOR_QUERY_KEY })
      toast.success(published ? 'Khóa học đã được xuất bản!' : 'Khóa học đã được hủy xuất bản!')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Có lỗi khi thay đổi trạng thái khóa học!')
    }
  })

  return {
    // Data
    courses,
    loading,
    error: error?.message || null,
    
    // Actions
    refetch,
    createCourse: createCourseMutation.mutateAsync,
    updateCourse: (id: string, data: CourseEditInstructorRequest) => 
      updateCourseMutation.mutateAsync({ id, data }),
    deleteCourse: deleteCourseMutation.mutateAsync,
    publishCourse: (id: string, published: boolean) => 
      publishCourseMutation.mutateAsync({ id, published }),
    
    // Loading states
    isCreating: createCourseMutation.isPending,
    isUpdating: updateCourseMutation.isPending,
    isDeleting: deleteCourseMutation.isPending,
    isPublishing: publishCourseMutation.isPending,
  }
}

// Hook to get course details
export function useCourseDetails(courseId: string) {
  return useQuery({
    queryKey: ['course', 'details', courseId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return MOCK_COURSES.find(c => c.id === courseId) || null
      }
      try {
        return await courseInstructorService.getCourseDetails(courseId)
      } catch (error: any) {
        throw new Error(error?.message || 'Không thể tải chi tiết khóa học')
      }
    },
    enabled: !!courseId,
    retry: USE_MOCK_DATA ? false : 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to get course statistics
export function useCourseStats(courseId: string) {
  return useQuery({
    queryKey: ['course', 'stats', courseId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return {
          courseId,
          totalStudents: 1250,
          totalRevenue: 373750000,
          completionRate: 78.5,
          averageRating: 4.8,
          totalReviews: 156,
          monthlyEnrollments: [
            { month: '2024-01', enrollments: 120 },
            { month: '2024-02', enrollments: 145 },
            { month: '2024-03', enrollments: 178 }
          ],
          recentActivity: [
            { type: 'enrollment', count: 15, date: new Date().toISOString() },
            { type: 'completion', count: 8, date: new Date().toISOString() },
            { type: 'review', count: 5, date: new Date().toISOString() }
          ]
        }
      }
      try {
        return await courseInstructorService.getCourseStats(courseId)
      } catch (error: any) {
        throw new Error(error?.message || 'Không thể tải thống kê khóa học')
      }
    },
    enabled: !!courseId,
    retry: USE_MOCK_DATA ? false : 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Hook for course management with pagination and filtering
export function useCoursesInstructorPaginated(
  instructorId?: string,
  initialParams: CoursePaginationParams = {}
) {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
  } = usePagination({ 
    initialPage: initialParams.page || 1, 
    initialItemsPerPage: initialParams.limit || 10 
  })

  const [filters, setFilters] = React.useState<CourseFilters>(initialParams.filters || {})

  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    filters,
    instructorId
  }

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['courses', 'instructor', 'paginated', queryParams],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Apply filters
        let filteredCourses = [...MOCK_COURSES]
        
        if (filters.status) {
          filteredCourses = filteredCourses.filter(c => c.status === filters.status)
        }
        if (filters.categoryId) {
          filteredCourses = filteredCourses.filter(c => c.categoryId === filters.categoryId)
        }
        if (filters.level !== undefined) {
          filteredCourses = filteredCourses.filter(c => c.level === filters.level)
        }
        
        // Pagination
        const start = (currentPage - 1) * itemsPerPage
        const end = start + itemsPerPage
        const paginatedCourses = filteredCourses.slice(start, end)
        
        return {
          courses: paginatedCourses,
          total: filteredCourses.length,
          totalPages: Math.ceil(filteredCourses.length / itemsPerPage)
        }
      }
      try {
        return await courseInstructorService.getAllCoursesInstructor(instructorId)
      } catch (error: any) {
        throw new Error(error?.message || 'Không thể tải danh sách khóa học')
      }
    },
    retry: USE_MOCK_DATA ? false : 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const updateFilters = (newFilters: Partial<CourseFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  return {
    // Data
    courses: data?.courses || [],
    totalCourses: data?.total || 0,
    totalPages: data?.totalPages || 0,
    
    // Pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    
    // Filtering
    filters,
    updateFilters,
    clearFilters,
    
    // Status
    isLoading,
    error: error?.message || null,
    refetch,
  }
}
