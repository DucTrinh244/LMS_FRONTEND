import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { instructorService } from '~/module/admin/services/InstructorApi'
import type { InstructorDetail } from '~/module/admin/types/Instructor'
import {useToast} from '~/shared/hooks/useToast'

const INSTRUCTOR_QUERY_KEY = ['instructors']

export function useInstructor() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch instructors
  const {
    data: instructors = [],
    isLoading: loading,
    error,
    refetch 
  }= useQuery<InstructorDetail[]>({
    queryKey: INSTRUCTOR_QUERY_KEY,
    queryFn: async () => {
      const res =await instructorService.getAllInstructors()
      if (res.isSuccess) {
        return res.value
      }
      throw new Error(res.error || 'Không thể tải danh sách giảng viên')
    },
    retry: 1
  })

  const updateInstructorMution = useMutation({
    mutationFn: ({id, data}: {id: string; data: any}) => instructorService.updateInstructor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: INSTRUCTOR_QUERY_KEY})
      toast.success('Cập nhật giảng viên thành công!')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật giảng viên!')
    }
  })
  
  const deleteInstructorMutation = useMutation({
    mutationFn: (id: string) => instructorService.deleteInstructor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: INSTRUCTOR_QUERY_KEY})
      toast.success('Xóa giảng viên thành công!')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xóa giảng viên!')
    }
  })

  return {
    instructors,
    loading,
    error,
    updateInstructor: updateInstructorMution.mutateAsync,
    deleteInstructor: deleteInstructorMutation.mutateAsync,
    isUpdating: updateInstructorMution.isPending,
    isDeleting: deleteInstructorMutation.isPending,
    refetch
  } 
}