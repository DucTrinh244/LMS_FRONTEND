import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { courseAdminService } from '~/module/admin/services/CourseAdminApi'
import type { Course, CourseEditAdminRequest } from '~/module/admin/types/Course'
import { courseInstructorService } from '~/module/instructor/services/CourseInstructorApi'
import type { CourseEditInstructorRequest } from '~/module/instructor/types/CourseInstructor'
import { useToast } from '~/shared/hooks/useToast'

const COURSE_QUERY_KEY = ['courses']

export function useCourseInstructor() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch courses
  const {
    data: courses = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery<Course[]>({
    queryKey: COURSE_QUERY_KEY,
    queryFn: async () => {
      const res = await courseAdminService.getAllCourseAdmin()
      if (res.isSuccess) {
        return res.value
      }
      throw new Error(res.error || 'Không thể tải khóa học')
    },
    retry: 1
  })

  const createCourseMutation = useMutation({
    mutationFn: (data: any) => courseInstructorService.createCourseInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY })
      toast.success('Add successfully !')
    },
    onError: () => {
      toast.error('Have a error!!')
    }
  })

  //Update Category Admin
  const editCourseAdminMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseEditAdminRequest }) =>
      courseAdminService.updateCourseAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY })
      toast.success('Update Course successfully !')
    },
    onError: () => {
      toast.error('Update Course Failed !')
    }
  })

  // DELETE COURSE
  const deleteCourseAdminMutation = useMutation({
    mutationFn: (id: string) => courseAdminService.deleteCourseAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY })
      toast.success('Delete Course succesffuly !')
    },
    onError: () => {
      toast.error('Have a error !')
    }
  })

  return {
    courses,
    loading,
    error: error?.message || null,
    refetch,
    createCourse: createCourseMutation.mutateAsync,
    editCourse: (id: string, data: CourseEditInstructorRequest) => editCourseAdminMutation.mutateAsync({ id, data }),
    deleteCourse: deleteCourseAdminMutation.mutateAsync,
    isCreating: createCourseMutation.isPending,
    isUpdating: editCourseAdminMutation.isPending,
    isDeleting: deleteCourseAdminMutation.isPending
  }
}
