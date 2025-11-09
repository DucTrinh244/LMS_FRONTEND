import { useQuery } from '@tanstack/react-query'
import { sharedApi } from '~/services/sharedApi'

const CATEGORY_QUERY_KEY = ['categories']

export function useCategoryView() {
  const {
    data: categories = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: async () => {
      const res = await sharedApi.getNameAndIdOfAllCategories()
      if (res.isSuccess) return res.value
      throw new Error('Không thể tải danh mục')
    },
    retry: 1
  })

  return { categories, loading: isLoading, error, refetch }
}
