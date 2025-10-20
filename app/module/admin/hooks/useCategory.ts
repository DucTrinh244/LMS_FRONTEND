import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '~/module/admin/services/CategoryApi'
import type { CategoryDetail, CategoryRequest } from '~/module/admin/types/Category'
import { useToast } from '~/shared/hooks/useToast'

const CATEGORY_QUERY_KEY = ['categories']

export function useCategory() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch categories
  const {
    data: categories = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery<CategoryDetail[]>({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: async () => {
      const res = await categoryService.getAllCategories()
      if (res.isSuccess) {
        return res.value
      }
      throw new Error(res.error || 'Không thể tải danh mục')
    },
    retry: 1
  })

  // Create category
  const createCategoryMutation = useMutation({
    mutationFn: (data: CategoryRequest) => categoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY })
      toast.success('Thêm danh mục thành công!')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi thêm danh mục!')
    }
  })

  // Update category
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryRequest }) => categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY })
      toast.success('Cập nhật danh mục thành công!')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật danh mục!')
    }
  })

  // Delete category
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY })
      toast.success('Xóa danh mục thành công!')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xóa danh mục!')
    }
  })

  return {
    categories,
    loading,
    error: error?.message || null,
    refetch,
    createCategory: createCategoryMutation.mutateAsync,
    updateCategory: (id: string, data: CategoryRequest) => updateCategoryMutation.mutateAsync({ id, data }),
    deleteCategory: deleteCategoryMutation.mutateAsync,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending
  }
}
