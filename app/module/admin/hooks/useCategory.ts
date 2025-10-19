import { useEffect, useState } from 'react'
import { categoryService } from '~/module/admin/services/CategoryApi'
import type { CategoryDetail } from '~/module/admin/types/Category'
import { useToast } from '~/shared/hooks/useToast'

export function   useCategory() {
  const [categories, setCategories] = useState<CategoryDetail[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const Toast = useToast()

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await categoryService.getAllCategories()
      if (res.isSuccess) {
        setCategories(res.value)
      } else {
        setError(res.error || 'Không thể tải danh mục')
      }
    } catch (err) {
      Toast.toast.error('Đã xảy ra lỗi khi tải danh mục')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, loading, error, fetchCategories }
}
